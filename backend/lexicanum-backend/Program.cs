var builder = WebApplication.CreateBuilder(args);

// Configurar CORS para permitir que React Vite acceda a los datos
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Puerto por defecto de Vite
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("PermitirReact");

app.Run();
