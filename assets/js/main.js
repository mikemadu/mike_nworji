$(document).ready(function () {
  $("#applicationForm").on("submit", function (e) {
    e.preventDefault(); // stop normal form submission

    let form = document.getElementById("applicationForm");
    let formData = new FormData(form); // IMPORTANT (supports file upload)

    let firstName = $("input[name='firstName']").val();

    // Disable button while submitting
    $("#submitBtn").prop("disabled", true).text("Submitting...");

    // Show loading message
    $("#responseMessage").html(
      "<p style='color:blue;'>Submitting your application...</p>",
    );

    $.ajax({
      url: "api/application.php",
      type: "POST",
      data: formData,

      processData: false, // REQUIRED for FormData
      contentType: false, // REQUIRED for FormData

      success: function (response) {
        // Clean response
        response = response.trim();

        if (response === "success") {
          $("#responseMessage").html(
            `<p style="color:green; font-weight:bold;">
              Thank you, ${firstName}! Your application was submitted successfully.
            </p>`,
          );

          // Redirect after 3 seconds
          setTimeout(function () {
            window.location.href = "index.html"; // your landing page
          }, 3000);
        } else {
          $("#responseMessage").html(
            `<p style="color:red; font-weight:bold;">
              Application failed. Please try again.
            </p>`,
          );

          $("#submitBtn").prop("disabled", false).text("Submit Application");
        }
      },

      error: function () {
        $("#responseMessage").html(
          `<p style="color:red; font-weight:bold;">
            Something went wrong. Please try again.
          </p>`,
        );

        $("#submitBtn").prop("disabled", false).text("Submit Application");
      },
    });
  });
});
