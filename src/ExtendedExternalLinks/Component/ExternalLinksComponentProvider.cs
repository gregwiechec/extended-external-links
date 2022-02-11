using System.Collections.Generic;
using System.Linq;
using EPiServer.Shell.ViewComposition;

namespace ExtendedExternalLinks.Component
{
    [ComponentProvider]
    public class ExternalLinksComponentProvider: IComponentProvider
    {
        private readonly ExternalLinksOptions _externalLinksOptions;
        public int SortOrder => 100;
        private IComponentDefinition _component;

        public ExternalLinksComponentProvider(ExternalLinksOptions externalLinksOptions)
        {
            _externalLinksOptions = externalLinksOptions;
        }

        public IEnumerable<IComponentDefinition> GetComponentDefinitions()
        {
            if (!_externalLinksOptions.Enabled)
            {
                return Enumerable.Empty<IComponentDefinition>();
            }
            if (_component == null)
            {
                _component = new ExternalLinksComponent();
            }
            return new [] { _component };
        }

        public IComponent CreateComponent(IComponentDefinition definition)
        {
            if (!_externalLinksOptions.Enabled)
            {
                return null;
            }
            if (definition.DefinitionName == typeof(ExternalLinksComponent).FullName)
            {
                return definition.CreateComponent();

            }
            return null;
        }
    }
}
