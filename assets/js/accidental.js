
function handleForm(event) {
  event.preventDefault();
  var field_firstName = $("#field_firstName").val();
  var field_middleName = $("#field_middleName").val();
  var field_lastName = $("#field_lastName").val();
  var field_lastName_Suffix = $("#field_lastName_Suffix").val();
  var field_DOB = $("#field_DOB").val();
  var field_DOID = $("#field_DOID").val();
  var field_NatureLoss = $('#nature_Loss').val();
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
  var field_BenificiaryOccupation = $("#field_BeneficiaryOccupation").val();
  var field_BeneficiaryRelationToDeceased = $("#field_BeneficiaryRelationToDeceased").val();
  var field_BeneficiaryEmployerName = $('#field_BeneficiaryEmployerName').val();
  var field_Beneficiary_relatives1 = $('#field_Beneficiary_relatives1').val();
  var field_Beneficiary_relatives2 = $('#field_Beneficiary_relatives2').val();

  var specFirstName = specialcharacterValidation(field_firstName);
  var specMiddleName = specialcharacterValidation(field_middleName);
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
  /*  var numEmployerName = numberValidation(field_BeneficiaryEmployerName);
   var specEmployerName = specialcharacterValidation(field_BeneficiaryEmployerName); */
  var specSuffix = false;
  var numSuffix = false;
  var lenLastNameSuffix = false;

  if (field_lastName_Suffix != 0) {
    specSuffix = specialcharacterValidation(field_lastName_Suffix);
    numSuffix = numberValidation(field_lastName_Suffix)
    lenLastNameSuffix = fieldCheckLength(field_lastName_Suffix, 3);
  }
  var comapareDates = compareFun(field_DOB, field_DOID);

  var lenFirstName = fieldCheckLength(field_firstName, 25);
  var lenMiddleName = fieldCheckLength(field_middleName, 25);
  var lenLastName = fieldCheckLength(field_lastName, 25);
  var lenBeneficiaryFirstName = fieldCheckLength(field_BeneficiaryFirstName, 30);
  var lenBeneficiaryMiddleName = fieldCheckLength(field_BeneficiaryMiddleName, 30);
  var lenBeneficiaryLastName = fieldCheckLength(field_BeneficiaryLastName, 30);
  var lenMobileNum = fieldCheckLength(field_BeneficiaryMobileNum, 10);
  var lenBeneficiaryHomeAddress = fieldCheckLength(field_BeneficiaryHomeAddress, 250);
  var lenBeneficiaryPOB = fieldCheckLength(field_BeneficiaryPOB, 120);
  var lenBeneficiaryNationality = fieldCheckLength(field_BeneficiaryNationality, 120)
  var lenBeneficiaryRelationToDeceased = fieldCheckLength(field_BeneficiaryRelationToDeceased, 50)
  var lenBeneficiaryEmployerName = fieldCheckLength(field_BeneficiaryEmployerName, 30)
  var checkDOb = currentDate(field_BeneficiaryDOB);
  var relationKeyword = checkKeyword(field_BeneficiaryRelationToDeceased);


  if (field_DOB.length !== 0) {
    var futDOB = futureDate(field_DOB);
    var futExistDOB = futureDateDOB(field_DOB);
  }

  if (field_DOID.length !== 0) {
    var futDOID = futureDate(field_DOID);
  }

  if (field_BeneficiaryDOB.length !== 0) {
    var futBeneficiaryDOB = futureDate(field_BeneficiaryDOB);
    /*  var futExistBeneficiaryDOB = futureDateDOB(field_BeneficiaryDOB); */
  }

  var field_NatureOfLoss = $("select#nature_Loss option").filter(":selected").val()

  //if(field_NatureOfLoss == 'Illness') {
  if (0 == field_NatureOfLoss.localeCompare("Illness")) {
    optiondisable = 2;
  }
  else {
    optiondisable = 1;
  }

  if (checkDOb) {
    optionAge = true;
  }

  if (relationKeyword) {
    relation = true;
  }

  if (field_firstName.length === 0) {
    $("#err_field_firstName").text('Field is empty');
    $("#err_field_firstName").show();
  } else if (lenFirstName) {
    $("#err_field_firstName").text('Maximum 25 characters allowed!');
    $("#err_field_firstName").show();
  } else if (specFirstName == true) {
    $("#err_field_firstName").text('Special character is not allowed');
    $("#err_field_firstName").show();
  } else if (numFirstName) {
    $("#err_field_firstName").text('Number is not allowed');
    $("#err_field_firstName").show();
  } else {
    $("#err_field_firstName").text('');
    $("#err_field_firstName").hide();
  }

  if (field_middleName.length === 0) {
    $("#err_field_middleName").text('Field is empty');
    $("#err_field_middleName").show();
  } else if (lenMiddleName) {
    $("#err_field_middleName").text('Maximum 25 characters allowed!');
    $("#err_field_middleName").show();
  } else if (specMiddleName) {
    $("#err_field_middleName").text('Special character is not allowed');
    $("#err_field_middleName").show();
  } else if (numMiddleName) {
    $("#err_field_middleName").text('Number is not allowed');
    $("#err_field_middleName").show();
  } else {
    $("#err_field_middleName").text('');
    $("#err_field_middleName").hide();
  }

  if (field_lastName.length === 0) {
    $("#err_field_lastName").text('Field is empty');
    $("#err_field_lastName").show();
  } else if (lenLastName) {
    $("#err_field_lastName").text('Maximum 25 characters allowed!');
    $("#err_field_lastName").show();
  } else if (specLastName) {
    $("#err_field_lastName").text('Special character is not allowed');
    $("#err_field_lastName").show();
  } else if (numLastName) {
    $("#err_field_lastName").text('Number is not allowed');
    $("#err_field_lastName").show();
  } else {
    $("#err_field_lastName").text('');
    $("#err_field_lastName").hide();
  }


  if (field_lastName_Suffix.length === 0) {
    $("#err_field_lastName_Suffix").text('');
    $("#err_field_lastName_Suffix").hide();
  } else if (lenLastNameSuffix) {
    $("#err_field_lastName_Suffix").text('Maximum 3 characters allowed!');
    $("#err_field_lastName_Suffix").show();
  } else if (specSuffix) {
    $("#err_field_lastName_Suffix").text('Special character is not allowed');
    $("#err_field_lastName_Suffix").show();
  } else if (numSuffix) {
    $("#err_field_lastName_Suffix").text('Number is not allowed');
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
  } else {
    $("#err_field_DOB").text('');
    $("#err_field_DOB").hide();
  }

  if (field_DOID.length === 0) {
    $("#err_field_DOID").text('Field is empty');
    $("#err_field_DOID").show();
  } else if (!futDOID) {
    $("#err_field_DOID").text('Future date is  not Accepted!');
    $("#err_field_DOID").show();
  } else if (!comapareDates) {
    $("#err_field_DOID").text('Insured\'s death date can not be smaller than DOB');
    $("#err_field_DOID").show();
  } else {
    $("#err_field_DOID").text('');
    $("#err_field_DOID").hide();
  }

  if (field_NatureLoss.length === 0) {
    $("#err_natural_loss").text('Field is empty');
    $("#err_natural_loss").show();
  } else {
    $("#err_natural_loss").text('');
    $("#err_natural_loss").hide();
  }

  if (field_BeneficiaryFirstName.length === 0) {
    $("#err_field_BeneficiaryFirstName").text('Field is empty');
    $("#err_field_BeneficiaryFirstName").show();
  } else if (lenBeneficiaryFirstName) {
    $("#err_field_BeneficiaryFirstName").text('Maximum 30 characters allowed!');
    $("#err_field_BeneficiaryFirstName").show();
  } else if (speciBeniFirstName == true) {
    $("#err_field_BeneficiaryFirstName").text('Special character is not allowed');
    $("#err_field_BeneficiaryFirstName").show();
  } else if (numBeniFirstName) {
    $("#err_field_BeneficiaryFirstName").text('Number is not allowed');
    $("#err_field_BeneficiaryFirstName").show();
  } else {
    $("#err_field_BeneficiaryFirstName").text('');
    $("#err_field_BeneficiaryFirstName").hide();
  }

  if (field_BeneficiaryMiddleName.length === 0) {
    $("#err_field_BeneficiaryMiddleName").text('Field is empty');
    $("#err_field_BeneficiaryMiddleName").show();
  } else if (lenBeneficiaryMiddleName) {
    $("#err_field_BeneficiaryMiddleName").text('Maximum 30 characters allowed!');
    $("#err_field_BeneficiaryMiddleName").show();
  } else if (speciBeniMiddleName == true) {
    $("#err_field_BeneficiaryMiddleName").text('Special character is not allowed');
    $("#err_field_BeneficiaryMiddleName").show();
  } else if (numBeniMiddleName) {
    $("#err_field_BeneficiaryMiddleName").text('Number is not allowed');
    $("#err_field_BeneficiaryMiddleName").show();
  } else {
    $("#err_field_BeneficiaryMiddleName").text('');
    $("#err_field_BeneficiaryMiddleName").hide();
  }

  if (field_BeneficiaryLastName.length === 0) {
    $("#err_field_BeneficiaryLastName").text('Field is empty');
    $("#err_field_BeneficiaryLastName").show();
  } else if (lenBeneficiaryLastName) {
    $("#err_field_BeneficiaryLastName").text('Maximum 30 characters allowed!');
    $("#err_field_BeneficiaryLastName").show();
  } else if (speciBeniLastName == true) {
    $("#err_field_BeneficiaryLastName").text('Special character is not allowed');
    $("#err_field_BeneficiaryLastName").show();
  } else if (numBeniLastName) {
    $("#err_field_BeneficiaryLastName").text('Number is not allowed');
    $("#err_field_BeneficiaryLastName").show();
  } else {
    $("#err_field_BeneficiaryLastName").text('');
    $("#err_field_BeneficiaryLastName").hide();
  }

  if (field_BeneficiaryMobileNum.length === 0) {
    $("#err_field_BeneficiaryMobileNum").text('Field is empty');
    $("#err_field_BeneficiaryMobileNum").show();
  } else if (lenMobileNum) {
    $("#err_field_BeneficiaryMobileNum").text('Maximum 10 characters allowed!');
    $("#err_field_BeneficiaryMobileNum").show();
  } else if (!numberMobile) {
    $("#err_field_BeneficiaryMobileNum").text('Only number is allowed!');
    $("#err_field_BeneficiaryMobileNum").show();
  } else if (field_BeneficiaryMobileNum.length !== 10) {
    $("#err_field_BeneficiaryMobileNum").text('Minimum 10 number required!');
    $("#err_field_BeneficiaryMobileNum").show();
  } else {
    $("#err_field_BeneficiaryMobileNum").text('');
    $("#err_field_BeneficiaryMobileNum").hide();
  }

  if (field_BeneficiaryEmailAddress.length === 0) {
    $("#err_field_BeneficiaryEmailAddress").text('Field is empty');
    $("#err_field_BeneficiaryEmailAddress").show();
  } else {
    validateEmail(field_BeneficiaryEmailAddress)
  }

  if (field_BeneficiaryHomeAddress.length === 0) {
    $("#err_field_BeneficiaryHomeAddress").text('Field is empty');
    $("#err_field_BeneficiaryHomeAddress").show();
  } else if (lenBeneficiaryHomeAddress) {
    $("#err_field_BeneficiaryHomeAddress").text('Maximum 250 characters allowed!');
    $("#err_field_BeneficiaryHomeAddress").show();
  } else {
    $("#err_field_BeneficiaryHomeAddress").text('');
    $("#err_field_BeneficiaryHomeAddress").hide();
  }

  if (field_BeneficiaryDOB.length === 0) {
    $("#err_field_BeneficiaryDOB").text('Field is empty');
    $("#err_field_BeneficiaryDOB").show();
  } else if (!futBeneficiaryDOB) {
    $("#err_field_BeneficiaryDOB").text('Future date is  not Accepted!');
    $("#err_field_BeneficiaryDOB").show();
  } else {
    $("#err_field_BeneficiaryDOB").text('');
    $("#err_field_BeneficiaryDOB").hide();
  }

  if (field_BeneficiaryPOB.length === 0) {
    $("#err_field_BeneficiaryPOB").text('Field is empty');
    $("#err_field_BeneficiaryPOB").show();
  } else if (lenBeneficiaryPOB) {
    $("#err_field_BeneficiaryPOB").text('Maximum 120 characters allowed!');
    $("#err_field_BeneficiaryPOB").show();
  } else {
    $("#err_field_BeneficiaryPOB").text('');
    $("#err_field_BeneficiaryPOB").hide();
  }

  if (field_BeneficiaryNationality.length === 0) {
    $("#err_field_BeneficiaryNationality").text('Field is empty');
    $("#err_field_BeneficiaryNationality").show();
  } else if (lenBeneficiaryNationality) {
    $("#err_field_BeneficiaryNationality").text('Maximum 120 characters allowed!');
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

  if (field_BenificiaryOccupation.length === 0) {
    $("#err_field_BeneficiaryOccupation").text('Field is empty');
    $("#err_field_BeneficiaryOccupation").show();
  } else {
    $("#err_field_BeneficiaryOccupation").text('');
    $("#err_field_BeneficiaryOccupation").hide();
  }

  if (field_Beneficiary_relatives1.length === 0) {
    $("#err_field_Beneficiary_relatives1").text('Field is empty');
    $("#err_field_Beneficiary_relatives1").show();
  } else {
    $("#err_field_Beneficiary_relatives1").text('');
    $("#err_field_Beneficiary_relatives1").hide();
  }

  if (field_Beneficiary_relatives2.length === 0) {
    $("#err_field_Beneficiary_relatives2").text('Field is empty');
    $("#err_field_Beneficiary_relatives2").show();
  } else {
    $("#err_field_Beneficiary_relatives2").text('');
    $("#err_field_Beneficiary_relatives2").hide();
  }

  if (field_BeneficiaryRelationToDeceased.length === 0) {
    $("#err_field_BeneficiaryRelationToDeceased").text('Field is empty');
    $("#err_field_BeneficiaryRelationToDeceased").show();
  } else if (lenBeneficiaryRelationToDeceased) {
    $("#err_field_BeneficiaryRelationToDeceased").text('Maximum 50 characters allowed!');
    $("#err_field_BeneficiaryRelationToDeceased").show();
  } else {
    $("#err_field_BeneficiaryRelationToDeceased").text('');
    $("#err_field_BeneficiaryRelationToDeceased").hide();
  }

  if (field_BeneficiaryEmployerName.length === 0) {
    $("#err_field_BeneficiaryEmployerName").text('Field is empty');
    $("#err_field_BeneficiaryEmployerName").show();
  }/*   else if(specEmployerName ) {
        $("#err_field_BeneficiaryEmployerName").text('Special character is not allowed');
        $("#err_field_BeneficiaryEmployerName").show();
    } else if (numEmployerName ) {
        $("#err_field_BeneficiaryEmployerName").text('Number is not allowed');
        $("#err_field_BeneficiaryEmployerName").show();
    }   */else if (lenBeneficiaryEmployerName) {
    $("#err_field_BeneficiaryEmployerName").text('Maximum 250 characters allowed!');
    $("#err_field_BeneficiaryEmployerName").show();
  } else {
    $("#err_field_BeneficiaryEmployerName").text('');
    $("#err_field_BeneficiaryEmployerName").hide();
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

  if (($('#inlineRadio1').is(':checked')) || ($('#inlineRadio2').is(':checked'))) {
    $("#err_field_BeneficiaryPEP").text('');
    $("#err_field_BeneficiaryPEP").hide();
  } else {
    $("#err_field_BeneficiaryPEP").text('Please select the field');
    $("#err_field_BeneficiaryPEP").show();
  }

  if (field_firstName.length !== 0 && field_middleName.length !== 0 && field_lastName.length !== 0 && field_DOB.length !== 0 && field_DOID.length !== 0 && field_NatureLoss.length !== 0 && field_BeneficiaryFirstName.length !== 0 && field_BeneficiaryMiddleName.length !== 0 && field_BeneficiaryLastName.length !== 0 && field_BeneficiaryMobileNum.length == 10 && field_BeneficiaryEmailAddress.length !== 0 && field_BeneficiaryHomeAddress.length !== 0 && field_BeneficiaryDOB.length !== 0 && field_BeneficiaryPOB.length !== 0 && field_BeneficiaryNationality.length !== 0 && field_BeneficiarySex.length !== 0 && field_BeneficiaryRelationToDeceased.length !== 0 && field_BenificiaryOccupation.length !== 0 && field_BeneficiaryEmployerName.length !== 0 && $('#invalidCheck_basic').is(':checked') && $('#invalidCheck_privacy').is(':checked') && validateEmail(field_BeneficiaryEmailAddress) && (specFirstName == false) && (specMiddleName == false) && (specLastName == false) && (numFirstName == false) && (numMiddleName == false) && (numLastName == false) && (speciBeniFirstName == false) && (numBeniFirstName == false) && (numberMobile == true) && (speciBeniMiddleName == false) && (numBeniMiddleName == false) && (speciBeniLastName == false) && (numBeniLastName == false) && (futDOB == true) && (futExistDOB == true) && (futDOID == true) && (numSuffix == false) && (specSuffix == false) && field_Beneficiary_relatives1.length !== 0 && field_Beneficiary_relatives2.length !== 0 && (comapareDates == true)) {


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
      BeneficiarySex: $("select#field_BeneficiarySex option").filter(":selected").val(),
      field_BenificiaryOccupation,
      field_BeneficiaryRelationToDeceased,
      country_code: $("select#field_BeneficiaryMobileNumberSelect option").filter(":selected").val(),
      basic_checkbox: $('#invalidCheck_basic').is(':checked'),
      privacy_checkbox: $('#invalidCheck_privacy').is(':checked'),
      privacy_consent_1: $("#privacy_consent_1").is(":checked"),
      privacy_consent_2: $("#privacy_consent_2").is(":checked"),
      privacy_consent_3: $("#privacy_consent_3").is(":checked"),
    }
    InsuredInformation["FirstName"] = field_firstName;
    InsuredInformation["MiddleName"] = field_middleName;
    InsuredInformation["LastName"] = field_lastName;
    InsuredInformation["Suffix"] = field_lastName_Suffix;
    InsuredInformation["DateOfBirth"] = field_DOB.split('-')[1] + "/" + field_DOB.split('-')[2] + "/" + field_DOB.split('-')[0];
    InsuredInformation["InsuredsDeath"] = field_DOID.split('-')[1] + "/" + field_DOID.split('-')[2] + "/" + field_DOID.split('-')[0];

    basicInformation["CauseOfLoss"] = field_NatureLoss;

    let beneficiary = {};

    console.log("check box values : ");
    console.log(data.privacy_consent_1);
    console.log(data.privacy_consent_2);

    beneficiary["BeneficiaryNo"] = beneficiaryCount.toString(),
      beneficiary["FirstName"] = field_BeneficiaryFirstName,
      beneficiary["MiddleName"] = field_BeneficiaryMiddleName,
      beneficiary["LastName"] = field_BeneficiaryLastName,
      beneficiary["DateOfBirth"] = field_BeneficiaryDOB.split('-')[1] + "/" + field_BeneficiaryDOB.split('-')[2] + "/" + field_BeneficiaryDOB.split('-')[0],
      beneficiary["CountryCode"] = $("select#field_BeneficiaryMobileNumberSelect option").filter(":selected").val(),
      beneficiary["PhoneNumber"] = field_BeneficiaryMobileNum,
      beneficiary["EmailAddress"] = field_BeneficiaryEmailAddress,
      beneficiary["HomeAddress"] = field_BeneficiaryHomeAddress,
      beneficiary["PlaceOfBirth"] = field_BeneficiaryPOB,
      beneficiary["Nationality"] = field_BeneficiaryNationality,
      beneficiary["Sex"] = $("select#field_BeneficiarySex option").filter(":selected").val(),
      beneficiary["Relationship"] = field_BeneficiaryRelationToDeceased,
      beneficiary["DocumentFolder"] = `/CLAIMS/${referenceNumber}`,
      beneficiary["PayoutOption"] = "CTA",
      beneficiary["Employer"] = field_BeneficiaryEmployerName,
      beneficiary["GovernmentOfficial"] = $("select#field_Beneficiary_relatives1 option").filter(":selected").val(),
      beneficiary["GovernmentOfficialRelative"] = $("select#field_Beneficiary_relatives2 option").filter(":selected").val(),
      beneficiary["Occupation"] = field_BenificiaryOccupation,
      beneficiary["check1"] = data.privacy_consent_1,
      beneficiary["check2"] = data.privacy_consent_2

    console.log('bene obj -> ', beneficiary);
    BeneficiaryList.push(beneficiary);
    /*  dataReset("field_firstName", "field_firstName", "field_middleName", "field_lastName", "field_lastName_Suffix", "field_DOB", "field_DOID", "field_BeneficiaryFirstName", "field_BeneficiaryMiddleName", "field_BeneficiaryLastName", "field_BeneficiaryMobileNum", "field_BeneficiaryEmailAddress", "field_BeneficiaryHomeAddress", "field_BeneficiaryDOB", "field_BeneficiaryPOB", "field_BeneficiaryNationality", "field_BeneficiarySex", "field_BeneficiaryRelationToDeceased","field_Beneficiary_relatives1","field_Beneficiary_relatives2") */
    $("#step1").addClass("done");
    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
    $('#form_wrapper').hide();
    $('#death_data_privacy').hide();
    $('#payment').show();
    $("#customer_Name").text(`Hi ${field_BeneficiaryFirstName}, Hang in there as we are now processing your request. Kindly expect an SMS update from us within 1 to 2 working days on the status of your request.`);
    console.log('Data -> ', data)

  } else if ((comapareDates == false) && ((field_DOB !== '') || (field_DOID !== ''))) {
    $('#popUp_DOB').modal('show');
  } else {
    $('#popUp').modal('show');
  }
}