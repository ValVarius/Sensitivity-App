$(document).ready(function () {
  // display the date
  let today;
  let displayDate = () => {
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    var output =
      d.getFullYear() +
      "|" +
      (month < 10 ? "0" : "") +
      month +
      "|" +
      (day < 10 ? "0" : "") +
      day;
    let time =
      `<span class="navbar-text" style="margin-right: 25px; color: black";>` +
      output +
      `</span>`;

    today = output
    $(".navbar").append(time);
  };
  displayDate();

  // check for all meals with this date and store it???
  console.log(today);


    $.get("/api/getMeals/" + today, function(data) {
      console.log("Meals: ", data);
    }); 
    $.get("/api/Meal", function(data) {
      console.log("Meals: ", data);
    });
  
  }); //End of ready function
// if the meal is breakfast, the morning wight is unnecessary
$("#mealTitle").change(function () {
  console.log(this.form);
  let meal = $("#mealTitle").find(":selected").val();
  $("#weight").attr("hidden", true);

  if (meal == "breakfast") {
    $("#weight").removeAttr("hidden");
  }
});
