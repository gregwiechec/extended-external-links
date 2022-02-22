using System;
using System.Linq;
using System.Text;
using EPiServer.Security;
using EPiServer.Shell.Services.Rest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace ExtendedExternalLinks
{
    [Authorize(Roles = "CmsEditors,CmsAdmins,WebAdmins,Administrators")]
    public class ExternalLinksController : Controller
    {
        private readonly ILinksManager _linksManager;
        private readonly IPrincipalAccessor _principalAccessor;

        public ExternalLinksController(ILinksManager linksManager, IPrincipalAccessor principalAccessor)
        {
            _linksManager = linksManager;
            _principalAccessor = principalAccessor;
        }

        [HttpGet]
        public ActionResult GetItems()
        {
            var list = _linksManager.GetItems(_principalAccessor.Principal);
            return new RestResult { Data = list };
        }

        [HttpGet]
        public ActionResult GetAggregatedItems()
        {
            var list = _linksManager.GetAggregatedItems(_principalAccessor.Principal);
            return new RestResult { Data = list };
        }

        [HttpGet]
        public IActionResult Export()
        {
            var list = _linksManager.GetItems(_principalAccessor.Principal);
            var result = string.Join(Environment.NewLine, list.Select(x => x.ContentLink + ";" + x.ContentName + ";" + x.ExternalLink));

            const string fileName = "external links.csv";
            var fileBytes = Encoding.UTF8.GetBytes(result);

            return File(fileBytes, "text/csv", fileName);
        }
    }
}
