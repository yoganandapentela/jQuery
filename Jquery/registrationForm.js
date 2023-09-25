var selectedRow = null;
var count = 0;
//Main function...
function formsubmit() {
    if (validate()) {
        var formdata = fun1();
        if (selectedRow == null) {
            $("#norecords").html("");
            count++;
            insertnewrecord(formdata);

        }
        else {
            updatenewrecord(formdata);
        }
        resetform();
    }

}

//function to calculate age
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Subtract 1 year if the birthdate hasn't occurred yet this year
    }

    return age;
}


//function for retreiving data 
function fun1() {
    formdata = {};
    formdata["surname"] = $("#surname").val();
    formdata["name"] = $("#name").val();
    formdata["email"] = $("#email").val();
    formdata["mobile"] = $("#mobile").val();
    formdata["gender"] = $('input[name="gender"]:checked').val();
    formdata["country"] = $("#country").val();
    formdata["state"] = $("#state").val();
    formdata["district"] = $("#district").val();
    formdata["date"] = $("#date").val();
    var checkedValues = [];
    var inputElements = $('input[name="check"]');
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements.eq(i).prop('checked')) {
            checkedValues.push(inputElements.eq(i).val());
        }
    }

    console.log("..." + typeof (checkedValues));
    formdata["checkedvalues"] = checkedValues.join(",");
    formdata["yourself"] = $("#yourself").val();
    formdata["age"] = calculateAge($("#date").val());


    return formdata;


}

//insert data
function insertnewrecord(data) {
    newRow = $("<tr>")
    $("#employeeList tbody").append(newRow);
    $('<td>').html(data.name).appendTo(newRow);
    $('<td>').html(data.surname).appendTo(newRow);
    $('<td>').html(data.email).appendTo(newRow);
    $('<td>').html(data.mobile).appendTo(newRow);
    $('<td>').html(data.gender).appendTo(newRow);
    $('<td>').html(data.country).appendTo(newRow);
    $('<td>').html(data.state).appendTo(newRow);
    $('<td>').html(data.district).appendTo(newRow);
    $('<td>').html(data.date).appendTo(newRow);
    $('<td>').html(data.checkedvalues).appendTo(newRow);
    $('<td>').html(data.yourself).appendTo(newRow);
    $('<td>').html(data.age).appendTo(newRow);


    $('<td>').html(`<button onClick="onEdit(this)">Edit</button>
   <button onClick="onDelete(this)">Delete</button>`).appendTo(newRow);

}

//function to reset
function resetform() {
    $("#name").val("");
    $("#surname").val("");
    $("#email").val("");
    $("#mobile").val("");
    $("#country").val("");
    $("#state").val("");
    $("#district").val("");
    $("#yourself").val("");
    $("#date").val("");



    const genderRadios = $('input[name="gender"]');
    genderRadios.each(function () {
        $(this).prop('checked', false);
    });


    const hobbies = $('input[name="check"]');
    hobbies.each(function () {
        $(this).prop('checked', false);
    });




    selectedRow = null;
}


// Function for Edit
function onEdit(td) {
    selectedRow = $(td).closest("tr"); // Get the closest table row (tr) to the clicked button

    $("#name").val(selectedRow.find("td:eq(0)").text());
    $("#surname").val(selectedRow.find("td:eq(1)").text());
    $("#email").val(selectedRow.find("td:eq(2)").text());
    $("#mobile").val(selectedRow.find("td:eq(3)").text());


    var gender = selectedRow.find("td:eq(4)").text();
    $('input[name="gender"]').filter(function () {
        return $(this).val() === gender;
    }).prop("checked", true);

    $("#country").val(selectedRow.find("td:eq(5)").text());
    coun(); 
    $("#state").val(selectedRow.find("td:eq(6)").text());
    stat(); 
    $("#district").val(selectedRow.find("td:eq(7)").text());

    // set the date in the correct format
    var dateValue = new Date(selectedRow.find("td:eq(8)").text());
    var formattedDate = dateValue.getFullYear() + "-" + ("0" + (dateValue.getMonth() + 1)).slice(-2) + "-" + ("0" + dateValue.getDate()).slice(-2);
    $("#date").val(formattedDate);


    //checkboxes to be checked 
var checkedValues = selectedRow.find("td:eq(9)").text().split(",");
$('input[type="checkbox"][name="check"]').prop("checked", false);
checkedValues.forEach(function (checkbox) {
    $('input[type="checkbox"][name="check"][value="'+checkbox.trim()+'"]').prop("checked", true);
});


    $("#yourself").val(selectedRow.find("td:eq(10)").text());
}

//function for update
function updatenewrecord(data) {
    selectedRow.find("td:eq(0)").html(data.name);
    selectedRow.find("td:eq(1)").html(data.surname);
    selectedRow.find("td:eq(2)").html(data.email);
    selectedRow.find("td:eq(3)").html(data.mobile);
    selectedRow.find("td:eq(4)").html(data.gender);
    selectedRow.find("td:eq(5)").html(data.country);
    selectedRow.find("td:eq(6)").html(data.state);
    selectedRow.find("td:eq(7)").html(data.district);

    // set the date in the correct format
    var dateValue = new Date(data.date);
    var formattedDate = dateValue.toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' });
    selectedRow.find("td:eq(8)").html(formattedDate);
    console.log(typeof (data.checkedvalues));
    selectedRow.find("td:eq(9)").html(data.checkedvalues);
    selectedRow.find("td:eq(10)").html(data.yourself);


    const age = calculateAge(data.date);
    selectedRow.find("td:eq(11)").html(age);


    selectedRow = null;

    resetform();
}



//function for deletion
function onDelete(td) {

    if (confirm("Are you sure to delete record??")) {
        $(td).closest("tr").remove();

        count--;
        if (count == 0) {
            $("#norecords").html("NO RECORDS FOUND");
        }
        resetform();
    }

}



//function for selecting a state
function coun() {
    var selectedCountry = $("#country").val();
    var state = $("#state");

    $("#state").val("");
    $("#state").html("<option value=''>select state</option>");
    var states = {
        usa: ["newyork", "california", "texas"],
        india: ["ap", "ts", "mh"],
        srilanka: ["central", "eastern", "western"],
        nepal: ["madhesh", "gandhaki", "lumbini"],
        australia: ["victoria", "queensland", "tasmania"]
    };

    var countrySelected = states[selectedCountry];
    countrySelected.forEach((c) => {
        var option = $("<option>").val(c).text(c);
        state.append(option);
    });

};

//function for populating districts
function stat() {
    var selectedState = $("#state").val();
    var district = $("#district");

    $("#district").val();
    $("#district").html("<option value=''>select district</option>");

    var districts = {
        //us
        newyork: ["manhattan", "brooklyn", "queens"],
        california: ["cerritos", "los-angels", "Oakland"],
        texas: ["houston", "dallas", "Albany"],
        //bharat
        ap: ["krishna", "ntr", "guntur"],
        ts: ["khammam", "nalgonda", "suryapeta"],
        mh: ["pune", "nanded", "nashik"],
        //srilanka
        central: ["hatton", "campola", "matale"],
        eastern: ["ampara", "batticoala", "ampara"],
        western: ["colombo", "negambo", "gampaha"],
        //nepal
        madhesh: ["janakpur", "birgunj", "kalaiya"],
        gandhaki: ["pokhara", "waling", "gorkha"],
        lumbini: ["bhutwal", "ghorahi", "tulsipur"],
        //australia
        victoria: ["melboune", "ballarat", "bendigo"],
        queensland: ["brisbane", "mackey", "cairns"],
        tasmania: ["hobort", "devonport", "launceston"]



    }

    var stateSelected = districts[selectedState];

    stateSelected.forEach((d) => {
        var option = $("<option>").val(d).text(d);
        district.append(option);
    })
}
//search functionality
$("#searchbar").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#employeeList tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});



//**** Dynamic validation *****

//name validation
function validateme() {
    var myname = $("#name").val();
    if (myname.length > 2) {
        return true;
    } else {
        return false;
    }
}
$("#name").keyup(function () {
    if (validateme()) {
        $("#errname").text("validated").css("color", "green");
    }
    else {
        $("#errname").text("Name should have more than 2 characters").css("color", "red");

    }
});

//surname validation
function validateSurname() {
    var surname = $("#surname").val();
    if (surname.length > 2) {
        return true;
    } else {
        return false;
    }
}
$("#surname").keyup(function () {
    if (validateSurname()) {
        $("#errsurname").text("validated").css("color", "green");
    }
    else {
        $("#errsurname").text("SurName should have more than 2 characters").css("color", "red");

    }
});

//email validation
function validateEmail() {
    var email = $("#email").val();
    // use reular expression
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(email)) {
        return true;
    } else {
        return false;
    }
}
$("#email").keyup(function () {
    if (validateEmail()) {
        $("#erremail").text("validated").css("color", "green");
    }
    else {
        $("#erremail").text("please enter valid mail").css("color", "red");

    }
});

//mobile validation
function validateMobile() {
    var mobile = $("#mobile").val();
    // use reular expression
    var reg = /^[1-9][0-9]{9}$/
    if (reg.test(mobile)) {
        return true;
    } else {
        return false;
    }
}
$("#mobile").keyup(function () {
    if (validateMobile()) {
        $("#errmobile").text("validated").css("color", "green");
    }
    else {
        $("#errmobile").text("please enter valid number").css("color", "red");

    }
});
//date validation
function validateDate() {
    var date = $("#date").val();
    // use reular expression

    if (date.trim() === "") {
        return true;
    } else {
        return false;
    }
}
$("#date").keyup(function () {
    if (validateDate()) {
        $("#errdate").text("validated").css("color", "green");
    }
    else {
        $("#errdate").text("Date must be valid").css("color", "red");

    }
});

//country validation
$("#country").on("change", function () {
    if ($("#country").val() === "") {
        $("#errcountry").text("The field is required").css("color", "red");
    } else {
        $("#errcountry").text("valid").css("color", "green");
    }
});

//state validation
$("#state").on("change", function () {
    if ($("#state").val() === "") {
        $("#errstate").text("The field is required").css("color", "red");
    } else {
        $("#errstate").text("valid").css("color", "green");
    }
});

//district validation
$("#district").on("change", function () {
    if ($("#district").val() === "") {
        $("#errdistrict").text("The field is required").css("color", "red");
    } else {
        $("#errdistrict").text("valid").css("color", "green");
    }
});
//checkboxes validation
var inputCheckboxes= $('input[name="check"]');
inputCheckboxes.each(function(index,checkbox){
    $(checkbox).on("change",function(){
        var checkedCheckBoxes= $('input[name="check"]:checked');
        if(checkedCheckBoxes.length===0)
        {
            $("#errcheckbox").text("The field is required").css("color", "red");

        }
        else{
            $("#errcheckbox").text("valid").css("color", "green");

        }
    })
});
//gender radio buttons validation

var inputRadioButtons= $('input[name="gender"]');
inputRadioButtons.each(function(index,radio){
    $(radio).on("change",function(){
        var checkedRadioButtons= $('input[name="gender"]:checked');
        if(checkedRadioButtons.length===0)
        {
            $("#errgender").text("The field is required").css("color", "red");

        }
        else{
            $("#errgender").text("valid").css("color", "green");

        }
    })
});

//yourself validation
function validateYourself() {
    var yourself = $("#yourself").val();
    if (yourself.length > 5) {
        return true;
    } else {
        return false;
    }
}
$("#yourself").keyup(function () {
    if (validateYourself()) {
        $("#erryourself").text("validated").css("color", "green");
    }
    else {
        $("#erryourself").text("Name should have more than 2 characters").css("color", "red");

    }
});







//function for validation
function validate() {
    var isValid = true;

    function validateField(input, errorElement, err) {
        if (input.val().trim() === "") {
            errorElement.text(err);
            isValid = false;
        } else {
            errorElement.text("");
        }
    }

    var nameInput = $("#name");
    var surnameInput = $("#surname");
    var emailInput = $("#email");
    var mobileInput = $("#mobile");
    var countryInput = $("#country");
    var stateInput = $("#state");
    var districtInput = $("#district");
    var dateInput = $("#date");
    var yourselfInput = $("#yourself");

    var errname = $("#errname");
    var errsurname = $("#errsurname");
    var erremail = $("#erremail");
    var errmobile = $("#errmobile");
    var errcountry = $("#errcountry");
    var errstate = $("#errstate");
    var errdistrict = $("#errdistrict");
    var errdate = $("#errdate");
    var erryourself = $("#erryourself");

    validateField(nameInput, errname, "The name field is Required");
    validateField(surnameInput, errsurname, "The surname is required");
    validateField(emailInput, erremail, "Email is required");
    validateField(mobileInput, errmobile, "Mobile no is Required");
    validateField(countryInput, errcountry, "Please select the Country");
    validateField(stateInput, errstate, "please select the State");
    validateField(districtInput, errdistrict, "Please select the District");
    validateField(dateInput, errdate, "Please select the Date");
    validateField(yourselfInput, erryourself, " Please Tell me about Yourself");

    var genderInputs = $('input[name="gender"]');
    var errgender = $("#errgender");
    var selectedGender = false;

    genderInputs.each(function () {
        if ($(this).is(":checked")) {
            selectedGender = true;
        }
    });

    if (!selectedGender) {
        errgender.text("Please select a gender");
        isValid = false;
    } else {
        errgender.text("");
    }

    var checkboxes = $('input[type="checkbox"][name="check"]');
    var errcheckbox = $("#errcheckbox");
    var selectedCheckboxes = false;

    checkboxes.each(function () {
        if ($(this).is(":checked")) {
            selectedCheckboxes = true;
        }
    });

    if (!selectedCheckboxes) {
        errcheckbox.text("Please select at least one hobby");
        isValid = false;
    } else {
        errcheckbox.text("");
    }

    return isValid;
}
