let globalTaskData = [];
taskContents = document.getElementById("taskContents");

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url:document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value
    };

    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

   globalTaskData.push(newTaskDetails)
   saveToLocalStorage()  //function call
}



   
    const generateTaskCard = ({id, url, title,type, description}) => {        //object destructuring
       return( `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-end"> 
                            <button type="button" class="btn btn-outline-link"  name=${id} onclick="editTask(this)">
                                <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
                            </button>
                            <button type="button" class="btn btn-outline-link" name=${id} onclick="deleteTask(this)">
                                <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i> 
                            </button>
                        </div>
                    </div>
                        <img src=${url} class="card-img-top" alt="Task image">
                        <div class="card-body ">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                            <span class="badge bg-dark">${type}</span>
                        </div>
                            <div class="card-footer">
                                <button class="btn btn-outline-dark float-end">OPEN TASK</button>
                            </div>
                </div>
            </div>`)
}


//to store data
const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({tasks: globalTaskData}));
} 

//to display the data
const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky")); //.parse method converts string into object
    console.log(localStorageCopy);
    if(localStorageCopy) {
        globalTaskData = localStorageCopy.tasks;
    }
    console.log(globalTaskData);
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
} 

//delete card Function

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID); //updates value
    console.log(globalTaskData);
    saveToLocalStorage(); //function call
    window.location.reload();
}

//edit function
const editTask = (e) => {
    const targetID = e.getAttribute("name");
    console.log(e);
    console.log(e.parentNode);    
    console.log(e.parentNode.parentNode.parentNode.childNodes); // prints all the childnodes  //(note:print chidlnodes to check their index)
    
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]); //card-header  
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]); //card-img-top
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]); //card-body
    
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true");   //Editing content of card-header
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true");   //Editing content of card-img-top
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true");   //Editing content of card-body

    console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1]); //targetin' open task to chnages its content to save changes
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("border","1px solid white") //stlying css using js 
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
}
const saveEditTask =(e) =>{
    const targetId = e.getAttribute("name")
    const taskTitle = e.parentNode.parentNode.childNodes[5].childNodes[1]
    const taskDescription = e.parentNode.parentNode.childNodes[5].childNodes[3]
    const taskType = e.parentNode.parentNode.childNodes[5].childNodes[5]
    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    }
    let globalTaskCopy = globalTaskData
    globalTaskCopy = globalTaskCopy.map((task)=>
        task.id === targetId
        ? {
            id: task.id,
            url: task.url,
            title: updateData.taskTitle,
            description: updateData.taskDescription,
            type: updateData.taskType
         }
        : task

    )

   globalTaskData = globalTaskCopy
   saveToLocalStorage()
    

    e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","false")
    e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","false")
    e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","false")
    e.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "OPEN TASK"
    e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","openModal(this)")
    e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("data-bs-toggle","modal");
    e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("data-bs-target","#openTask");
    
}

const openModal =(e)=>{
    const targetId = e.getAttribute("name")
    const getTask = globalTaskData.filter((e) => e.id===targetId)
    modalContents.innerHTML =openModalDispaly(getTask[0])
}

const openModalDispaly=({id, url, title, type, description})=>{
const date = new Date(parseInt(id));
console.log(date)
return `
<img class="card-img-top mb-3 rounded-lg"src=${url} alt="Task image">
<strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
 <h3 class="card-title">${title}</h5>
 <p class="card-text">${description}</p>
 <span class="badge bg-primary">${type}</span>`
}
