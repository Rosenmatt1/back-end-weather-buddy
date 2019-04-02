const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)

const cors = require('cors')
const parser = require('body-parser')
const dotenv = require("dotenv").config()

app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
  knex('alerts')
    .then((alerts) => {
      res.status(200).send(alerts);
    })
    .catch((err) => {
      next(err);
    });
})

app.get('/user/:id', (req, res, next) => {
  knex('alerts')
    .where('id', req.params.id).returning('*')
    .then((alert) => {
      res.status(200).send(alert)
    })
    .catch((err) => {
      next(err);
    })
})

app.post('/create/', (req, res, next) => {
  knex('users').insert(req.body).returning('*')
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
})

app.post('/alert/:UserID', (req, res, next) => {
  knex('alerts').insert(req.body).returning('*')
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
})

app.patch('/alert/:alertID', (req, res, next) => {
  knex('alerts').update(req.body).where('id', req.params.id).returning('*')
    .then((alert) => {
      res.status(200).send(alert);
    })
    .catch((err) => {
      next(err);
    });
})

// app.patch('/reminders/:id', (req, res, next) => {
//   knex('reminders')
//     .where({ 'id': req.params.id })
//     .update({ name: "Sweep" })
//     .returning('*')
//     .then((rows) => {
//       res.send(rows);
//     })
//     .catch((err) => {
//       next(err);
//     });
// })

app.delete('/alert/:alertID', (req, res, next) => {
  console.log("req body", req.body)
  knex('alerts').del().where('id', req.params.id).returning('*')
    .then((alert) => {
      res.status(200).send("Delete Successful");
    })
    .catch((err) => {
      next(err);
    });
})



// app.get('/:tag', (req, res, next) => {
//   const tag = req.params.tag
//   if (data.tags.includes(tag)) {
//     const matching = data.songs.filter(song => song.tags.includes(tag))
//     res.status(200).send(matching)
//   } else {
//     res.status(404).send('No match to your tag')
//   }
// })

// app.get("/jokes/:tag", (req, res, next) => {
//   const tag = req.params.tag
//   const matching = data.jokes.filter(joke => joke.categories.includes(tag))
//   data.tags.includes(tag)
//     ? res.status(200).send(matching)
//     : res.status(404).send("Told you not to mess with the Chuck")
// })


// app.get('/', (req, res) => {
//   return knex('chores')
//     .then(chores => {
//       const getHouseDuty = chores.map(chore => {
//         return knex('roommates')
//           .join('chores', 'roommates.id', 'chores.roommate_id')
//           .where('roommates.id', chore.roommate_id)
//           .select('roommates.name', 'chores.chore')
//       })
//       return Promise.all(getHouseDuty).then(result => res.send(result))
//     })
// })

app.use(function (req, res, next) {
  res.status(404).send("That doesnot exist!")
})

app.use(function (req, res, next) {
  res.status(500).send("Something on our end is broken, please try back!")
})

app.listen(port, () => console.log(`Weather Alerts on ${port}!`))