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
    [Trait(nameof(LinksManager), nameof(LinksManager.GetItems))]
    public class GetItems : LinksManagerTestsBase
    {
        private IEnumerable<LinkDetailsData> linkDetailsDatas;

        public class When_soft_links_repository_has_not_data : GetItems
        {
            public When_soft_links_repository_has_not_data()
            {
                _contentSoftLinksRepositoryMock.Setup(x => x.Load(It.IsAny<string>(), false))
                    .Returns(new List<SoftLink>());
                linkDetailsDatas =
                    _linksManager.GetItems(new GenericPrincipal(new GenericIdentity("admin"), Array.Empty<string>()));
            }

            [Fact]
            void It_should_return_empty_list() => Assert.Empty(linkDetailsDatas);
        }

        public class When_soft_links_returns_link : GetItems
        {
            public When_soft_links_returns_link()
            {
                var softLinks = new List<SoftLink>()
                {
                    new()
                    {
                        Url = "https://google.com",
                        OwnerContentLink = new ContentReference(1234),
                        ReferencedLanguage = new CultureInfo("en")
                    }
                };
                _contentSoftLinksRepositoryMock.Setup(x => x.Load(It.IsAny<string>(), false))
                    .Returns(softLinks);
            }

            public class And_user_is_not_authorized : When_soft_links_returns_link
            {
                public And_user_is_not_authorized()
                {
                    _securityDescriptorMock.Setup(x => x.HasAccess(It.IsAny<IPrincipal>(), It.IsAny<AccessLevel>()))
                        .Returns(false);
                    _contentLoaderMock.Setup(x => x.Get<IContent>(new ContentReference(1234))).Returns(new FakeContent(_securityDescriptorMock.Object)
                    {
                        IsDeleted = true
                    });
                    linkDetailsDatas =
                        _linksManager.GetItems(new GenericPrincipal(new GenericIdentity("admin"), Array.Empty<string>()));
                }

                [Fact]
                void It_should_return_empty_list() => Assert.Empty(linkDetailsDatas);
            }


            public class And_user_is_authorized : When_soft_links_returns_link
            {
                public And_user_is_authorized()
                {
                    _securityDescriptorMock.Setup(x => x.HasAccess(It.IsAny<IPrincipal>(), It.IsAny<AccessLevel>()))
                        .Returns(true);
                }

                public class And_content_is_deleted : And_user_is_authorized
                {
                    public And_content_is_deleted()
                    {
                        
                        _contentLoaderMock.Setup(x => x.Get<IContent>(new ContentReference(1234))).Returns(
                            new FakeContent(_securityDescriptorMock.Object)
                            {
                                IsDeleted = true
                            });
                        linkDetailsDatas =
                            _linksManager.GetItems(new GenericPrincipal(new GenericIdentity("admin"),
                                Array.Empty<string>()));
                    }

                    [Fact]
                    void It_should_return_empty_list() => Assert.Empty(linkDetailsDatas);
                }

                public class And_content_is_not_deleted : And_user_is_authorized
                {
                    public And_content_is_not_deleted()
                    {
                        _contentLoaderMock.Setup(x => x.Get<IContent>(new ContentReference(1234))).Returns(
                            new FakeContent(_securityDescriptorMock.Object)
                            {
                                IsDeleted = false,
                                ContentLink = new ContentReference(1234)
                            });
                        linkDetailsDatas =
                            _linksManager.GetItems(new GenericPrincipal(new GenericIdentity("admin"),
                                Array.Empty<string>()));
                    }

                    [Fact]
                    void It_should_return_item_with_URL() => Assert.Equal("https://google.com/", linkDetailsDatas.Single().ExternalLink);

                    [Fact]
                    void It_should_return_item_with_ContentLink() => Assert.Equal(linkDetailsDatas.Single().ContentLink, new ContentReference(1234));
                }
            }
        }

        public class FakeContent : IContent, ISecurable
        {
            private readonly ISecurityDescriptor _securityDescriptor;

            public FakeContent(ISecurityDescriptor securityDescriptor)
            {
                _securityDescriptor = securityDescriptor;
            }

            public PropertyDataCollection Property { get; }
            public string Name { get; set; }
            public ContentReference ContentLink { get; set; }
            public ContentReference ParentLink { get; set; }
            public Guid ContentGuid { get; set; }
            public int ContentTypeID { get; set; }
            public bool IsDeleted { get; set; }

            public ISecurityDescriptor GetSecurityDescriptor() => _securityDescriptor;
        }
    }
}
