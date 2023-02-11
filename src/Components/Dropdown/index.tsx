import { Dropdown as DropdownPrimeReact, DropdownProps as DropdownPropsPrimeReact, DropdownChangeParams as DropdownChangeParamsPrimeReact } from 'primereact/dropdown';

type DropdownProps = DropdownPropsPrimeReact & any

export type DropdownChangeParams = DropdownChangeParamsPrimeReact

export default function Dropdown(props: DropdownProps) {
    return <DropdownPrimeReact {...props} />
}