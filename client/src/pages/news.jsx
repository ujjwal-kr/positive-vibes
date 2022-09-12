import { useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import FetchNews from "../services/news.service"
import NavState from "../state/navState";
import { useRecoilState } from "recoil";

export default function News() {
    let [active, setActive] = useRecoilState(NavState)
    let params = useParams();

    let [news, setNews] = useState([])

    useEffect(() => {
        setActive(params.id)
        setNews([])
        fetchNews()
    }, [params.id])

    async function fetchNews() {
        let newsRes = await FetchNews.fetchWithId(params.id)
        setNews(newsRes.data)
    }

    return (
        <div>
            <h1>{params.id}</h1>
            <br />

            {news ?

                news.map(item => <p>{item.title._text}</p>)

                : null}

        </div>
    )
}