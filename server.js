const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)

const cors = require('cors')
const parser = require('body-parser')
const dotenv = require("dotenv").config()

const bcrypt = require('bcrypt');
const saltRounds = 10;

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const myNumber = process.env.MY_NUMBER

var CronJob = require('cron').CronJob;

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

  // // compare with the matching password
  // bcrypt.compare('iLov3bacon!', hash, function (err, res) {
  //   console.log("does this match?", res)
  // })

  // // compare with a password that doesn't match
  // bcrypt.compare('bacon_sucks', hash, function (err, res) {
  //   console.log("does this match?", res)
  // })

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
  console.log("req.body.password", req.body.hashed_password)
  bcrypt.hash(req.body.hashed_password, saltRounds, function (err, hash) {
    console.log("hash", hash)
  })
  knex('users').insert(req.body)
    .then((user) => {
      res.status(200).send(user)
      console.log("user", user)
    })
    .catch((err) => {
      next(err)
    })
})

// app.post('/create/', (req, res, next) => {
//   knex('users').insert(req.body).returning('*')
//     .then((user) => {
//       res.status(200).send(user);
//     })

//     .catch((err) => {
//       next(err);
//     });
// })

checkMax = (alertType, weatherTemp, chosenTemp, phone, body) => {
   this.interval = setInterval(() => {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    if (alertType === 'max' && weatherTemp > chosenTemp && hour === 12 && minute === 49) {
      return client.messages.create({
        to: phone,
        from: '+18572693922',
        body: body
      })
    }
  }, 30000)
}

// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)

const job = new CronJob('* 10 * * * *', function() {
	const d = new Date();
	console.log('At Ten Minutes:', d);
});
job.start();

// # ┌───────────── minute (0 - 59)
// # │ ┌───────────── hour (0 - 23)
// # │ │ ┌───────────── day of the month (1 - 31)
// # │ │ │ ┌───────────── month (1 - 12)
// # │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
// # │ │ │ │ │                                   7 is also Sunday on some systems)
// # │ │ │ │ │
// # │ │ │ │ │
// # * * * * * <command to execute></command>

checkMin = (alertType, weatherTemp, chosenTemp, phone, body) => {
  setInterval(() => {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    if (alertType === 'min' && weatherTemp < chosenTemp && hour === 19 && minute === 00) {
      return client.messages.create({
        to: phone,
        from: '+18572693922',
        body: body
      })
    }
  }, 30000)
}

//for capstone doign the text in a post request,but will use a chron function in the future https://www.npmjs.com/package/node-schedule  a function that runs every night and maps over all alerts and sends text if meets criteria"

// Added a cron timer example

// var CronJob = require('cron').CronJob;
// var job = new CronJob('0 19 31 3 *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');
// job.start();

app.post('/alert/', (req, res, next) => {
  knex('alerts').insert(req.body).returning('*')
    .then((alert) => {
      res.status(200).send(alert)
      return alert
    })
    .then(alert => {
      return knex('users')
        .where('users.id', req.body.user_id)
        .then(user => {
          const weatherTemp = Number(alert[0].weatherTemp)
          const chosenTemp = Number(alert[0].chosenTemp)
          const phone = `+1${user[0].phone}`
          const body = req.body.message
          const alertType = alert[0].type

          checkMax(alertType, weatherTemp, chosenTemp, phone, body)
          checkMin(alertType, weatherTemp, chosenTemp, phone, body)

        })
    })
    .catch((err) => {
      next(err);
    })
})

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