const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { userRouter } = require("./routers/userRouter.js")
const { productRouter } = require("./routers/productRouter.js")


app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use("/users/", userRouter)
app.use("/products/",productRouter)

app.listen(3001, () => {
    console.log("server started")
})