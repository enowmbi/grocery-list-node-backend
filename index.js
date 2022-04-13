const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

const app = express()

const connectionUrl = "mongodb://localhost/test"

mongoose.connect(connectionUrl, (error) => {
    if (error) return console.log("An error occurred" + error.message)
    console.log("Connected to MongoDB successfully")
})

const grocerySchema = mongoose.Schema({
    name: { type: String, unique: true },
    checked: { type: Boolean, default: false },
})

const Grocery = new mongoose.model('Grocery', grocerySchema)

app.get("/groceries || /", async(request, response) => {
    const groceries = await Grocery.find()
    response.send(groceries)
    response.end
})


app.listen(PORT, (error) => {
    if (error) return console.log(`An error occured while trying to listen on ${PORT}`)
    console.log(`Server Listening for request on port: ${PORT}`)
})