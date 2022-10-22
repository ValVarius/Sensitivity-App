$(document).ready(function () {
  // display the date
  let displayDate = () => {
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let output =
      d.getFullYear() +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      (day < 10 ? "0" : "") +
      day;
    let time =
      `<span class="navbar-text" style="margin-right: 25px; color: black";>` +
      output +
      `</span>`;

    $(".navbar").append(time);
  };

  displayDate();
});

// if the meal is breakfast, the morning wight is unnecessary
$("#mealTitle").change(function () {

  console.log(this.form);
  let meal = $("#mealTitle").find(":selected").val();
  $("#weight").attr("hidden", true);

  if (meal == "breakfast") {
    $("#weight").removeAttr("hidden");
  }
});
