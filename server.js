const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)

const cors = require('cors')
const parser = require('body-parser')
const dotenv = require("dotenv").config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const myNumber = process.env.MY_NUMBER

app.use(parser.json())
app.use(cors())

const client = require('twilio')(accountSid, authToken)

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
    .where('user_id', req.params.id)
    .then((alerts) => {
      res.status(200).send(alerts)
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

//for capstone doign the text in a post request,but will use a chron function in the future https://www.npmjs.com/package/node-schedule  a function that runs every night and maps over all alerts and sends text if meets criteria"

app.post('/alert', (req, res, next) => {
  knex('alerts').insert(req.body).returning('*')
    .then((alert) => {
      res.status(200).send(alert);
      console.log("Alerter1", alert)
      return alert
    })
    .then(alerter => {
      console.log("Alerter2", alerter)
      return knex('users')
        .where('users.id', req.body.user_id)
        .then(user => {
          console.log("Alerter3", alerter)
          console.log("weatherTemp", typeof alerter[0].weatherTemp)
          console.log("type", typeof alerter[0].type)
          if (alerter[0].type === 'max' && alerter[0].weatherTemp > alerter[0].chosenTemp) {
            setTimeout(() => {
              return client.messages.create({
                to: '+16177193300',
                from: '+18572693922',
                body: req.body.message
              })
            }, 1000)
              .then((message) => console.log(message))
          } else if (alerter[0].type === 'min' && alerter[0].weatherTemp < alerter[0].chosenTemp) {
             setTimeout(() => {
               return client.messages.create({
                to: '+16177193300',
                from: '+18572693922',
                body: req.body.message
              })
            }, 1000)
              .then((message) => console.log(message))
          } else {
            console.log("it didn't work")
          }
        })
    })
    .catch((err) => {
      next(err);
    });
})

  // `+1${user.phone}`

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


app.patch('/alert/:id', (req, res, next) => {
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

app.delete('/alert/:id', (req, res, next) => {
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




app.use(function (req, res, next) {
  res.status(404).send("That doesnot exist!")
})

app.use(function (req, res, next) {
  res.status(500).send("Something on our end is broken, please try back!")
})

app.listen(port, () => console.log(`Weather Alerts on ${port}!`))