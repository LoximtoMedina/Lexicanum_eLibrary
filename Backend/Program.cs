using Backend.Data;
using Backend.Features.Books;
using Backend.Features.Loans;
using Backend.Features.Universities;
using Backend.Features.Users;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Registro de Servicios
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<BookService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<LoanService>();
builder.Services.AddScoped<UniversityService>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Construcción de la App
var app = builder.Build();

// Pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run("http://0.0.0.0:7017");