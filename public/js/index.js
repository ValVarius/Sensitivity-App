$(document).ready(function () {
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

  //   let handleClick = () => {
  //     console.log(this);
  //   }
  handleClick = function (event) {
    event.preventDefault();

    // console.log($(this)[0].id);
   
    if(event.target.id = "breakfast")

    // console.log(event.target.form[0].value);
    // console.log(event.target.form[2].value);
    console.log(event.target);
    

    // console.log(formData);

    let title = $(this)[0].id;
    let food = event.target.form[0].value;
    let time = event.target.form[0].value;;
    let bloating;
    let headache;
    let gas;
    let itchiness;
    let reflux;
    let reedness;
    let noseRunning;
    let howLong;
    let other;
  };
  saveMeal = function () {};

  const button = $(".btn");
  displayDate();

  // button.submit(handleClick(event));
//   button.click(handleClick);
  // button.on( "submit", handleClick )
  // button.submit(function( event ) {
  //     alert( "Handler for .submit() called." );
  //     event.preventDefault();
  //   });
});
