let base_url = "http://localhost/or/handler.php";

function fillIt() {
    var tab = document.getElementById('regData');
    var table = document.getElementById('regData').getElementsByTagName('tbody')[0];
    var sh = document.getElementById('memberS');

    $.get(base_url + "?req=getD", function(data, success) {
        if (data.length == 0) {
            sh.style.visibility = "visible";
            tab.style.visibility = "hidden";
        } else {
            sh.style.visibility = "hidden";
            tab.style.visibility = "visible";

            for (i = 0; i < data.length; i++) {
                var row = table.insertRow();
                var c1 = row.insertCell(0);
                var c2 = row.insertCell(1);
                var c3 = row.insertCell(2);
                var c4 = row.insertCell(3);
                c1.innerHTML = data[i].fname;
                c2.innerHTML = data[i].email;
                c3.innerHTML = data[i].gender;
                c4.innerHTML = data[i].about;
            }
        }
    });
};

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

$(document).on('submit', '.regForm', function(e) {
    e.preventDefault();

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var gender = document.getElementById('gender');
    var about = document.getElementById('about');
    var terms = document.getElementById('terms');

    if (mailformat.test(email.value) == false || name.value.length <= 3 || about.value.length <= 2 || terms.checked == false) {
        alert("Form was not properly Filled");
    } else {
        var obj = JSON.stringify({ fname: name.value, email: email.value, gender: gender.value, about: about.value });
        var url = base_url + "?req=add&object=" + obj;
        $.get(url, function(data, success) {
            if (data != "Form successfully submitted") {
                alert("Failed to Submit form.. try again!!!");
            }
        });

        var show = document.getElementById('showon');
        show.style.visibility = "visible";
        fillIt();
    }
});