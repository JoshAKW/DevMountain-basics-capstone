const expeditionsContainer = document.querySelector('#expeditions-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/expeditions`

const expeditionsCallback = ({ data: expeditions }) => displayExpeditions(expeditions)
const errCallback = err => console.log(err)

const getAllExpeditions = () =>{ 
    axios.get(baseURL)
    .then(expeditionsCallback)
    .catch(errCallback)
}

const createExpedition = body =>{
 axios.post(baseURL, body)
 .then(expeditionsCallback)
 .catch(errCallback)
}

const deleteExpedition = id =>{ 
axios.delete(`${baseURL}/${id}`)
.then(expeditionsCallback)
.catch(errCallback)
}

const updateExpedition = (id, type) =>{ 
axios.put(`${baseURL}/${id}`, {type})
.then(expeditionsCallback)
.catch(errCallback)
}

function submitHandler(e) {
    e.preventDefault()

    let destination = document.querySelector('#destination')
    let partySize = document.querySelector('#partySize')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        destination: destination.value,
        partySize: partySize.value, 
        imageURL: imageURL.value,
    }

    createExpedition(bodyObj)

    destination.value = ''
    partySize.value = ''
    imageURL.value = ''
}

function createExpeditionCard(expedition) {
    const expeditionCard = document.createElement('div')
    expeditionCard.classList.add('expedition-card')

    expeditionCard.innerHTML = `<img alt='expedition cover image' src=${expedition.imageURL} class="expedition-cover-image"/>
    <p class="destination">${expedition.destination}</p>
    <div class="btns-container">
        <button onclick="updateExpedition(${expedition.id}, 'minus')">-</button>
        <p class="expedition-partySize"> Party size of ${expedition.partySize}</p>
        <button onclick="updateExpedition(${expedition.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteExpedition(${expedition.id})">delete</button>
    `


    expeditionsContainer.appendChild(expeditionCard)
}

function displayExpeditions(arr) {
    expeditionsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createExpeditionCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllExpeditions()