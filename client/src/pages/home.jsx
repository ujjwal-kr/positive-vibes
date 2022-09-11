import { useEffect, useState } from "react"
import FetchNews from "../services/news.service"


export default function Home() {
    let [news, setNews] = useState([])

    useEffect(() => {
        fetchNews()
    }, [])

    async function fetchNews() {
        let newsRes = await FetchNews.topStories("")
        setNews(newsRes.data)
        console.log(newsRes.data)
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

