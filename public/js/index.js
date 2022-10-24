$(document).ready(function () {
  // display the date
  let today;
  let displayDate = () => {
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let today =
      d.getFullYear() +
      "|" +
      (month < 10 ? "0" : "") +
      month +
      "|" +
      (day < 10 ? "0" : "") +
      day;
    // let time =
    //   `<span class="navbar-text" id="date" style="margin-right: 25px; color: black";>` +
    //   output +
    //   `</span>`;
    // console.log(today);
    $("#date").text(today);
    // $(".navbar").append(time);
    // console.log($("#date").text());
  };
  displayDate();

  // check for all meals with this date and store it???
  
// retrieve all the meals with today's date
  $.get("/api/getMeals/" + today, function (data) {
    console.log("Meals: ", data);
  });
  // retrieve all the meals
  $.get("/api/Meal", function (data) {
    console.log("Meals: ", data);
  });
}); //End of ready function
// if the meal is breakfast, the morning wight is unnecessary
$("#mealTitle").change(function () {
  // console.log(this.form);
  let meal = $("#mealTitle").find(":selected").val();
  $("#weight").attr("hidden", true);

  if (meal == "breakfast") {
    $("#weight").removeAttr("hidden");
  }
});

// $("#savebtn").click(function (event) {
//   event.preventDefault();
//   console.log(event);
// })
$("form").submit(function (event) {
  event.preventDefault();
  
  console.log($("#date").text());

  let radioValue = $("input[name='howLong']:checked").val();
  console.log(radioValue);

  let formData = {
    date: $("#date").text(),
    weight: $("#weight").val(),
    title: $("#mealTitle").val(),
    food: $("#foodeaten").val(),
    time: $("#time").val(),

    bloating: $("#bloat:checked").val() ? true:false,
    headache: $("#head:checked").val()? true:false,
    gas: $("#gas:checked").val()? true:false,
    itchiness: $("#itchiness:checked").val()? true:false,
    reflux: $("#reflux:checked").val()? true:false,
    redness: $("#redness:checked").val()? true:false,
    noseRunning: $("#noseRunning:checked").val()? true:false,
    howLong: radioValue,
    other: $("#other").val(),
  };
  console.log(formData);


  $.post("/api/Meal",formData)
  .then(function(data) {
    console.log(data);
  });
});
