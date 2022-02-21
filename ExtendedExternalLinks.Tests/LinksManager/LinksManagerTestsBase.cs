using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using EPiServer;
using EPiServer.DataAbstraction;
using Moq;
using Xunit;

namespace ExtendedExternalLinks.Tests
{
    [Trait(nameof(LinksManager), nameof(LinksManager.GetItems))]
    public class LinksManagerTestsBase
    {
        internal LinksManager _linksManager;
        protected Mock<IContentLoader> _contentLoaderMock;
        protected Mock<IContentSoftLinkRepository> _contentSoftLinksRepository;

        public LinksManagerTestsBase()
        {
            _contentLoaderMock = new Mock<IContentLoader>();
            _contentSoftLinksRepository = new Mock<IContentSoftLinkRepository>();
            _linksManager = new LinksManager(_contentLoaderMock.Object, _contentSoftLinksRepository.Object);
        }
    }

    [Trait(nameof(LinksManager), nameof(LinksManager.GetItems))]
    public class GetItems: LinksManagerTestsBase
    {
        private IEnumerable<LinkDetailsData> linkDetailsDatas;

        public class When_soft_links_repository_has_not_data: GetItems
        {
            public When_soft_links_repository_has_not_data()
            {
                _contentSoftLinksRepository.Setup(x => x.Load(It.IsAny<string>(), false))
                    .Returns(new List<SoftLink>());
                linkDetailsDatas = _linksManager.GetItems(new GenericPrincipal(new GenericIdentity("admin"), Array.Empty<string>()));
            }

            [Fact]
            void It_should_return_empty_list() => Assert.Empty(linkDetailsDatas);
        }
    }
}
