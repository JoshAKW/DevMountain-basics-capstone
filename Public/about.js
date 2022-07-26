
const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const guideSelect = document.querySelector('#guide-select')
const reviewList = document.querySelector('#review-list')
const reviewComments = document.querySelector('#review-comments')

function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1) {
        alert ('You must enter your name')
        return
    }

    let userRating = document.querySelector('input[name="rating"]:checked').value
    let body = {
        name: nameInput.value, 
        rating: +userRating, 
        comments: reviewComments.value,
        guideId: guideSelect.value
    }

    axios.post('http://localhost:4004/review', body)
        .then(() => {
            guideSelect.value = 1
            nameInput.value = ''
            document.querySelector('#rating-one').checked = true
            getReview()
        })
}

function deleteCard(id) {
    axios.delete(`http://localhost:4004/review/${id}`)
        .then(() => getReview())
        .catch(err => console.log(err))
}

function getReview() {
    reviewList.innerHTML = ''

    axios.get('http://localhost:4004/review/')
        .then(res => {
            res.data.forEach(elem => {
                let guideCard = `<div class="guide-card">
                    <h2> ${elem.customer_name} ${elem.comments} ${elem.name}</h2>
                    <h3>Rating: ${elem.rating}/5</h3>
                    <button onclick="deleteCard(${elem['customer_name_id']})">Delete</button>
                    </div>
                `

                reviewList.innerHTML += guideCard
            })
        })
}

function getGuides() {
    axios.get('http://localhost:4004/guide')
        .then(res => {
            res.data.forEach(guide => {
                const option = document.createElement('option')
                option.setAttribute('value', guide['guides_name_id'])
                option.textContent = guide.name
                guideSelect.appendChild(option)
            })
        })
}

getGuides()
getReview()
form.addEventListener('submit', handleSubmit)



