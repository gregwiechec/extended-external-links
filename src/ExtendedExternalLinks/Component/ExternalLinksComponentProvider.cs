using System.Collections.Generic;
using EPiServer.Shell.ViewComposition;

namespace ExtendedExternalLinks.Component
{
    [ComponentProvider]
    public class ExternalLinksComponentProvider: IComponentProvider
    {
        public int SortOrder => 100;
        private IComponentDefinition _component;

        public IEnumerable<IComponentDefinition> GetComponentDefinitions()
        {
            if (_component == null)
            {
                _component = new ExternalLinksComponent();
            }
            return new [] { _component };
        }

        public IComponent CreateComponent(IComponentDefinition definition)
        {
            if (definition.DefinitionName == typeof(ExternalLinksComponent).FullName)
            {
                return definition.CreateComponent();

            }
            return null;
        }
    }
}
