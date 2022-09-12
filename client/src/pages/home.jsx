import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import FetchNews from "../services/news.service"
import NavState from "../state/navState"

export default function Home() {
    let [news, setNews] = useState([])
    let [active, setActive] = useRecoilState(NavState)

    useEffect(() => {
        setActive('top stories')
        fetchNews()
    }, [])

    async function fetchNews() {
        let newsRes = await FetchNews.topStories("")
        setNews(newsRes.data)
    }

    return (
        <div>
            <h1>Top Stories</h1>
            <br />

            {news?

            news.map(item => <p>{item.title._text}</p>)

            : null}
        </div>
    )
}

// export default function NewsPaperComponent() {
    
// }

