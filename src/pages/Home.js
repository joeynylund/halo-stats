import React, { useState, useEffect } from "react";

function Home () {

    const [stats, setStats] = useState([])

    useEffect(async () => {
        await fetch('https://cryptum.halodotapi.com/games/hi/stats/players/Nylunddd/csrs?season=1',{
                headers: {
                    'Authorization': 'Cryptum-Token d9hWQNMqwe6NOFyu30RsLMGQ2Lqr0QFDduDBh9RYZJZG9gR4TG5qt9ozWOp2sFJD',
                    'Content-Type': 'application/json',
                    'Cryptum-API-Version': '2.3-alpha'
                }
            }).then((response) => response.json())
            .then((data) => {
                var sub_tier = data.data[0].response.current.sub_tier;
                var tier = sub_tier + 1;
                console.log(data.data[0].response.current.tier + ' ' + tier )
                setStats(data.data)
            })
    },[])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;