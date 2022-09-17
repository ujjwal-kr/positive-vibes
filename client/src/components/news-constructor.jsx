export default function NewsConstructor(props) {
    let { item } = props

    return (
        item.map((news, key) => <h3>{news.title._text}</h3>)
    )
}