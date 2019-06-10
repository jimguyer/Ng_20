using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Ng_20.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var viewModel = new IndexModel() { IsLoggedIn = true, Role = "Member" };
            return View("Index", viewModel);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
        public class IndexModel
        {
            public bool IsLoggedIn { get; set; }
            public string Role { get; set; }
        }
    }
}
