const express = require("express")
const bodyParser = require("body-parser")
const { Telegraf, Telegram } = require('telegraf')
const app = express()
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const tele = new Telegram(process.env.BOT_TOKEN)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send", async (req, res) => {
  try{
    if(!req.query.data) throw "Data query not found!"
    await tele.sendMessage(process.env.SENDTO_ID, req.query.data)
    res.json({
      status: "oke"
    })
  }catch(error){
    res.json({
      status: "error",
      error
    })
  }
})

bot.launch();
app.listen(3000, () => console.log("App Listening to 3000"))
