const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

app.get("/groceries/:id || /:id", async(request, response) => {
    const grocery = await Grocery.find({ _id: request.params.id })
    response.send(grocery)
    response.end
})

app.post("/groceries || /", async(request, response) => {
    const grocery = new Grocery({
        name: request.body.name,
        checked: request.body.checked
    })

    const newGrocery = await grocery.save()
    response.send(newGrocery)
    response.end
})


app.listen(PORT, (error) => {
    if (error) return console.log(`An error occured while trying to listen on ${PORT}`)
    console.log(`Server Listening for request on port: ${PORT}`)
})