// // vertical taps
function openCM(evt, pro) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pro).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
 

// table & form
var selectedRow = null
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["emailAddress"] = document.getElementById("emailAddress").value;
    formData["items"] = document.getElementById("items").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["rdd"] = document.getElementById("rdd").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.emailAddress;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.items;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.qty;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.rdd;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML =  `<button class="btn1" onClick='onEdit(this)'><i class="fa-solid fa-pen-to-square"></i>Update</button> <button class="btn2" onClick='onDelete(this)'><i class="fa-solid fa-brush"></i>Delete</button>`;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("emailAddress").value = "";
    document.getElementById("items").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("rdd").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("emailAddress").value = selectedRow.cells[1].innerHTML;
    document.getElementById("items").value = selectedRow.cells[2].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[3].innerHTML;
    document.getElementById("rdd").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.emailAddress;
    selectedRow.cells[2].innerHTML = formData.items;
    selectedRow.cells[3].innerHTML = formData.qty;
    selectedRow.cells[4].innerHTML = formData.rdd;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("storeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}
