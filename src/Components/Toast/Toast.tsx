import { Toast as ToastPrimeReact, ToastProps as ToastPropsPrimeReact } from "primereact/toast";

export type ToastProps = ToastPropsPrimeReact & { Reference: React.RefObject<typeof Toast> } & any

export function Toast(props: ToastProps) {
    const { reference } = props
    return <ToastPrimeReact ref={reference} {...props} />
}