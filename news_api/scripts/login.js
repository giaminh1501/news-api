const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");

submitBtn.addEventListener('click', function () {
    const validate = validation()

    if (validate) {
        const user = userArr.find((item) => inputUsername.value === item.username
            && inputPassword.value === item.password);

        if (user) {
            alert("Login success!");

            saveToStorage("userActive", user);

            window.location.assign("../index.html");
        } else {
            alert("Invalid login credentials. Please check again!");
        }
    }
});

function validation() {
    isValid = true;

    errMsg = "";

    if (inputUsername.value === "") {
        errMsg += "Username cannot be nulled!\n";
        isValid = false;
    }

    if (inputPassword.value === "") {
        errMsg += "Password cannot be nulled!\n";
        isValid = false;
    }

    if (isValid === false) {
        alert(errMsg);
    }

    return isValid;
}