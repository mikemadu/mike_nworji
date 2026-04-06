

//set the file date on the form to thecurrent date
document.getElementById("file-date").textContent = new Date().toLocaleDateString();
let photo = null;


//==== SUBMIT FORM =================================
const myform = document.getElementById("applicationForm");

myform.addEventListener("submit", function (e) {
  e.preventDefault(); // stop normal form submission

 let firstName = $("input[name='firstName']").val();
 let lastName = $("input[name='lastName']").val();
  const name =  firstName.toUpperCase() + " " + lastName.toUpperCase(); //will use this later

  const formData = new FormData(myform);
  // Disable button while submitting
  //$("#submitBtn").prop("disabled", true).text("Submitting...");

  document.getElementById("responseMessage").textContent = "Submitting your application...";
  //Our api command
  const command = 'create-application';
  //add an http header
  myHeaders = {
    'api-command': command
  };

  fetch(myform.action, { method: myform.method, body: formData, headers: myHeaders }).then(response => {
    console.log(response);
    const data = response.json();
    console.log(data);
   // const data = JSON.parse(response); // Parse JSON response to an object
   
    if (data.success) {
      //if the application was submitted successfully then an ID of the record will be returned in the response's result property
      //We need this ID to modify the record, to write back the photo information
      const id = data.result;
      //upload the photo
      doPhotoUpload(id).then(() => { //do photo upload if possible and wait for it to complete
        //photo upload was done. Successfull or not we continue and round up...
        document.getElementById("responseMessage").textContent = "";
        document.getElementById("success-dialog").showModal();//show modal dialog
        document.getElementById("success-message").textContent = name + ", your application was submitted successfully!";
        setTimeout(() => { //delay for 5 seconds
          document.getElementById("success-dialog").close();//remove modal dialog
          // window.location.href = "index.php"; // back to the landing page
        }, 5000);
      });
    } else { //application submission failed
      // Handle error response
      document.getElementById("responseMessage").textContent = data.message;
      $("#submitBtn").prop("disabled", false).text("Submit");
    }
  });
})


$(document).ready(function () {


  // $("#applicationForm").on("submit", function (e) {
  //   e.preventDefault(); // stop normal form submission



  //   // $.post($(this).attr('action'), $(this).serialize(), function (response) {
  //   //   const data = JSON.parse(response); // Parse JSON response to an object
  //   //   if (data.success) {
  //   //     //if the application was submitted successfully then an ID of the record will be returned in the response's result property
  //   //     //We need this ID to modify the record, to write back the photo information
  //   //     const id = data.result;
  //   //     //upload the photo
  //   //     doPhotoUpload(id).then(() => { //do photo upload if possible and wait for it to complete
  //   //       //photo upload was done. Successfull or not we continue and round up...

  //   //       document.getElementById("responseMessage").textContent = "";
  //   //       document.getElementById("success-dialog").showModal();//show modal dialog
  //   //       document.getElementById("success-message").textContent = name + ", your application was submitted successfully!";
  //   //       setTimeout(() => { //delay for 5 seconds
  //   //         document.getElementById("success-dialog").close();//remove modal dialog
  //   //        // window.location.href = "index.php"; // back to the landing page
  //   //       }, 5000);
  //   //     });         
  //   //   } else { //application submission failed
  //   //     // Handle error response
  //   //     document.getElementById("responseMessage").textContent = data.message;
  //   //     $("#submitBtn").prop("disabled", false).text("Submit");
  //   //   }
  //   // });
  // });


  // ==== PHOTO ======================================
  // The following code selects a photo but does not upload it.
  //It is just shown in a preview area on the form
  const photoSelector = document.getElementById('photo-picker'); //photo selector
  const imgPreview = document.getElementById('img-preview'); //this is hidden by default


  photoSelector.addEventListener('change', (event) => {
    photo = event.target.files[0]; // Get the selected photo when the input is clicked
    if (photo) {
      imgPreview.src = URL.createObjectURL(photo); // Create a temporary URL
      imgPreview.style.display = 'block'; // show the preview image element
    }
  });
  //==== end of photo selector =================================

  clearPhoto = () => {
    URL.revokeObjectURL(imgPreview.src)
    imgPreview.style.display = 'none'; // hide the preview image element
  }



});

//==== Upload the photo ============================== 
/**
 * Our photo upload function.
The strategy is to upload the photo to the server first and then update the record in the database with the photo's filename
We save the photo to a folder on the server.
 * @param {*} recordID 
 * @param {*} photo 
 * @returns A promise of boolean type
 */
function doPhotoUpload(recordID, photo) {
  return new Promise((resolve) => { // we use a promise because the upload may take a while to complete
    if (!photo) resolve(false); // if no photo was selected then do nothing and return immediately
    const formData = new FormData();
    //command to upload the photo
    const command = 'upload-photo'; //this will be read on the server to route to the appropriate function
    //add an http header
    myHeaders = {
      'Content-Type': 'multipart/form-data',
      'api-command': command
    };
    formData.append('photofile', photo); //the bytes that make up the photo
    formData.append('id', recordID); // id of the application in the database
    formData.append('tablename', 'application'); //table name where we will save the photo filename only
    formData.append('fieldname', 'photo'); //name of the field in the table where we will save the filename

    fetch('api/photo_service.php', { method: 'POST', headers: myHeaders, body: formData }).then(response => {
      if (response.ok) {
        clearPhoto();
        console.log('Photo uploaded successfully');
        resolve(true); //this is the return value of this promise
      } else {
        console.error('Error uploading photo');
        resolve(false); //we return false if not successful
      }
    }).catch(error => {
      console.error('Error uploading photo:', error);
      resolve(false); //or on any error
    });
  });
}
// end of photo upload =================================


