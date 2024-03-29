﻿using EPiServer.Shell;
using EPiServer.Shell.ViewComposition;

namespace ExtendedExternalLinks.Component
{
    internal class ExternalLinksComponent : ComponentDefinitionBase
    {
        public ExternalLinksComponent() : base("extended-external-links/external-links-component")
        {
            Categories = new[] { "cms" };
            LanguagePath = "/externallinks/component";
            SortOrder = 500;
            Settings["externalLinksControllerUrl"] = Paths.ToResource("extended-external-links", "ExternalLinks");
            //PlugInAreas = new[] { PlugInArea.NavigationDefaultGroup };
        }
    }
}
