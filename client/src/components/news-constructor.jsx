import { Button, Card, Grid, Text } from "@nextui-org/react"
import { NewsContentWrapper } from "../styles/news-wrapper"

export default function NewsConstructor(props) {
    let { item } = props
    console.log(item[0])

    return (
        item.map((news, key) =>
            <NewsContentWrapper key={key}>
                <Card isHoverable variant="bordered" style={newsStyle}>
                    <h3>{news.title._text}</h3>
                    <Grid.Container gap={2}>
                        <Grid xs={9}>
                            <div>
                                <Text css={{
                                    textGradient: "45deg, $red600 -20%, $pink600 100%",
                                }}
                                    weight="bold" >
                                    {news.source._text}</Text>
                                <Text color="gray">{news.pubDate._text}</Text>
                            </div>
                        </Grid>
                        <Grid xs={3}>
                            <Button size={"lg"} auto onClick={() => window.open(news.link._text)}
                                color={"gradient"}>Read Post</Button>
                        </Grid>
                    </Grid.Container>
                </Card>
            </NewsContentWrapper>)
    )
}

const newsStyle = {
    background: '#050505',
    padding: '2rem',
    margin: '1.5rem'
}