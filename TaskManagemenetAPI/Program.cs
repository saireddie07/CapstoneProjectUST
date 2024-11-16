
using Microsoft.EntityFrameworkCore;
using TaskManagemenetAPI.Data;
using TaskManagemenetAPI.Service;

namespace TaskManagemenetAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddScoped<ITaskService, TaskService>();

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddCors(options =>

            {

                options.AddPolicy("AllowAngularApp",

                  builder =>

                  {

                      builder.AllowAnyOrigin()

            .AllowAnyHeader()

            .AllowAnyMethod();

                  });

            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseCors("AllowAngularApp");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
