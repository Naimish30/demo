const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
const mongoose = require("mongoose")


app.use(express.json())
//Connection for mongodb

mongoose.connect("mongodb+srv://Nrgajjar30:Naimish%403009@cluster0.di9i8s8.mongodb.net/")
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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))