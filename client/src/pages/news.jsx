import { useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import FetchNews from "../services/news.service"

export default function News() {
    let params = useParams();

    let [news, setNews] = useState([])

    useEffect(() => {
        fetchNews()
    }, [])

    async function fetchNews() {
        let newsRes = await FetchNews.fetchWithId(params.id)
        setNews(newsRes.data)
        console.log(newsRes.data)
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