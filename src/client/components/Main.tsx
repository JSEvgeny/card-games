import React, { useCallback, useEffect, useState } from 'react'

const Main = () => {
    const [hand1, setHand1] = useState([])
    const [hand2, setHand2] = useState([])
    const [rest, setRest] = useState([])

    const fetchData = useCallback(async () => {
        // get the data from the api
        const data = await fetch('http://localhost:3000/stack')
        // convert data to json
        const json = await data.json()
        const { hand1, hand2, rest } = json

        setHand1(hand1)
        setHand2(hand2)
        setRest(rest)
    }, [])

    useEffect(() => {
        fetchData().catch(console.error)
    }, [])

    return (
        <>
            <h1>Welcome to Durak game!</h1>

            {hand1.length > 0 && (
                <>
                    <h2>Player one has: </h2>
                    {hand1.map((card, index) => (
                        <span key={`hand_one_key_${index}`}>{card}</span>
                    ))}
                </>
            )}

            {hand2.length > 0 && (
                <>
                    <h2>Player two has: </h2>
                    {hand2.map((card, index) => (
                        <span key={`hand_two_key_${index}`}>{card}</span>
                    ))}
                </>
            )}

            {rest.length > 0 && (
                <>
                    <h2>Left in stack: </h2>
                    {rest.map((card, index) => (
                        <span key={`rest_key_${index}`}>{card}</span>
                    ))}
                </>
            )}
        </>
    )
}

export default Main
