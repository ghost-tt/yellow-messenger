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
$(document).ready(function(event){
    disableFutureDates();
    setCountryCode();
});

function disableFutureDates() {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#field_DOB').attr('max', maxDate);
    $('#field_DOA').attr('max', maxDate);
}

function setCountryCode() {
    $('#inlineFormCustomSelect').change(function() {
    $('select option')[0].value= $('select option:selected').val();
    $('select option')[0].innerHTML= '+' + $('select option:selected').val();
    $("select").val($('select option:selected').val());
    $("select option").css({"background-color":"","color":""});
    });
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
 
function checkSpcialChar(evt){
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if(!((evt.charCode >= 65) && (evt.charCode <= 90) || (evt.charCode >= 97) 
    && (evt.charCode <= 122)|| (evt.charCode >= 48) && (evt.charCode <= 57) || (evt.charCode == 32))){
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
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
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


function numberValidation(input) {
    var regex =  /^([^0-9]*)$/;
    var firstNameValid = regex.test(input);
    if (!firstNameValid) {
        return true;
    } else {
       return false;
    }
} 

function onlyNumberValidate(input) {
    var regex =  /^[0-9]*$/;
    var firstNameValid = regex.test(input);
    if (firstNameValid) {
        return true;
    } else {
       return false;
    }
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

    var specFirstName = specialcharacterValidation(field_firstName);
    var  specMiddleName = specialcharacterValidation(field_middleName);
    var specLastName = specialcharacterValidation(field_lastName);
    var numFirstName = numberValidation(field_firstName);
    var numMiddleName = numberValidation(field_middleName)
    var numLastName = numberValidation(field_lastName);
    var numMobile = onlyNumberValidate(field_mobileNum);


    if (field_firstName.length === 0) {
        $("#err_field_firstName").text('Field is empty');
        $("#err_field_firstName").show();
    } else if(specFirstName == true ){
        $("#err_field_firstName").text('Special character is not allowed');
        $("#err_field_firstName").show();
    } else if(numFirstName) {
        $("#err_field_firstName").text('Number not allowed');
        $("#err_field_firstName").show();
    } else {
        $("#err_field_firstName").text('');
        $("#err_field_firstName").hide();
    }

    if (field_middleName.length === 0) {
        $("#err_field_middleName").text('Field is empty');
        $("#err_field_middleName").show();
    } else if(specMiddleName) {
        $("#err_field_middleName").text('Special character is not allowed');
        $("#err_field_middleName").show();
    } else if(numMiddleName) {
        $("#err_field_middleName").text('Number not allowed');
        $("#err_field_middleName").show();
    }  else {
        $("#err_field_middleName").text('');
        $("#err_field_middleName").hide();
    }

    if (field_injury.length === 0) {
        $("#err_field_injury").text('Field is empty');
        $("#err_field_injury").show();
    } else {
        $("#err_field_injury").text('');
        $("#err_field_injury").hide();
    }
    
    if (field_lastName.length === 0) {
        $("#err_field_lastName").text('Field is empty');
        $("#err_field_lastName").show();
    } else if (specLastName){
        $("#err_field_lastName").text('Special character is not allowed');
        $("#err_field_lastName").show();
    } else if (numLastName) {
        $("#err_field_lastName").text('Number not allowed');
        $("#err_field_lastName").show();
    } else {
        $("#err_field_lastName").text('');
        $("#err_field_lastName").hide();
    }
  
    if (field_DOB.length === 0) {
        $("#err_field_DOB").text('Field is empty');
        $("#err_field_DOB").show();
    } else {
        $("#err_field_DOB").text('');
        $("#err_field_DOB").hide();
    }

    if (field_mobileNum.length === 0) {
        $("#err_field_mobileNum").text('Field is empty');
        $("#err_field_mobileNum").show();
    } else if (!numMobile){
        $("#err_field_mobileNum").text('Only number is allowed!');
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
    } else {
        $("#err_field_homeAddress").text('');
        $("#err_field_homeAddress").hide();
    }

    if (field_DOA.length === 0) {
        $("#err_field_DOA").text('Field is empty');
        $("#err_field_DOA").show();
    } else {
        $("#err_field_DOA").text('');
        $("#err_field_DOA").hide();
    }

    if (field_TOA.length === 0) {
        $("#err_field_TOA").text('Field is empty');
        $("#err_field_TOA").show();
    } else {
        $("#err_field_TOA").text('');
        $("#err_field_TOA").hide();
    }

    if (field_POA.length === 0) {
        $("#err_field_POA").text('Field is empty');
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

    if (field_firstName.length !== 0 && field_middleName.length !== 0 && field_injury.length !== 0 && field_lastName.length !== 0 && field_DOB.length !== 0 && field_mobileNum.length !== 0 && field_emailAddress.length !== 0 && field_homeAddress.length !== 0 && field_DOA.length !== 0 && field_TOA.length !== 0 && field_POA.length !== 0 && $('#invalidCheck_basic').is(':checked') && validateEmail(field_emailAddress) && (specFirstName == false)  && (specMiddleName == false)  && (specLastName == false) && (numFirstName == false)  && (numMiddleName == false) && (numLastName == false) && (numMobile == true) ) {
        
        let pConsentCheck1 = !$('#privacy_consent_1').is(':checked')
        let pConsentCheck2 = !$('#privacy_consent_2').is(':checked');

         if((pConsentCheck1) && (pConsentCheck2) ){
            $("#err_privacy_consent1").text('Please select both the fields first');
            $("#err_privacy_consent1").show();
            $("#err_privacy_consent2").text('Please select both the fields first');
            $("#err_privacy_consent2").show();
            $('#privacy_consent_1')[0].scrollIntoView(true);
        }
        else if (pConsentCheck1) {
            $("#err_privacy_consent1").text('Please select both the fields first');
            $("#err_privacy_consent1").show();
            $('#privacy_consent_1')[0].scrollIntoView(true);
        } else if (pConsentCheck2) {
            $("#err_privacy_consent2").text('Please select both the fields first');
            $("#err_privacy_consent2").show();
            $('#privacy_consent_1')[0].scrollIntoView(true);
        } else {
            const data = {
                field_firstName,
                field_middleName,
                field_injury,
                field_lastName,
                field_lastName_Suffix,
                field_DOB,
                country_code: $("select#inlineFormCustomSelect option").filter(":selected").val(),
                field_mobileNum,
                field_emailAddress,
                field_homeAddress,
                field_DOA,
                field_TOA,
                field_POA,
                basic_checkbox: $('#invalidCheck_basic').is(':checked'),
                privacy_checkbox: $('#invalidCheck_privacy').is(':checked')
            }

            $('#form_wrapper').hide();
            $('#stepper_intro').hide();
            $('#accidental_data_privacy').hide();
            $("#step1").addClass("done");
            $("#step2").addClass("active");
            $("#step2>div").addClass("active");
            $('#requirements').show();
            $('#requirements')[0].scrollIntoView(true);

            console.log('Data -> ', data)
        }
    }
}

function removeErr(event) {
    $(`#err_${event.target.id}`).text('');
    $(`#err_${event.target.id}`).hide();
}

file1.onchange = function (e) {
    $('#file_Upload_Tick_1').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        /* case 'tif': */
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_1').show();
                return
            }
            $('#warning_parent').show();
            $('#file_Upload_Tick_1').hide();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');
            break;
        default:
            $('#warning_parent').show();
            $('#file_Upload_Tick_1').hide();
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            this.value = '';
    }
};

file2.onchange = function (e) {
    $('#file_Upload_Tick_2').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        /* case 'tif': */
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_2').show();
                return
            }
            $('#warning_parent').show();
            $('#file_Upload_Tick_2').hide();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');

            break;
        default:
            $('#warning_parent').show();
            $('#file_Upload_Tick_2').hide();
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

            this.value = '';
    }
};

file3.onchange = function (e) {
    $('#file_Upload_Tick_3').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        /* case 'tif': */
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_3').show();
                return
            }
            $('#warning_parent').show();
            $('#file_Upload_Tick_3').hide();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');

            break;
        default:
            $('#warning_parent').show();
            $('#file_Upload_Tick_3').hide();
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

            this.value = '';
    }
};

file4.onchange = function (e) {
    $('#file_Upload_Tick_4').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        /* case 'tif': */
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_4').show();
                return
            }
            $('#warning_parent').show();
            $('#file_Upload_Tick_4').hide();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');

            break;
        default:
            $('#warning_parent').show();
            $('#file_Upload_Tick_4').hide();
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

            this.value = '';
    }
};

file5.onchange = function (e) {
    $('#file_Upload_Tick_5').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        /* case 'tif': */
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_5').show();
                return
            }
            $('#warning_parent').show();
            $('#file_Upload_Tick_5').hide();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');
            break;
        default:
            $('#warning_parent').show();
            $('#file_Upload_Tick_5').hide();
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            this.value = '';
    }
};

file6.onchange = function (e) {
    $('#proof_BAO_Tick_1').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        /* case 'tif': */
            if (this.files[0].size < 2097152) {
                $('#upload_feedback_label').hide();
                $('#proof_BAO_Tick_1').show();
                return
            }
            $('#proof_BAO_Tick_1').hide();
            $('#upload_feedback_label').show();
            $('#upload_feedback_label').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');
            break;
        default:
            $('#proof_BAO_Tick_1').hide();
            $('#upload_feedback_label').text('You may only upload documents that are in .jpg, .pdf, or formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            $('#upload_feedback_label').show();
            this.value = '';
    }
};

file7.onchange = function (e) {
    $('#proof_addBAO_Tick_1').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
            if (this.files[0].size < 2097152) {
                $('#upload_feedback_label1').hide();
                $('#proof_addBAO_Tick_1').show();
                return
            }
            $('#proof_addBAO_Tick_1').hide();
            $('#upload_feedback_label1').show();
            $('#upload_feedback_label1').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');
            break;
        default:
            $('#proof_addBAO_Tick_1').hide();
            $('#upload_feedback_label1').text('You may only upload documents that are in .jpg, .pdf, or formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            $('#upload_feedback_label1').show();
            this.value = '';
    }
};



function buttonSubmitClicked(event) {
    event.preventDefault();
    if (!file1.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Front)');
        return;
    }

    if (!file2.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Back)');
        return;
    }

    if (!file3.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Attending Physician’s Statement (APS)!');
        return;
    }

    if (!file4.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Police or Narration Report!');
        return;
    }

    if (!file5.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Official Receipts (ORs)!');
        return;
    }

/* 
    if (!$('#upload_invalidCheck_2').is(':checked')) {
        $("#upload_warning").text('Please don’t forget to tick the box is certify the accuracy of the documents submitted');
        $("#warning_parent").show();
        return;
    } */

    const upload_data = {
        upload_file_1: file1.value,
        upload_file_2: file2.value,
        upload_file_3: file3.value,
        upload_file_4: file4.value,
        upload_file_5: file5.value,
        aia_Philam_Life_Checkbox: $('#upload_invalidCheck_1').is(':checked'),
       /*  insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked') */
    }

    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
    $("#step2").addClass("done");
    $('#requirements').hide();
    $('#payment').show();
    $('#payment')[0].scrollIntoView(true);

    console.log('upload data --> ', upload_data);
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
    var specCharBRANCH = specialcharacterValidation(field_Branch);
    var numBranch = numberValidation(field_Branch);


    if (field_AccountName.length === 0) {
        $("#err_field_AccountName").text('Field is empty');
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
    } else if((!numAccountNumber) || (specAccountNumber)) {
        $("#err_field_AccountNumber").text('Only number is allowed');
        $("#err_field_AccountNumber").show();
    } else {
        $("#err_field_AccountNumber").text('');
        $("#err_field_AccountNumber").hide();
    }

    if (field_Bank.length <= 0) {
        $("#err_field_Bank").text('Field is empty');
        $("#err_field_Bank").show();
    }  else {
        $("#err_field_Bank").text('');
        $("#err_field_Bank").hide();
    }

    if (field_Branch.length === 0) {
        $("#err_field_Branch").text('Field is empty');
        $("#err_field_Branch").show();
    } else if(specCharBRANCH) {
        $("#err_field_Branch").text('special character is not allowed');
        $("#err_field_Branch").show();
    } else if(numBranch) {
        $("#err_field_Branch").text('Number not allowed');
        $("#err_field_Branch").show();
    } else {
        $("#err_field_Branch").text('');
        $("#err_field_Branch").hide();
    }

    if (field_currency <= 0){
        $("#err_field_Currency").text('Field is empty');
        $("#err_field_Currency").show();
    } else {
        $("#err_field_Currency").text('');
        $("#err_field_Currency").show();
    }

    if (!file6.value) {
        $('#upload_feedback_label').show();
        $('#upload_feedback_label').text('Please upload your Bank Account Ownership');
    }

    if (field_AccountName.length !== 0 && field_AccountNumber.length !== 0 && field_Bank.length !== 0 && field_Branch.length !== 0 && file6.length !== 0 && (speCharAccountName == false) && (numAccountName == false) &&(numAccountNumber == true) && (specCharBRANCH == false) && (numBranch == false)) {
        const data = {
            field_AccountName,
            field_AccountNumber,
            field_Bank,
            field_Branch,
            field_Currency: $("select#from_currency option").filter(":selected").val(),
            upload_file_6: file6.value
        }
        $("#step3").addClass("active");
        $("#step3>div").addClass("active");
        $("#step3").addClass("done");
        $('#account_details').hide();
        $('#process_confirmation').show();
        console.log('Data -> ', data)
    }
}



function bankTranfer() {
    $('#payment').hide();
    $('#account_details').show();
    $("#step3").addClass("active");
    $("#step3>div").addClass("active");
}

function pickUp() {
    $('#payment').hide();
    $('#process_confirmation').show();
    $("#step3").addClass("active");
    $("#step3>div").addClass("active");
    $("#step3").addClass("done");
}

function addBank(event) {
     event.preventDefault();
     $('#account_details').hide();
     $('#requirements').hide();
     $('#account_details1').show();
     $('#account_details1')[0].scrollIntoView(true);
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
    var specCharAddBRANCH = specialcharacterValidation(field_Branch1);
    var numAddBranch = numberValidation(field_Branch1);

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
    } else if(!numAddAccountNumber) {
        $("#err_field_AccountNumber1").text('Only number is allowed');
        $("#err_field_AccountNumber1").show();
    }  else {
        $("#err_field_AccountNumber1").text('');
        $("#err_field_AccountNumber1").hide();
    }

    if (field_currency1 <= 0){
        $("#err_field_Currency1").text('Field is empty');
        $("#err_field_Currency1").show();
    } else {
        $("#err_field_Currency1").text('');
        $("#err_field_Currency1").show();
    }

    if (field_Bank1.length <= 0) {
        $("#err_field_Bank1").text('Field is empty');
        $("#err_field_Bank1").show();
    }  else {
        $("#err_field_Bank1").text('');
        $("#err_field_Bank1").hide();
    }

    if (field_Branch1.length === 0) {
        $("#err_field_Branch1").text('Field is empty');
        $("#err_field_Branch1").show();
    } else if(specCharAddBRANCH) {
        $("#err_field_Branch1").text('special character is not allowed');
        $("#err_field_Branch1").show();
    } else if(numAddBranch) {
        $("#err_field_Branch1").text('Number not allowed');
        $("#err_field_Branch1").show();
    } else {
        $("#err_field_Branch1").text('');
        $("#err_field_Branch1").hide();
    }

    if (!file7.value) {
        $('#upload_feedback_label1').show();
        $('#upload_feedback_label1').text('Please upload your Bank Account Ownership');
    }

    if (field_AccountName1.length !== 0 && field_AccountNumber1.length !== 0 && field_currency1.length !== 0 && field_Bank1.length !== 0 && field_Branch1.length !== 0 && file7.length !== 0 && (speCharAddAccountName == false) && (numAddAccountName == false) &&(numAddAccountNumber == true) && (specCharAddBRANCH == false) && (numAddBranch == false)) {
        const data = {
            field_AccountName1,
            field_AccountNumber1,
            field_Bank1,
            field_Branch1,
            field_Currency1: $("select#from_currency1 option").filter(":selected").val(),
            upload_file_6: file7.value
        }
        $("#step3").addClass("active");
        $("#step3>div").addClass("active");
        $("#step3").addClass("done");
        $('#account_details1').hide();
        $('#process_confirmation').show();
        console.log('Data -> ', data)
    }
}
