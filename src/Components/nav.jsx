import styled from 'styled-components';

export const Ham = styled.span`
    display: none;
    color: white !important;
    @media (max-width: 800px) {
        display: block
    }
`

export const NavWrapper = styled.div`
    @media (max-width: 800px) {
        display: none
    }
`


export const NavLink = {
    textDecoration: 'none',
    color: 'black'
}