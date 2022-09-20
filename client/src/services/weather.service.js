import URL from "../url"
import axios from "axios"

const WeatherService = {
    getTemperature: async () => {
        return await axios.get(`${URL}weather`)
    }
}

export default WeatherService