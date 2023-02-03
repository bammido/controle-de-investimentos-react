import { Toast as ToastPrimeReact, ToastProps as ToastPropsPrimeReact } from "primereact/toast";

export type ToastProps = ToastPropsPrimeReact & { Ref: React.RefObject<typeof Toast> } & any

export function Toast(props: ToastProps) {
    const { Ref } = props
    return <ToastPrimeReact ref={Ref} {...props} />
}