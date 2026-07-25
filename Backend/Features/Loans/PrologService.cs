using System;
using System.IO;
using Prolog;
using System.Globalization;

namespace Backend.Features.Loans
{
    public static class PrologService
    {
        public static int ObtenerPenalizacion(double diasDeRetraso)
        {
            try
            {
                var engine = new PrologEngine();

                // 1. Ruta al archivo de reglas
                string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Rules", "penalizaciones.pl");

                if (!File.Exists(filePath))
                {
                    filePath = Path.Combine(Directory.GetCurrentDirectory(), "Rules", "penalizaciones.pl");
                }

                // 2. Cargar las reglas de Prolog
                engine.Consult(filePath);

                // 3. Formatear la consulta (ejemplo: "calcular_penalizacion(5, Penalizacion).")
                string diasStr = diasDeRetraso.ToString(CultureInfo.InvariantCulture);
                string query = $"calcular_penalizacion({diasStr}, Penalizacion).";

                // 4. Obtener la primera solución encontrada
                var solution = engine.GetFirstSolution(query);

                // 5. Validar que la solución exista
                if (solution != null)
                {
                    string solutionText = solution.ToString();

                    if (!string.IsNullOrEmpty(solutionText) && solutionText.Contains("="))
                    {
                        // Extraer el valor numérico tras el signo '='
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

            return 0; // Ante cualquier problema o si no hay retraso
        }
    }
}