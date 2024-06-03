const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))


const createRecipeRoute = require("./createrecipe");
const listRecipeRoute = require("./listrecipe");
const updateRecipeRoute = require("./updaterecipe");
const deleteRecipeRoute = require("./deleterecipe");

app.use("/api/createrecipe", createRecipeRoute);
app.use("/api/listrecipe", listRecipeRoute);
app.use("/api/updaterecipe", updateRecipeRoute);
app.use("/api/deleterecipe", deleteRecipeRoute);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))