const express = require("express")
const router = express.Router()
const config = require("../config")
const knex = require("knex")(config.database)

router.get("/", (req, res) => {
  res.status(200).json({
    hello: "world",
  })
})

router.post("/oauth", async (req, res) => {
  const token = isNaN(req.body.token) ? req.body.token : parseInt(req.body.token)
  const oauth = await knex("userinfo").select("*")
  if (!isNaN(token) && Number.isInteger(token) && String(token).length === 6) {
    if (oauth.length === 0)
      return await knex("userinfo").insert({
        user: "administrator",
        password: "idk what is this",
        program: "todo",
        oauth: token,
      })
    knex("userinfo")
      .where({ program: "todo" })
      .update({
        oauth: token,
        used: false,
      })
      .then(() => {
        res.status(200).json({
          success: true,
        })
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err,
        })
      })
  } else {
    res.status(500).json({
      error: "The token value must be a 6-digit integer.",
    })
  }
})

module.exports = router
