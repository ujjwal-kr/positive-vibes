import { useParams } from "react-router-dom"


export default function News() {
    let params = useParams();

    return (
        <div>News: {params.id}</div>
    )
}