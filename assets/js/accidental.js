/* var stepper2
var stepper3
var stepper4
var stepperForm
var stepperFormEl */

var form = document.getElementById("accidental__form");
var form_Bank = document.getElementById("bank_form");
var listCheckBox = document.querySelector('#upload_invalidCheck_1');
var file1 = document.getElementById('file_Upload_1');
var file2 = document.getElementById('file_Upload_2');
var file3 = document.getElementById('file_Upload_3');
var file4 = document.getElementById('file_Upload_4');
var file5 = document.getElementById('file_Upload_5');
var file6 = document.getElementById('proof_BAO');
var file7 = document.getElementById('proof_addBAO');
var trackBenificiary;
let url = new URL(window.location.href);
let referenceNumber = url.searchParams.get('refNumber');
let uid = url.searchParams.get('sender');
let botId = url.searchParams.get('botId');

var currSeconds = 0; 

$('#privacy_consent_1').prop('checked', true);
$('#privacy_consent_2').prop('checked', true);

var form_addBank = document.getElementById("addbank_form");
form_addBank.addEventListener('submit', handleAddBankInfo);

form.addEventListener('submit', handleForm);
form_Bank.addEventListener('submit', handleAccountInfo);

/* document.addEventListener('DOMContentLoaded', function () {
    stepperFormEl = document.querySelector('#stepperForm')
    stepperForm = new Stepper(stepperFormEl, {
        animation: true
    })
}) */
  function myDisable() {
  document.getElementById("submit9").disabled = true;
  document.getElementById("submit9").style.cursor = "no-drop";
  document.getElementById("field_AccountName"). disabled = true; 
  document.getElementById("field_AccountName").style.cursor = "no-drop";
  document.getElementById("field_AccountNumber").disabled = true;  
  document.getElementById("field_AccountNumber").style.cursor = "no-drop";
  document.getElementById("field_Bank").disabled = true;
  document.getElementById("field_Bank").style.cursor = "no-drop";
  document.getElementById("field_Branch").disabled = true;
  document.getElementById("field_Branch").style.cursor = "no-drop";
  document.getElementById("from_currency").disabled = true;
  document.getElementById("from_currency").style.cursor = "no-drop";
  document.getElementById("proof_BAO").disabled = true;
  document.getElementById("proof_BAO").style.cursor = "no-drop";
  document.getElementById("back_btn1").style.cursor = "no-drop";
  document.getElementById("back_btn1").style.pointerEvents = "none";
  document.getElementById("bank_form").style.cursor = "no-drop";
}

function timer() {
  var random = Math.floor(Math.random() * 5) + 1  
  return new Promise((resolve, reject) => {
    var i=0
    let cleartime = setInterval(() => {
     i = random + i;
     renderProgress(i)
     if(i == 99){
      i = 100;
      renderProgress(i)
     }
     if(i == 100 )  {
   
        console.log("cleartime");
        clearTimeout(cleartime);
        resolve("cleartime")
    }
  //  i++;
   }, 500);
  })
}

function renderProgress(progress) {
  progress = Math.floor(progress);
  if(progress<25){
      var angle = -90 + (progress/100)*360;
      $(".animate-0-25-b").css("transform","rotate("+angle+"deg)");
  }
  else if(progress>=25 && progress<50){
      var angle = -90 + ((progress-25)/100)*360;
      $(".animate-0-25-b").css("transform","rotate(0deg)");
      $(".animate-25-50-b").css("transform","rotate("+angle+"deg)");
  }
  else if(progress>=50 && progress<75){
      var angle = -90 + ((progress-50)/100)*360;
      $(".animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
      $(".animate-50-75-b").css("transform","rotate("+angle+"deg)");
  }
  else if(progress>=75 && progress<=100){
      var angle = -90 + ((progress-75)/100)*360;
      $(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b")
                                          .css("transform","rotate(0deg)");
      $(".animate-75-100-b").css("transform","rotate("+angle+"deg)");
  }
  $(".text").html(progress+"%");
}









let finalPayload = {};
let accidentPayload = {};
let basicInformation = {};
let InsuredInformation = {};
let BeneficiaryList = {};
let PaymentOption = {};
let BankDetails = {};
let FilesInformation = {};
let filesList = [];
let beneficiaryCount = 1;
let filesMap = {};
let claimType, causeOfLoss, govIdFront, govIdBack, apsFile, narrationReport, officialReceipts;
let file1Buffer, file2Buffer, file3Buffer, file4Buffer, file5Buffer, file6Buffer, file7Buffer, file8Buffer;
basicInformation["WebReferenceNumber"] = referenceNumber;
basicInformation["CompanyCode"] = "PAL";
basicInformation["ClaimType"] = "Living";
basicInformation["CauseOfLoss"] = "Accident";

$(document).ready(function (event) {
  disableFutureDates();
  disableFutureDatesDOB();
  setCountryCode();
  let idleInterval = setInterval(timerIncrement, 1000); 
  $(this).mousemove(resetTimer); 
  $(this).keypress(resetTimer); 

});

function resetTimer() { 
  currSeconds = 0; 
} 

function timerIncrement() { 
  currSeconds = currSeconds + 1; 
  if(currSeconds == 1800) {
    window.top.location = 'http://www.philamlife.com'
  }
} 



/* Check Date should not be in future */
function futureDate(date) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var systemdate = dd + "-" + mm + "-" + yyyy;
  if (date.length != 0) {
    if (process(date) > process(systemdate)) {
      return false;
    }
    else {
      return true;
    }
  }
  else {
    return false;
  }
}



function futureDateDOB(date) {
  /*   let id = evt.target.id;*/
  var res = date.split('-');
  var year = res[0];
  var Month = res[1];
  var day = res[2];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  // console.log("Logged-In Date:" + day, Month, year)
  // console.log("System Date:" + dd, mm, yyyy)

  /* This is for safari, not good way to handle */
  if (day.length == 4) {
    if ((day == yyyy) && (Month == mm) && (year == dd)) {
      return false;
    }
    else {
      return true;
    }
  } else {
    if ((year == yyyy) && (Month == mm) && (day == dd)) {
      return false;
    } else {
      return true;
    }
  }
}


function disableFutureDates() {
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();
  var maxDate = year + '-' + month + '-' + day;
  $('#field_DOA').attr('max', maxDate);
}


function disableFutureDatesDOB() {
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var dobdate = day-1
  var year = dtToday.getFullYear();
  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();
  var maxDate = year + '-' + month + '-' + dobdate;
  if( day <= 10) {
      maxDate = year + '-' + month + '-' + '0'+ dobdate;
  } 
  $('#field_DOB').attr('max', maxDate);
}

function setCountryCode() {
  $('#inlineFormCustomSelect').change(function () {
    $('select option')[0].value = $('select option:selected').val();
    $('select option')[0].innerHTML = '+' + $('select option:selected').val();
    $("select").val($('select option:selected').val());
    $("select option").css({ "background-color": "", "color": "" });
  });
}


/**
 * Code refactor for this function
 * instead of sending list of file as input, for final list of files, send the form data with all the files in it
 * Along with that, send the file name that needs to be saved.
 */
const handleImageUpload = (formData, fileName) => {
  // const files = event.target.files
  // const formData = new FormData()
  fetch('https://staging.yellowmessenger.com/components/tataAia/upload', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then(response => {
      console.log(response)
      var decoded = atob(response.data);
      var saveByteArray = function (data, name) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var blob = new Blob(data, { type: "application/pdf" }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
      };
      var byteNumbers = Array(decoded.length);
      for (i = 0; i < decoded.length; i++) {
        byteNumbers[i] = decoded.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      saveByteArray([byteArray], fileName + ".pdf");
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * 
 * New function
 * instead of giving a PDF the as result
 * you will be getting the cdn link to the file in the bot
 */
const handleFileUpload = (formData, fileName) => {
  console.log("file upload new");
  var myHeaders = new Headers();

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };
  fetch(`https://app.yellowmessenger.com/api/chat/upload-file?bot=${botId}&uid=${fileName}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
const getBuffer = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  console.log("reading file")
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  console.log("reading file")
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const checkForVirus = (fileData) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ "data": fileData, "type": "base64" });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };
  return fetch("https://app.yellowmessenger.com/components/virus-scanner/scan", requestOptions);
}

listCheckBox.onchange = function () {
  if ($(listCheckBox).is(':checked')) {
    $('.feedback_label').show();
  } else {
    $('.feedback_label').hide();
  }
}

/* function loader() {
    var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'))
    var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'))
    var inputMailForm = document.getElementById('inputMailForm')
    var inputPasswordForm = document.getElementById('inputPasswordForm')
    var form = stepperFormEl.querySelector('.bs-stepper-content form')

    btnNextList.forEach(function (btn) {
        btn.addEventListener('click', function () {
            stepperForm.next()
        })
    })

    stepperFormEl.addEventListener('show.bs-stepper', function (event) {
        form.classList.remove('was-validated')
        var nextStep = event.detail.indexStep
        var currentStep = nextStep

        if (currentStep > 0) {
            currentStep--
        }

        var stepperPan = stepperPanList[currentStep]

        if ((stepperPan.getAttribute('id') === 'test-form-1' && !inputMailForm.value.length)
            || (stepperPan.getAttribute('id') === 'test-form-2' && !inputPasswordForm.value.length)) {
            event.preventDefault()
            form.classList.add('was-validated')
        }
    })
} */



/* 
function validateEmail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(emailField) == false) {
    $("#err_field_emailAddress").text('Invalid Email');
    $("#err_field_emailAddress").show();
    return false;
  }
  $("#err_field_emailAddress").text('');
  $("#err_field_emailAddress").hide();
  return true;
}
 */
function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    $(`#err_${evt.target.id}`).text('Only numbers allowed!');
    $(`#err_${evt.target.id}`).show();
    return false;
  }
  $(`#err_${evt.target.id}`).text('');
  $(`#err_${evt.target.id}`).hide();
  return true;
}

function checkSpcialChar(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (!((evt.charCode >= 65) && (evt.charCode <= 90) || (evt.charCode >= 97)
    && (evt.charCode <= 122) || (evt.charCode >= 48) && (evt.charCode <= 57) || (evt.charCode == 32) || (evt.charCode == 13))) {
    $(`#err_${evt.target.id}`).text("special character is not allowed");
    $(`#err_${evt.target.id}`).show();
    return false;
  }
  $(`#err_${evt.target.id}`).text("");
  $(`#err_${evt.target.id}`).hide();
  return true;
}

function isNotNumber(evt) {
  $(`#err_${evt.target.id}`).text("");
  $(`#err_${evt.target.id}`).hide();
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) || (evt.charCode == 13)) {
    $(`#err_${evt.target.id}`).text('');
    $(`#err_${evt.target.id}`).hide();
    return true;
  }
  validateNotNumber(evt)
  return false;
}

function validateNotNumber(evt) {
  let id = evt.target.id;
  $(`#err_${id}`).text("Numbers not allowed");
  $(`#err_${id}`).show();
  return;
}
function specialcharacterValidation(input) {
  var regex = /^[A-Za-z0-9 ]+$/
  var firstNameValid = regex.test(input);
  if (!firstNameValid) {
    return true;
  } else {
    return false;
  }
}

function checkLength(evt, max_Length) {
  let id = evt.target.id;
  var val = document.getElementById(id).value;
  var length = val.length;
  if (length >= max_Length) {
    $(`#err_${id}`).text("Maximum " + max_Length + " characters allowed!");
    $(`#err_${id}`).show();
  } else {
    detection(evt);
  }
}

function fieldCheckLength(field, maxLength) {
  var length = field.length;
  if (length > maxLength) {
    return true;
  } else {
    return false;
  }
}

function detection(evt) {
  id = evt.target.id;
  document.getElementById(id).addEventListener('keydown', event => {
    if (event.key == 'Backspace') {
      $(`#err_${id}`).text("");
      $(`#err_${id}`).hide();
    }
  })
}


function check_Mobile_Length(evt, max_Length) {
  let id = evt.target.id;
  var val = document.getElementById(id).value;
  var length = val.length;
  if (length !== max_Length) {
    detection(evt);
  } else {
    $(`#err_${id}`).text("Maximum " + max_Length + " number allowed!");
    $(`#err_${id}`).show();
  }
}

function numberValidation(input) {
  var regex = /^([^0-9]*)$/;
  var firstNameValid = regex.test(input);
  if (!firstNameValid) {
    return true;
  } else {
    return false;
  }
}

function onlyNumberValidate(input) {
  var regex = /^[0-9]*$/;
  var firstNameValid = regex.test(input);
  if (firstNameValid) {
    return true;
  } else {
    return false;
  }
}

function fieldCheckLength(field, maxLength) {
  var length = field.length;
  if (length > maxLength) {
    return true;
  }
  else {
    return false;
  }
}

function checkActualTime(field2_TOA, field3_DOA) {
  var today = new Date();
  var currentYear = today.getFullYear();
  var currentMonth = today.getMonth() + 1;
  var currentDate = today.getDate();
  var CurrentHour = today.getHours();
  var CurrentMinute = today.getMinutes();

  var UserEnterDate = field3_DOA.split("-");
  var userYear = UserEnterDate[0];
  var userMonth = UserEnterDate[1];
  var userDay = UserEnterDate[2];
  var istimeMatched = false;

  var UserTime = field2_TOA.split(":");
  var userEnterHours = UserTime[0];
  var userEnterMinute = UserTime[1];

  if (userDay.length == 4) {
    if (UserTime.length != 0) {
      var minSplit = userEnterMinute.split(" ");
      userEnterMinute = minSplit[0];
      var userAmPm = minSplit[1];
      var isAmPm = userAmPm == "am" ? "am" : "pm";
      if (isAmPm == "pm") {
        userEnterHours = (userEnterHours % 12) + 12;
      } else {
        userEnterHours = userEnterHours % 12;
      }
    }
  }

  if (field2_TOA.length != 0 && field3_DOA.length != 0) {
    /* This is for safari, not good way to handle */
    if (userDay.length == 4) {
      if (
        userDay == currentYear &&
        userMonth == currentMonth &&
        userYear == currentDate
      ) {
        istimeMatched = true;
      } else {
        return true;
      }
    } else {
      if (
        userYear == currentYear &&
        userMonth == currentMonth &&
        userDay == currentDate
      ) {
        istimeMatched = true;
      } else {
        return true;
      }
    }
    if (istimeMatched == true) {
      if (userEnterHours > CurrentHour) {
        return false;
      } else if (userEnterHours < CurrentHour) {
        return true;
      } else if (userEnterHours == CurrentHour) {
        if (userEnterMinute <= CurrentMinute) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}


function process(date) {
  var parts = date.split("-");
  if (parts[2].length == 4)  // it is for safari
  {                   //day     , mm          , yyyy
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  else {                 //yyyy     , mm          , dd
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
}


function compareFun(DOB, DOA) {
  if ((DOB.length != 0) && (DOA.length != 0)) {
    if (process(DOB) <= process(DOA)) {
      return true;
    } else {
      return false;
    }
  }
  else {
    return false;
  }
}


function formatAMPM(date) {
  var time = date;
  var full_Time = time.split(':');
  var hours, minutes;
  hours = full_Time[0];
  minutes = full_Time[1];
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  
  return strTime
}

function handleForm(event) {
  event.preventDefault();
  var field_firstName = $("#field_firstName").val();
  var field_middleName = $("#field_middleName").val();
  var field_injury = $("#field_injury").val();
  var field_lastName = $("#field_lastName").val();
  var field_lastName_Suffix = $("#field_lastName_Suffix").val();
  var field_DOB = $("#field_DOB").val();
  var field_mobileNum = $("#field_mobileNum").val();
  var field_emailAddress = $("#field_emailAddress").val();
  var field_homeAddress = $("#field_homeAddress").val();
  var field_DOA = $("#field_DOA").val();
  var field_TOA = $("#field_TOA").val();
  var field_POA = $("#field_POA").val();
  var full_TOA = formatAMPM(field_TOA);

  var comapareDates = compareFun(field_DOB, field_DOA);

  InsuredInformation["FirstName"] = field_firstName;
  InsuredInformation["MiddleName"] = field_firstName;
  InsuredInformation["LastName"] = field_firstName;
  InsuredInformation["Suffix"] = field_firstName;
  InsuredInformation["DateOfBirth"] = field_firstName;
  InsuredInformation["CountryCode"] = field_firstName;
  InsuredInformation["PhoneNumber"] = field_firstName;
  InsuredInformation["EmailAddress"] = field_firstName;
  InsuredInformation["HomeAddress"] = field_firstName;
  InsuredInformation["InjuryDetails"] = field_firstName;
  InsuredInformation["AccidentDate"] = field_firstName;
  InsuredInformation["AccidentTime"] = field_firstName;
  InsuredInformation["AccidentPlace"] = field_firstName;
  InsuredInformation["FirstName"] = field_firstName;

  var specFirstName = specialcharacterValidation(field_firstName);
  var specMiddleName = specialcharacterValidation(field_middleName);
  var specLastName = specialcharacterValidation(field_lastName);
  var numFirstName = numberValidation(field_firstName);
  var numMiddleName = numberValidation(field_middleName)
  var numLastName = numberValidation(field_lastName);
  var numMobile = onlyNumberValidate(field_mobileNum);
  var specLastNameSuffix = false;
  var numLastNameSuffix = false;
  var lenLastNameSuffix = false;

  if (field_lastName_Suffix != 0) {
    specLastNameSuffix = specialcharacterValidation(field_lastName_Suffix);
    numLastNameSuffix = numberValidation(field_lastName_Suffix);
    lenLastNameSuffix = fieldCheckLength(field_lastName_Suffix, 3);
  }

  var lenFirstName = fieldCheckLength(field_firstName, 25);
  var lenMiddleName = fieldCheckLength(field_middleName, 25);
  var leninjury = fieldCheckLength(field_injury, 500);
  var lenLastName = fieldCheckLength(field_lastName, 25);
  var lenMobileNum = fieldCheckLength(field_mobileNum, 10);
  var lenHomeAddress = fieldCheckLength(field_homeAddress, 250);
  var lenPOA = fieldCheckLength(field_POA, 120);

  if (field_DOB.length !== 0) {
    var futDOB = futureDate(field_DOB);
    var futExistDOB = futureDateDOB(field_DOB);
  }
  var timeCompare = false;
  var futDOA = false;

  if (field_DOA.length != 0) {
    futDOA = futureDate(field_DOA);
    if (field_TOA.length != 0) {
      timeCompare = checkActualTime(field_TOA, field_DOA);
    }
  }

  if (field_firstName.length === 0) {
    $("#err_field_firstName").text('Field is empty');
    $("#err_field_firstName").show();
  } else if (lenFirstName) {
    $("#err_field_firstName").text("Maximum 25 characters allowed!");
    $("#err_field_firstName").show();
  } else if (specFirstName == true) {
    $("#err_field_firstName").text('Special character is not allowed');
    $("#err_field_firstName").show();
  } else if (numFirstName) {
    $("#err_field_firstName").text('Number not allowed');
    $("#err_field_firstName").show();
  } else {
    $("#err_field_firstName").text('');
    $("#err_field_firstName").hide();
  }

  if (field_middleName.length === 0) {
    $("#err_field_middleName").text('Field is empty');
    $("#err_field_middleName").show();
  } else if (lenMiddleName) {
    $("#err_field_middleName").text("Maximum 25 characters allowed!");
    $("#err_field_middleName").show();
  } else if (specMiddleName) {
    $("#err_field_middleName").text('Special character is not allowed');
    $("#err_field_middleName").show();
  } else if (numMiddleName) {
    $("#err_field_middleName").text('Number not allowed');
    $("#err_field_middleName").show();
  } else {
    $("#err_field_middleName").text('');
    $("#err_field_middleName").hide();
  }

  if (field_injury.length === 0) {
    $("#err_field_injury").text('Field is empty');
    $("#err_field_injury").show();
  } else if (leninjury) {
    $("#err_field_injury").text("Maximum 500 characters allowed!");
    $("#err_field_injury").show();
  } else {
    $("#err_field_injury").text('');
    $("#err_field_injury").hide();
  }

  if (field_lastName.length === 0) {
    $("#err_field_lastName").text('Field is empty');
    $("#err_field_lastName").show();
  } else if (lenLastName) {
    $("#err_field_lastName").text("Maximum 25 characters allowed!");
    $("#err_field_lastName").show();
  } else if (specLastName) {
    $("#err_field_lastName").text('Special character is not allowed');
    $("#err_field_lastName").show();
  } else if (numLastName) {
    $("#err_field_lastName").text('Number not allowed');
    $("#err_field_lastName").show();
  } else {
    $("#err_field_lastName").text('');
    $("#err_field_lastName").hide();
  }

  if (field_lastName_Suffix.length === 0) {
    $("#err_field_lastName_Suffix").text('');
    $("#err_field_lastName_Suffix").hide();
  } else if (lenLastNameSuffix) {
    $("#err_field_lastName_Suffix").text('Maximum 3 characters allowed');
    $("#err_field_lastName_Suffix").show();
  } else if (specLastNameSuffix) {
    $("#err_field_lastName_Suffix").text('Special character is not allowed');
    $("#err_field_lastName_Suffix").show();
  } else if (numLastNameSuffix) {
    $("#err_field_lastName_Suffix").text('Number not allowed');
    $("#err_field_lastName_Suffix").show();
  } else {
    $("#err_field_lastName_Suffix").text('');
    $("#err_field_lastName_Suffix").hide();
  }

  if (field_DOB.length === 0) {
    $("#err_field_DOB").text('Field is empty');
    $("#err_field_DOB").show();
  } else if (!futDOB) {
    $("#err_field_DOB").text('Future date is  not Accepted!');
    $("#err_field_DOB").show();
  } else if (!futExistDOB) {
    $("#err_field_DOB").text('Current date is  not Applicable!');
    $("#err_field_DOB").show();
  } else if (!comapareDates) {
    $("#err_field_DOB").text('Insured DOB can not be greater than accident date');
    $("#err_field_DOB").show();
  } else {
    $("#err_field_DOB").text('');
    $("#err_field_DOB").hide();
  }

  if (field_mobileNum.length === 0) {
    $("#err_field_mobileNum").text('Field is empty');
    $("#err_field_mobileNum").show();
  } else if (lenMobileNum) {
    $("#err_field_mobileNum").text("Maximum 10 characters allowed!");
    $("#err_field_mobileNum").show();
  } else if (!numMobile) {
    $("#err_field_mobileNum").text('Only number is allowed!');
    $("#err_field_mobileNum").show();
  } else if (field_mobileNum.length !== 10) {
    $("#err_field_mobileNum").text('Minimum 10 number allowed!');
    $("#err_field_mobileNum").show();
  } else {
    $("#err_field_mobileNum").text('');
    $("#err_field_mobileNum").hide();
  }

  if (field_emailAddress.length === 0) {
    $("#err_field_emailAddress").text('Field is empty');
    $("#err_field_emailAddress").show();
  } else {
    validateEmail(field_emailAddress);
  }

  if (field_homeAddress.length === 0) {
    $("#err_field_homeAddress").text('Field is empty');
    $("#err_field_homeAddress").show();
  } else if (lenHomeAddress) {
    $("#err_field_homeAddress").text("Maximum 250 characters allowed!");
    $("#err_field_homeAddress").show();
  } else {
    $("#err_field_homeAddress").text('');
    $("#err_field_homeAddress").hide();
  }

  if (field_DOA.length === 0) {
    $("#err_field_DOA").text('Field is empty');
    $("#err_field_DOA").show();
  } else if (!futDOA) {
    $("#err_field_DOA").text('Future date is not accepted');
    $("#err_field_DOA").show();
  } else {
    $("#err_field_DOA").text('');
    $("#err_field_DOA").hide();
  }

  if (field_TOA.length === 0) {
    $("#err_field_TOA").text('Field is empty');
    $("#err_field_TOA").show();
  }
  else if (timeCompare == false) {
    $("#err_field_TOA").text('Time can not be greater than current time');
    $("#err_field_TOA").show();
  } else {
    $("#err_field_TOA").text('');
    $("#err_field_TOA").hide();
  }

  if (field_POA.length === 0) {
    $("#err_field_POA").text('Field is empty');
    $("#err_field_POA").show();
  } else if (lenPOA) {
    $("#err_field_POA").text("Maximum 120 characters allowed!");
    $("#err_field_POA").show();
  } else {
    $("#err_field_POA").text('');
    $("#err_field_POA").hide();
  }

  if (!$('#invalidCheck_basic').is(':checked')) {
    $("#err_invalidCheck_basic").text('Please select the field');
    $("#err_invalidCheck_basic").show();
  } else {
    $("#err_invalidCheck_basic").text('');
    $("#err_invalidCheck_basic").hide();
  }

  if (!$('#invalidCheck_privacy').is(':checked')) {
    $("#err_invalidCheck_privacy").text('Please select the field');
    $("#err_invalidCheck_privacy").show();
  } else {
    $("#err_invalidCheck_privacy").text('');
    $("#err_invalidCheck_privacy").hide();
  }

  if (
    field_firstName.length !== 0 &&
    field_middleName.length !== 0 &&
    field_injury.length !== 0 &&
    field_lastName.length !== 0 &&
    field_DOB.length !== 0 &&
    field_mobileNum.length == 10 &&
    field_emailAddress.length !== 0 &&
    field_homeAddress.length !== 0 &&
    field_DOA.length !== 0 &&
    field_TOA.length !== 0 &&
    field_POA.length !== 0 &&
    $("#invalidCheck_basic").is(":checked") &&
    $("#invalidCheck_privacy").is(":checked") &&
    validateEmail(field_emailAddress) &&
    specFirstName == false &&
    specMiddleName == false &&
    specLastName == false &&
    numFirstName == false &&
    numMiddleName == false &&
    numLastName == false &&
    numMobile == true &&
    specLastNameSuffix == false &&
    numLastNameSuffix == false &&
    (comapareDates == true) &&
    (timeCompare == true) &&
    (futDOA == true) &&
    (futDOB == true) &&
    (futExistDOB == true) &&
    lenLastNameSuffix == false &&
    lenFirstName == false &&
    lenMiddleName == false &&
    leninjury == false &&
    lenMobileNum == false &&
    lenHomeAddress == false &&
    lenPOA == false
  ) {
    const data = {
      field_firstName,
      field_middleName,
      field_injury,
      field_lastName,
      field_lastName_Suffix,
      field_DOB,
      country_code: $("select#inlineFormCustomSelect option")
        .filter(":selected")
        .val(),
      field_mobileNum,
      field_emailAddress,
      field_homeAddress,
      field_DOA,
      full_TOA,
      /* field_TOA, */
      field_POA,
      basic_checkbox: $("#invalidCheck_basic").is(":checked"),
      privacy_checkbox: $("#invalidCheck_privacy").is(":checked"),
    };

    $('#form_wrapper').hide();
    $('#stepper_intro').hide();
    $('#accidental_data_privacy').hide();
    $("#step1").addClass("done");
    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
    $('#requirements').show();
    /*  $('#requirements')[0].scrollIntoView(true); */
      $("#customer_Name").text(`Hi ${field_firstName}, Hang in there as we are now processing your request. Kindly expect an SMS update from us within 1 to 2 working days on the status of your request.`);
    console.log('Data -> ', data)

    InsuredInformation["FirstName"] = field_firstName;
    InsuredInformation["MiddleName"] = field_middleName;
    InsuredInformation["LastName"] = field_lastName;
    InsuredInformation["Suffix"] = field_lastName_Suffix;
    InsuredInformation["DateOfBirth"] = field_DOB.split('-')[1]+'/'+field_DOB.split('-')[2]+'/'+field_DOB.split('-')[0];
    InsuredInformation["CountryCode"] = $("select#inlineFormCustomSelect option").filter(":selected").val();
    InsuredInformation["PhoneNumber"] = field_mobileNum;
    InsuredInformation["EmailAddress"] = field_emailAddress;
    InsuredInformation["HomeAddress"] = field_homeAddress;
    InsuredInformation["InjuryDetails"] = field_injury;
    InsuredInformation["AccidentDate"] =  field_DOA.split('-')[1]+'/'+field_DOA.split('-')[2]+'/'+field_DOA.split('-')[0];
    InsuredInformation["AccidentTime"] = field_TOA;
    InsuredInformation["AccidentPlace"] = field_POA;

    let stageOneData = {
      stageOne: true,
      type: "Accident",
      referenceNumber: referenceNumber,
      data: InsuredInformation
    }
    window.parent.postMessage(JSON.stringify({
      event_code: 'ym-client-event', data: JSON.stringify({
        event: {
          code: "personalinfo",
          data: JSON.stringify(stageOneData)
        }
      })
    }), '*');
  } else {
    $('#popUp').modal('show');
  }
}

function removeErr(event) {
  $(`#err_${event.target.id}`).text('');
  $(`#err_${event.target.id}`).hide();
}

const proceedScan = async (fileObj, button, pageid) => {
  console.log(button);
  console.log("code is here");
  $(`#file_loader_icon_${button}`).show();

  let baseData = await toBase64(fileObj);
  const regex = /data:application\/pdf;base64,/gi;
  let newBaseData = baseData.replace(regex, "");
  checkForVirus(newBaseData)
    .then((response) => response.text())
    .then((result) => {
      let parsedJson = JSON.parse(result);
      console.log(parsedJson);
      if (parsedJson.hasVirus) {
        console.log("Netering");

        if (pageid == 1) {
          $("#warning_parent").show();
          $("#upload_warning").text(
            "Warning : We detected a virus/malware in your uploaded documents. Please re-upload a clean, virus-free document to proceed."
          );
        }
        if (pageid == 2) {
          $("#warning_parent_acct").show();
          $("#upload_warning_acct").text(
            "Warning : We detected a virus/malware in your uploaded documents. Please re-upload a clean, virus-free document to proceed."
          );
        }

        $(`#file_loader_icon_${button}`).hide();
        $(`#file_Upload_Tick_${button}`).hide();
        $(`#file_upload_cancle_${button}`).show();
        return;
      } else {
        $("#warning_parent").hide();
        $("#warning_parent_acct").hide();
        $(`#file_loader_icon_${button}`).hide();
        $(`#file_Upload_Tick_${button}`).show();
        $(`#file_upload_cancle_${button}`).hide();
        return;
      }
    })
    .catch((error) => {
      console.log("error", error);
      if (pageid == 1) {
        $("#warning_parent").show();
      }
      if (pageid == 2) {
        $("#warning_parent_acct").show();
      }
      $(`#file_loader_icon_${button}`).hide();
      $(`#file_Upload_Tick_${button}`).hide();
      $(`#file_upload_cancle_${button}`).show();
      $("#upload_warning").text(
        "Looks like the file you are trying to upload is Virus infected. Please upload a virus free document."
      );
      return;
    });
};

const fileCheck = (file, button, pageid) => {
  console.log(button);
  var _URL = window.URL || window.webkitURL;
  console.log("FILE OBJECT -> ", file);
  var img = new Image();
  console.log("Before on load --> ");
  img.onload = function () {
    console.log("inside image load --> ");
    console.log(this.width + " " + this.height);
    if (this.width < 400 && this.height < 400) {
      if (pageid == 1) {
        $(`#warning_parent`).show();
        $("#upload_warning").text("We noticed that your uploaded documents are unclear and unreadable.Please re-upload a clearer copy of your document to proceed.");
      }
      if (pageid == 2) {
        $("#warning_parent_acct").show();
        $("#upload_warning_acct").text("We noticed that your uploaded documents are unclear and unreadable.Please re-upload a clearer copy of your document to proceed.");
      }

      $(`#file_loader_icon_${button}`).hide();
      $(`#file_Upload_Tick_${button}`).hide();
      $(`#file_upload_cancle_${button}`).show();
      $("#upload_warning").text("We noticed that your uploaded documents are unclear and unreadable.Please re-upload a clearer copy of your document to proceed.");
      console.log("Image is bad");
    } else {
      console.log("This is right JPG");
      proceedScan(file, button);
    }
  };
  img.onerror = function () {
    console.log("inside image error");
    alert("not a valid file: " + file.type);
  };
  img.src = _URL.createObjectURL(file);
};

const isFileSizeValid = (file) => {
  if (file.size < 2097152) {
    return true;
  }
  return false;
};

file1.onchange = async function (e) {
  docType = "LIDC001";
  tranType = "CIF";
  $("#file_upload_cancle_1").hide();
  $("#file_Upload_Tick_1").hide();
  console.log("Starting");
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0];
      var buttonNum = 1;
      var pageID = 1
      var sizevalid = isFileSizeValid(file, buttonNum);
      if (sizevalid) {
        if (ext == "jpg") {
          fileCheck(file, buttonNum, pageID);
        }
        else {
          proceedScan(file, buttonNum, pageID);
        }
        let fileName = referenceNumber + "_" + docType + "_" + tranType;

        console.log("setting file data : ");
        let accident = {};
        // accident['LIDC001Front'] = {
          accident['BeneficiaryNo'] = beneficiaryCount,
          accident["Filename"] = `${fileName}.pdf`,
          accident["DocType"]= "PDF",
          accident["DocTypeCode"]= "LIDC001",
          accident["DocumentDescription"]= "Front copy of doc"
        // }

        filesList.push(accident);
        const formData = new FormData()
        formData.append('file', file, fileName + `.${ext}`);
        handleFileUpload(formData, fileName);

      } else {
        $("#warning_parent").show();
        $("#file_loader_icon_1").hide();
        $("#file_Upload_Tick_1").hide();
        $("#file_upload_cancle_1").show();
        $("#upload_warning").text(
          "You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed."
        );
      }
      break;
    default:
      $("#warning_parent").show();
      $("#file_Upload_Tick_1").hide();
      $("#file_upload_cancle_1").show();
      $("#upload_warning").text(
        "You may only upload documents that are in .jpg, .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed."
      );
      this.value = "";
  }
};

file2.onchange = async function (e) {
  docType = "LIDC001";
  tranType = "CIB";
  $("#file_upload_cancle_2").hide();
  $("#file_Upload_Tick_2").hide();
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0];
      var buttonNum = 2;
      var pageId = 1;
      var sizevalid = isFileSizeValid(file, buttonNum);
      if (sizevalid) {
        if (ext == "jpg") {
          fileCheck(file, buttonNum, pageId);
        }
        else {
          proceedScan(file, buttonNum, pageId);
        }

        let fileName = referenceNumber + "_" + docType + "_" + tranType;

        let accident = {};
        accident['BeneficiaryNo'] = beneficiaryCount,
        accident["Filename"] = `${fileName}.pdf`,
        accident["DocType"]= "PDF",
        accident["DocTypeCode"]= "LIDC001",
        accident["DocumentDescription"]= "Back copy of doc"

        filesList.push(accident);
        const formData = new FormData()
        formData.append('file', file, fileName + `.${ext}`)
        handleFileUpload(formData, fileName);
      } else {
        $("#warning_parent").show();
        $("#file_loader_icon_2").hide();
        $("#file_Upload_Tick_2").hide();
        $("#file_upload_cancle_2").show();
        $("#upload_warning").text(
          "You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed."
        );
      }
      break;
    default:
      $("#warning_parent").show();
      $("#file_Upload_Tick_2").hide();
      $("#file_upload_cancle_2").show();
      $("#upload_warning").text(
        "You may only upload documents that are in .jpg, .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed."
      );
      this.value = "";
  }
};

file3.onchange = async function (e) {
  docType = "LIDC034";
  tranType = "APSF";
  $("#file_upload_cancle_3").hide();
  $("#file_Upload_Tick_3").hide();
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0];
      var buttonNum = 3;
      var pageId = 1;
      var sizevalid = isFileSizeValid(file, buttonNum);
      if (sizevalid) {
        if (ext == "jpg") {
          fileCheck(file, buttonNum, pageId);
        }
        else {
          proceedScan(file, buttonNum, pageId);
        }
        let fileName = referenceNumber + "_" + docType + "_" + tranType;

        let accident = {};

        accident['BeneficiaryNo'] = beneficiaryCount,
        accident["Filename"] = `${fileName}.pdf`,
        accident["DocType"]= "PDF",
        accident["DocTypeCode"]= docType,
        accident["DocumentDescription"]= "Attending Physician’s Statement"

        filesList.push(accident);
        const formData = new FormData()
        formData.append('file', file, fileName + `.${ext}`)
        handleFileUpload(formData, fileName);
      } else {
        $("#warning_parent").show();
        $("#file_loader_icon_3").hide();
        $("#file_Upload_Tick_3").hide();
        $("#file_upload_cancle_3").show();
        $("#upload_warning").text(
          "You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed."
        );
      }
      break;
    default:
      $("#warning_parent").show();
      $("#file_Upload_Tick_3").hide();
      $("#file_upload_cancle_3").show();
      $("#upload_warning").text(
        "You may only upload documents that are in .jpg, .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed."
      );
      this.value = "";
  }
};

file4.onchange = async function (e) {
  docType = "LIDC036";
  tranType = "PIR";
  $("#file_upload_cancle_4").hide();
  $("#file_Upload_Tick_4").hide();
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0];
      var buttonNum = 4;
      var pageId = 1;
      var sizevalid = isFileSizeValid(file, buttonNum);
      if (sizevalid) {
        if (ext == "jpg") {
          fileCheck(file, buttonNum, pageId);
        }
        else {
          proceedScan(file, buttonNum, pageId);
        }

        let fileName = referenceNumber + "_" + docType + "_" + tranType;

        let accident = {};

        accident['BeneficiaryNo'] = beneficiaryCount,
        accident["Filename"] = `${fileName}.pdf`,
        accident["DocType"]= "PDF",
        accident["DocTypeCode"]= docType,
        accident["DocumentDescription"]= "Police or Narration Report"

        filesList.push(accident);
        const formData = new FormData()
        formData.append('file', file, fileName + `.${ext}`)
        handleFileUpload(formData, fileName);
      } else {
        $("#warning_parent").show();
        $("#file_loader_icon_4").hide();
        $("#file_Upload_Tick_4").hide();
        $("#file_upload_cancle_4").show();
        $("#upload_warning").text(
          "You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed."
        );
      }
      break;
    default:
      $("#warning_parent").show();
      $("#file_Upload_Tick_4").hide();
      $("#file_upload_cancle_4").show();
      $("#upload_warning").text(
        "You may only upload documents that are in .jpg, .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed."
      );
      this.value = "";
  }
};

file5.onchange = async function (e) {
  docType = "LIDC035";
  tranType = "MR";
  $("#file_upload_cancle_5").hide();
  $("#file_Upload_Tick_5").hide();
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0];
      var buttonNum = 5;
      var pageId = 1;
      var sizevalid = isFileSizeValid(file, buttonNum);
      if (sizevalid) {
        if (ext == "jpg") {
          fileCheck(file, buttonNum, pageId);
        }
        else {
          proceedScan(file, buttonNum, pageId);
        }

        let fileName = referenceNumber + "_" + docType + "_" + tranType;

        let accident = {};

        accident['BeneficiaryNo'] = beneficiaryCount,
        accident["Filename"] = `${fileName}.pdf`,
        accident["DocType"]= "PDF",
        accident["DocTypeCode"]= docType,
        accident["DocumentDescription"]= "Police or Narration Report"

        filesList.push(accident);

        const formData = new FormData()
        formData.append('file', file, fileName + `.${ext}`)
        handleFileUpload(formData, fileName);
      } else {
        $("#warning_parent").show();
        $("#file_loader_icon_5").hide();
        $("#file_Upload_Tick_5").hide();
        $("#file_upload_cancle_5").show();
        $("#upload_warning").text(
          "You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed."
        );
      }
      break;
    default:
      $("#warning_parent").show();
      $("#file_Upload_Tick_5").hide();
      $("#file_upload_cancle_5").show();
      $("#upload_warning").text(
        "You may only upload documents that are in .jpg, .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed."
      );
      this.value = "";
  }
};

file6.onchange = async function (e) {
  $("#file_upload_cancle_6").hide();
  $("#file_Upload_Tick_6").hide();
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0];
      var buttonNum = 6;
      var pageId = 2
      var sizevalid = isFileSizeValid(file, buttonNum);
      if (sizevalid) {
        if (ext == "jpg") {
          fileCheck(file, buttonNum, pageId);
        }
        else {
          proceedScan(file, buttonNum, pageId);
        }
        file1Buffer = await getBuffer(file);
        console.log("file buffer : ")
        console.log(file1Buffer);
        filesMap["file6"] = file1Buffer;
      } else {
        $("#warning_parent_acct").show();
        $("#file_loader_icon_6").hide();
        $("#file_Upload_Tick_6").hide();
        $("#file_upload_cancle_6").show();
        $("#upload_warning_acct").text(
          "You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed."
        );
      }
      break;
    default:
      $("#warning_parent_acct").show();
      $("#file_Upload_Tick_6").hide();
      $("#file_upload_cancle_6").show();
      $("#upload_warning_acct").text(
        "You may only upload documents that are in .jpg, .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed."
      );
      this.value = "";
  }
};

file7.onchange = async function (e) {
  $("#file_upload_cancle_7").hide();
  $("#file_Upload_Tick_7").hide();
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0];
      var buttonNum = 7;
      var sizevalid = isFileSizeValid(file, buttonNum);
      if (sizevalid) {
        if (ext == "jpg") {
          fileCheck(file, buttonNum);
        }
        else {
          proceedScan(file, buttonNum);
        }
        file1Buffer = await getBuffer(file);
        console.log("file buffer : ")
        console.log(file1Buffer);
        filesMap["file7"] = file1Buffer;
      } else {
        $("#warning_parent").show();
        $("#file_loader_icon_7").hide();
        $("#file_Upload_Tick_7").hide();
        $("#file_upload_cancle_7").show();
        $("#upload_warning").text(
          "You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed."
        );
      }
      break;
    default:
      $("#warning_parent").show();
      $("#file_Upload_Tick_7").hide();
      $("#file_upload_cancle_7").show();
      $("#upload_warning").text(
        "You may only upload documents that are in .jpg, .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed."
      );
      this.value = "";
  }
};



function buttonSubmitClicked(event) {
  event.preventDefault();
  // console.log(!$('#file_Upload_Tick_1').is(":hidden"));
  // console.log(!$('#file_Upload_Tick_2').is(":hidden"));
  // console.log(!$('#file_Upload_Tick_3').is(":hidden"));
  // console.log(!$('#file_Upload_Tick_4').is(":hidden"));
  // console.log(!$('#file_Upload_Tick_5').is(":hidden"));

  if (!file1.value || ($('#file_Upload_Tick_1').is(":hidden"))) {
    $('#warning_parent').show();
    $('#upload_warning').text('Please upload your Valid Government ID (Front)');
    $('#popUp').modal('show');
    return;
  }

  if (!file2.value || ($('#file_Upload_Tick_2').is(":hidden"))) {
    $('#warning_parent').show();
    $('#upload_warning').text('Please upload your Valid Government ID (Back)');
    $('#popUp').modal('show');
    return;
  }

  if (!file3.value || ($('#file_Upload_Tick_3').is(":hidden"))) {
    $('#warning_parent').show();
    $('#upload_warning').text('Please upload your Attending Physician’s Statement (APS)!');
    $('#popUp').modal('show');
    return;
  }

  if (!file4.value || ($('#file_Upload_Tick_4').is(":hidden"))) {
    $('#warning_parent').show();
    $('#upload_warning').text('Please upload your Police or Narration Report!');
    $('#popUp').modal('show');
    return;
  }

  if (!file5.value || ($('#file_Upload_Tick_5').is(":hidden"))) {
    $('#warning_parent').show();
    $('#upload_warning').text('Please upload your Official Receipts (ORs)!');
    $('#popUp').modal('show');
    return;
  }

  if (!$('#upload_invalidCheck_2').is(':checked')) {
    $("#upload_warning").text('Please don’t forget to tick the box is certify the accuracy of the documents submitted');
    $("#warning_parent").show();
    $('#popUp').modal('show');
    return;
  }

  const upload_data = {
    upload_file_1: file1.value,
    upload_file_2: file2.value,
    upload_file_3: file3.value,
    upload_file_4: file4.value,
    upload_file_5: file5.value,
    aia_Philam_Life_Checkbox: $('#upload_invalidCheck_1').is(':checked'),
    insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked')
  }

  $("#step2").addClass("active");
  $("#step2>div").addClass("active");
  /* $("#step2").addClass("done"); */
  $('#requirements').hide();
  $('#payment').show();
  /*   $('#payment')[0].scrollIntoView(true); */

  console.log('upload data --> ', upload_data);
  let stageTwoData = {
    stageTwo: true,
    referenceNumber: referenceNumber
  }
  window.parent.postMessage(JSON.stringify({
    event_code: 'ym-client-event', data: JSON.stringify({
      event: {
        code: "fileuploads",
        data: JSON.stringify(stageTwoData)
      }
    })
  }), '*');
}



function handleAccountInfo(event) {
  event.preventDefault();
  var field_AccountName = $("#field_AccountName").val();
  var field_AccountNumber = $("#field_AccountNumber").val();
  var field_Bank = $("#field_Bank").val();
  var field_currency = $("from_currency").val();
  var field_Branch = $("#field_Branch").val();
  var speCharAccountName = specialcharacterValidation(field_AccountName);
  var numAccountName = numberValidation(field_AccountName);
  var specAccountNumber = specialcharacterValidation(field_AccountNumber);
  var numAccountNumber = onlyNumberValidate(field_AccountNumber);

  var lenAccountName = fieldCheckLength(field_AccountName, 90);
  var lenAccountNumber = fieldCheckLength(field_AccountNumber, 20);
  var lenBranch = fieldCheckLength(field_Branch, 50);

  if (field_AccountName.length === 0) {
    $("#err_field_AccountName").text('Field is empty');
    $("#err_field_AccountName").show();
  } else if (lenAccountName) {
    $("#err_field_AccountName").text("Maximum 90 characters allowed!");
    $("#err_field_AccountName").show();
  } else if (speCharAccountName) {
    $("#err_field_AccountName").text('special character is not allowed');
    $("#err_field_AccountName").show();
  } else if (numAccountName) {
    $("#err_field_AccountName").text('Number not allowed');
    $("#err_field_AccountName").show();
  } else {
    $("#err_field_AccountName").text('');
    $("#err_field_AccountName").hide();
  }

  if (field_AccountNumber.length === 0) {
    $("#err_field_AccountNumber").text('Field is empty');
    $("#err_field_AccountNumber").show();
  } else if (lenAccountNumber) {
    $("#err_field_AccountNumber").text("Maximum 20 characters allowed!");
    $("#err_field_AccountNumber").show();
  } else if (!numAccountNumber || specAccountNumber) {
    $("#err_field_AccountNumber").text("Only number is allowed");
    $("#err_field_AccountNumber").show();
  } else {
    $("#err_field_AccountNumber").text('');
    $("#err_field_AccountNumber").hide();
  }

  if (field_Bank.length <= 0) {
    $("#err_field_Bank").text('Field is empty');
    $("#err_field_Bank").show();
  } else {
    $("#err_field_Bank").text('');
    $("#err_field_Bank").hide();
  }

  if (field_Branch.length === 0) {
    $("#err_field_Branch").text('Field is empty');
    $("#err_field_Branch").show();
  } else if (lenBranch) {
    $("#err_field_Branch").text("Maximum 50 characters allowed!");
    $("#err_field_Branch").show();
  } else {
    $("#err_field_Branch").text("");
    $("#err_field_Branch").hide();
  }

  if (field_currency <= 0) {
    $("#err_field_Currency").text('Field is empty');
    $("#err_field_Currency").show();
  } else {
    $("#err_field_Currency").text('');
    $("#err_field_Currency").show();
  }

  if (!file6.value) {
    $('#upload_feedback_label').show();
    $('#upload_feedback_label').text('Please upload your Bank Account Ownership');
  }else {
    $('#upload_feedback_label').hide();
    $('#upload_feedback_label').text('');
  }

  if (
    field_AccountName.length !== 0 &&
    field_AccountNumber.length !== 0 &&
    field_Bank.length !== 0 &&
    field_Branch.length !== 0 &&
    file6.length !== 0 &&
    speCharAccountName == false &&
    numAccountName == false &&
    numAccountNumber == true &&
    lenAccountName == false &&
    lenAccountNumber == false &&
    lenBranch == false &&
    file6.value &&
    !$("#file_Upload_Tick_6").is(":hidden")
  ) {
    const data = {
      field_AccountName,
      field_AccountNumber,
      field_Bank,
      field_Branch,
      field_Currency: $("select#from_currency option")
        .filter(":selected")
        .val(),
      upload_file_6: file6.value,
    };

    BankDetails["BeneficiaryNo"] = 1;
    BankDetails["BankName"] = field_Bank;
    BankDetails["BankBranch"] = field_Branch;
    BankDetails["AccountName"] = field_AccountName;
    BankDetails["AccountNumber"] = field_AccountNumber;
    BankDetails["AccountCurrency"] = $("select#from_currency option").filter(":selected").val();

    let BankDetailsList = [];
    BankDetailsList.push(BankDetails);

    let filesObject = {};
    filesObject["FolderName"] = `/D:/CLAIMS/${referenceNumber}`
    filesObject["FileList"] = filesList;

    InsuredInformation["PayoutOption"] = "CTA";
    // filesMap["Accident"] = accident
    finalPayload["BasicInformation"] = basicInformation;
    finalPayload["InsuredInformation"] = InsuredInformation;
    finalPayload["BankDetailsList"] = BankDetailsList;
    finalPayload["FilesInformation"] = filesObject;

    console.log("FPB : ")
    console.log(finalPayload)
    window.parent.postMessage(JSON.stringify({
      event_code: 'ym-client-event', data: JSON.stringify({
        event: {
          code: "finalEvent",
          data: JSON.stringify(finalPayload)
        }
      })
    }), '*');
    myDisable()
    timer().then( async () => { 
    $("#step2").addClass("done");
   /*  $("#step3").addClass("active");
    $("#step3>div").addClass("active"); */
    /* $("#step3").addClass("done"); */
    $("#step3_circle").addClass("md-step-step3-circle ");
    $("#step3_span").addClass("md-step3-span");
    $("#step3_reference").addClass("md-step3-span")
    $("#account_details").hide();
    $("#process_confirmation").show();
    console.log("Data -> ", data);
    });
  } else {
    $("#popUp").modal("show");
  }
}



function bankTranfer() {
  $('#payment').hide();
  $('#account_details').show();
  $("#step2").addClass("active");
  $("#step2>div").addClass("active");
}

function pickUp() {
  let filesObject = {};
  filesObject["FolderName"] = `/D:/CLAIMS/${referenceNumber}`
  filesObject["FileList"] = filesList;
  let BankDetailsList = [];
  BankDetailsList.push(BankDetails);

  // filesMap["Accident"] = accident
  InsuredInformation["PayoutOption"] = "PUA";
  finalPayload["BasicInformation"] = basicInformation;
  finalPayload["InsuredInformation"] = InsuredInformation;
  finalPayload["BankDetailsList"] = BankDetailsList;
  finalPayload["FilesInformation"] = filesObject;
  // finalPayload["stageThree"] = true;
  // finalPayload["referenceNumber"] = referenceNumber;

  console.log("pick up payload : ")
  console.log(finalPayload)
  window.parent.postMessage(JSON.stringify({
    event_code: 'ym-client-event', data: JSON.stringify({
      event: {
        code: "finalEvent",
        data: JSON.stringify(finalPayload)
      }
    })
  }), '*');
  $('#payment').hide();
  /* $('#process_confirmation').show(); */
  $("#pickUp").show();
  $("#step2").addClass("active");
  $("#step2>div").addClass("active");
  $("#step2").addClass("done");
}

function pickup_Bpi() {
  $("#pickUp").hide();
  $('#process_confirmation').show();
  $("#step2").addClass("done");
  $("#step3_circle").addClass("md-step-step3-circle ");
  $("#step3_span").addClass("md-step3-span");
  $("#step3_reference").addClass("md-step3-span")
 /*  $("#step3").addClass("active");
  $("#step3>div").addClass("active"); */
 /*  $("#step3").addClass("done"); */
}

function addBank(event) {
  event.preventDefault();
  $('#account_details').hide();
  $('#requirements').hide();
  $('#account_details1').show();
  /*   $('#account_details1')[0].scrollIntoView(true); */
}

function handleAddBankInfo(event) {
  event.preventDefault();
  var field_AccountName1 = $("#field_AccountName1").val();
  var field_AccountNumber1 = $("#field_AccountNumber1").val();
  var field_currency1 = $("#from_currency1").val();
  var field_Bank1 = $("#field_Bank1").val();
  var field_Branch1 = $("#field_Branch1").val();
  var speCharAddAccountName = specialcharacterValidation(field_AccountName1);
  var numAddAccountName = numberValidation(field_AccountName1);
  var numAddAccountNumber = onlyNumberValidate(field_AccountNumber1);


  if (field_AccountName1.length === 0) {
    $("#err_field_AccountName1").text('Field is empty');
    $("#err_field_AccountName1").show();
  } else if (speCharAddAccountName) {
    $("#err_field_AccountName1").text('special character is not allowed');
    $("#err_field_AccountName1").show();
  } else if (numAddAccountName) {
    $("#err_field_AccountName1").text('Number not allowed');
    $("#err_field_AccountName1").show();
  } else {
    $("#err_field_AccountName1").text('');
    $("#err_field_AccountName1").hide();
  }

  if (field_AccountNumber1.length === 0) {
    $("#err_field_AccountNumber1").text('Field is empty');
    $("#err_field_AccountNumber1").show();
  } else if (!numAddAccountNumber) {
    $("#err_field_AccountNumber1").text('Only number is allowed');
    $("#err_field_AccountNumber1").show();
  } else {
    $("#err_field_AccountNumber1").text('');
    $("#err_field_AccountNumber1").hide();
  }

  if (field_currency1 <= 0) {
    $("#err_field_Currency1").text('Field is empty');
    $("#err_field_Currency1").show();
  } else {
    $("#err_field_Currency1").text('');
    $("#err_field_Currency1").show();
  }

  if (field_Bank1.length <= 0) {
    $("#err_field_Bank1").text('Field is empty');
    $("#err_field_Bank1").show();
  } else {
    $("#err_field_Bank1").text('');
    $("#err_field_Bank1").hide();
  }

  if (field_Branch1.length === 0) {
    $("#err_field_Branch1").text('Field is empty');
    $("#err_field_Branch1").show();
  }/*  else if (specCharAddBRANCH) {
    $("#err_field_Branch1").text('special character is not allowed');
    $("#err_field_Branch1").show();
  } else if (numAddBranch) {
    $("#err_field_Branch1").text('Number not allowed');
    $("#err_field_Branch1").show();
  }  */else {
    $("#err_field_Branch1").text('');
    $("#err_field_Branch1").hide();
  }

  if (!file7.value) {
    $('#upload_feedback_label1').show();
    $('#upload_feedback_label1').text('Please upload your Bank Account Ownership');
  }

  if (field_AccountName1.length !== 0 && field_AccountNumber1.length !== 0 && field_currency1.length !== 0 && field_Bank1.length !== 0 && field_Branch1.length !== 0 && file7.length !== 0 && (speCharAddAccountName == false) && (numAddAccountName == false) && (numAddAccountNumber == true)) {
    const data = {
      field_AccountName1,
      field_AccountNumber1,
      field_Bank1,
      field_Branch1,
      field_Currency1: $("select#from_currency1 option").filter(":selected").val(),
      upload_file_6: file7.value
    }
    $("#step3_circle").addClass("md-step-step3-circle ");
    $("#step3_span").addClass("md-step3-span");
    $("#step3_reference").addClass("md-step3-span")
    /* $("#step3").addClass("active");
    $("#step3>div").addClass("active"); */
    /* $("#step3").addClass("done"); */
    $('#account_details1').hide();
    $('#process_confirmation').show();
    console.log('bank data -> ', data)
  }
}

function openlink() {
  window.open("https://www.google.com/maps/search/bpi+branch+locator/@14.6079731,120.9860096,14z/data=!3m1!4b1");
}



function validateEmail(my_email) {
  var ind0 = my_email.indexOf("@");
  var my_username = my_email.slice(0, ind0);
  var ind = my_email.indexOf("@");
  var my_domain = my_email.substr((ind + 1));
  var ind3 = my_domain.indexOf(".");
  var my_final_domain = my_domain.slice(0, ind3);
  var ind1 = my_domain.indexOf(".");
  var my_extension = my_domain.slice((ind1 + 1), my_domain.length);

  var usernamesize = stringlength(my_username, 2, 30);
  var domainsize = stringlength(my_final_domain, 2, 10);
  var extension = stringlength(my_extension, 2, 3);


  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(my_email) == false) {
    $("#err_field_emailAddress").text('Invalid Email');
    $("#err_field_emailAddress").show();
    return false;
  } else {
    if (!usernamesize) {
      $("#err_field_emailAddress").text('UserName should have minimum 2 and maximum 30 character');
      $("#err_field_emailAddress").show();
      return false;
    } else if (!domainsize) {
      $("#err_field_emailAddress").text('Domain should have minimum 2 and maximum 10 character');
      $("#err_field_emailAddress").show();
      return false;
    } else if (!extension) {
      $("#err_field_emailAddress").text('Extension should have minimum 2 and maximum 3 characters');
      $("#err_field_emailAddress").show();
      return false;
    } else {
      $("#err_field_emailAddress").text('');
      $("#err_field_emailAddress").hide();
      return true;
    }

  }

}


function stringlength(inputtxt, minlength, maxlength) {
  var field = inputtxt;
  var mnlen = minlength;
  var mxlen = maxlength;

  if (field.length < mnlen || field.length > mxlen) {
    return false;
  }
  else {
    return true;
  }
}


function goBack() {
  console.log('go back!!!');
  $("#step2").removeClass("active");
  $("#step2>div").removeClass("active");
  $("#step2").removeClass("done");
  $('#requirements').hide();
  $('#form_wrapper').show();
  /* $('#form_wrapper')[0].scrollIntoView(true); */
}

function goBackPickup(){
  $("#step3").removeClass("done");
    $('#pickUp').hide();
    $('#requirements').show();
}

function goBack1() {
  console.log('go back!!!');
    $("#step3").removeClass("done");
    $('#account_details').hide();
    $('#requirements').show();
  
 
  /* $('#form_wrapper')[0].scrollIntoView(true); */
}