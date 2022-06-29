import express from "express"
import { getCardStack, shuffle, StackTypes } from "./cards"

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json(shuffle(getCardStack(StackTypes.SMALL)))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})