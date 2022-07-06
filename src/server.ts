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
    
    const [hand1, restStack1] = getSixRandomCards(initialStack)
    const [hand2, restStack2] = getSixRandomCards(restStack1)

    res.json({initialStack, hand1, hand2, rest: restStack2})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
