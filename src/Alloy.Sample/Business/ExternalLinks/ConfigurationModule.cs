﻿using System;
using System.Collections.Generic;
using System.Security.Principal;
using EPiServer;
using EPiServer.Core;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using ExtendedExternalLinks;
using Microsoft.Extensions.DependencyInjection;

namespace Alloy.Sample.Business.ExternalLinks
{
    [ModuleDependency(typeof(InitializationModule))]
    public class ConfigurationModule : IConfigurableModule
    {
        public void Initialize(InitializationEngine context)
        {
        }

        public void Uninitialize(InitializationEngine context)
        {
        }

        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.ConfigurationComplete += (sender, args) =>
            {
                context.Services.AddTransient<ILinksManager, FakeLinksManager>();
            };
        }
    }

    public class FakeLinksManager : ILinksManager
    {
        private readonly IContentLoader _contentLoader;

        private IEnumerable<string> _externalLinks = new[]
            {"https://www.google.com", "https://microsoft.com", "https://www.amazon.com"};

        public FakeLinksManager(IContentLoader contentLoader)
        {
            _contentLoader = contentLoader;
        }

        public IEnumerable<LinkDetailsData> GetItems(IPrincipal user)
        {
            var contents = _contentLoader.GetDescendents(ContentReference.StartPage);
            foreach (var contentReference in contents)
            {
                var content = _contentLoader.Get<IContent>(contentReference);

                foreach (var externalLink in _externalLinks)
                {
                    yield return new LinkDetailsData
                    {
                        ContentLink = content.ContentLink,
                        ContentName = content.Name,
                        ContentUrl = "",
                        ExternalLink = externalLink
                    };
                }
            }
        }

        public IEnumerable<LinkCommonData> GetAggregatedItems(IPrincipal user)
        {
            var random = new Random((int) DateTime.Now.Ticks);
            var contents = _contentLoader.GetDescendents(ContentReference.StartPage);
            foreach (var contentReference in contents)
            {
                var content = _contentLoader.Get<IContent>(contentReference);

                foreach (var externalLink in _externalLinks)
                {
                    yield return new LinkCommonData
                    {
                        ExternalLink = externalLink,
                        Count = random.Next(100)
                    };
                }
            }
        }
    }
}