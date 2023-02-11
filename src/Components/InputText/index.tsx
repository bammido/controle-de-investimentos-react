import { InputText as Input, InputTextProps as InputTextPropsPrimeReact } from 'primereact/inputtext';

export type InputTextProps = InputTextPropsPrimeReact & { isInvalid?: boolean }

export default function InputText(props: InputTextProps) {
    const { isInvalid } = props || {}
    return <Input {...props} className={`${props.className ? props.className : ''} ${isInvalid ? "p-invalid block" : ''}`} />
}