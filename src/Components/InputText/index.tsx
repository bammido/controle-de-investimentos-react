import { InputText as Input, InputTextProps as InputTextPropsPrimeReact } from 'primereact/inputtext';

export type InputTextProps = InputTextPropsPrimeReact & { invalid?: number }

export default function InputText(props: InputTextProps) {
    const { invalid } = props
    return <Input {...props} className={`${props.className ? props.className : ''} ${invalid ? "p-invalid block" : ''}`} />
}