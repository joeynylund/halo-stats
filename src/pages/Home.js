import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Container, Row, Col } from 'reactstrap';
import ProgressProvider from "../helpers/ProgressProvider";

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
                console.log(data.data)
                console.log(data.data[0].response.current.tier + ' ' + tier )
                setStats(data.data)
            })
    },[])

    return (
        <Container>
            <Row>
                
                {stats && stats.map((stat) => {
                    var input = '';
                    var tier = stat.response.current.tier;
                    var sub_tier = stat.response.current.sub_tier;
                    var sub_tier_final = sub_tier + 1;
                    var value = stat.response.current.value;
                    var tier_start = stat.response.current.tier_start;
                    var tier_end = stat.response.current.next_tier_start;
                    var percentage = 0;

                    if (tier === 'Onyx') {
                        percentage = 100;
                    } else if (tier === 'Unrated') {
                        percentage = ((10 - stat.response.current.measurement_matches_remaining) * 10);
                    } else if (tier !== 'Onyx' && tier !== 'Unrated') {
                        percentage = (value - tier_start) * 2;
                    }

                    switch(stat.input) {
                        case 'crossplay':
                            input = 'Crossplay';
                            break;
                        case 'controller':
                            input = 'Controller';
                            break;
                        case 'mnk':
                            input = 'Mouse & Keyboard';
                            break;
                    }

                    return (
                        <Col md="4" style={{padding:'50px'}}>
                            <h5 style={{textAlign:'center',marginBottom:'20px'}}>{input}</h5>
                            <ProgressProvider valueStart={0} valueEnd={percentage}>
                            {value2 => <CircularProgressbarWithChildren value={value2} className={tier} styles={buildStyles({pathTransitionDuration: 2})}>
                                <img style={{ width: 175, marginTop: -15 }} src={"https://avtqvzpooapfgoykpwxd.supabase.in/storage/v1/object/public/infinite-assets/playlist-csrs/" + tier.toLowerCase() + "-small.png"} alt="doge" />
                                <div style={{ fontSize: 20, marginTop: -15 }}>
                                    <strong>{tier + ' '}{tier === 'Onyx' || tier === 'Unrated' ? null : sub_tier_final}</strong>
                                </div>
                                <div style={{ fontSize: 16, marginTop: 0 }}>
                                    {tier === 'Onyx' ? value : tier === 'Unrated' ?  10 - stat.response.current.measurement_matches_remaining + '/' + 10 + ' Matches' : value + '/' + tier_end}
                                </div>
                            </CircularProgressbarWithChildren>}
                            </ProgressProvider>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Home;