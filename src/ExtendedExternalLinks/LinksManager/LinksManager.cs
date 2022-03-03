using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Principal;
using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Security;
using EPiServer.ServiceLocation;

[assembly: InternalsVisibleTo("ExtendedExternalLinks.Tests")]

namespace ExtendedExternalLinks
{
    [ServiceConfiguration(typeof(ILinksManager))]
    internal class LinksManager : ILinksManager
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
            return GetPage(GetDetailsList(links), 0, 10000);
        }

        public IEnumerable<LinkCommonData> GetAggregatedItems(IPrincipal user)
        {
            var links = GetLinks(user).ToList();
            return GetPage(GetAggregatedList(links), 0, 10000);
        }

        private static IEnumerable<LinkCommonData> GetAggregatedList(IEnumerable<SoftLinkResult> source)
        {
            var temp = source.GroupBy(item => item.Url.Host);
            var items = temp.Select(item => new LinkCommonData
            {
                Host = item.Key, ExternalLink = item.First().Url.Scheme + "://" + item.First().Url.Authority,
                Count = item.Count(),
                Contents = item.Select(x => new ContentValue
                    {ContentLink = x.Content.ContentLink, ContentName = x.Content.Name})
            });
            return items.OrderBy(item => item.Host);
        }

        private IEnumerable<T> GetPage<T>(IEnumerable<T> source, int pageNumber, int pageSize)
        {
            return source.Skip((pageNumber - 1) * pageSize).Take(pageSize);
        }

        private static IEnumerable<LinkDetailsData> GetDetailsList(IEnumerable<SoftLinkResult> source)
        {
            var temp = source.Select(item => new
                {Url = item.Url.ToString(), item.Language, item.Content});
            var items = temp.Select(item => new LinkDetailsData
            {
                ExternalLink = item.Url,
                ContentName = item.Content.Name,
                ContentLink = item.Content.ContentLink,
                Language = item.Language,
                PublishDate = (item.Content as IChangeTrackable)?.Changed.ToString("yyyy-MM-dd")
            });
            return items.OrderBy(item => item.ExternalLink);
        }

        private IEnumerable<SoftLinkResult> GetLinks(IPrincipal user)
        {
            var softLinks = _softLinkRepository.Load("http", false);

            var links = new List<SoftLinkResult>();
            foreach (var softLink in softLinks)
            {
                Uri uri;
                try
                {
                    uri = new Uri(softLink.Url);
                }
                catch (UriFormatException)
                {
                    // If the link contained a bad uri, skip it.
                    continue;
                }

                IContent content;
                try
                {
                    content = _contentLoader.Get<IContent>(softLink.OwnerContentLink);
                }
                catch (ContentNotFoundException)
                {
                    // If the page does not exist, don't add a link.
                    continue;
                }

                if (IsAuthorized(user, content) && !content.IsDeleted)
                {
                    links.Add(new SoftLinkResult
                    {
                        Content = content,
                        Url = new Url(uri),
                        Language = softLink?.OwnerLanguage?.Name ?? ""
                    });
                }
            }

            return links;
        }

        private static bool IsAuthorized(IPrincipal user, IContent content) =>
            !(content is ISecurable sec) || sec.GetSecurityDescriptor().HasAccess(user, AccessLevel.Read);

        public class SoftLinkResult
        {
            public IContent Content { get; set; }
            public Url Url { get; set; }
            public string Language { get; set; }
        }
    }
}
