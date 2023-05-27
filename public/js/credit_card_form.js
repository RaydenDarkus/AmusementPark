$(document).ready(function(){
    $("#payment").click(function(){
        validation();
      });    
})

function validation() {
    var cardno = document.getElementById("acc").value;
    var month = document.getElementById("mon").value;
    var year = document.getElementById("year").value;
    var cvv = document.getElementById("cvv").value;
    var leng = cardno.length;
    if (cardno =='') {
      $('#nullcardnovalidation').modal('show');
      return;
    }
    if(leng!=16){
        $('#carddigitvalidation').modal('show');
        return;
    }
    if (cvv == '') {
        $('#cvvvalidation').modal('show');
        return; 
    }
    window.location.href = "/Ticket_Confirmation";
  }