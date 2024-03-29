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
  const keyword = req.query.search?.trim()
  //while keyword is undefined, it's not a str, causes toLowerCase error
  if(keyword === undefined){
    res.render("index", { restaurantList, style: "style.css" })
  }else{
    const restaurant = restaurantList.filter((list) => 
      Object.values(list).some((property)=>{
        if(typeof property === "string"){
          return property.toLowerCase().includes(keyword.toLowerCase())
        }
        return false})
    )  
    res.render("index", { restaurantList: restaurant, keyword, style: "style.css" })}
  })

app.get("/restaurants/:id", (req, res)=>{
  const id = req.params.id
  const restaurant = restaurantList.find(list=>
    list.id.toString() === id)
  //add specific css for each page
  res.render("show", { restaurant, style: "show.css" })
})

app.listen(port, ()=>{
  console.log(`express server is running on http://localhost:${port}`)
})



