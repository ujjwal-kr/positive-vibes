import styled from "styled-components";

export const DesktopItems = styled.span`
    @media all and (max-width: 900px ) {
        display: none;
    }
`

export const MobileItems = styled.div`
    display: none;
    @media all and (max-width: 650px) {
        display: block;
    }
`