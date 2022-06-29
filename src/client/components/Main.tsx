import React, { useEffect, useState } from "react"

const Main = () => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch('http://localhost:3000/stack');
            // convert data to json
            const json = await data.json();

            setCards(json)
          }
        
          fetchData().catch(console.error)
    }, [])

    return (
        <>
            <h1>You hello!</h1>

            {cards.length > 0 && cards.map(card => (<span>{card}</span>))}
        </>
    )
}

export default Main