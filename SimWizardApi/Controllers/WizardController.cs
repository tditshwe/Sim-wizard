using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SimWizardApi;
using SimWizardApi.Models;
using System.Linq;

namespace SimWizardApi.Controllers
{
    [Produces ("application/json")]
    [Route ("simwizard/")]
    public class WizardController : Controller {
        private DashboardContext _Context = new DashboardContext();

        public class WizardData
        {
            public List<Service> Services { get; set; }
            public List<Task> Tasks { get; set; }
            public Dictionary<int,string> Removed  {get; set; }
            public List<PivotRow> PivotRows { get; set; }
        }

        public class PivotRow
        {
            public string Name { get; set; }
            public List<string> Months { get; set; }
            public List<string> Statuses { get; set; }
            public Dictionary<string, string> RowData { get; set; }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try {
                List<Task> Tasks = _Context.Task.ToList();
                List<Service> Services = _Context.Service.ToList();
                List<PivotRow> PvRows = CreatePivotTable();

                return Ok(new WizardData
                {
                    Tasks = Tasks,
                    Services = Services,
                    PivotRows = PvRows
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public IActionResult SaveWizard([FromBody] WizardData data)
        {
            if (data != null)
            {
                try
                {
                    /*string[] months = new string[12] {
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    };*/

                    foreach (Service s in data.Services)
                    {
                        if (s.Id == 0)
                        {
                            //s.Month = months[DateTime.Now.Month - 1];
                            _Context.Service.Add(s);
                        }
                        else
                            _Context.Service.Update(s);
                    }

                    foreach (Task t in data.Tasks)
                    {
                        if (t.Id == 0)
                            _Context.Task.Add(t);
                        else
                            _Context.Task.Update(t);
                    }

                    foreach (KeyValuePair<int,string> kvp in data.Removed)
                    {
                        if (kvp.Value == "service")
                        {
                            Service s = _Context.Service.Find(kvp.Key);
                            _Context.Service.Remove(s);
                        }
                        else
                        {
                            Task t = _Context.Task.Find(kvp.Key);
                            _Context.Task.Remove(t);
                        }
                    }

                    _Context.SaveChanges();
                }
                catch (Exception e)
                {
                    return StatusCode(500, e.Message);
                }
            }

            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            List<Task> Tasks = _Context.Task.ToList();
            List<Service> Services = _Context.Service.ToList();

            foreach(Task task in Tasks)
            {
                _Context.Task.Remove(task);
            }

            foreach(Service s in Services)
            {
                _Context.Service.Remove(s);
            }

            _Context.SaveChanges();
            return Ok();
        }

        private List<PivotRow> CreatePivotTable()
        {
            List<PivotRow> Pivot = new List<PivotRow>();
            Dictionary<string, string> RowData;

            var PivotRowList = _Context.Service.GroupBy(x => x.Name).Select(rg => new PivotRow
                {
                    Name = rg.Select(r => r.Name).First(),
                    Months = rg.Select(r => r.Month).ToList(),
                    Statuses = rg.Select(r => r.Status).ToList()
                }).ToList();

            foreach (PivotRow pv in PivotRowList)
            {
                RowData = new Dictionary<string, string>();

                for (int i = 0; i < pv.Months.Count; i++)
                    RowData.Add(pv.Months[i], pv.Statuses[i]);
                
                Pivot.Add(new PivotRow {
                    Name = pv.Name,
                    RowData = RowData
                });
            }

            return Pivot;
        }
    }
}