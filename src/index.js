const express = require('express')
require('./db/mongoose')
const userRoute = require('./routes/userRoute')
const taskRoute = require('./routes/taskRoute')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintainence. Please try later.')
// })

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})