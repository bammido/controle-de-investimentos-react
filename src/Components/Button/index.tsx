import React, { useEffect, useState } from 'react';
import { Button as PrimeReactButton, ButtonProps } from 'primereact/button';
import { FormikErrors } from 'formik';

export default function Button(props: ButtonProps & { severity?: string, sucesso?: boolean | string, errors?: FormikErrors<any> }) {

    const { sucesso, errors } = props || {}
    const [buttonStyle, setButtonStyle] = useState<any>({})

    function defineSeverity(errors?: FormikErrors<any>) {
        const errorsKeys = errors && Object.keys(errors)

        let severity = ''

        if (errorsKeys && errorsKeys.length) severity = 'erro'
        else if (sucesso) severity = 'sucesso'
        else severity = ''


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

        setButtonStyle(buttonStyle)
    }

    useEffect(() => {
        defineSeverity(errors)
    }, [sucesso, errors])


    return <>
        <PrimeReactButton {...props} style={buttonStyle} />
    </>
}