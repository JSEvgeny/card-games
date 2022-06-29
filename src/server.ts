import express from "express"
import path from "path"
import { getCardStack, shuffle, StackTypes } from "./cards"

const app = express()
const port = 3000

console.log(__dirname)

app.use('/static', express.static(__dirname));

app.get('/', (req, res) => {
  const cardStack = shuffle(getCardStack(StackTypes.SMALL))
  const html = path.resolve("src/client/index.html")

  res.sendFile(html)
})

app.get('/stack', (req, res) => {
  const cardStack = shuffle(getCardStack(StackTypes.SMALL))

  res.json(cardStack)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})