import { InplaceDisplay as InplaceDisplayPrimeReact } from "primereact/inplace";

type Props = {
    children?: React.ReactNode;
}

export default function InplaceDisplay(props: Props) {
    return <InplaceDisplayPrimeReact {...props} >
        {props.children}
    </ InplaceDisplayPrimeReact>
}