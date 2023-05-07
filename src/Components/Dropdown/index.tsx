import { Dropdown as DropdownPrimeReact, DropdownProps as DropdownPropsPrimeReact, DropdownChangeParams as DropdownChangeParamsPrimeReact } from 'primereact/dropdown';

type DropdownProps = {
    loading?: boolean
}

export type DropdownChangeParams = DropdownChangeParamsPrimeReact

export default function Dropdown(props: DropdownPropsPrimeReact & DropdownProps) {
    return <DropdownPrimeReact {...props}
        dropdownIcon={props.loading ? "pi pi-spin pi-spinner" : "pi pi-chevron-down"}
    />
}