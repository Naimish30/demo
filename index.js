const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
const mongoose = require("mongoose")


app.use(express.json())
//Connection for mongodb

mongoose.connect("connection string")
    .then((response) => { console.log("Database Connectoed") })
    .catch((err) => console.log("Data Base Error:", err));

//Data schema

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true })

//Model

const Recipe = mongoose.model("recipe", recipeSchema);
async function checklist(req, res, next) {
    const recipes = await Recipe.find({})
    console.log(recipes)
    if (recipes.length == 0) {
        return res.status(200).end("No recipes available")
    }
    next()
}
app.get('/api/listrecipe', checklist, async (req, res) => {
    const recipes = await Recipe.find({})
    res.status(200).send(
        `<html>
            <body>

                <h1>Recipe List</h1>
                ${recipes.
            map((recipe) => `<li>${recipe.name}</li>`).
            join('')
        }
            </body>

        </html>`
    )
})

function check(req, res, next) {
    const recipe = req.body
    const regex = /\d/
    if (!recipe) {
        return res.end("Please fill the details")
    }
    if (!recipe.name || !recipe.description || !recipe.time || !recipe.cuisine) {
        return res.status(400).end("Please fill the remaining details")
    }
    if (regex.test(recipe.cuisine)) {
        return res.status(400).end("Cuisine should not contain numbers")
    }
    next()
}

app.post('/api/createrecipe', check, (req, res) => {
    const data = req.body
    const recipe = Recipe.create(
        {
            name: data.name,
            description: data.description,
            cuisine: data.cuisine,
            time: data.time
        }
    )

    res.status(201).end("Succesfully added")
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
