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

  displayDate();

  
    

  
});
