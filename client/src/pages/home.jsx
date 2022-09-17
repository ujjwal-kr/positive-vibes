import { useEffect, useState } from "react"
import NewsService from "../services/news.service"
import { useRecoilState } from "recoil"
import { tokenState } from "../states/user"
import { Loading } from "@nextui-org/react"
import NewsConstructor from "../components/news-constructor"

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
                <NewsConstructor item={news}/>
                : <Loading type="spinner" size={"xl"} />
            }
        </div>
    )
}