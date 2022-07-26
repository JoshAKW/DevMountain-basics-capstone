require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const { getExpeditions,
    deleteExpedition,
    createExpedition,
    updateExpedition,
    seed, getGuides,
    getReview,
    createReview,
    deleteReview } = require('./controller.js')

app.use(express.json())
app.use(cors())




//Following for expedition page



app.get('/api/expeditions', getExpeditions) 

app.post('/api/expeditions', createExpedition)

app.put('/api/expeditions/:id',updateExpedition)

app.delete('/api/expeditions/:id', deleteExpedition) 


// DEV
app.post('/seed', seed)

// Guides
app.get('/guide', getGuides)

// Customer
app.post('/review', createReview)
app.get('/review', getReview)
app.delete('/review/:id', deleteReview)




const port = process.env.PORT || 4004

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })