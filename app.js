const express = require("express")
const { engine } = require("express-handlebars")
const app = express()
const port = 3000
const restaurantList = require("./public/jsons/restaurant.json").results

//ask express to hand template engine to express-handlebars
app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", "./views")
//using datas stored in specific folder
//key in "localhost/jsons/restaurant.jsons" could read that data 
app.use(express.static("public"))

app.get("/", (req,res)=>{
  res.redirect("/restaurant")
})

app.get("/restaurant", (req, res)=>{
  res.render("index", { restaurantList })
})

app.get("/restaurants/:id", (req, res)=>{
  const id = req.params.id
  res.send(`restaurant info: ${id}`)
})

app.listen(port, ()=>{
  console.log(`express server is running on http://localhost:${port}`)
})