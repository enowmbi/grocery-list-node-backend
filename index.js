const express = require('express')

const PORT = process.env.PORT || 5000

const app = express()


app.listen(PORT, (error) => {
    if (error) return console.log(`An error occured while trying to listen on ${PORT}`)
    console.log(`Server Listening for request on port: ${PORT}`)
})