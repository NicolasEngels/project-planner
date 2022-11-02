const button = document.getElementById("create");

const filtering = () => {
    const taskList = document.querySelectorAll(".task");
    for (const task of taskList){
        if(task.classList.contains(filter.value)){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    }
}

const sorting = () => {
    if(sort.value === 'name'){
        console.log('namo');
    }else{
        console.log('dato');
    }
}

button.addEventListener('click', () => {

    const newTask = document.createElement("div");
    newTask.classList.add('task');

    const taskTitle = document.createElement("h3");
    taskTitle.innerHTML = document.getElementById("title").value;
    newTask.appendChild(taskTitle);

    const taskDescription = document.createElement("p");
    taskDescription.innerHTML = document.getElementById("description").value;
    newTask.appendChild(taskDescription);

    const deadlineTime = new Date(document.getElementById("date").value)
    const now = new Date();
    const taskDeadline = document.createElement("p");
    taskDeadline.innerHTML = `in ` + Math.floor((deadlineTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))+1 + ` days`;
    newTask.appendChild(taskDeadline);

    const taskMode = document.createElement("p");
    taskMode.innerHTML = document.getElementById("toggle-mode").value;
    newTask.classList.add(document.getElementById("toggle-mode").value.toString());
    newTask.appendChild(taskMode);

    document.getElementById("taskPlace").appendChild(newTask);
    filtering();
});

const sort = document.getElementById("sort");
sort.addEventListener('change', () => {
    sorting();
});

const filter = document.getElementById("filter");
filter.addEventListener('change', () => {
    filtering();
});



const taskList = document.querySelectorAll(".task");
const taskNameList = [];
for (const task of taskList){
    taskNameList.push(task.children[0].textContent);
}
console.log(taskNameList)
console.log(taskNameList.sort());