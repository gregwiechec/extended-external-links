using System;
using System.Linq;
using EPiServer.Shell.Modules;
using Microsoft.Extensions.DependencyInjection;

namespace ExtendedExternalLinks
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddExtendedExternalLinks(this IServiceCollection services)
        {
            services.Configure<ProtectedModuleOptions>(
                pm =>
                {
                    if (!pm.Items.Any(i =>
                        i.Name.Equals("extended-external-links", StringComparison.OrdinalIgnoreCase)))
                    {
                        pm.Items.Add(new ModuleDetails { Name = "extended-external-links", Assemblies = { typeof(ExternalLinksController).Assembly.GetName().Name }  });
                    }
                });
            return services;
        }
    }
}
