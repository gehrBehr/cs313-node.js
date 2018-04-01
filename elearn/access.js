const { Client } = require('mongodb').MongoClient;
const { Pool } = require('pg');

var connectionString = 'mongodb://heroku_n7fqkhx9:nn6ao650go64njqku8nld8torq@ds125068.mlab.com:25068/heroku_n7fqkhx9';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const express = require('express')
