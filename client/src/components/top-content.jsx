import { Card, Grid, Input, Text } from "@nextui-org/react";
import { TopContentWrapper } from "../styles/top-content";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import WeatherService from "../services/weather.service";
import SessionService from "../services/session.service";
import { useNavigate } from "react-router-dom"

export default function TopContent() {
    let navigate = useNavigate()
    let [term, setTerm] = useState()

    useEffect(() => {
        getTemperature()
    }, [])

    async function getTemperature() {
        try {
            const tempCache = SessionService.getTemperature()
            if (tempCache) {
                setTemperature(tempCache)
            } else {
                const res = await WeatherService.getTemperature()
                const roundTemp = Math.round(parseInt(res.data.temperature))
                setTemperature(roundTemp.toString())
                SessionService.setTemperature(roundTemp.toString())
            }
        } catch(e) {
            console.log(e)
        }
    }

    function search(e) {
        e.preventDefault()
        navigate('/search/'+ term)
    }

    let [temperature, setTemperature] = useState('27')

    return (
        <Card variant="bordered"  style={{background: '#050505'}}>
            <TopContentWrapper>

                <Grid.Container gap={2} justify="center">
                    <Grid xs={9}>
                        <form onSubmit={(e) => search(e)} style={{ width: '100%' }}>
                            <Input contentLeft={<BiSearch style={{fontSize: '2rem'}} />}
                             onChange={(e) => setTerm(e.target.value)}
                             clearable
                             width="75%" 
                             aria-label="Search" 
                             bordered 
                             size="lg" 
                             placeholder="Search" 
                             color="primary" />
                        </form>
                    </Grid>

                    <Grid xs={3}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <Text
                                h1
                                size="xl"
                                css={{textGradient: "45deg, $pink600 -20%, $blue600 50%"}}
                                weight="bold"
                            >
                                {temperature}°C
                            </Text>
                        </div>
                    </Grid>

                </Grid.Container>
            </TopContentWrapper>
        </Card>
    )
}