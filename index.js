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

const Grocery = mongoose.model('Grocery', grocerySchema)

app.get("/groceries", async(request, response) => {
    const groceries = await Grocery.find()
    response.send(groceries)
    response.end
})

app.get("/groceries/:id", async(request, response) => {
    const { id } = request.params
    const grocery = await Grocery.findById(id)
    response.send(grocery)
    response.end
})

app.post("/groceries", async(request, response) => {
    const { name, checked } = request.body
    const grocery = new Grocery({
        name: name,
        checked: checked
    })

    const newGrocery = await grocery.save()
    response.send(newGrocery)
    response.end
})

app.put("/groceries/:id", async(request, response) => {
    const { id } = request.params
    const { name, checked } = request.body
    const grocery = await Grocery.findOneAndUpdate({ _id: id }, {
        $set: {
            name: name,
            checked: checked
        }
    }, { new: true })
    response.send(grocery)
    response.end
})

app.delete("/groceries/:id", async(request, response) => {
    const { id } = request.params
    const grocery = await Grocery.findOneAndDelete({ _id: id })
    response.send(grocery)
    response.end
})




app.listen(PORT, (error) => {
    if (error) return console.log(`An error occured while trying to listen on ${PORT}`)
    console.log(`Server Listening for request on port: ${PORT}`)
})