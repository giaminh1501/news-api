const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMsg = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

Home();

function Home() {
    if (userActive) {
        loginModal.style.display = "none";
        mainContent.style.display = "block";

        welcomeMsg.textContent = `Welcome ${userActive.firstname}!`;
    } else {
        loginModal.style.display = "block";
        mainContent.style.display = "none";
    }
}

logoutBtn.addEventListener('click', function () {
    if (confirm("Are you sure to logout?")) {
        userActive = null;

        saveToStorage("userActive", userActive);

        alert("Logged out!");

        Home();
    }
});