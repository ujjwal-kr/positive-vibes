import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { activeState } from "../states/nav"
import { Loading } from "@nextui-org/react"
import NewsConstructor from "../components/news-constructor"

import NewsService from "../services/news.service"
import StorageService from "../services/storage.service"
import SessionService from "../services/session.service"

import { LoadWrapper, NewsWrapper } from "../styles/news-wrapper"
import { settingState } from "../states/user"

export default function Home() {

    let [active, setActive] = useRecoilState(activeState)
    let [news, setNews] = useState()
    let [setting, setSetting] = useRecoilState(settingState)

    useEffect(() => {
        setActive('home')
        setNews(null)   
        const token = StorageService.getToken()
        const cachedNews = SessionService.getNews('home')
        if (cachedNews) {
            setNews(cachedNews)
        }
        fetchNews(token)
    }, [setting])

    async function fetchNews(token) {
        try {
            let res = await NewsService.topStories(token)
            setNews(res.data)
            SessionService.setNews('home', res.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <NewsWrapper>
                {news ?
                    <NewsConstructor item={news} />
                    : <LoadWrapper><Loading type="spinner" size={"xl"} /></LoadWrapper> 
                }
            </NewsWrapper>
        </div>
    )
}