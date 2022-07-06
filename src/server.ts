import { StackTypes } from './enums';
import express from 'express'
import path from 'path'
import { createCardStackService } from './services/cardsStack.service';
import { createDurakService } from './services/durak.service';

const app = express()
const port = 3000

app.use('/static', express.static(__dirname))

const cardStackService = createCardStackService()
const { getCardStack, shuffle } = cardStackService

const durakService = createDurakService()
const { getSixRandomCards } = durakService

/**
 * Render client
 */
app.get('/', (req, res) => {
    const html = path.resolve('src/client/index.html')

    res.sendFile(html)
})

app.get('/stack', (req, res) => {
    const initialStack = shuffle(getCardStack(StackTypes.SMALL))
    const [randomSix, restStack] = getSixRandomCards(initialStack)

    res.json({initialStack, randomSix, restStack})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
