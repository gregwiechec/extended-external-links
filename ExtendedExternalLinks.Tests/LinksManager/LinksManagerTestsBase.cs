using EPiServer;
using EPiServer.DataAbstraction;
using EPiServer.Security;
using Moq;
using Xunit;

namespace ExtendedExternalLinks.Tests
{
    [Trait(nameof(LinksManager), nameof(LinksManager.GetItems))]
    public class LinksManagerTestsBase
    {
        internal LinksManager _linksManager;
        protected Mock<IContentLoader> _contentLoaderMock;
        protected Mock<IContentSoftLinkRepository> _contentSoftLinksRepositoryMock;
        protected Mock<ISecurityDescriptor> _securityDescriptorMock;

        public LinksManagerTestsBase()
        {
            _contentLoaderMock = new Mock<IContentLoader>();
            _contentSoftLinksRepositoryMock = new Mock<IContentSoftLinkRepository>();
            _securityDescriptorMock = new Mock<ISecurityDescriptor>();
            _linksManager = new LinksManager(_contentLoaderMock.Object, _contentSoftLinksRepositoryMock.Object);
        }
    }
}
