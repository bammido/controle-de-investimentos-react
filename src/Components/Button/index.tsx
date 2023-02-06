import React from 'react';
import { Button as PrimeReactButton, ButtonProps } from 'primereact/button';

export default function Button(props: ButtonProps & { severity?: string }) {

    function defineSeverity() {
        const { severity } = props || {}

        let buttonStyle = { background: '' }

        switch (severity) {
            case 'sucesso':
                buttonStyle.background = '#16A34A'
                break;
            case 'info':
                buttonStyle.background = '#3B82F6'
                break;
            case 'ajuda':
                buttonStyle.background = '#9333EA'
                break;
            case 'aviso':
                buttonStyle.background = '#D97706'
                break;
            case 'erro':
                buttonStyle.background = '#DC2626'
                break;
            case 'secundario':
                buttonStyle.background = '#6E6E6E'
                break
            default:
                buttonStyle.background = '#6366F1'
                break;
        }

        return buttonStyle
    }

    return <>
        <PrimeReactButton {...props} style={defineSeverity()} />
    </>
}