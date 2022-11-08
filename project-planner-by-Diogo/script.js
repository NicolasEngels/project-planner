
const taskForm = document.getElementById('new_task')
const taskContainer = document.getElementById('task_container')
const selectSorting = document.getElementById('sorting')
const selectFiltering = document.getElementById('filtering')

const taskList = []

let baseId = 0


// console.log(JSON.parse(lsTasks)[0])


// JSON.parse(lsTasks).forEach((test) => {
// 	console.log(test)
// })

const sortFunction  = (a,b)  =>  {  
    let dateA = new Date(a.due_date).getTime()
    let dateB = new Date(b.due_date).getTime()
    return dateA > dateB ? 1 : -1;  
}




const generateCard = (taskData) => {
	console.log(taskData)
	const taskCard = document.createElement('div')
	const taskDelete = document.createElement('div')
	const taskHeader = document.createElement('div')
	const taskTitle = document.createElement('h3')
	const line = document.createElement('hr')
	const taskDesc = document.createElement('p')
	const taskSelect = document.createElement('select')
	const newOptionOne = new Option('todo','todo')
	const newOptionTwo = new Option('doing','doing')
	const newOptionThree = new Option('done','done')

	taskSelect.add(newOptionOne,undefined)
	taskSelect.add(newOptionTwo,undefined)
	taskSelect.add(newOptionThree,undefined)

	taskSelect.value = taskData.status

	taskSelect.addEventListener('change', (event) => {
		// Change the value in the array
		taskToUpdate = taskList.filter(obj =>  obj.taskId === taskData.taskId )
		let i = taskList.indexOf(taskToUpdate[0])
		taskList[i].status = event.target.value
		localStorage.setItem('Tasks', JSON.stringify(taskList));

	})

	taskCard.classList.add('task')
	taskDelete.addEventListener('click', (event) => {
		event.target.parentElement.remove()

	})
	taskDelete.classList.add("delete")
	taskDelete.innerText = "X"


	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate = new Date();
	const secondDate = new Date(taskData.due_date);

	const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));

	taskHeader.innerText = `task due in ${diffDays} days`
	taskTitle.innerText = taskData.title
	taskDesc.innerText = taskData.description



	taskCard.append(taskDelete, taskHeader, taskTitle, line, taskDesc, taskSelect)
	taskContainer.append(taskCard)
}


const generateCards = (cardsData) => {
	console.log(cardsData)
	for (var i = 0; i < cardsData.length; i++) {
		console.log("test")
		generateCard(cardsData[i])
	}
}

const lsTasks = localStorage.getItem('Tasks');

generateCards(JSON.parse(lsTasks))





taskForm.addEventListener('submit', (event) => {
	event.preventDefault()
	let formData = Object.fromEntries(new FormData(taskForm));
	formData.status = "todo"
	formData.taskId = baseId
	baseId ++



	taskContainer.innerHTML = ""
	taskList.push(formData)

	localStorage.setItem('Tasks', JSON.stringify(taskList));
	generateCards(taskList.sort(sortFunction))
	
})

selectSorting.addEventListener('change', (event) => {
	if(event.target.value === "name"){
		taskContainer.innerHTML = ""
		generateCards(taskList.sort((a, b) => a.title.localeCompare(b.title)))
	}else{
		taskContainer.innerHTML = ""
		generateCards(taskList.sort(sortFunction))
	}
})


selectFiltering.addEventListener('change', (event) => {
	if(event.target.value === "todo"){
		console.log(taskList)
		taskContainer.innerHTML = ""
		generateCards(taskList.filter(obj =>  obj.status === "todo" ))
	}else if(event.target.value === "doing" ){
		taskContainer.innerHTML = ""
		generateCards(taskList.filter(obj =>  obj.status === "doing" ))
	}else if(event.target.value === "done" ){
		taskContainer.innerHTML = ""
		generateCards(taskList.filter(obj =>  obj.status === "done" ))
	}else{

	}
})

