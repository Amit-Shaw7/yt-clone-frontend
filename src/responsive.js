import {css} from 'styled-components';

export const sm = (props) => {
    return css`
        @media only screen and (max-width : 426px){
            ${props}
        }
    `
}

export const md = (props) => {
    return css`
        @media only screen and (max-width : 769px){
            ${props}
        }
    `
}
export const lg = (props) => {
    return css`
        @media only screen and (max-width : 1025px){
            ${props}
        }
    `
}
export const customlg = (props) => {
    return css`
        @media only screen and (max-width : 1360px){
            ${props}
        }
    `
}