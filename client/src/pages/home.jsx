import { useEffect, useState } from "react"
import NewsService from "../services/news.service"
import { useRecoilState } from "recoil"
import { tokenState } from "../states/user"
import { Loading } from "@nextui-org/react"

export default function Home() {

    let [token, setToken] = useRecoilState(tokenState)
    let [news, setNews] = useState()

    useEffect(() => {
        fetchNews()
    }, [])

    async function fetchNews() {
        try {
            let res = await NewsService.topStories(token)
            setNews(res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {news ?
                news.map((item, key) => <p key={key}>{item.title._text}</p>)
                : <Loading type="spinner" size={"xl"} />
            }
        </div>
    )
}