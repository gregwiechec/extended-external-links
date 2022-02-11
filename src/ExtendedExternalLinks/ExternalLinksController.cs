using EPiServer.Security;
using EPiServer.Shell.Services.Rest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExtendedExternalLinks
{
    [Authorize(Roles = "CmsEditors,CmsAdmin,WebAdmins,Administrators")]
    [Route("[controller]")]
    public class ExternalLinksController : Controller
    {
        private readonly ILinksManager _linksManager;
        private readonly IPrincipalAccessor _principalAccessor;

        public ExternalLinksController(ILinksManager linksManager, IPrincipalAccessor principalAccessor)
        {
            _linksManager = linksManager;
            _principalAccessor = principalAccessor;
        }

        [Route("[action]")]
        [HttpGet]
        public ActionResult GetItems()
        {
            var list = _linksManager.GetItems(_principalAccessor.Principal);
            return new RestResult { Data = list };
        }

        [Route("[action]")]
        [HttpGet]
        public ActionResult GetAggregatedItems()
        {
            var list = _linksManager.GetAggregatedItems(_principalAccessor.Principal);
            return new RestResult { Data = list };
        }
    }
}
