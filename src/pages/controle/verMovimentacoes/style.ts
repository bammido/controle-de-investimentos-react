import styled from "styled-components";
import {
    Titulo as TituloVerInvestimentos,
    DataTableHeader as DataTableHeaderVerInvestimentos,
    VerInvestimentosWrapper,
    EditButton as EditButtonVeInvestimentos
} from '../verPapeis/style'

export const Titulo = styled(TituloVerInvestimentos)``

export const DataTableHeader = styled(DataTableHeaderVerInvestimentos)``

export const VerComprasWrapper = styled(VerInvestimentosWrapper)``

export const EditButton = styled(EditButtonVeInvestimentos)``

type DataTableInfosProps = {
    tipo: string
}

export const DataTableInfos = styled.span<DataTableInfosProps>`
    color: ${(props) => props.tipo === 'compra' ? props.theme.pallete.green : props.theme.pallete.red}
`