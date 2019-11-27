'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(morgan('common')); // let's see what 'common' format looks like

const apps = require('./data/playstore.js');

app.get('/apps', (req, res) => {
  const { search = '', sort, genre } = req.query;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must be one of rating or app');
    }
  }

  if (genre) {
    if (
      !['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(
        genre
      )
    ) {
      return res.status(400).send('Genre must be valid');
    }
  }

  let results = apps.filter(book =>
    book.App.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  if (genre) {
    results = results.filter(book =>
      book.Genres.toLowerCase().includes(genre.toLowerCase())
    );
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
