$(document).ready(function () {
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let d = new Date();

  setDate(d);
  setYears(5); // set the next five years in dropdown

  $("#select-month").change(function () {
    var monthIndex = $("#select-month").val();
    setDays(monthIndex);
  });

  function setDate(date) {
    setDays(date.getMonth());
    $("#select-day").val(date.getDate());
    $("#select-month").val(date.getMonth());
    $("#select-year").val(date.getFullYear());
  }

  // make sure the number of days correspond with the selected month
  function setDays(monthIndex) {
    var optionCount = $("#select-day option").length,
      daysCount = daysInMonth[monthIndex];

    if (optionCount < daysCount) {
      for (var i = optionCount; i < daysCount; i++) {
        $("#select-day").append(
          $("<option></option>")
            .attr("value", i + 1)
            .text(i + 1)
        );
      }
    } else {
      for (var i = daysCount; i < optionCount; i++) {
        var optionItem = "#select-day option[value=" + (i + 1) + "]";
        $(optionItem).remove();
      }
    }
  }

  function setYears(val) {
    var year = d.getFullYear();
    for (var i = 0; i < val; i++) {
      $("#select-year").append(
        $("<option></option>")
          .attr("value", year - i)
          .text(year - i)
      );
    }
  }

  let month = d.getMonth() + 1;
  let day = d.getDate();
  let year = d.getFullYear();
  var today = month + "|" + day + "|" + year;

  // retrieve all the meals with today's date
  let retrieveMeals = (date) => {
    let url = "/api/getMeals/" + date;
    console.log(date);
    $.get(url, function (data) {
      console.log("Meals: ", data);

      // display all the meals
      data.forEach((element) => {
        let effects = "";
        if (element.gas) {
          effects += "Gas ";
        }
        if (element.headache) {
          effects += "Headache ";
        }
        if (element.itchiness) {
          effects += "Itchiness ";
        }
        if (element.noseRunning) {
          effects += "Running Nose ";
        }
        if (element.redness) {
          effects += "Redness/Flushing ";
        }
        if (element.reflux) {
          effects += "Reflux ";
        }
        if (element.bloating) {
          effects += "Bloating ";
        }

        if (element.title == "breakfast") {
          $("#brakfastInfo").html(
            "Morning Weight: " +
              element.weight +
              " lb" +
              "<br/>Time of the Meal: " +
              element.time +
              "<br/> " +
              element.food +
              (effects ? "<br/> Effects: " + effects : "Effects: None") +
              (element.howLong ? "<br/>They occurred: " + element.howLong : "")
          );
        } else if (element.title == "mid-morning") {
          $("#mid-morningInfo").html(
            "<br/>Time of the Meal: " +
              element.time +
              "<br/> " +
              element.food +
              (effects ? "<br/> Effects: " + effects : "Effects: None") +
              (element.howLong ? "<br/>They occurred: " + element.howLong : "")
          );
        } else if (element.title == "lunch") {
          $("#LunchInfo").html(
            "<br/>Time of the Meal: " +
              element.time +
              "<br/> " +
              element.food +
              (effects ? "<br/> Effects: " + effects : "Effects: None") +
              (element.howLong ? "<br/>They occurred: " + element.howLong : "")
          );
        } else if (element.title == "afternoon") {
          $("#mid-afternoonInfo").html(
            "<br/>Time of the Meal: " +
              element.time +
              "<br/> " +
              element.food +
              (effects ? "<br/> Effects: " + effects : "Effects: None") +
              (element.howLong ? "<br/>They occurred: " + element.howLong : "")
          );
        } else if (element.title == "dinner") {
          $("#dinnerInfo").html(
            "<br/>Time of the Meal: " +
              element.time +
              "<br/> " +
              element.food +
              (effects ? "<br/> Effects: " + effects : "Effects: None") +
              (element.howLong ? "<br/>They occurred: " + element.howLong : "")
          );
        }
      });



      // FORM SUBMIT
  $("form").submit(function (event) {
    event.preventDefault();
    console.log("Meals2: ", event);
    // console.log($("#date").text());

    data.forEach((element) => {
      console.log(element.title + " vs " + $("#mealTitle").val());
      if (element.title == $("#mealTitle").val()) {
        console.log("happening");
        $.ajax({
          method: "DELETE",
          url: "/api/delete/" + element.id,
        });
      }
    });

    console.log("This is the after");
    let radioValue = $("input[name='howLong']:checked").val();
    console.log(radioValue);

    let formData = {
      // CORRECT THIS TO REFLECT THE DATE BEING DISPLAYED
      date:
        parseInt($("#select-month").val()) +
        1 +
        "|"+
        $("#select-day").val() +
        "|"+
        $("#select-year").val(),
      weight: $("#weight").val(),
      title: $("#mealTitle").val(),
      food: $("#foodeaten").val(),
      time: $("#time").val(),

      bloating: $("#bloat:checked").val() ? true : false,
      headache: $("#head:checked").val() ? true : false,
      gas: $("#gas:checked").val() ? true : false,
      itchiness: $("#itchiness:checked").val() ? true : false,
      reflux: $("#reflux:checked").val() ? true : false,
      redness: $("#redness:checked").val() ? true : false,
      noseRunning: $("#noseRunning:checked").val() ? true : false,
      howLong: radioValue,
      other: $("#other").val(),
    };
    console.log(formData);

    $.post("/api/Meal", formData).then(function (data) {
      window.location.reload();
      console.log(data);
    });
  });
  // END OF FORM SUBMIT
    });
  };
  retrieveMeals(today);

  

  // let url = "/api/getMeals/" + date;
  // $.get(url, function (data) {
  //   console.log("Meals: ", data);

  //   // display all the meals
  //   data.forEach((element) => {
  //     let effects = "";
  //     if (element.gas) {
  //       effects += "Gas ";
  //     }
  //     if (element.headache) {
  //       effects += "Headache ";
  //     }
  //     if (element.itchiness) {
  //       effects += "Itchiness ";
  //     }
  //     if (element.noseRunning) {
  //       effects += "Running Nose ";
  //     }
  //     if (element.redness) {
  //       effects += "Redness/Flushing ";
  //     }
  //     if (element.reflux) {
  //       effects += "Reflux ";
  //     }
  //     if (element.bloating) {
  //       effects += "Bloating ";
  //     }

  //     if (element.title == "breakfast") {
  //       $("#brakfastInfo").html(
  //         "Morning Weight: " +
  //           element.weight +
  //           " lb" +
  //           "<br/>Time of the Meal: " +
  //           element.time +
  //           "<br/> " +
  //           element.food +
  //           (effects ? "<br/> Effects: " + effects : "Effects: None") +
  //           (element.howLong ? "<br/>They occurred: " + element.howLong : "")
  //       );
  //     } else if (element.title == "mid-morning") {
  //       $("#mid-morningInfo").html(
  //         "<br/>Time of the Meal: " +
  //           element.time +
  //           "<br/> " +
  //           element.food +
  //           (effects ? "<br/> Effects: " + effects : "Effects: None") +
  //           (element.howLong ? "<br/>They occurred: " + element.howLong : "")
  //       );
  //     } else if (element.title == "lunch") {
  //       $("#LunchInfo").html(
  //         "<br/>Time of the Meal: " +
  //           element.time +
  //           "<br/> " +
  //           element.food +
  //           (effects ? "<br/> Effects: " + effects : "Effects: None") +
  //           (element.howLong ? "<br/>They occurred: " + element.howLong : "")
  //       );
  //     } else if (element.title == "afternoon") {
  //       $("#mid-afternoonInfo").html(
  //         "<br/>Time of the Meal: " +
  //           element.time +
  //           "<br/> " +
  //           element.food +
  //           (effects ? "<br/> Effects: " + effects : "Effects: None") +
  //           (element.howLong ? "<br/>They occurred: " + element.howLong : "")
  //       );
  //     } else if (element.title == "dinner") {
  //       $("#dinnerInfo").html(
  //         "<br/>Time of the Meal: " +
  //           element.time +
  //           "<br/> " +
  //           element.food +
  //           (effects ? "<br/> Effects: " + effects : "Effects: None") +
  //           (element.howLong ? "<br/>They occurred: " + element.howLong : "")
  //       );
  //     }
  //   });

  //   // FORM SUBMIT
  //   $("form").submit(function (event) {
  //     event.preventDefault();
  //     console.log("Meals2: ", data);
  //     // console.log($("#date").text());

  //     data.forEach((element) => {
  //       console.log(element.title + " vs " + $("#mealTitle").val());
  //       if (element.title == $("#mealTitle").val()) {
  //         console.log("happening");
  //         $.ajax({
  //           method: "DELETE",
  //           url: "/api/delete/" + element.id,
  //         });
  //       }
  //     });

  //     console.log("This is the after");
  //     let radioValue = $("input[name='howLong']:checked").val();
  //     console.log(radioValue);

  //     let formData = {
  //       // CORRECT THIS TO REFLECT THE DATE BEING DISPLAYED
  //       date: $("#date").text(),
  //       weight: $("#weight").val(),
  //       title: $("#mealTitle").val(),
  //       food: $("#foodeaten").val(),
  //       time: $("#time").val(),

  //       bloating: $("#bloat:checked").val() ? true : false,
  //       headache: $("#head:checked").val() ? true : false,
  //       gas: $("#gas:checked").val() ? true : false,
  //       itchiness: $("#itchiness:checked").val() ? true : false,
  //       reflux: $("#reflux:checked").val() ? true : false,
  //       redness: $("#redness:checked").val() ? true : false,
  //       noseRunning: $("#noseRunning:checked").val() ? true : false,
  //       howLong: radioValue,
  //       other: $("#other").val(),
  //     };
  //     console.log(formData);

  //     $.post("/api/Meal", formData).then(function (data) {
  //       window.location.reload();
  //       console.log(data);
  //     });
  //   });
  //   // END OF FORM SUBMIT
  // });

  // retrieve all the meals
  // $.get("/api/Meal", function (data) {
  //   console.log("Meals: ", data);
  // });
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
