// server.js
const express = require('express');
const stripe = require('stripe')('sk_test_51PMCGw2KMT6aYSniGItKwNPwh4XTuAtldMDayU1jvO1RX9Qdd3oisLhwonyugv9QZM5MddBOe8Gp4IeIo1GbM4nb00vazNWc26');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2999, // amount in cents
      currency: 'zar',
      description: 'Example charge',
      source: req.body.token
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
