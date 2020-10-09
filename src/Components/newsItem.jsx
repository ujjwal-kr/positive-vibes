import styled from 'styled-components';

export const Wrapper = styled.section`
    width: 100%;
    padding: 5%;
    font-size: 2em;
    @media (max-width: 870px) {
        font-size: 1.5em;
        padding: 2%;
    }
`

export const Item = styled.div`
    margin: 2em;
    border: 1px solid blue;
    border-radius: 10px;
    padding: 1em;
    @media (max-width: 870px) {
        margin: .2em;
        margin-top: 1.5em
    }
`

export const Center = styled.div`
    text-align: right;
    width: 100%;
`

export const Date = styled.div`
    font-size: .62em;
    color: gray;
    @media (max-width: 870px) {
        width: 100%;
        text-align: left;
        margin-bottom: 10px
    }
`

export const MobileButton = styled.div`
    display: none;
    @media (max-width: 870px) {
        display: block;
        width: 100%;
        text-align: center;
    }
`

export const DesktopButton = styled.div`
        @media (max-width: 870px) {
        display: none;
    }
`

export const MobileCenter = styled.div`
    @media (max-width: 800px) {
        text-align: center;
    }
`