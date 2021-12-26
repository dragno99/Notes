let btnAdd = document.getElementById('btnAdd');
showNotes();
btnAdd.addEventListener('click' , function(){
    let txtArea = document.getElementById('txtArea');
    const txt = txtArea.value;
    if(txt){
        addToLocalStorage(txt);
        txtArea.value = "";
    }
});

// function to add item in local storage

function addToLocalStorage(txt){
    let notesObj = localStorage.getItem('notes');
    if(notesObj){
        notesObj = JSON.parse(notesObj);
    }
    else notesObj = [];
    notesObj.push(txt);
    notesObj = JSON.stringify(notesObj);
    localStorage.setItem('notes' , notesObj);
    showNotes();
}

// function to show notes

function showNotes(){
    let target = document.getElementById('main-container');
    let notesObj = localStorage.getItem('notes');
    if(notesObj == null){
        notesObj = [];
    }
    else notesObj = JSON.parse(notesObj);
    let data = "";
    for(let i=notesObj.length-1;i>=0;i--){
        data += `<div class="card my-3 mx-1" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Note ${i+1}</h5>
          <p class="card-text mx-2">${notesObj[i]}</p>
          <a href="#" id = "${i}" onclick="deleteFromLocalStorage(this.id)" class="btn btn-secondary">Delete</a>
        </div>
      </div>`
    }
    if(notesObj.length === 0){
        data = 'Add something to show...'
    }
    target.innerHTML = data;
}

// function to delete a single note using its id

function deleteFromLocalStorage(index){
    let notesObj = localStorage.getItem('notes');
    notesObj = JSON.parse(notesObj);
    notesObj.splice(index , 1);
    notesObj = JSON.stringify(notesObj);
    localStorage.setItem('notes' , notesObj);
    showNotes();
}

// add event listener to search button

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('input' , function(e){
    const value = e.target.value;
    if(value.length === 0){
        showNotes();
        return;
    }
    let target = document.getElementById('main-container');
    let notesObj = localStorage.getItem('notes');
    if(notesObj == null){
        notesObj = [];
    }
    else notesObj = JSON.parse(notesObj);
    let data = "";
    for(let i=notesObj.length-1;i>=0;i--){
        if(notesObj[i].includes(value)){
            data += ` <div class="card my-3 mx-1" style="width: 18rem">
                <div class="card-body">
                <h5 class="card-title">Card ${i+1}</h5>
                <p class="card-text mx-2">${notesObj[i]}</p>
                <a href="#" id = "${i}" onclick="deleteFromLocalStorage(this.id)" class="btn btn-secondary">Delete</a>
                </div>
            </div>`
        }
    }
    if(data.length == 0){
        data = 'No match found...'
    }
    target.innerHTML = data;
});

