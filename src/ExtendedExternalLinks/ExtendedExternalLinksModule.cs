using EPiServer.Framework.TypeScanner;
using EPiServer.Framework.Web.Resources;
using EPiServer.Shell;
using EPiServer.Shell.Modules;
using Microsoft.Extensions.FileProviders;

namespace ExtendedExternalLinks
{
    public class ExtendedExternalLinksModule: ShellModule
    {
        public ExtendedExternalLinksModule(string name, string routeBasePath, string resourceBasePath)
            : base(name, routeBasePath, resourceBasePath)
        {
        }

        public ExtendedExternalLinksModule(
            string name,
            string routeBasePath,
            string resourceBasePath,
            ITypeScannerLookup typeScannerLookup,
            IFileProvider virtualPathProvider): base(name, routeBasePath, resourceBasePath, typeScannerLookup, virtualPathProvider) {
           
        }

        public override ModuleViewModel CreateViewModel(
            ModuleTable moduleTable,
            IClientResourceService service)
        {
            return new ExtendedExternalLinksModuleViewModel(this, service)
            {
                ExternalLinksControllerUrl = Paths.ToResource("extended-external-links", "ExternalLinks")
            };
        }

        class ExtendedExternalLinksModuleViewModel : ModuleViewModel
        {
            public string ExternalLinksControllerUrl { get; set; }

            public ExtendedExternalLinksModuleViewModel(ShellModule module, IClientResourceService clientResourceService) : base(module, clientResourceService)
            {
            }
        }
    }
}
