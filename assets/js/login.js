function tryLogin() {
  let un = $("#username").val();
  let pw = $("#password").val();
  if (un.trim() !== "" && pw.trim() != "") {
    // alert("can connect");

    $.ajax({
      url: "ajaxhandler/loginAjax.php",
      type: "POST",
      dataType: "json",
      data: { user_name: un, password: pw, action: "verifyUser" },
      beforeSend: function () {
        //if you want to do something just
        //before making the call
        // alert("about to make an ajax call");
      },
      success: function (rv) {
        //if the ajax call was successfull,
        //result will be in rv
        // alert(JSON.stringify(rv));
        if (rv["status"] == "ALL OK") {
          document.location.replace("dashboard.php");
        } else {
          alert(rv["status"]);
        }
      },
      error: function () {
        //if for some reason the call was unsuccessful
        alert("Oops something went wrong!");
      },
    });
  }
}

$(function (e) {
  //capture the keyup event
  $(document).on("click", "#btnLogin", function (e) {
    tryLogin();
  });
});
