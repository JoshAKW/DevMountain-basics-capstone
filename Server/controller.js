const {CONNECTION_STRING} = process.env;
const Sequelize =require("sequelize");
const expeditions = require('./db.json') 
let globalId = 4


  const  getExpeditions = (req, res) => res.status(200).send(expeditions)

  const  createExpedition = (req,res) => {
      let newExpedition = {...req.body,id:globalId}
      expeditions.push(newExpedition)
      res.status(200).send(expeditions)
      globalId++
  }
  

    const updateExpedition = (req,res) => {
      const findExpeditionId = (expedition) => {
        return +expedition.id === +req.params.id
      }
      const expeditionId = expeditions.findIndex(findExpeditionId)
      if (expeditionId != -1){
    
      if(req.body.type === 'plus'){
      expeditions[expeditionId].partySize += 1
      } else if(expeditions[expeditionId].partySize >= 1){
        expeditions[expeditionId].partySize -= 1
      }
      else {
        expeditions[expeditionId].partySize = 1
      }
      }
      res.status(200).send(expeditions)
      }

      
  const deleteExpedition = (req,res) => {

      const findExpeditionId = (expedition) => {
        return +expedition.id === +req.params.id
      }
      const expeditionId = expeditions.findIndex(findExpeditionId)
      if (expeditionId != -1){
        expeditions.splice(expeditionId,1)
        res.status(200).send(expeditions)
      }
    }


// This section is to seed the database for the homepage

const sequelize = new Sequelize(CONNECTION_STRING, {  //telling sql that we are going to be sending a postgress
    dialect: "postgres",
    dialectOptions: {                            //want to send http requests also other set up stuff
       ssl: {
        rejectUnauthorized: false 
       }
    }
});

module.exports = {

    getExpeditions,
    createExpedition,
    updateExpedition,
    deleteExpedition,

    getGuides: (req,res) => {
        sequelize.query(`SELECT * FROM guides_name `)
        .then((dbResult) => { res.status(200).send(dbResult[0]); })
        .catch((error) => console.log(error));
    },

        createReview: (req,res) => {
        const {name, rating, comments, guideId} =  req.body;


        sequelize.query(`INSERT INTO customer_name (name, rating, comments, guides_name_id)
        VALUES('${name}', ${rating},'${comments}','${guideId}')
        RETURNING *;`)
        .then((dbResult) => res.status(200).send(dbResult[0]))
        .catch((error) => console.log(error));
    },
    
    getReview: (req,res) => {  
        sequelize.query(`
        SELECT customer_name.customer_name_id, customer_name.name as customer_name, customer_name.rating, guides_name.name AS name, comments
        FROM customer_name
        JOIN guides_name ON customer_name.guides_name_id = guides_name.guides_name_id ;`)
        .then((dbResult) => {
            // console.log(dbResult);
            res.status(200).send(dbResult[0]);
        })
        .catch((error) => console.log(error));
    },

    deleteReview: (req,res) => {
        const {id} = req.params
        sequelize.query(`DELETE
        FROM customer_name
        WHERE customer_name_id = ${id};`)
        .then((dbResult) => {
            // console.log(dbResult);
            res.status(200).send(dbResult[0]);
        })
        .catch((error) => console.log(error));

    },




    seed: (req, res) => {
        sequelize.query(`
            drop table if exists customer_name;
            drop table if exists guides_name;


            create table guides_name (
                guides_name_id serial primary key, 
                name varchar (100)
            );

             create table customer_name (
            customer_name_id serial primary key, 
            name varchar(100), 
            comments varchar,
            rating integer, 
            guides_name_id integer references guides_name(guides_name_id)
        );

            insert into guides_name (name)
            values ('Mark Watney'),
            ('Joseph Cooper'),
            ('Han Solo'),
            ('Yuri Gagarin'),
            ('Laika'),
            ('Edgar Rice Burroughs'),
            ('Ben Bova'),
            ('John Shephard'),
            ('Adam Steltzner'),
            ('Valentina Tereshkova'),
            ('Sally Ride');



            `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}

// seed section ends