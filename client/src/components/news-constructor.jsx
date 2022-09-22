import { Button, Card, Grid, Text } from "@nextui-org/react"
import { NewsContentWrapper } from "../styles/news-wrapper"
import { DesktopItems, MobileItems } from "../styles/responsive"

export default function NewsConstructor(props) {
    let { item } = props

    return (
        item.map((news, key) => 
            <NewsContentWrapper key={key}>
                <Card isHoverable variant="bordered" style={newsStyle}>
                    <DesktopItems>
                        <h3>{news.title._text}</h3>
                    </DesktopItems>

                    <MobileItems>
                        <h4>{news.title._text}</h4>
                    </MobileItems>
                    <DesktopItems>
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
                    </DesktopItems>

                    <MobileItems>
                        <Grid.Container gap={2}>
                            <Grid xs={6}>
                                <div>
                                    <Text size={"$sm"} css={{
                                        textGradient: "45deg, $red600 -20%, $pink600 100%",
                                    }}
                                        weight="bold" >
                                        {news.source._text}</Text>
                                    <Text size={"$sm"} color="gray">{news.pubDate._text}</Text>
                                </div>
                            </Grid>
                            <Grid xs={6}>
                                <Button style={{ marginTop: '10px' }} auto onClick={() => window.open(news.link._text)}
                                    color={"gradient"}>Read Post</Button>
                            </Grid>
                        </Grid.Container>
                    </MobileItems>

                </Card>
            </NewsContentWrapper>
        ))
}

const newsStyle = {
    background: '#050505',
    padding: '2rem',
    marginTop: '1.5rem',
    marginBottom: '1.5rem'
}