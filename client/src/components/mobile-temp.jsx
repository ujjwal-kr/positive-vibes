import { Text } from "@nextui-org/react";
import { useState, useEffect } from "react";

import WeatherService from "../services/weather.service";
import SessionService from "../services/session.service";

export default function MobileTemp() {

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
        } catch (e) {
            console.log(e)
        }
    }

    let [temperature, setTemperature] = useState('27')

    return (

        <div style={{ width: '100%', textAlign: 'center' }}>
            <Text
                h1
                size="xl"
                css={{ textGradient: "45deg, $pink600 -20%, $blue600 50%" }}
                weight="bold"
            >
                {temperature}°C
            </Text>
        </div>

    )
}