const express = require('express')
const bodyParser = require('body-parser')

const { monthData, modelData } = require('./fipeData')

app = express()
app.use(bodyParser.json())

app.get('/last-month-data', async (_, res) => {
  const result = await monthData()
  res.send(result)
})

app.post('/model/:fipe/data/:year', async (req, res) => {
  const { fipe, year } = req.params
  const result = await modelData(fipe, year, 1)
  res.send(result)
})

app.listen(8080, () => {
  console.info('App is running on port 8080')
})