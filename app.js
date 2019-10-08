'use strict';

const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.status(200).send({ healthy: true });
});

module.exports = app;
