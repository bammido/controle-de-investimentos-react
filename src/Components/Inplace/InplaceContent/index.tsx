import { InplaceContent as InplaceContentPrimeReact } from "primereact/inplace";

type Props = {
    children?: React.ReactNode;
}

export default function InplaceContent(props: Props) {
    return <InplaceContentPrimeReact {...props} />
}