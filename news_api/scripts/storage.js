const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

const userArr = users.map((user) => parseUser(user));

let userActive = getFromStorage("userActive") ? parseUser(getFromStorage("userActive")) : null;

const tasks = getFromStorage("taskArr") ? getFromStorage("taskArr") : [];

const taskArr = tasks.map((task) => parseTask(task));

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function parseUser(data) {
    const user = new User(
        data.firstname,
        data.lastname,
        data.username,
        data.password,
        data.pageSize,
        data.category,
    );

    return user;
}

function parseTask(data) {
    const task = new Task(
        data.task,
        data.owner,
        data.isDone,
    );

    return task;
}