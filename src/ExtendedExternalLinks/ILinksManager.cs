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
        IEnumerable<LinkDetailsData> GetItems(IPrincipal user);
        IEnumerable<LinkCommonData> GetAggregatedItems(IPrincipal user);
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

        public IEnumerable<LinkDetailsData> GetItems(IPrincipal user)
        {
            var links = GetLinks(user).ToList();
            return GetContent(GetDetailsList(links), 0, 10000);
        }

        public IEnumerable<LinkCommonData> GetAggregatedItems(IPrincipal user)
        {
            var links = GetLinks(user).ToList();
            return GetContent(GetCommonList(links), 0, 10000);
        }

        private IEnumerable<LinkCommonData> GetCommonList(IEnumerable<UrlContentReferencePair> source)
        {
            var temp = source.GroupBy(item => item.Url.Host);
            var items = temp.Select(item => new LinkCommonData
            {
                Host = item.Key, ExternalLink = item.First().Url.Scheme + "://" + item.First().Url.Authority, Count = item.Count()
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

        private IEnumerable<LinkDetailsData> GetDetailsList(IEnumerable<UrlContentReferencePair> source)
        {
            var temp = source.Select(item => new
                {Url = item.Url.ToString(), item.Language, Content = GetContent(item.ContentReference)});
            var items = temp.Select(item => new LinkDetailsData
            {
                ExternalLink = item.Url, ContentName = item.Content.Name,
                ContentLink = item.Content.ContentLink,
                ContentUrl = PageEditing.GetEditUrl(item.Content.ContentLink),
                Language = item.Language,
                PublishDate = (item.Content as IChangeTrackable)?.Changed.ToString("yyyy-MM-dd")
            });
            return items.OrderBy(item => item.ExternalLink);
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
                        Url = new Url(uri),
                        Language = softLink.ReferencedLanguage.Name
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
        public string ContentUrl { get; set; }
        public string ExternalLink { get; set; }
        public string Language { get; set; }
        public string PublishDate { get; set; }
    }

    public class UrlContentReferencePair
    {
        public ContentReference ContentReference { get; set; }
        public Url Url { get; set; }
        public string Language { get; set; }
    }
}
