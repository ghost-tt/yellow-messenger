var stepper2
var stepper3
var stepper4
var stepperForm
var stepperFormEl



document.addEventListener('DOMContentLoaded', function () {
    stepperFormEl = document.querySelector('#stepperForm')
    stepperForm = new Stepper(stepperFormEl, {
        animation: true
    })
})

function loader() {
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
}

function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
        $("#err_field_emailAddress").text('Invalid Email');
        $("#err_field_emailAddress").show();
        return false;
    }

    return true;
}


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $("#err_field_mobileNum").text('Only numbers allowed!');
        $("#err_field_mobileNum").show();
        return false;
    }
    $("#err_field_mobileNum").text('');
    $("#err_field_mobileNum").hide();
    return true;
}

var form = document.getElementById("accidental__form");

function handleForm(event) {
    event.preventDefault();
    /* setTimeout(() => {
        $("#err_field_firstName").hide();
        $("#err_field_middleName").hide();
        $("#err_field_lastName").hide();
        $("#err_field_lastName_Suffix").hide();
        $("#err_field_DOB").hide();
        $("#err_field_mobileNum").hide();
        $("#err_field_emailAddress").hide();
        $("#err_field_homeAddress").hide();
        $("#err_field_DOA").hide();
        $("#err_field_TOA").hide();
        $("#err_field_POA").hide();
        $("#err_invalidCheck_basic").hide();
        $("#err_invalidCheck_privacy").hide();
    }, 3000); */

    var field_firstName = $("#field_firstName").val();
    var field_middleName = $("#field_middleName").val();

    var field_lastName = $("#field_lastName").val();
    var field_lastName_Suffix = $("#field_lastName_Suffix").val();

    var field_DOB = $("#field_DOB").val();
    var field_mobileNum = $("#field_mobileNum").val();

    var field_emailAddress = $("#field_emailAddress").val();
    var field_homeAddress = $("#field_homeAddress").val();

    var field_DOA = $("#field_DOA").val();
    var field_TOA = $("#field_TOA").val();
    var field_POA = $("#field_POA").val();


    if (field_firstName.length === 0) {
        $("#err_field_firstName").text('field is empty');
        $("#err_field_firstName").show();
    }

    if (field_middleName.length === 0) {
        $("#err_field_middleName").text('field is empty');
        $("#err_field_middleName").show();
    }

    if (field_lastName.length === 0) {
        $("#err_field_lastName").text('field is empty');
        $("#err_field_lastName").show();
    }

    if (field_lastName_Suffix.length === 0) {
        $("#err_field_lastName_Suffix").text('field is empty');
        $("#err_field_lastName_Suffix").show();
    }

    if (field_DOB.length === 0) {
        $("#err_field_DOB").text('field is empty');
        $("#err_field_DOB").show();
    }

    if (field_mobileNum.length === 0) {
        $("#err_field_mobileNum").text('field is empty');
        $("#err_field_mobileNum").show();
    }

    if (field_emailAddress.length === 0) {
        $("#err_field_emailAddress").text('field is empty');
        $("#err_field_emailAddress").show();
    } else {
        validateEmail(field_emailAddress);
    }

    if (field_homeAddress.length === 0) {
        $("#err_field_homeAddress").text('field is empty');
        $("#err_field_homeAddress").show();
    }

    if (field_DOA.length === 0) {
        $("#err_field_DOA").text('field is empty');
        $("#err_field_DOA").show();
    }

    if (field_TOA.length === 0) {
        $("#err_field_TOA").text('field is empty');
        $("#err_field_TOA").show();
    }

    if (field_POA.length === 0) {
        $("#err_field_POA").text('field is empty');
        $("#err_field_POA").show();
    }

    if (!$('#invalidCheck_basic').is(':checked')) {
        $("#err_invalidCheck_basic").text('Please select the field');
        $("#err_invalidCheck_basic").show();

    }

    if (!$('#invalidCheck_privacy').is(':checked')) {
        $("#err_invalidCheck_privacy").text('Please select the field');
        $("#err_invalidCheck_privacy").show();
    }

    //  && $('#invalidCheck_privacy').is(':checked') && $('#privacy_consent_1').is(':checked') && $('#privacy_consent_2').is(':checked')

    if (field_firstName.length !== 0 && field_middleName.length !== 0 && field_lastName.length !== 0 && field_lastName_Suffix.length !== 0 && field_DOB.length !== 0 && field_mobileNum.length !== 0 && field_emailAddress.length !== 0 && field_homeAddress.length !== 0 && field_DOA.length !== 0 && field_TOA.length !== 0 && field_POA.length !== 0 && $('#invalidCheck_basic').is(':checked')) {

        if (!$('#privacy_consent_1').is(':checked') && !$('#privacy_consent_2').is(':checked')) {
            $("#err_privacy_consent").text('Please select both the fields first');
            $("#err_privacy_consent").show();
            $('#privacy_consent_1')[0].scrollIntoView(true);
            return;
        }
        const data = {
            field_firstName,
            field_middleName,
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

        console.log('Data -> ', data)

        $('#form_wrapper').hide();
        $('#stepper_intro').hide();
        $('#accidental_data_privacy').hide();
        $('.circle__2').css("background", "#007bff");
        $('.firstChild').css("background", "#007bff");
        $('.bs-stepper-circle-text-2').css("color", "#007bff");
        // $('.bs-stepper-line').css("background", "#007bff");
        $('#requirements').show();
        $('#requirements')[0].scrollIntoView(true);
    }
}

form.addEventListener('submit', handleForm);


var file1 = document.getElementById('file_Upload_1');
var file2 = document.getElementById('file_Upload_2');
var file3 = document.getElementById('file_Upload_3');
var file4 = document.getElementById('file_Upload_4');
var file5 = document.getElementById('file_Upload_5');

file1.onchange = function (e) {
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        case 'png':
        case 'tif':
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_1').show();
                file_Upload_Tick_5
                return
            }
            $('#warning_parent').show();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');

            break;
        default:
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or .tif formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

            this.value = '';
    }
};


file2.onchange = function (e) {
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        case 'png':
        case 'tif':
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_2').show();
                return
            }
            $('#warning_parent').show();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');

            break;
        default:
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or .tif formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

            this.value = '';
    }
};


file3.onchange = function (e) {
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        case 'png':
        case 'tif':
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_3').show();
                return
            }
            $('#warning_parent').show();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');

            break;
        default:
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or .tif formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

            this.value = '';
    }
};


file4.onchange = function (e) {
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        case 'png':
        case 'tif':
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_4').show();
                return
            }
            $('#warning_parent').show();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');

            break;
        default:
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or .tif formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');

            this.value = '';
    }
};


file5.onchange = function (e) {
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'pdf':
        case 'png':
        case 'tif':
            if (this.files[0].size < 2097152) {
                $('#warning_parent').hide();
                $('#file_Upload_Tick_5').show();
                return
            }
            $('#warning_parent').show();
            $('#upload_warning').text('You may only upload documents not exceeding 2MB in file size to proceed. Please re-upload the correct file size to proceed.');
            break;
        default:
            $('#upload_warning').text('You may only upload documents that are in .jpg, .pdf, or .tif formats and must not exceed 2MB in file size. Please re-upload in the correct format and file size to proceed.');
            this.value = '';
    }
};



var listCheckBox = document.querySelector('#upload_invalidCheck_1');
listCheckBox.onchange = function () {
    if ($(listCheckBox).is(':checked')) {
        $('.feedback_label').show();
    } else {
        $('.feedback_label').hide();
    }

}


function buttonSubmitClicked(event) {
    event.preventDefault();
    // $('#upload_warning').text('')
    if (!file1.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your government id front!');
        return;
    }

    if (!file2.value) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your government id back!');
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


    if (!$('#upload_invalidCheck_1').is(':checked')) {
        $("#upload_warning").text('Please don’t forget to tick the box is certify the accuracy of the documents submitted');
        $("#warning_parent").show();
        return;
    }

    if (!$('#upload_invalidCheck_2').is(':checked')) {
        $("#upload_warning").text('Please don’t forget to tick the box is certify the accuracy of the documents submitted');
        $("#warning_parent").show();
        return;
    }


    // if (file1.value && file2.value ) {

    const upload_data = {
        upload_file_1: file1.value,
        upload_file_2: file2.value,
        upload_file_3: file3.value,
        upload_file_4: file4.value,
        upload_file_5: file5.value,
        aia_Philam_Life_Checkbox: $('#upload_invalidCheck_1').is(':checked'),
        insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked')
    }

    console.log('upload data --> ', upload_data);
    
    $('#requirements').hide();
    $('#payment').show();
    $('#payment')[0].scrollIntoView(true);
}



function bankTranfer() {
    $('#payment').hide();
    $('#process_confirmation').show();
    $('.secondChild').css("background", "#007bff");
    $('.circle__3').css("background", "#007bff");
    $('.bs-stepper-circle-text-3').css("color", "#007bff");
}

function pickUp() {
    $('#payment').hide();
    $('#process_confirmation').show();
    $('.secondChild').css("background", "#007bff");
    $('.circle__3').css("background", "#007bff");
    $('.bs-stepper-circle-text-3').css("color", "#007bff");
}