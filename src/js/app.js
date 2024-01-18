const express = require("express");
const routerproduct = require("../routes/products.router")
const routercart = require("../routes/carts.router");

const app = express()
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/products",routerproduct);
app.use("/api/carts",routercart);

app.get("/ping",(req,res) =>{
    res.send("pong")
})

app.listen(port,() => console.log("servidor arriba puerto:" + port))



// http://localhost:8000/api/product
// http://localhost:8000/api/product/1
// http://localhost:8000/api/product/?limit=2