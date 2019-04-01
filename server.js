const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)

const cors = require('cors')
const parser = require('body-parser')
const dotenv = require("dotenv")

app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
  knex('alerts')
    .then((flashcards) => {
      res.send(flashcards);
    })
    .catch((err) => {
      next(err);
    });
})

app.get('/myweatherbuddy', (req, res) => {
  knex('alerts')
    .then((flashcards) => {
      res.send(flashcards);
    })
    .catch((err) => {
      next(err);
    });
})

app.post('/myweatherbuddy', (req, res, next) => {
  knex('alerts').insert(req.body).returning('*')
    .then((flashcard) => {
      res.send(flashcard);
    })
    .catch((err) => {
      next(err);
    });
})

app.put('/myweatherbuddy/:id', (req, res, next) => {
  knex('alerts').update(req.body).where('id', req.params.id).returning('*')
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      next(err);
    });
})

app.delete('/myweatherbuddy/:id', (req, res, next) => {
  console.log("req body", req.body)
  knex('alerts').del(req.body).where('id', req.params.id).returning('*')
    .then((rows) => {
      res.send(rows);
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



app.listen(port, () => console.log(`Weather Alerts on ${port}!`))