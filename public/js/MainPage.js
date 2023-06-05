function goToLogin() {
    window.location.href = "/login";
}

function goToSignUp() {
    window.location.href = "/signup";
}

function main() {
    console.log("simple");
}

function logout() { 
    alert("You have been logged out!");
}

// function loginTest(){
//     $('#logintest').modal('show');
    
// }

// $(document).ready(function(){ 
//     $("#buttontest1").click(function () {
//         loginTest();
//     });
//     $("#buttontest2").click(function () {
//         loginTest();
//     });
//     $("#buttontest3").click(function () {
//         loginTest();
//     });
// })

function goToTicketBooking(TicketType) {
    sessionStorage.setItem("buttonWW", TicketType);
    var item = sessionStorage.getItem("buttonWW");
    window.location.href = "/ticketbooking";
}

//  document.getElementById("button").innerHTML = goToPage();