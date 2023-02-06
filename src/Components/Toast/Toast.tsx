import { Toast as ToastPrimeReact, ToastProps as ToastPropsPrimeReact } from "primereact/toast";

export type ToastProps = ToastPropsPrimeReact & { Reference: React.RefObject<typeof Toast> } & any

export function Toast(props: ToastProps) {
    const { Reference } = props
    return <ToastPrimeReact ref={Reference} {...props} />
}