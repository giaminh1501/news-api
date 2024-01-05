if (userActive) {
    const todoList = document.getElementById("todo-list");
    const addBtn = document.getElementById("btn-add");
    const inputTask = document.getElementById("input-task");

    taskList();

    function taskList() {
        let html = "";

        taskArr.filter((task) => task.owner === userActive.username).forEach(task => {
            html += `<li class=${task.isDone ? "checked" : ""}>${task.task}<span class="close">X</span></li>`;
        });

        todoList.innerHTML = html;

        toggleTask();
        deleteTask();
    }

    function toggleTask() {
        document.querySelectorAll("#todo-list li").forEach(item => {
            item.addEventListener('click', function (e) {
                if (e.target !== item.children[0]) {
                    item.classList.toggle("checked");

                    const task = taskArr.find((taskItem) => userActive.username === taskItem.owner 
                    && taskItem.task === item.textContent.slice(0, -1));

                    task.isDone = item.classList.contains("checked") ? true : false;

                    saveToStorage("taskArr", taskArr);
                }
            });
        });
    }

    function deleteTask() {
        document.querySelectorAll("#todo-list .close").forEach(item => {
            item.addEventListener('click', function () {
                if (confirm("Are you sure to delete?")) {
                    const index = taskArr.findIndex((i) => userActive.username === i.owner 
                    && i.task === item.parentElement.textContent.slice(0, -1));

                    taskArr.splice(index, 1);

                    saveToStorage("taskArr", taskArr);

                    taskList();
                }
            });
        });
    }

    addBtn.addEventListener('click', function () {
        if (inputTask.value === "") {
            alert("Task must not be nulled!");
        } else {
            const task = new Task(inputTask.value, userActive.username, false);

            taskArr.push(task);

            saveToStorage("taskArr", taskArr);

            taskList();

            inputTask.value = "";
        }
    });
} else {
    alert("Please login to access this content!");

    window.location.assign("../index.html");
}
