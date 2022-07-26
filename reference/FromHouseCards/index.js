const express = require('express');
const cors = require('cors');
// const houses = require('./controller')

const PORT = 4004
const app = express()
app.use(express.json());
app.use(cors());


const {         //destructuring allows not having to access further in the object,so can skip writing this, houses.getHouses. in the app.get 
    getHouses,
    deleteHouse, 
    createHouse, 
    updateHouse
} = require('./controller')

app.get('/api/houses', getHouses) 

app.post('/api/houses', createHouse)

app.put('/api/houses/:id',updateHouse)

app.delete('/api/houses/:id', deleteHouse) 


app.listen(PORT, () => console.log(`Server running on ${PORT}`))