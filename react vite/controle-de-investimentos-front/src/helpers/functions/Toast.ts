export function mensagemDeSucesso(ref, titulo, detalhes, configs){
    return ref.current.show({severity: 'success', summary: titulo || 'Sucesso!', detail: detalhes || '', ...configs})
}

export function mensagemDeErro(ref, titulo, detalhes, configs){
    return ref.current.show({severity: 'error', summary: titulo || 'Erro!', detail: detalhes || '', ...configs})
}

export function mensagemDeAviso(ref, titulo, detalhes, configs){
    return ref.current.show({severity: 'warm', summary: titulo || 'Aviso!', detail: detalhes || '', ...configs})
}

export function mensagemDeInfo(ref, titulo, detalhes, configs){
    return ref.current.show({severity: 'info', summary: titulo || 'Informação!', detail: detalhes || '', ...configs})
}