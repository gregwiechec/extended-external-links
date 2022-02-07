using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Editor;
using EPiServer.Security;
using EPiServer.ServiceLocation;

namespace ExtendedExternalLinks
{
    public interface ILinksManager
    {
        IndexViewData GetData(IPrincipal user, bool showDetails);
    }

    [ServiceConfiguration(typeof(ILinksManager))]
    public class LinksManager : ILinksManager
    {
        private readonly IContentLoader _contentLoader;
        private readonly IContentSoftLinkRepository _softLinkRepository;

        public LinksManager(IContentLoader contentLoader, IContentSoftLinkRepository softLinkRepository)
        {
            _contentLoader = contentLoader;
            _softLinkRepository = softLinkRepository;
        }

        public IndexViewData GetData(IPrincipal user, bool showDetails)
        {
            var links = GetLinks(user).ToList();
            var commonItems = showDetails ?  Enumerable.Empty<LinkCommonData>() : GetCommonList(links);
            var detailsItems = showDetails ? GetDetailsList(links, 0, 10000) : Enumerable.Empty<LinkDetailsData>();

            return new IndexViewData()
            {
                PageNumber = 0,
                PageSize = 10000,
                Count = showDetails ? detailsItems.Count() : commonItems.Count(),
                ShowDetails = showDetails,
                CommonItems = GetContent(commonItems, 0, 10000),
                DetailsItems = GetContent(detailsItems, 0, 10000)
            };
        }

        private IEnumerable<LinkCommonData> GetCommonList(IEnumerable<UrlContentReferencePair> source)
        {
            var temp = source.GroupBy(item => item.Url.Host);
            var items = temp.Select(item => new LinkCommonData
            {
                Host = item.Key, Url = item.First().Url.Scheme + "://" + item.First().Url.Authority, Hits = item.Count()
            });
            return items.OrderBy(item => item.Host);
        }

        private IEnumerable<T> GetContent<T>(IEnumerable<T> source, int pageNumber, int pageSize)
        {
            return source.Skip((pageNumber - 1) * pageSize).Take(pageSize);
        }

        private IContent GetContent(ContentReference reference)
        {
            IContent content;
            if (_contentLoader.TryGet<IContent>(reference, out content))
            {
                return content;
            }

            return new PageData {PageName = string.Empty, LinkURL = string.Empty};
        }

        private IEnumerable<LinkDetailsData> GetDetailsList(IEnumerable<UrlContentReferencePair> source, int pageNumber,
            int pageSize)
        {
            var temp = source.Select(item => new
                {Url = item.Url.ToString(), Content = GetContent(item.ContentReference)});
            var items = temp.Select(item => new LinkDetailsData
            {
                Url = item.Url, ContentName = item.Content.Name,
                ContentLink = PageEditing.GetEditUrl(item.Content.ContentLink)
            });
            return items.OrderBy(item => item.Url);
        }

        private IEnumerable<UrlContentReferencePair> GetLinks(IPrincipal user)
        {
            var softLinks = _softLinkRepository.Load("http", false);

            var links = new List<UrlContentReferencePair>();
            Uri uri = null;
            foreach (var softLink in softLinks)
            {
                try
                {
                    uri = new Uri(softLink.Url);
                }
                catch (UriFormatException)
                {
                    // If the link contained a bad uri, skip it.
                    continue;
                }

                IContent content = null;
                try
                {
                    content = _contentLoader.Get<IContent>(softLink.OwnerContentLink);
                }
                catch (ContentNotFoundException)
                {
                    // If the page does not exist, don't add a link.
                    continue;
                }

                if (IsAuthorized(user, content.ContentLink) && !content.IsDeleted)
                {
                    links.Add(new UrlContentReferencePair
                    {
                        ContentReference = content.ContentLink,
                        Url = new Url(uri)
                    });
                }
            }

            return links;
        }

        private bool IsAuthorized(IPrincipal user, ContentReference pageReference)
        {
            var page = GetContent(pageReference);
            var securable = page as ISecurable;

            return securable != null
                ? securable.GetSecurityDescriptor().HasAccess(user, EPiServer.Security.AccessLevel.Read)
                : true;
        }
    }

    public class IndexViewData
    {
        public int PageSize { get; internal set; }
        public int PageNumber { get; internal set; }
        public int Count { get; internal set; }
        public bool ShowDetails { get; internal set; }
        public IEnumerable<LinkCommonData> CommonItems { get; internal set; }
        public IEnumerable<LinkDetailsData> DetailsItems { get; internal set; }
    }

    public class LinkCommonData
    {
        public string Host { get; internal set; }
        public string Url { get; internal set; }
        public int Hits { get; internal set; }
    }

    public class LinkDetailsData
    {
        public string Url { get; internal set; }
        public string ContentName { get; internal set; }
        public string ContentLink { get; internal set; }
    }

    public class UrlContentReferencePair
    {
        public ContentReference ContentReference { get; set; }
        public Url Url { get; set; }
    }
}
