using EPiServer.ServiceLocation;

namespace ExtendedExternalLinks
{
    [Options]
    public class ExternalLinksOptions
    {
        /// <summary>
        /// When <see langword="true"/> then plugin is enabled. Default <see langword="true"/>
        /// </summary>
        public bool Enabled { get; set; } = true;
    }
}
