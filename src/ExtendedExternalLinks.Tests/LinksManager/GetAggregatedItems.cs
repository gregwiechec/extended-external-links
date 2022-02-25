using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Principal;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Security;
using Moq;
using Xunit;

namespace ExtendedExternalLinks.Tests
{
    [Trait(nameof(LinksManager), nameof(LinksManager.GetAggregatedItems))]
    public class GetAggregatedItems : LinksManagerTestsBase
    {
        // more detailed scenarios are in `GetItems` tests

        public class When_soft_links_returns_link : GetAggregatedItems
        {
            private IEnumerable<LinkCommonData> _aggregatedItems;

            public When_soft_links_returns_link()
            {
                var softLinks = new List<SoftLink>()
                {
                    new()
                    {
                        Url = "https://google.com",
                        OwnerContentLink = new ContentReference(1234),
                        ReferencedLanguage = new CultureInfo("en")
                    },
                    new()
                    {
                        Url = "https://google.com",
                        OwnerContentLink = new ContentReference(12345),
                        ReferencedLanguage = new CultureInfo("en")
                    }
                };
                _contentSoftLinksRepositoryMock.Setup(x => x.Load(It.IsAny<string>(), false))
                    .Returns(softLinks);
            }

            public class And_user_is_authorized : When_soft_links_returns_link
            {
                public And_user_is_authorized()
                {
                    _securityDescriptorMock.Setup(x => x.HasAccess(It.IsAny<IPrincipal>(), It.IsAny<AccessLevel>()))
                        .Returns(true);
                }

                public class And_content_is_not_deleted : And_user_is_authorized
                {
                    public And_content_is_not_deleted()
                    {
                        _contentLoaderMock.Setup(x => x.Get<IContent>(It.IsAny<ContentReference>())).Returns(
                            (ContentReference x) =>
                                new GetItems.FakeContent(_securityDescriptorMock.Object)
                                {
                                    IsDeleted = false,
                                    ContentLink = x
                                });
                        _aggregatedItems =
                            _linksManager.GetAggregatedItems(new GenericPrincipal(new GenericIdentity("admin"),
                                Array.Empty<string>()));
                    }

                    [Fact]
                    void It_should_return_item_with_URL() =>
                        Assert.Equal("https://google.com", _aggregatedItems.Single().ExternalLink);

                    [Fact]
                    void It_should_return_item_with_ContentLink() =>
                        Assert.Equal(2, _aggregatedItems.Single().Count);

                    [Fact]
                    void It_should_return_item_with_Contents() =>
                        Assert.Equal(new[] {new ContentReference(1234), new ContentReference(12345)},
                            _aggregatedItems.Single().Contents.Select(x => x.ContentLink));
                }
            }
        }
    }
}
