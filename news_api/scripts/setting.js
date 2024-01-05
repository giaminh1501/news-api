if (userActive) {
    const inputPage = document.getElementById("input-page-size");
    const inputCategory = document.getElementById("input-category");
    const submitBtn = document.getElementById("btn-submit");

    submitBtn.addEventListener('click', function () {
        if (validation()) {
            userActive.pageSize = Number.parseInt(inputPage.value);
            userActive.category = inputCategory.value;

            saveToStorage("userActive", userActive);

            const index = userArr.findIndex((item) => item.username === userActive.username);

            userArr[index] = userActive;

            saveToStorage("userArr", userArr);

            alert("Changes saved!");
            inputPage.value = "";
            inputCategory.value = "General";
        }
    });

    function validation() {
        isValid = true;

        if (Number.isNaN(Number.parseInt(inputPage.value))) {
            alert("Invalid page size!");
            isValid = false;
        }

        return isValid;
    }
}
