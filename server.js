const express = require('express')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3002
const app = express()

app.use(express.urlencoded({
  extended: false })
}))