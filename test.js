const request = require("request")

function random() {
  let randomInt = ""
  for (let i = 0; i < 6; i++) {
    randomInt += Math.floor(Math.random() * 10)
  }
  return randomInt
}

const options = {
  uri: "http://127.0.0.1/oauth",
  method: "POST",
  body: {
    token: random(),
  },
  json: true,
}

request.post(options)
