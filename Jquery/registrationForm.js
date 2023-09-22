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

//function for retreiving data 
function fun1()
{
    formdata={};
    formdata["name"]=$("#name").val();
    formdata["surname"]=$("#surname").val();
    formdata["email"]=$("#email").val();
    formdata["mobile"]=$("#mobile").val();
    formdata["gender"]=$('input[name="gender"]:checked').val();
    formdata["country"]=$("#country").val();
    formdata["state"]=$("#state").val();
    formdata["district"]=$("#district").val();
    formdata["date"]=$("#date").val();
    var checkedValues = [];
    var inputElements = $('input[name="check"]');
     for (var i = 0; i < inputElements.length; i++) {
          if (inputElements.eq(i).prop('checked')) {
        checkedValues.push(inputElements.eq(i).val());
    }
   }

    
    formdata["checkedvalues"] = checkedValues;
    formdata["yourself"]=$("#yourself").val();

 return formdata;


}

//insert data
function insertnewrecord(data)
{
    newRow=$("<tr>")
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
    $('<td>').html(data.checkedvalues.join(", ")).appendTo(newRow);
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
    hobbies.each(function (radio) {
        radio.prop('checked',false);
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
    $('input[name="gender"]').filter(function() {
        return $(this).val() === gender;
    }).prop("checked", true);

    $("#country").val(selectedRow.find("td:eq(5)").text());
    coun(); // Populate the state dropdown based on the selected country
    $("#state").val(selectedRow.find("td:eq(6)").text());
    stat(); // Populate the district dropdown based on the selected state
    $("#district").val(selectedRow.find("td:eq(7)").text());

    // set the date in the correct format
    var dateValue = new Date(selectedRow.find("td:eq(8)").text());
    var formattedDate = dateValue.getFullYear() + "-" + ("0" + (dateValue.getMonth() + 1)).slice(-2) + "-" + ("0" + dateValue.getDate()).slice(-2);
    $("#date").val(formattedDate);


    var checkedValues = selectedRow.find("td:eq(9)").text().split(", ");
    $('input[type="checkbox"][name="check"]').prop("checked", false); // Uncheck all checkboxes
    checkedValues.forEach(function(value) {
        $('input[type="checkbox"][name="check"][value="' + value + '"]').prop("checked", true);
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

    selectedRow.find("td:eq(9)").html(data.checkedvalues.join(", "));
    selectedRow.find("td:eq(10)").html(data.yourself);


    const age = calculateAge(data.date);
    selectedRow.find("td:eq(11)").html(age);
    
    
    selectedRow = null;

   rersetform();
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
    function stat()
    {
        var selectedState=$("#state").val();
        var district=$("#district");
        
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

        var stateSelected=districts[selectedState];
        
            stateSelected.forEach((d)=>{
            var option=$("<option>").val(d).text(d);
            district.append(option);
        })
    }
    


//function for validation
function validate() {
    var isValid = true;
    var errname = document.getElementById("errname");
    var errsurname = document.getElementById("errsurname");
    var erremail = document.getElementById("erremail");
    var errmobile = document.getElementById("errmobile");
    var errcountry = document.getElementById("errcountry");
    var errstate = document.getElementById("errstate");
    var errdistrict = document.getElementById("errdistrict");
    var errdate = document.getElementById("errdate");
    var erryourself = document.getElementById("erryourself");

    var nameInput = document.getElementById("name");
    var surnameInput = document.getElementById("surname");
    var emailInput = document.getElementById("email");
    var mobileInput = document.getElementById("mobile");
    var countryInput = document.getElementById("country");
    var stateInput = document.getElementById("state");
    var districtInput = document.getElementById("district");
    var dateInput = document.getElementById("date");
    var yourselfInput = document.getElementById("yourself");

    function validateField(input, errorElement, err) {
        if (input.value.trim() === "") {
            errorElement.innerText = err;
            isValid = false;
        } else {
            errorElement.innerText = "";
        }
    }

    validateField(nameInput, errname, "The name field is Required");
    validateField(surnameInput, errsurname, "The surname is required");
    validateField(emailInput, erremail, "Email is required");
    validateField(mobileInput, errmobile, "Mobile no is Required");
    validateField(countryInput, errcountry, "Please select the Country");
    validateField(stateInput, errstate, "please select the State");
    validateField(districtInput, errdistrict, "Please select the District");
    validateField(dateInput, errdate, "Please select the Date");
    validateField(yourselfInput, erryourself, " Please Tell me about Yourself");

    //

    //
    var genderInputs = document.querySelectorAll('input[name="gender"]');
    var errgender = document.getElementById("errgender");
    var selectedGender = false;

    genderInputs.forEach(function (radio) {
        if (radio.checked) {
            selectedGender = true;
        }
    });

    if (!selectedGender) {
        errgender.innerText = "Please select a gender";
        isValid = false; // Mark the form as invalid
    } else {
        errgender.innerText = "";
    }

    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="check"]');
    var errcheckbox = document.getElementById("errcheckbox");
    var selectedCheckboxes = false;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedCheckboxes = true;
        }
    });

    if (!selectedCheckboxes) {
        errcheckbox.innerText = "Please select at least one hobby";
        isValid = false; // Mark the form as invalid
    } else {
        errcheckbox.innerText = "";
    }



    return isValid;
}
