const houses = require('./db.json')
let globalId = 4


  const  getHouses = (req, res) => res.status(200).send(houses)

  const  createHouse = (req,res) => {
      let newHouse = {...req.body,id:globalId}
      houses.push(newHouse)
      res.status(200).send(houses)
      globalId++
  }
  

    const updateHouse = (req,res) => {
      const findHouseId = (house) => {
        return +house.id === +req.params.id
      }
      const houseId = houses.findIndex(findHouseId)
      if (houseId != -1){
    
      if(req.body.type === 'plus'){
      houses[houseId].price += 10000
      } else if(houses[houseId].price >= 5000){
        houses[houseId].price -= 10000
      }
      else {
        houses[houseId].price = 0
      }
      }
      res.status(200).send(houses)
      }

      
    

      
  const deleteHouse = (req,res) => {

      const findHouseId = (house) => {
        return +house.id === +req.params.id
      }
      const houseId = houses.findIndex(findHouseId)
      if (houseId != -1){
        houses.splice(houseId,1)
        res.status(200).send(houses)
      }
    }



module.exports = {
  getHouses,
  createHouse,
  updateHouse,
  deleteHouse
}





