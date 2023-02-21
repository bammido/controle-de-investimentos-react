import { Inplace as InplacePrimeReact, InplaceProps } from 'primereact/inplace';

export default function Inplace(props: InplaceProps) {
    return <InplacePrimeReact {...props} >
        {props.children}
    </ InplacePrimeReact>
}