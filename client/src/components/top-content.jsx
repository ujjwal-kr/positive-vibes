import { Card, Grid, Input, Text } from "@nextui-org/react";
import { TopContentWrapper } from "../styles/top-content";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import WeatherService from "../services/weather.service";

export default function TopContent() {

    useEffect(() => {
        getTemperature()
    }, [])

    async function getTemperature() {
        try {
            const res = await WeatherService.getTemperature()
            const roundTemp = Math.round(parseInt(res.data.temperature))
            setTemperature(roundTemp.toString())
        } catch(e) {
            console.log(e)
        }
    }

    let [temperature, setTemperature] = useState('27')

    return (
        <Card variant="bordered"  style={{background: '#050505'}}>
            <TopContentWrapper>

                <Grid.Container gap={2} justify="center">
                    <Grid xs={9}>
                        <Input contentLeft={<BiSearch style={{fontSize: '2rem'}} />} width="75%" aria-label="Search" bordered size="lg" placeholder="Search" color="primary" />
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