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

const editTask = (e) => {
    const targetID = e.getAttribute("name");
    console.log(e);
    console.log(e.parentNode);    
    console.log(e.parentNode.parentNode.parentNode);
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]);
    // console.log(globalTaskData);
    saveToLocalStorage(); //function call
    // window.location.reload();
}