import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { Loading } from "@nextui-org/react"
import NewsConstructor from "../components/news-constructor"
import { activeState } from "../states/nav"

import NewsService from "../services/news.service"
import StorageService from "../services/storage.service"

export default function News() {
    let { id } = useParams()
    let [news, setNews] = useState()
    let [active, setActive] = useRecoilState(activeState)

    useEffect(() => {
        setActive(id)
        setNews(null)
        let token = StorageService.getToken()
        fetchNews(id, token)
    }, [id])

    async function fetchNews(id, token) {
        try {
            let res = await NewsService.fetchWithId(id, token)
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

