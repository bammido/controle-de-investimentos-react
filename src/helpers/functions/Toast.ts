import { Toast, ToastMessage } from "primereact/toast"

export function mensagemDeSucesso(ref: React.RefObject<Toast>, titulo?: string, detalhes?: string, configs?: ToastMessage) {
    return (ref.current as Toast).show({ severity: 'success', summary: titulo || 'Sucesso!', detail: detalhes || '', ...configs })
}

export function mensagemDeErro(ref: React.RefObject<Toast>, titulo?: string, detalhes?: string, configs?: ToastMessage) {
    return (ref.current as Toast).show({ severity: 'error', summary: titulo || 'Erro!', detail: detalhes || '', ...configs })
}

export function mensagemDeAviso(ref: React.RefObject<Toast>, titulo?: string, detalhes?: string, configs?: ToastMessage) {
    return (ref.current as Toast).show({ severity: 'warn', summary: titulo || 'Aviso!', detail: detalhes || '', ...configs })
}

export function mensagemDeInfo(ref: React.RefObject<Toast>, titulo?: string, detalhes?: string, configs?: ToastMessage) {
    return (ref.current as Toast).show({ severity: 'info', summary: titulo || 'Informação!', detail: detalhes || '', ...configs })
}