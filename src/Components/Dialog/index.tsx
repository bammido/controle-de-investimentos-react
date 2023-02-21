import { Dialog as DialogPrimeReact, DialogProps as DialogPropsPrimeReact } from 'primereact/dialog';

export type DialogProps = DialogPropsPrimeReact

export default function Dialog(props: DialogProps) {
    return <DialogPrimeReact {...props} />
}