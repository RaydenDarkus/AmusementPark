function validate() {
        var usernName = document.getElementById("UserN").value;
        alert("Hi " + usernName);
}

// var DB = {};
// function processLogin() {
//     userData = DB[$('#UserN').val()];
//     console.log(userData);
//     userData = DB[$('#UserN').val()];
//     if (!userData) {
//         $('#userid').modal('show');
//         return;
//     }
//     if (userData["password"] !== $('#Password').val()) {
//         $('#pass').modal('show');
//         return;
//     }
//     //alert("Hi Welcome " + userData["name"]);
//     document.getElementById("display").innerHTML = "Hi "+userData["name"];
//     $('#bookingtick').modal('show');
// }
// function ticketview() {
//     window.location.href = "/ticketview";
// }
// $(document).ready(function () {
//     $("#submitLogin").click(function () {
//         processLogin();
//     });
//     // "C:\Users\sweth\OneDrive\Desktop\632project\nodejs\ProjectTest\JavaScript\Checkpoint-2\booking.json"
//     $.getJSON("./json/logins.json", function (data) {
//         DB = data;
//         console.log(data)
//     });
//     // $.post("http://127.0.0.1:5500/login.htmllogins.json", JSON.stringify({
//     //       username: "samu",
//     //       password: "ramu"
//     //     }), function(data, textStatus) {
//     //   //data contains the JSON object
//     //   //textStatus contains the status: success, error, etc
//     //   console.log(textStatus);
//     //   console.log(data);
//     // }, "json");
// });