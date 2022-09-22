import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loading } from "@nextui-org/react"
import NewsConstructor from "../components/news-constructor"

import NewsService from "../services/news.service"
import StorageService from "../services/storage.service"

import { NewsWrapper, LoadWrapper } from "../styles/news-wrapper"

export default function Search() {
    let { term } = useParams()
    let [news, setNews] = useState()

    useEffect(() => {
        setNews(null)
        let token = StorageService.getToken()
        fetchNews(term, token)
    }, [term])

    async function fetchNews(term, token) {
        try {
            let res = await NewsService.search(term, token)
            setNews(res.data)
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

