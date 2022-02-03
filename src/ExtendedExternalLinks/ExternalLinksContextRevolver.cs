using System;
using EPiServer.ServiceLocation;
using EPiServer.Shell.Rest;

namespace ExtendedExternalLinks
{
    /// <summary>
    /// Resolves the context for external links UI
    /// </summary>
    [ServiceConfiguration(typeof(IUriContextResolver))]
    public class ExternalLinksContextRevolver : IUriContextResolver
    {
        public bool TryResolveUri(Uri uri, out ClientContextBase instance)
        {
            instance = new ExternalLinksContext
            {
                Uri = uri,
                RequestedUri = uri,
                VersionAgnosticUri = uri,

                DataType = typeof(ExternalLinksContext).FullName?.ToLowerInvariant() ?? "",

                CustomViewType = "extended-external-links/external-links-component"
            };


            return true;
        }

        public string Name => "external-links";
    }

    internal class ExternalLinksContext : ClientContextBase
    {
        public string CustomViewType { get; set; }
        public override string DataType { get; set; }
    }
}
