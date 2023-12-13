using Microsoft.AspNetCore.Mvc;

    [Route("[controller]")]
    [ApiController]
    public class TDEEController : ControllerBase
    {
        [HttpPost("calculateTDEE")]
        public ActionResult<double> CalculateTDEE([FromBody] TDEEData formData)
        {
            try
            {
                if (formData == null)
                {
                    return BadRequest("Invalid TDEE data");
                }

                double rEE = CalculateREE(formData);
                double tdee = formData.activityLevel * rEE;

                return Ok(tdee);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }
        private double CalculateREE(TDEEData formData)
        {
            double rEE;

            if (formData.gender == "male")
            {
                rEE = formData.weight * 10 + formData.height * 6.25 - formData.age * 5 + 5;
            }
            else
            {
                rEE = formData.weight * 10 + formData.height * 6.25 - formData.age * 5 - 161;
            }

            return rEE;
        }
    }


public class TDEEData
{
    public string gender { get; set; }
    public int age { get; set; }
    public double weight { get; set; }
    public double height { get; set; }
    public double activityLevel { get; set; }
}
