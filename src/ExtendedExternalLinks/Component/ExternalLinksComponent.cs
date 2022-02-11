using EPiServer.Shell;
using EPiServer.Shell.ViewComposition;

namespace ExtendedExternalLinks.Component
{
    public class ExternalLinksComponent : ComponentDefinitionBase
    {
        public ExternalLinksComponent() : base("extended-external-links/external-links-component")
        {
            Categories = new[] { "cms" };
            LanguagePath = "/externallinks/component";
            SortOrder = 500;
            //PlugInAreas = new[] { PlugInArea.NavigationDefaultGroup };
        }
    }
}
