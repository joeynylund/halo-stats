import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Container, Row, Col, Spinner } from 'reactstrap';
import ProgressProvider from "../helpers/ProgressProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';

function Home () {

    const [ranks, setRanks] = useState([])
    const [stats, setStats] = useState({})
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        var time = Date.now();
        var reload = time + 150000;
        var cached_time = localStorage.getItem('reload')
        if(time > cached_time) {
            console.log('Reload all info!')
            fetch('https://cryptum.halodotapi.com/games/hi/stats/players/Nylunddd/csrs?season=1',{
                headers: {
                    'Authorization': 'Cryptum-Token d9hWQNMqwe6NOFyu30RsLMGQ2Lqr0QFDduDBh9RYZJZG9gR4TG5qt9ozWOp2sFJD',
                    'Content-Type': 'application/json',
                    'Cryptum-API-Version': '2.3-alpha'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setRanks(data.data)
                localStorage.setItem('ranks', JSON.stringify(data.data))
                fetch('https://cryptum.halodotapi.com/games/hi/stats/players/Nylunddd/service-record/global',{
                    headers: {
                        'Authorization': 'Cryptum-Token d9hWQNMqwe6NOFyu30RsLMGQ2Lqr0QFDduDBh9RYZJZG9gR4TG5qt9ozWOp2sFJD',
                        'Content-Type': 'application/json',
                        'Cryptum-API-Version': '2.3-alpha'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    setStats(data.data)
                    localStorage.setItem('stats', JSON.stringify(data.data))
                    fetch('https://cryptum.halodotapi.com/games/hi/stats/players/Nylunddd/matches',{
                        headers: {
                            'Authorization': 'Cryptum-Token d9hWQNMqwe6NOFyu30RsLMGQ2Lqr0QFDduDBh9RYZJZG9gR4TG5qt9ozWOp2sFJD',
                            'Content-Type': 'application/json',
                            'Cryptum-API-Version': '2.3-alpha'
                        }
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        setMatches(data.data)
                        localStorage.setItem('matches', JSON.stringify(data.data))
                        localStorage.setItem('reload', reload)
                        setLoading(false)
                    })
                })
            })
        } else {
            console.log('Pull from cache!')
            setRanks(JSON.parse(localStorage.getItem('ranks')));
            setStats(JSON.parse(localStorage.getItem('stats')));
            setMatches(JSON.parse(localStorage.getItem('matches')));
            setLoading(false)
        }   

        
    },[])

    return (
        <Container>
            {loading === true ? 
            <div style={{paddingTop:'5%'}}>
            <center>
                <Spinner color="primary" style={{width:'4rem',height:'4rem'}}></Spinner>
                </center>
            </div> : 
            <Row>
            <Col md="3">
                <Row style={{padding:'20px'}}>
                    <div style={{border:'1px solid #616161',borderRadius:'20px',padding:'15px 15px 0px'}}>
                        <h1 style={{fontWeight:'800'}}>Nylunddd</h1>
                        <h3>Overall Stats</h3>
                        <h6>{stats.matches_played} Matches Played</h6>
                        <h6>Time Played: {stats.time_played.human}</h6>
                        <Row>
                        <Col md='6' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    KDR<br/>
                                    <strong>{stats.kdr.toFixed(2)}</strong>
                                </div>
                            </Col>
                            <Col md='6' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Kills<br/>
                                    <strong>{stats.summary.kills.toLocaleString()}</strong>
                                </div>
                            </Col>
                            <Col md='6' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Assists<br/>
                                    <strong>{stats.summary.assists.toLocaleString()}</strong>
                                </div>
                            </Col>
                            <Col md='6' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Deaths<br/>
                                    <strong>{stats.summary.deaths.toLocaleString()}</strong>
                                </div>
                            </Col>
                            <Col md='12' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Average Damage<br/>
                                    <strong>{stats.damage.average.toLocaleString()} per game</strong>
                                </div>
                            </Col>
                            <Col md='12' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Damage Dealt<br/>
                                    <strong>{stats.damage.dealt.toLocaleString()}</strong>
                                </div>
                            </Col>
                            <Col md='12' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Damage Taken<br/>
                                    <strong>{stats.damage.taken.toLocaleString()}</strong>
                                </div>
                            </Col>
                            <Col md='12' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Accuracy<br/>
                                    <strong>{stats.shots.accuracy.toFixed(2) + '%'}</strong>
                                </div>
                            </Col>
                            <Col md='12' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Shots Fired<br/>
                                    <strong>{stats.shots.fired.toLocaleString()}</strong>
                                </div>
                            </Col>
                            <Col md='12' style={{fontSize:'20px',padding:'10px'}}>
                                <div style={{backgroundColor:'#313131',padding:'10px',borderRadius:'10px'}}>
                                    Shots Hit<br/>
                                    <strong>{stats.shots.landed.toLocaleString()}</strong>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Col>
            <Col md="9">
                <Row style={{padding:'20px'}}>
                    <div style={{border:'1px solid #616161',borderRadius:'20px'}}>
                    <h2 style={{padding:'15px 15px 0px'}}>Ranks</h2>
                        <Row>
                    {ranks && ranks.map((rank) => {
                        var input = '';
                        var tier = rank.response.current.tier;
                        var sub_tier = rank.response.current.sub_tier;
                        var sub_tier_final = sub_tier + 1;
                        var value = rank.response.current.value;
                        var tier_start = rank.response.current.tier_start;
                        var tier_end = rank.response.current.next_tier_start;
                        var percentage = 0;

                        if (tier === 'Onyx') {
                            percentage = 100;
                        } else if (tier === 'Unrated') {
                            percentage = ((10 - rank.response.current.measurement_matches_remaining) * 10);
                        } else if (tier !== 'Onyx' && tier !== 'Unrated') {
                            percentage = (value - tier_start) * 2;
                        }

                        switch(rank.input) {
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
                            <Col md="4" style={{padding:'25px'}}>
                                <h5 style={{textAlign:'center',marginBottom:'20px'}}>{input}</h5>
                                <ProgressProvider valueStart={0} valueEnd={percentage}>
                                {value2 => <CircularProgressbarWithChildren value={value2} className={tier} styles={buildStyles({pathTransitionDuration: 2})}>
                                    <img style={{ width: 125, marginTop: -15 }} src={"https://avtqvzpooapfgoykpwxd.supabase.in/storage/v1/object/public/infinite-assets/playlist-csrs/" + tier.toLowerCase() + "-small.png"} alt="doge" />
                                    <div style={{ fontSize: 18, marginTop: -15 }}>
                                        <strong>{tier + ' '}{tier === 'Onyx' || tier === 'Unrated' ? null : sub_tier_final}</strong>
                                    </div>
                                    <div style={{ fontSize: 14, marginTop: 0 }}>
                                        {tier === 'Onyx' ? value : tier === 'Unrated' ?  10 - rank.response.current.measurement_matches_remaining + '/' + 10 + ' Matches' : value.toLocaleString() + '/' + tier_end.toLocaleString()}
                                    </div>
                                </CircularProgressbarWithChildren>}
                                </ProgressProvider>
                            </Col>
                        )
                    })}
                    </Row>
                    </div>
                </Row>
                <Row style={{padding:'20px'}}>
                    <div style={{border:'1px solid #616161',borderRadius:'20px'}}>
                        <h2 style={{padding:'15px 15px 0px'}}>Matches</h2>
                        {matches && matches.map((match) => (
                            <>
                            <Col style={{padding:'15px'}}>
                                <Row style={{padding:'10px',fontSize:'20px'}} className={`match ${match.outcome === 'win' ? 'win' : 'loss'}`}>
                                    <Col xs='12' md='6' className={'center-mobile'}>
                                        {match.ranked === true ? <FontAwesomeIcon icon={faCrosshairs} style={{marginRight:'5px'}} /> : null}{match.details.category.name + ' | ' + match.details.map.name}
                                        <br/>
                                        <span style={{fontSize:'16px'}}><Moment fromNow>{match.played_at}</Moment></span>
                                    </Col>
                                    <Col xs='12' md='6' style={{display:'flex',justifyContent:'flex-end'}}>
                                        <Row>
                                            <Col md='4' xs='6'>
                                                <center>
                                                    <p style={{margin:'0px'}}>Kills</p>
                                                    <p style={{margin:'0px',fontWeight:'800'}}>{match.stats.summary.kills}</p>
                                                </center>
                                            </Col>
                                            <Col md='4' xs='6'>
                                                <center>
                                                    <p style={{margin:'0px'}}>Assists</p>
                                                    <p style={{margin:'0px',fontWeight:'800'}}>{match.stats.summary.assists}</p>
                                                </center>
                                            </Col>
                                            <Col md='4' xs='6'>
                                                <center>
                                                    <p style={{margin:'0px'}}>Deaths</p>
                                                    <p style={{margin:'0px',fontWeight:'800'}}>{match.stats.summary.deaths}</p>
                                                </center>
                                            </Col>
                                            <Col md='4' xs='6'>
                                                <center>
                                                    <p style={{margin:'0px'}}>KDR</p>
                                                    <p style={{margin:'0px',fontWeight:'800'}}>{match.stats.kdr.toFixed(2)}</p>
                                                </center>
                                            </Col>
                                            <Col md='4' xs='6'>
                                                <center>
                                                    <p style={{margin:'0px'}}>Accuracy</p>
                                                    <p style={{margin:'0px',fontWeight:'800'}}>{match.stats.shots.accuracy.toFixed(2) + '%'}</p>
                                                </center>
                                            </Col>
                                            <Col md='4' xs='6'>
                                                <center>
                                                    <p style={{margin:'0px'}}>Damage</p>
                                                    <p style={{margin:'0px',fontWeight:'800'}}>{match.stats.damage.dealt.toLocaleString()}</p>
                                                </center>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <hr />
                           </>
                        ))}

                    </div>
                </Row>
            </Col>
        </Row> }
            
        </Container>
    )
}

export default Home;