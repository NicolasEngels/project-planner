const button = document.getElementById("create");

let tasks = [];

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

const display = (tasks) => {
    for (i in tasks){

        const newTask = document.createElement("div");
        newTask.classList.add('task');

        const taskTitle = document.createElement("h3");
        taskTitle.innerHTML = tasks[i].titleStocked;
        document.getElementById("title").value='';
        newTask.appendChild(taskTitle);

        const taskDescription = document.createElement("p");
        taskDescription.innerHTML = tasks[i].descrStocked;
        document.getElementById("description").value='';
        newTask.appendChild(taskDescription);

        const taskDeadline = document.createElement("p");
        taskDeadline.innerHTML = `in ` + tasks[i].timeRemainingStocked + ` days`;
        document.getElementById("date").value='';
        newTask.appendChild(taskDeadline);

        const taskMode = document.createElement("p");
        taskMode.innerHTML = tasks[i].modeStocked;
        newTask.classList.add(tasks[i].modeStocked.toString());
        newTask.appendChild(taskMode);


        document.getElementById("tasklist").appendChild(newTask);


        filtering();
    }
}

const sorting = () => {
    document.getElementById("tasklist").innerHTML="";
    if(sort.value === 'name'){
        tasks.sort((a, b) => a.titleStocked.localeCompare(b.titleStocked));
        display(tasks);
    }else{
        tasks.sort((a, b) => a.timeRemainingStocked - b.timeRemainingStocked);
        display(tasks);
    }
}


button.addEventListener('click', () => {

    const title = document.getElementById("title").value;
    const descr = document.getElementById("description").value;
    const mode = document.getElementById("toggle-mode").value;
    const deadlineTime = new Date(document.getElementById("date").value);
    const now = new Date();
    const timeRemaining = Math.floor((deadlineTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)+1);
 
    let stocked = {
        titleStocked : title,
        descrStocked : descr,
        timeRemainingStocked : timeRemaining,
        modeStocked : mode
    };tasks.push(stocked);

    sorting();
});

const sort = document.getElementById("sort");
sort.addEventListener('change', () => {
    sorting();
});

const filter = document.getElementById("filter");
filter.addEventListener('change', () => {
    filtering();
});

sorting();