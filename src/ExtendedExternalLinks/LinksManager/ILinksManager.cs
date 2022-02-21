using System.Collections.Generic;
using System.Security.Principal;
using EPiServer.Core;

namespace ExtendedExternalLinks
{
    public interface ILinksManager
    {
        IEnumerable<LinkDetailsData> GetItems(IPrincipal user);
        IEnumerable<LinkCommonData> GetAggregatedItems(IPrincipal user);
    }

    public class LinkCommonData
    {
        public string Host { get; set; }
        public string ExternalLink { get; set; }
        public int Count { get; set; }
    }

    public class LinkDetailsData
    {
        public ContentReference ContentLink { get; set; }
        public string ContentName { get; set; }
        public string ExternalLink { get; set; }
    }
}
