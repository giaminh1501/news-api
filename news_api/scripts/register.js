const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

submitBtn.addEventListener('click', function () {
    const user = new User(
        inputFirstname.value,
        inputLastname.value,
        inputUsername.value,
        inputPassword.value,
    );

    const validate = validation(user)

    if (validate) {
        if (confirm("Proceed to registration?")) {
            userArr.push(user);

            saveToStorage("userArr", userArr);

            alert("Registration success!");

            window.location.assign("../pages/login.html");
        }
    }
});

function validation(user) {
    isValid = true;

    errMsg = "";

    if (user.firstname === "") {
        errMsg += "First name cannot be nulled!\n";
        isValid = false;
    }

    if (user.lastname === "") {
        errMsg += "Last name cannot be nulled!\n";
        isValid = false;
    }

    if (user.username === "") {
        errMsg += "Username cannot be nulled!\n";
        isValid = false;
    }

    if (user.password === "") {
        errMsg += "Password cannot be nulled!\n";
        isValid = false;
    }

    if (inputPasswordConfirm.value === "") {
        errMsg += "Please confirm your password!\n";
        isValid = false;
    }

    for (let i = 0; i < userArr.length; i++) {
        if (user.username === userArr[i].username) {
            errMsg += "Username is already existed!\n";
            isValid = false;
            break;
        }
    }

    if (user.password !== inputPasswordConfirm.value) {
        errMsg += "Confirmed password must be similar to the password!\n";
        isValid = false;
    }

    if (user.password.length <= 8) {
        errMsg += "Password must have more than 8 characters!\n";
        isValid = false;
    }

    if (isValid === false) {
        alert(errMsg);
    }

    return isValid;
}