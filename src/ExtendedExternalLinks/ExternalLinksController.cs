using EPiServer.Security;
using EPiServer.Shell.Services.Rest;
using Microsoft.AspNetCore.Mvc;

namespace ExtendedExternalLinks
{
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
        public IActionResult Index()
        {
            return new RestResult { Data = new { aaa = 1 } };
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var list = _linksManager.GetData(_principalAccessor.Principal, true);
            return new RestResult { Data = list };
        }
    }
}
