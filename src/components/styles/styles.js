import styled, {css} from 'styled-components'

export const MensajeError = styled.label`
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
    color: red;
    font-weight: bold;
    display: none;

    ${props => props.valido === 'true' && css`
        display: none
    `}
    ${props => props.valido === 'false' && css`
        display: block;
    `}
`;

export const MensajeErrorFormulario = styled.label`
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
    color: red;
    font-weight: bold;
    display: none;
`;