var form = document.getElementById("death__form");
var death__form_addBeneficiary = document.getElementById("death__form_addBeneficiary");
var form_Bank = document.getElementById("bank_form");
var file1 = document.getElementById('file_Upload_1');
var file2 = document.getElementById('file_Upload_2');
var file3 = document.getElementById('file_Upload_3');
var file4 = document.getElementById('file_Upload_4');
var file5 = document.getElementById('file_Upload_5');
var file6 = document.getElementById('file_Upload_6');
var file7 = document.getElementById('file_Upload_7');

$('#privacy_consent_1').prop('checked', true);
$('#privacy_consent_2').prop('checked', true);

$('#privacy_consent_beneficiary_1').prop('checked', true);
$('#privacy_consent_beneficiary_2').prop('checked', true);

form.addEventListener('submit', handleForm);
death__form_addBeneficiary.addEventListener('submit', handleFormAddBeneficiary);
form_Bank.addEventListener('submit', handleAccountInfo);

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
    $('#field_DOID').attr('max', maxDate);
    $('#field_addBeneficiaryDOB').attr('max', maxDate);
    $('#field_BeneficiaryDOB').attr('max', maxDate);
}

function setCountryCode() {
    $('select').change(function() {
        $('select option')[0].value= $('select option:selected').val();
        $('select option')[0].innerHTML= '+' + $('select option:selected').val();
        $("select").val($('select option:selected').val());
        $("select option").css({"background-color":"","color":""});
    });
}

function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
        $("#err_field_BeneficiaryEmailAddress").text('Invalid Email');
        $("#err_field_BeneficiaryEmailAddress").show();
        return false;
    }
    $("#err_field_BeneficiaryEmailAddress").text('');
    $("#err_field_BeneficiaryEmailAddress").hide();
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
        $("#err_field_mobileNum").text('');
        $("#err_field_mobileNum").hide();
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

function handleFormAddBeneficiary(event) {
    event.preventDefault();
    var field_addBeneficiaryFirstName = $("#field_addBeneficiaryFirstName").val();
    var field_addBeneficiaryMiddleName = $("#field_addBeneficiaryMiddleName").val();
    var field_addBeneficiaryLastName = $("#field_addBeneficiaryLastName").val();
    var field_addBeneficiaryMobileNum = $("#field_addBeneficiaryMobileNum").val();
    var field_addBeneficiaryEmailAddress = $("#field_addBeneficiaryEmailAddress").val();
    var field_addBeneficiaryHomeAddress = $("#field_addBeneficiaryHomeAddress").val();
    var field_addBeneficiaryDOB = $("#field_addBeneficiaryDOB").val();
    var field_addBeneficiaryPOB = $("#field_addBeneficiaryPOB").val();
    var field_addBeneficiaryNationality = $("#field_addBeneficiaryNationality").val();
    var field_addBeneficiarySex = $("#field_addBeneficiarySex").val();
    var field_addBeneficiaryRelationToDeceased = $("#field_addBeneficiaryRelationToDeceased").val();
    var speciAddBeniFirstName = specialcharacterValidation(field_addBeneficiaryFirstName);
    var numAddBeniFirstName = numberValidation(field_addBeneficiaryFirstName);
    var numAddBeniMobile = onlyNumberValidate(field_addBeneficiaryMobileNum);
    var speciAddBeniMiddleName = specialcharacterValidation(field_addBeneficiaryMiddleName);
    var numAddBeniMiddleName = numberValidation(field_addBeneficiaryMiddleName);
    var speciAddBeniLastName = specialcharacterValidation(field_addBeneficiaryLastName);
    var numAddBeniLastName = numberValidation(field_addBeneficiaryLastName);


    
    if (field_addBeneficiaryFirstName.length === 0) {
        $("#err_field_addBeneficiaryFirstName").text('Field is empty');
        $("#err_field_addBeneficiaryFirstName").show();
    } else if(speciAddBeniFirstName == true ){
        $("#err_field_addBeneficiaryFirstName").text('Special character is not allowed');
        $("#err_field_addBeneficiaryFirstName").show();
    } else if(numAddBeniFirstName) {
        $("#err_field_addBeneficiaryFirstName").text('Number is not allowed');
        $("#err_field_addBeneficiaryFirstName").show();
    } else {
        $("#err_field_addBeneficiaryFirstName").text('');
        $("#err_field_addBeneficiaryFirstName").hide();
    }

    if (field_addBeneficiaryMiddleName.length === 0) {
        $("#err_field_addBeneficiaryMiddleName").text('Field is empty');
        $("#err_field_addBeneficiaryMiddleName").show();
    } else if(speciAddBeniMiddleName) {
        $("#err_field_addBeneficiaryMiddleName").text('Special character is not allowed');
        $("#err_field_addBeneficiaryMiddleName").show();
    } else if(numAddBeniMiddleName) {
        $("#err_field_addBeneficiaryMiddleName").text('Number is not allowed');
        $("#err_field_addBeneficiaryMiddleName").show();
    }  else {
        $("#err_field_addBeneficiaryMiddleName").text('');
        $("#err_field_addBeneficiaryMiddleName").hide();
    }

    if (field_addBeneficiaryLastName.length === 0) {
        $("#err_field_addBeneficiaryLastName").text('Field is empty');
        $("#err_field_addBeneficiaryLastName").show();
    } else if (speciAddBeniLastName){
        $("#err_field_addBeneficiaryLastName").text('Special character is not allowed');
        $("#err_field_addBeneficiaryLastName").show();
    } else if (numAddBeniLastName) {
        $("#err_field_addBeneficiaryLastName").text('Number is not allowed');
        $("#err_field_addBeneficiaryLastName").show();
    }   else {
        $("#err_field_addBeneficiaryLastName").text('');
        $("#err_field_addBeneficiaryLastName").hide();
    }

    if (field_addBeneficiaryMobileNum.length === 0) {
        $("#err_field_addBeneficiaryMobileNum").text('Field is empty');
        $("#err_field_addBeneficiaryMobileNum").show();
    } else if (!numAddBeniMobile){
        $("#err_field_addBeneficiaryMobileNum").text('Only number is allowed!');
        $("#err_field_addBeneficiaryMobileNum").show();
    } else {
        $("#err_field_addBeneficiaryMobileNum").text('');
        $("#err_field_addBeneficiaryMobileNum").hide();
    }

    if (field_addBeneficiaryEmailAddress.length === 0) {
        $("#err_field_addBeneficiaryEmailAddress").text('Field is empty');
        $("#err_field_addBeneficiaryEmailAddress").show();
    } else {
        validateEmail(field_addBeneficiaryEmailAddress)
    }

    if (field_addBeneficiaryHomeAddress.length === 0) {
        $("#err_field_addBeneficiaryHomeAddress").text('Field is empty');
        $("#err_field_addBeneficiaryHomeAddress").show();
    } else {
        $("#err_field_addBeneficiaryHomeAddress").text('');
        $("#err_field_addBeneficiaryHomeAddress").hide();
    }

    if (field_addBeneficiaryDOB.length === 0) {
        $("#err_field_addBeneficiaryDOB").text('Field is empty');
        $("#err_field_addBeneficiaryDOB").show();
    } else {
        $("#err_field_addBeneficiaryDOB").text('');
        $("#err_field_addBeneficiaryDOB").hide();
    }

    if (field_addBeneficiaryPOB.length === 0) {
        $("#err_field_addBeneficiaryPOB").text('Field is empty');
        $("#err_field_addBeneficiaryPOB").show();
    } else {
        $("#err_field_addBeneficiaryPOB").text('');
        $("#err_field_addBeneficiaryPOB").hide();
    }

    if (field_addBeneficiaryNationality.length === 0) {
        $("#err_field_addBeneficiaryNationality").text('Field is empty');
        $("#err_field_addBeneficiaryNationality").show();
    } else {
        $("#err_field_addBeneficiaryNationality").text('');
        $("#err_field_addBeneficiaryNationality").hide();
    }

    if (field_addBeneficiarySex.length === 0) {
        $("#err_field_addBeneficiarySex").text('Field is empty');
        $("#err_field_addBeneficiarySex").show();
    } else {
        $("#err_field_addBeneficiarySex").text('');
        $("#err_field_addBeneficiarySex").hide();
    }

    if (field_addBeneficiaryRelationToDeceased.length === 0) {
        $("#err_field_addBeneficiaryRelationToDeceased").text('Field is empty');
        $("#err_field_addBeneficiaryRelationToDeceased").show();
    } else {
        $("#err_field_addBeneficiaryRelationToDeceased").text('');
        $("#err_field_addBeneficiaryRelationToDeceased").hide();
    }

    if (!$('#invalidCheck_basicAddBeneficiary').is(':checked')) {
        $("#err_invalidCheck_basicAddBeneficiary").text('Please select the field');
        $("#err_invalidCheck_basicAddBeneficiary").show();
    } else {
        $("#err_invalidCheck_basicAddBeneficiary").text('');
        $("#err_invalidCheck_basicAddBeneficiary").hide();
    }

    if (!$('#invalidCheck_privacyAddBeneficiary').is(':checked')) {
        $("#err_invalidCheck_privacyAddBeneficiary").text('Please select the field');
        $("#err_invalidCheck_privacyAddBeneficiary").show();
    } else {
        $("#err_invalidCheck_privacyAddBeneficiary").text('');
        $("#err_invalidCheck_privacyAddBeneficiary").hide();
    }

    if (field_addBeneficiaryFirstName.length !== 0 && field_addBeneficiaryMiddleName.length !== 0 && field_addBeneficiaryLastName.length !== 0 && field_addBeneficiaryMobileNum.length!==0 && field_addBeneficiaryEmailAddress.length !== 0 && field_addBeneficiaryHomeAddress.length !== 0 && field_addBeneficiaryDOB.length !== 0 && field_addBeneficiaryPOB.length !== 0 && field_addBeneficiaryNationality.length !== 0 && field_addBeneficiarySex.length !== 0 && field_addBeneficiaryRelationToDeceased.length !== 0 && $('#invalidCheck_basicAddBeneficiary').is(':checked') && $('#invalidCheck_privacyAddBeneficiary').is(':checked') && validateEmail(field_addBeneficiaryEmailAddress)) {
        
        let pConsentCheck1 = !$('#privacy_consent_beneficiary_1').is(':checked')
        let pConsentCheck2 = !$('#privacy_consent_beneficiary_2').is(':checked');

        if((pConsentCheck1) && (pConsentCheck2)){
            $("#err_beneficiary_privacy_consent1").text('Please select both the fields first');
            $("#err_beneficiary_privacy_consent1").show();
            $("#err_beneficiary_privacy_consent2").text('Please select both the fields first');
            $("#err_beneficiary_privacy_consent2").show();
            $('#privacy_consent_beneficiary_1')[0].scrollIntoView(true);
        }else if (pConsentCheck1) {
            $("#err_beneficiary_privacy_consent1").text('Please select both the fields first');
            $("#err_beneficiary_privacy_consent1").show();
            $('#privacy_consent_beneficiary_1')[0].scrollIntoView(true);
        } else if (pConsentCheck2) {
            $("#err_beneficiary_privacy_consent2").text('Please select both the fields first');
            $("#err_beneficiary_privacy_consent2").show();
            $('#privacy_consent_beneficiary_2')[0].scrollIntoView(true);
        } else {
            const data = {
                field_addBeneficiaryFirstName,
                field_addBeneficiaryMiddleName,
                field_addBeneficiaryLastName,
                field_addBeneficiaryMobileNum,
                field_addBeneficiaryEmailAddress,
                field_addBeneficiaryHomeAddress,
                field_addBeneficiaryDOB,
                field_addBeneficiaryPOB,
                field_addBeneficiaryNationality,
                field_addBeneficiarySex,
                field_addBeneficiaryRelationToDeceased,
                country_code: $("select#field_addBeneficiaryMobileNumberSelect option").filter(":selected").val(),
                basic_checkbox: $('#invalidCheck_basicAddBeneficiary').is(':checked'),
                privacy_checkbox: $('#invalidCheck_privacyAddBeneficiary').is(':checked')
            }

            dataReset("field_addBeneficiaryFirstName", "field_addBeneficiaryMiddleName", "field_addBeneficiaryLastName", "field_addBeneficiaryMobileNum", "field_addBeneficiaryEmailAddress", "field_addBeneficiaryHomeAddress", "field_addBeneficiaryDOB", "field_addBeneficiaryPOB", "field_addBeneficiaryNationality", "field_addBeneficiarySex", "field_addBeneficiaryRelationToDeceased");
            uploadDataReset();
            // $('#stepper_intro').hide();
            $('#death_data_privacy').hide();
            $('#addBeneficiary').hide();
            $('#requirements').show();
            $("#step2").addClass("active");
            $("#step2>div").addClass("active");
            $('#requirements')[0].scrollIntoView(true);

            console.log('Data -> ', data)
        }
    }
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
    var field_lastName = $("#field_lastName").val();
    var field_lastName_Suffix = $("#field_lastName_Suffix").val();
    var field_DOB = $("#field_DOB").val();
    var field_DOID = $("#field_DOID").val();
    var field_BeneficiaryFirstName = $("#field_BeneficiaryFirstName").val();
    var field_BeneficiaryMiddleName = $("#field_BeneficiaryMiddleName").val();
    var field_BeneficiaryLastName = $("#field_BeneficiaryLastName").val();
    var field_BeneficiaryMobileNum = $("#field_BeneficiaryMobileNum").val();
    var field_BeneficiaryEmailAddress = $("#field_BeneficiaryEmailAddress").val();
    var field_BeneficiaryHomeAddress = $("#field_BeneficiaryHomeAddress").val();
    var field_BeneficiaryDOB = $("#field_BeneficiaryDOB").val();
    var field_BeneficiaryPOB = $("#field_BeneficiaryPOB").val();
    var field_BeneficiaryNationality = $("#field_BeneficiaryNationality").val();
    var field_BeneficiarySex = $("#field_BeneficiarySex").val();
    var field_BeneficiaryRelationToDeceased = $("#field_BeneficiaryRelationToDeceased").val();
    
    var specFirstName = specialcharacterValidation(field_firstName);
    var  specMiddleName = specialcharacterValidation(field_middleName);
    var specLastName = specialcharacterValidation(field_lastName);
    var numFirstName = numberValidation(field_firstName);
    var numMiddleName = numberValidation(field_middleName)
    var numLastName = numberValidation(field_lastName);
    var speciBeniFirstName = specialcharacterValidation(field_BeneficiaryFirstName);
    var numBeniFirstName = numberValidation(field_BeneficiaryFirstName);
    var numberMobile = onlyNumberValidate(field_BeneficiaryMobileNum);
    var speciBeniMiddleName = specialcharacterValidation(field_BeneficiaryMiddleName);
    var numBeniMiddleName = numberValidation(field_BeneficiaryMiddleName);
    var speciBeniLastName = specialcharacterValidation(field_BeneficiaryLastName);
    var numBeniLastName = numberValidation(field_BeneficiaryLastName);

    if (field_firstName.length === 0) {
        $("#err_field_firstName").text('Field is empty');
        $("#err_field_firstName").show();
    } else if(specFirstName == true ){
        $("#err_field_firstName").text('Special character is not allowed');
        $("#err_field_firstName").show();
    } else if(numFirstName) {
        $("#err_field_firstName").text('Number is not allowed');
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
        $("#err_field_middleName").text('Number is not allowed');
        $("#err_field_middleName").show();
    }   else {
        $("#err_field_middleName").text('');
        $("#err_field_middleName").hide();
    }

    if (field_lastName.length === 0) {
        $("#err_field_lastName").text('Field is empty');
        $("#err_field_lastName").show();
    } else if (specLastName){
        $("#err_field_lastName").text('Special character is not allowed');
        $("#err_field_lastName").show();
    } else if (numLastName) {
        $("#err_field_lastName").text('Number is not allowed');
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

    if (field_DOID.length === 0) {
        $("#err_field_DOID").text('Field is empty');
        $("#err_field_DOID").show();
    } else {
        $("#err_field_DOID").text('');
        $("#err_field_DOID").hide();
    }

    if (field_BeneficiaryFirstName.length === 0) {
        $("#err_field_BeneficiaryFirstName").text('Field is empty');
        $("#err_field_BeneficiaryFirstName").show();
    } else if(speciBeniFirstName == true ){
        $("#err_field_BeneficiaryFirstName").text('Special character is not allowed');
        $("#err_field_BeneficiaryFirstName").show();
    } else if(numBeniFirstName) {
        $("#err_field_BeneficiaryFirstName").text('Number is not allowed');
        $("#err_field_BeneficiaryFirstName").show();
    } else {
        $("#err_field_BeneficiaryFirstName").text('');
        $("#err_field_BeneficiaryFirstName").hide();
    }

    if (field_BeneficiaryMiddleName.length === 0) {
        $("#err_field_BeneficiaryMiddleName").text('Field is empty');
        $("#err_field_BeneficiaryMiddleName").show();
    } else if(speciBeniMiddleName == true ){
        $("#err_field_BeneficiaryMiddleName").text('Special character is not allowed');
        $("#err_field_BeneficiaryMiddleName").show();
    } else if(numBeniMiddleName) {
        $("#err_field_BeneficiaryMiddleName").text('Number is not allowed');
        $("#err_field_BeneficiaryMiddleName").show();
    } else {
        $("#err_field_BeneficiaryMiddleName").text('');
        $("#err_field_BeneficiaryMiddleName").hide();
    }

    if (field_BeneficiaryLastName.length === 0) {
        $("#err_field_BeneficiaryLastName").text('Field is empty');
        $("#err_field_BeneficiaryLastName").show();
    } else if(speciBeniLastName == true ){
        $("#err_field_BeneficiaryLastName").text('Special character is not allowed');
        $("#err_field_BeneficiaryLastName").show();
    } else if(numBeniLastName) {
        $("#err_field_BeneficiaryLastName").text('Number is not allowed');
        $("#err_field_BeneficiaryLastName").show();
    } else {
        $("#err_field_BeneficiaryLastName").text('');
        $("#err_field_BeneficiaryLastName").hide();
    }

    if (field_BeneficiaryMobileNum.length === 0) {
        $("#err_field_BeneficiaryMobileNum").text('Field is empty');
        $("#err_field_BeneficiaryMobileNum").show();
    } else if (!numberMobile){
        $("#err_field_BeneficiaryMobileNum").text('Only number is allowed!');
        $("#err_field_BeneficiaryMobileNum").show();
    } else {
        $("#err_field_BeneficiaryMobileNum").text('');
        $("#err_field_BeneficiaryMobileNum").hide();
    }

    if (field_BeneficiaryEmailAddress.length === 0) {
        $("#err_field_BeneficiaryEmailAddress").text('Field is empty');
        $("#err_field_BeneficiaryEmailAddress").show();
    } else {
        $("#err_field_BeneficiaryEmailAddress").text('');
        $("#err_field_BeneficiaryEmailAddress").hide();
        validateEmail(field_BeneficiaryEmailAddress)
    }

    if (field_BeneficiaryHomeAddress.length === 0) {
        $("#err_field_BeneficiaryHomeAddress").text('Field is empty');
        $("#err_field_BeneficiaryHomeAddress").show();
    } else {
        $("#err_field_BeneficiaryHomeAddress").text('');
        $("#err_field_BeneficiaryHomeAddress").hide();
    }

    if (field_BeneficiaryDOB.length === 0) {
        $("#err_field_BeneficiaryDOB").text('Field is empty');
        $("#err_field_BeneficiaryDOB").show();
    } else {
        $("#err_field_BeneficiaryDOB").text('');
        $("#err_field_BeneficiaryDOB").hide();
    }

    if (field_BeneficiaryPOB.length === 0) {
        $("#err_field_BeneficiaryPOB").text('Field is empty');
        $("#err_field_BeneficiaryPOB").show();
    } else {
        $("#err_field_BeneficiaryPOB").text('');
        $("#err_field_BeneficiaryPOB").hide();
    }

    if (field_BeneficiaryNationality.length === 0) {
        $("#err_field_BeneficiaryNationality").text('Field is empty');
        $("#err_field_BeneficiaryNationality").show();
    } else {
        $("#err_field_BeneficiaryNationality").text('');
        $("#err_field_BeneficiaryNationality").hide();
    }

    if (field_BeneficiarySex.length === 0) {
        $("#err_field_BeneficiarySex").text('Field is empty');
        $("#err_field_BeneficiarySex").show();
    } else {
        $("#err_field_BeneficiarySex").text('');
        $("#err_field_BeneficiarySex").hide();
    }

    if (field_BeneficiaryRelationToDeceased.length === 0) {
        $("#err_field_BeneficiaryRelationToDeceased").text('Field is empty');
        $("#err_field_BeneficiaryRelationToDeceased").show();
    } else {
        $("#err_field_BeneficiaryRelationToDeceased").text('');
        $("#err_field_BeneficiaryRelationToDeceased").hide();
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

    if (field_firstName.length !== 0 && field_middleName.length !== 0 && field_lastName.length !== 0 && field_DOB.length !== 0 && field_DOID.length !== 0 && field_BeneficiaryFirstName.length !== 0 && field_BeneficiaryMiddleName.length !== 0 && field_BeneficiaryLastName.length !== 0 && field_BeneficiaryEmailAddress.length !== 0 && field_BeneficiaryHomeAddress.length !== 0 && field_BeneficiaryDOB.length !== 0 && field_BeneficiaryPOB.length !== 0 && field_BeneficiaryNationality.length !== 0 && field_BeneficiarySex.length !== 0 && field_BeneficiaryRelationToDeceased.length !== 0 && $('#invalidCheck_basic').is(':checked') && $('#invalidCheck_privacy').is(':checked') && validateEmail(field_BeneficiaryEmailAddress) && (specFirstName == false)  && (specMiddleName == false)  && (specLastName == false) && (numFirstName == false)  && (numMiddleName == false) && (numLastName == false) && (speciBeniFirstName == false) && (numBeniFirstName == false) && (numberMobile == true) && (speciBeniMiddleName == false) && (numBeniMiddleName == false) && (speciBeniLastName == false) && (numBeniLastName == false)) {
        
        let pConsentCheck1 = !$('#privacy_consent_1').is(':checked')
        let pConsentCheck2 = !$('#privacy_consent_2').is(':checked');

        if((pConsentCheck1) && (pConsentCheck2)){
            $("#err_privacy_consent1").text('Please select both the fields first');
            $("#err_privacy_consent1").show();
            $('#privacy_consent_1')[0].scrollIntoView(true);
            $("#err_privacy_consent2").text('Please select both the fields first');
            $("#err_privacy_consent2").show();
        } else if (pConsentCheck1) {
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
                field_lastName,
                field_lastName_Suffix,
                field_DOB,
                field_DOID,
                field_BeneficiaryFirstName,
                field_BeneficiaryMiddleName,
                field_BeneficiaryLastName,
                field_BeneficiaryMobileNum,
                field_BeneficiaryEmailAddress,
                field_BeneficiaryHomeAddress,
                field_BeneficiaryDOB,
                field_BeneficiaryPOB,
                field_BeneficiaryNationality,
                field_BeneficiarySex,
                field_BeneficiaryRelationToDeceased,
                country_code: $("select#field_BeneficiaryMobileNumberSelect option").filter(":selected").val(),
                basic_checkbox: $('#invalidCheck_basic').is(':checked'),
                privacy_checkbox: $('#invalidCheck_privacy').is(':checked')
            }

            dataReset("field_firstName", "field_firstName", "field_middleName", "field_lastName", "field_lastName_Suffix", "field_DOB", "field_DOID", "field_BeneficiaryFirstName", "field_BeneficiaryMiddleName", "field_BeneficiaryLastName", "field_BeneficiaryMobileNum", "field_BeneficiaryEmailAddress", "field_BeneficiaryHomeAddress", "field_BeneficiaryDOB", "field_BeneficiaryPOB", "field_BeneficiaryNationality", "field_BeneficiarySex", "field_BeneficiaryRelationToDeceased")


            $("#step1").addClass("done");
            $("#step2").addClass("active");
            $("#step2>div").addClass("active");
            $('#form_wrapper').hide();
            // $('#stepper_intro').hide();
            $('#death_data_privacy').hide();
            $('#requirements').show();
            $('#requirements')[0].scrollIntoView(true);
            console.log('Data -> ', data)
        }
    }
}

function dataReset() {
    let args = arguments;
    for(let i=0; i<args.length; i++) {
        $(`#${args[i]}`).val('');
    }
}

function uploadDataReset() {
    $('#file_Upload_Tick_1').hide();
    $('#file_Upload_Tick_2').hide();
    $('#file_Upload_Tick_3').hide();
    $('#file_Upload_Tick_4').hide();
    $('#file_Upload_Tick_5').hide();
    $('#file_Upload_Tick_6').hide();
    $('#file_Upload_Tick_7').hide();
    // $('#file_Upload_7').hide();
    $('#warning_parent').hide();
    $('#upload_warning').text('');
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
            $('#upload_warning').text('You may only upload documents that are in .jpg, or .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
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
            $('#upload_warning').text('You may only upload documents that are in .jpg, or .pdf, formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

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
            $('#upload_warning').text('You may only upload documents that are in .jpg, or .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

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
            $('#upload_warning').text('You may only upload documents that are in .jpg, or .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

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
            $('#upload_warning').text('You may only upload documents that are in .jpg, or .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            this.value = '';
    }
};

file6.onchange = function (e) {
    $('#file_Upload_Tick_6').hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        /* case 'tif': */
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_6').show();
                return
            }
            $("#warning_parent").show();
            $('#file_Upload_Tick_6').hide();
            $("#upload_warning").text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');
            break;
        default:
            $("#warning_parent").show();
            $('#file_Upload_Tick_6').hide();
            $('#upload_warning').text('You may only upload documents that are in .jpg, or .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            this.value = '';
    }
};

file7.onchange = function (e) {
    $('#proof_BAO_Tick_1').hide();
    $('#upload_feedback_label').show();
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
            $('#upload_feedback_label').text('You may only upload documents that are in .jpg, or .pdf formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            $('#upload_feedback_label').show();
            this.value = '';
    }
};


function addBeneficiary(event) {
    event.preventDefault();
    $('#privacy_consent_1').prop('checked', false);
    $('#privacy_consent_2').prop('checked', false);
    $("#step2").removeClass("active");
    $("#step2>div").removeClass("active");
    $('#addBeneficiary').show();
    $('#requirements').hide();
    $('#addBeneficiary')[0].scrollIntoView(true);
} 

function buttonSubmitClicked(event) {
    event.preventDefault();
    if (!file1.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Death Certificate of the Deceased');
        return;
    }

    if (!file2.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Police or Narration Report!');
        return;
    }

    if (!file3.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Front)');
        return;
    }

    if (!file4.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Back)');
        return;
    }

    if (!file5.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Marriage Contract');
        return;
    }

    if (!file6.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Birth Certificate');
        return;
    }

    if (!$('#upload_invalidCheck_2').is(':checked')) {
        $("#upload_warning").text('Please don’t forget to tick the box is certify the accuracy of the documents submitted');
        $("#warning_parent").show();
        return;
    }

    $("#upload_warning").text('');
    $("#warning_parent").hide();
    const upload_data = {
        upload_file_1: file1.value,
        upload_file_2: file2.value,
        upload_file_3: file3.value,
        upload_file_4: file4.value,
        upload_file_5: file5.value,
        upload_file_6: file6.value,
        insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked')
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
    var field_Branch = $("#field_Branch").val();
    var speCharAccountName = specialcharacterValidation(field_AccountName);
    var numAccountName = numberValidation(field_AccountName);
    var specAccountNumber = specialcharacterValidation(field_AccountNumber);
    var numAccountNumber = onlyNumberValidate(field_AccountNumber);
    var specCharBank = specialcharacterValidation(field_Bank);
    var numBank = numberValidation(field_Bank);
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
    }  else {
        $("#err_field_AccountNumber").text('');
        $("#err_field_AccountNumber").hide();
    }

    if (field_Bank.length === 0) {
        $("#err_field_Bank").text('Field is empty');
        $("#err_field_Bank").show();
    } else if(specCharBank) {
        $("#err_field_Bank").text('Special character is not allowed');
        $("#err_field_Bank").show();
    } else if(numBank) {
        $("#err_field_Bank").text('Number is not allowed');
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
        $("#err_field_Branch").text('Number is not allowed');
        $("#err_field_Branch").show();
    } else {
        $("#err_field_Branch").text('');
        $("#err_field_Branch").hide();
    }

    if (!file7.value) {
        $('#upload_feedback_label').show();
        $('#upload_feedback_label').text('Please upload your Bank Account Ownership');
        return;
    }

    if (field_AccountName.length !== 0 && field_AccountNumber.length !== 0 && field_Bank.length !== 0 && field_Branch.length !== 0  && (speCharAccountName == false) && (numAccountName == false) &&(numAccountNumber == true) && (specCharBank == false) && (numBank == false) && (specCharBRANCH == false) && (numBranch == false)) {
        const data = {
            field_AccountName,
            field_AccountNumber,
            field_Bank,
            field_Branch,
            field_Currency: $("select#from_currency option").filter(":selected").val(),
            upload_file_7: file7.value
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

function goBack() {
    console.log('go back!!!');
    $("#step2").removeClass("active");
    $("#step2>div").removeClass("active");
    $("#step2").removeClass("done");
    $('#requirements').hide();
    $('#form_wrapper').show();
    $('#form_wrapper')[0].scrollIntoView(true);
}