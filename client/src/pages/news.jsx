import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { Loading } from "@nextui-org/react"
import NewsConstructor from "../components/news-constructor"
import { activeState } from "../states/nav"

import NewsService from "../services/news.service"
import StorageService from "../services/storage.service"
import SessionService from "../services/session.service"

import { NewsWrapper, LoadWrapper } from "../styles/news-wrapper"
import { settingState } from "../states/user"

export default function News() {
    let { id } = useParams()
    let [news, setNews] = useState()
    let [active, setActive] = useRecoilState(activeState)
    let [setting, setSetting] = useRecoilState(settingState)

    useEffect(() => {
        setActive(id)
        setNews(null)
        let token = StorageService.getToken()
        let cachedNews = SessionService.getNews(id)
        setTimeout(() => {
            if (cachedNews) {
                setNews(cachedNews)
            }
        }, .00001);
        fetchNews(id, token)
    }, [id, setting])

    async function fetchNews(id, token) {
        try {
            let res = await NewsService.fetchWithId(id, token)
            setNews(res.data)
            SessionService.setNews(id, res.data)
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

