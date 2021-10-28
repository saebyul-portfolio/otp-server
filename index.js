const express = require("express")
const path = require("path")
const config = require("./config.json")

const indexRouter = require("./routes/index")

const app = express()

app.set("view engine", "jade")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", indexRouter)

app.listen(config.port, () => console.info(`Listening on port ${config.port}`))

module.exports = app
