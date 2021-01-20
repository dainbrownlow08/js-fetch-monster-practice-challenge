let monstersURL = 'http://localhost:3000/monsters?_limit=50&_page='
let max = 0
let page = 1

renderForm()
getFiftyMonsters()
addListeners()

// DATA
// GET
function getFiftyMonsters(){
    fetch(monstersURL+`${page}`)
    .then(res => res.json())
    .then(monsters => {
        renderMonsters(monsters)
        getMax()
    })
}

function getMax(){
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(monsters => {
        let total = monsters.length
        if(total%50 === 0){
            max = total/50
        }else{
            max = Math.floor(total/50 + 1)
        }
    })
}

//POST
function postMonster(monster){
    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(monster => { 
        getFiftyMonsters()
    })
    .catch(error => console.log(error))
}

// DOM
function renderMonsters(arr){
    let container = document.getElementById('monster-container')
    container.innerHTML = ''
    arr.forEach(monster => {
        let div = document.createElement('div')
        let h2 = document.createElement('h2')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')

        h2.textContent = monster.name
        h3.textContent = monster.age
        p.textContent = monster.description

        div.append(h2,h3,p)
        container.appendChild(div)
    })
}

function renderForm(){
    let container = document.getElementById('create-monster')
    let form = document.createElement('form')
    let nameInput = document.createElement('input')
    let ageInput = document.createElement('input')
    let descriptionInput = document.createElement('input')
    let createButton = document.createElement('button')

    nameInput.id = 'name'
    nameInput.placeholder = 'name...'
    ageInput.id = 'age'
    ageInput.placeholder = 'age...'
    descriptionInput.id = 'description'
    descriptionInput.placeholder = 'description...'
    createButton.textContent = "Create"
    createButton.addEventListener('click',handleSubmit)

    form.append(nameInput,ageInput,descriptionInput,createButton)
    container.appendChild(form)

}

// HANDLERS

function handleSubmit(e){
    e.preventDefault()
    let monster = {
        name: e.target.parentElement.name.value,
        age: e.target.parentElement.age.value,
        description: e.target.parentElement.description.value
    }
    postMonster(monster)
}

function handleNextPage(){
    if (page + 1 > max){
        page = 1
    }else{
        page += 1  
    }
    getFiftyMonsters()
}

function handlePrevPage(){
    if(page - 1 === 0){
        page = max
    }else{
        page -= 1
    }
    getFiftyMonsters()
}

// Listeners

function addListeners(){
    let forward = document.getElementById('forward')
    let back = document.getElementById('back')

    forward.addEventListener('click',handleNextPage)
    back.addEventListener('click',handlePrevPage)
}
