import { Card, Grid, Input, Text } from "@nextui-org/react";
import { TopContentWrapper } from "../../styles/top-content";

export default function TopContent() {
    return (
        <Card variant="bordered"  style={{background: '#050505'}}>
            <TopContentWrapper>

                <Grid.Container gap={2} justify="center">
                    <Grid xs={9}>
                        <Input width="75%" bordered size="lg" placeholder="Search" color="primary" />

                    </Grid>
                    <Grid xs={3}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <Text
                                h1
                                size="xl"
                                css={{
                                    textGradient: "45deg, $pink600 -20%, $blue600 50%",
                                }}
                                weight="bold"
                            >
                                29°C
                            </Text>
                        </div>
                    </Grid>
                </Grid.Container>
            </TopContentWrapper>
        </Card>
    )
}