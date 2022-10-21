$(document).ready(function () {
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
    let time = `<span class="navbar-text">` + output + `</span>`
    console.log(time);
});
