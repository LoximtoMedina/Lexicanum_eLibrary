using System;
using System.IO;
using Prolog;
using System.Globalization;

namespace Backend.Features.Loans
{
    public static class PrologService
    {
        private static readonly string RulesFilePath = GetRulesFilePath();

        private static string GetRulesFilePath()
        {
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Rules", "BussinessRules.pl");
            if (!File.Exists(filePath))
            {
                filePath = Path.Combine(Directory.GetCurrentDirectory(), "Rules", "BussinessRules.pl");
            }
            return filePath;
        }

        public static int ObtenerPenalizacion(double diasDeRetraso)
        {
            try
            {
                var engine = new PrologEngine();
                engine.Consult(RulesFilePath);

                string diasStr = diasDeRetraso.ToString(CultureInfo.InvariantCulture);
                string query = $"calcular_penalizacion({diasStr}, Penalizacion).";
                var solution = engine.GetFirstSolution(query);

                if (solution != null)
                {
                    string solutionText = solution.ToString();
                    if (!string.IsNullOrEmpty(solutionText) && solutionText.Contains("="))
                    {
                        string valorStr = solutionText.Split('=')[1].Trim().TrimEnd('.');
                        if (int.TryParse(valorStr, out int penalizacion))
                        {
                            return penalizacion;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al consultar Prolog: {ex.Message}");
            }

            return 0;
        }

        public static bool ValidarPrestamoConProlog(int librosActivos, int stockLibro, int penalizacion)
        {
            try
            {
                var engine = new PrologEngine();
                engine.Consult(RulesFilePath);

                string query = $"puede_prestar({librosActivos}, {stockLibro}, {penalizacion}).";
                var solution = engine.GetFirstSolution(query);

                return solution != null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al validar préstamo con Prolog: {ex.Message}");
                return false;
            }
        }
    }
}