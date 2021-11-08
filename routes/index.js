const express = require("express")
const router = express.Router()
const config = require("../config.json")
const knex = require("knex")(config.database)
const { isToken } = require("../funcs/number")
const { allowed, denied, notToken, catchError } = require("../funcs/sendHttpCode")

router.get("/", (req, res) => {
  res.status(200).json({
    hello: "world",
  })
})

router.post("/oauth", async (req, res) => {
  const token = isNaN(req.body.token) ? req.body.token : parseInt(req.body.token)
  const oauth = await knex("userinfo").select("*")
  if (isToken(usedToken)) {
    if (oauth.length === 0)
      return await knex("userinfo").insert({
        user: "administrator",
        program: config.programName,
        oauth: token,
      })
    knex("userinfo")
      .where({ program: config.programName })
      .update({
        oauth: token,
        used: false,
      })
      .then(() => {
        allowed(res)
      })
      .catch((err) => {
        catchError(res, err)
      })
  } else {
    catchError(res, "The token value must be a 6-digit integer.")
  }
})

router.post("/check", async (req, res) => {
  const sendToken = req.body.token
  if (!isToken(sendToken)) return notToken(res, "The token has already been used.")
  if (!req.body.prohram) return catchError(res, "program parameter is required.")
  else {
    const otpToken = await knex("userinfo").where({ program: req.body.program })
    if (otpToken.length === 0) return catchError(res, "Unknown header")
    else {
      const isUsed = await knex("userinfo").select("used").where({ program: req.body.program })
      if (isUsed[0]) return denied(res, "This token has already been used.")
      if (sendToken === otpToken[0]) {
        await knex("userinfo").update({ used: true }).where({ program: req.body.program })
        return allowed(res)
      }
    }
  }
})

module.exports = router
