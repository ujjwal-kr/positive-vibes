import styled from 'styled-components';

export const Wrapper = styled.section`
    width: 100%;
    padding: 5%;
    font-size: 2em;
    @media (max-width: 800px) {
        font-size: 1.4em;
        padding: 2%;
    }
`

export const Item = styled.div`
    margin: 2em;
    border: 1px solid blue;
    border-radius: 10px;
    padding: 1em;
    @media (max-width: 800px) {
        margin: .5em;
    }
`

export const Center = styled.div`
    text-align: right;
    width: 100%;
`

export const Date = styled.span`
    font-size: .62em;
    color: gray;
`