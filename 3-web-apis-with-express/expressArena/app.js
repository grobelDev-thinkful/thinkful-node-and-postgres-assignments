'use strict';
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// Drill 1
app.get('/sum', (req, res) => {
  // res.send('Hello Express!');
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  res.send(`The sum of a and b is ${a + b}`);
});

// Drill 2
app.get('/cipher', (req, res) => {
  // res.send('Hello Express!');
  const text = req.query.text;
  const shiftInt = Number(req.query.shift);

  let textArr = text.split('');
  let newText = textArr.map(char => {
    return validShift(char, shiftInt);
  });

  res.send(newText);

  function validShift(char, shift) {
    let charCode = char.charCodeAt(0) + shift;
    console.log(`${char}: ${charCode}`);
    if (charCode > 90) {
      let newShift = -26;
      return validShift(String.fromCharCode(charCode), newShift);
    } else {
      return String.fromCharCode(charCode);
    }
  }
});

// Drill 3
app.get('/lotto', (req, res) => {
  const numbers = req.query.numbers;

  // validation
  if (numbers.length !== 6) {
    res.send('requires exactly 6 numbers');
  }
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 20 || numbers[i] < 1) {
      res.send('invalid number detected');
    }
  }

  // get random numbers
  let arr = [...Array(6)].map(() => getRandomInt(20).toString());

  // check against numbers
  let matchedNumbers = 0;
  arr.forEach(num => {
    if (numbers.includes(num)) {
      matchedNumbers++;
    }
  });

  // results output
  if (matchedNumbers < 4) {
    res.send('Sorry, you lose');
  } else if (matchedNumbers === 4) {
    res.send('Congratulations, you win a free ticket');
  } else if (matchedNumbers === 5) {
    res.send('Congratulations! You win $100!');
  } else if (matchedNumbers === 6) {
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }

  res.send(matchedNumbers.toString());
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
  }
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
