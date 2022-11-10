$(document).ready(function () {
  let db;
  // create a new db request for a "meals" database.
  const request = indexedDB.open("meals", 1);

  request.onupgradeneeded = function (event) {
    // create object store called "pending" and set autoIncrement to true
    const pending = request.result.createObjectStore("pending", {
      autoIncrement: true,
    });
  };
  request.onsuccess = function (event) {
    db = event.target.result;
    if (navigator.onLine) {
      checkDatabase();
      console.log("YOU ARE ONLINE!");
    }
  };
  request.onerror = function (event) {
    // log error here
    console.log(event.target.error);
  };
  var saveRecord = (record) => {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
    // access your pending object store
    const pendingStore = transaction.objectStore("pending");
    // add record to your store with add method.
    pendingStore.add(record);
    console.log("added record");
  };

  var checkDatabase = () => {
    // open a transaction on your pending db
    console.log("checking...");
    const transaction = db.transaction(["pending"], "readwrite");
    // access your pending object store
    const pendingStore = transaction.objectStore("pending");
    // get all records from store and set to a variable
    const getAll = pendingStore.getAll();
    getAll.onsuccess = function () {
      if (getAll.result.length > 0) {
        // Store meals route

        console.log(getAll.result);

        // for each result, check if there is a meal with same date and title and delete it,
        // then store the result. On succes delete result.
        for (let i = 0; i < getAll.result.length; i++) {
          $.ajax({
            method: "DELETE",
            url: "/api/deletetitledate",
            data: getAll.result[i],
          })
            .then(function (data) {
              $.post("/api/Meal", getAll.result[i]).then((response) => response.json());
            })
            .then((response) => {
              console.log("Recorded: "+ getAll.result[i]);
            });
        }
        // clear all items in your store
        pendingStore.clear();
      }
    };
  };

  // listen for app coming back online
  // window.addEventListener("online", checkDatabase);

  // console.log(window.innerWidth);
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
    // console.log(date);
    $.get(url, function (data) {
      console.log("Meals: ", data);

      // CLEAR ALL THE FOOD LOG section HERE
      $("#brakfastInfo").html("");
      $("#mid-morningInfo").html("");
      $("#LunchInfo").html("");
      $("#mid-afternoonInfo").html("");
      $("#dinnerInfo").html("");

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
    });
  };
  // end of retrieve meals
  retrieveMeals(today);

  // If search button is clicked retrieveMeals of selected day
  $("#daysearch").click(function () {
    let day =
      parseInt($("#select-month").val()) +
      1 +
      "|" +
      $("#select-day").val() +
      "|" +
      $("#select-year").val();
    retrieveMeals(day);
  });

  // if the meal is breakfast, the morning wight is unnecessary
  $("#mealTitle").change(function () {
    // console.log(this.form);
    let meal = $("#mealTitle").find(":selected").val();
    $("#weight").attr("hidden", true);

    if (meal == "breakfast") {
      $("#weight").removeAttr("hidden");
    }
  });

  $("form").submit(function (event) {
    event.preventDefault();
    console.log(parseInt($("#select-month").val()) + 1);
    let url =
      "/api/getMeals/" +
      (parseInt($("#select-month").val()) + 1) +
      "|" +
      $("#select-day").val() +
      "|" +
      $("#select-year").val();
    console.log(url);

    $.get(url, function (data) {
      formSubmitted(data);
    });
  });

  // FORM SUBMITTED
  function formSubmitted(data) {
    console.log(data);
    data.forEach((element) => {
      if (element.title == $("#mealTitle").val()) {
        console.log("DELETING " + element.id);
        $.ajax({
          method: "DELETE",
          url: "/api/delete/" + element.id,
        });
      }
    });

    console.log("AFTER DELETING");
    let radioValue = $("input[name='howLong']:checked").val();

    let formData = {
      date:
        parseInt($("#select-month").val()) +
        1 +
        "|" +
        $("#select-day").val() +
        "|" +
        $("#select-year").val(),
      weight: $("#weightInput").val(),
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

    $.post("/api/Meal", formData)
      .then(function (data) {
        // is this necessary??????????????????
        $("#foodform").get(0).reset();
        let day =
          parseInt($("#select-month").val()) +
          1 +
          "|" +
          $("#select-day").val() +
          "|" +
          $("#select-year").val();
        retrieveMeals(day);
      })
      .fail(function (xhr, status, error) {
        // store meal in indexedBB
        console.log(formData);
        saveRecord(formData);
      });
  }
  // END OF FORM SUBMITTED

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
});
//End of ready function
