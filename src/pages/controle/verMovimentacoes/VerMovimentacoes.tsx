import { Toast } from "../../../Components/Toast/Toast";
import { useRef, useState, useEffect, useContext } from 'react'
import { DataTableHeader, DataTableInfos, EditButton, Titulo, VerComprasWrapper } from "./style";
import DataTable from "../../../Components/DataTable";
import Column from "../../../Components/Column";
import MovimentacoesService from "../../../services/MovimentacoesService/MovimentacoesService";
import formatDate from "../../../helpers/functions/formatDate";
import Button from "../../../Components/Button";
import InputText from "../../../Components/InputText";
import { FilterMatchMode } from "primereact/api";
import DialogEdicaoMovimentacoes from "./DialogEdicaoMovimentacoesForm";
import getTokenLocal from "../../../helpers/functions/getTokenLocal";
import verifyToken from "../../../helpers/functions/verifyToken";

export default function VerMovimentacoes() {
    const [movimentacoes, setMovimentacoes] = useState<Movimentacoes[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [filtroGlobal, setFiltroGlobal] = useState<string>('')
    const [filters, setFilters] = useState<{ global: any }>({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    })

    const [modoEdicao, setModoEdicao] = useState<boolean>(false)
    const [movimentacaoEditando, setMovimentacaoEditando] = useState<Movimentacoes | {}>({})

    async function pegarMovimentacoes() {
        try {
            setIsLoading(true)

            const token = getTokenLocal()

            const { payload } = await verifyToken(token)

            const user = payload?.data || {}

            const res = (await MovimentacoesService.pegarMovimentacoesDoUsuario(user.id)).data

            setMovimentacoes(res)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    function onChangeFiltroGlobal(e: any) {
        const value = e.target.value
        let _filters = { ...filters }
        _filters['global'].value = value;
        setFilters(_filters)
        setFiltroGlobal(value)
    }

    function initFilters() {
        setFilters({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setFiltroGlobal('');
    }

    type Movimentacoes = {
        "id": string,
        "papel": string,
        "data": string | Date,
        "corretora": string,
        "preco": number,
        "qtd": number,
        "tipoMovimentacao": string,
        "userId": string
    }

    function abrirModoEdicao(movimentacao: Movimentacoes) {
        setModoEdicao(true)
        setMovimentacaoEditando(movimentacao)
    }
    function fecharModoEdicao() {
        setModoEdicao(false)
        setMovimentacaoEditando('')
    }

    function ColumnData(rowData: Movimentacoes) {
        const dataFormatada = formatDate(rowData.data)
        return <DataTableInfos tipo={rowData.tipoMovimentacao} >{`${dataFormatada}`}</DataTableInfos>
    }

    function ColumnPreco(rowData: Movimentacoes) {
        const precoFormatado = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(rowData.preco);
        return <span>{precoFormatado}</span>
    }

    function ColumnAcoes(rowData: Movimentacoes) {
        return <EditButton icon='pi pi-pencil' onClick={() => abrirModoEdicao(rowData)} />
    }

    const dataTableHeader = () => {
        return (
            <DataTableHeader>
                <Button nostyle={'true'} type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={initFilters} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={filtroGlobal} onChange={onChangeFiltroGlobal} placeholder="Keyword Search" />
                </span>
            </DataTableHeader>
        )
    }

    useEffect(() => {
        pegarMovimentacoes()
    }, [])

    const toast = useRef(null)
    return <VerComprasWrapper>

        <DialogEdicaoMovimentacoes
            pegarMovimentacoes={pegarMovimentacoes}
            fecharModoEdicao={fecharModoEdicao}
            rowdata={movimentacaoEditando as Movimentacoes}
            baseZIndex={100}
            header={`Deseja editar essa movimentação`}
            visible={modoEdicao}
            onHide={fecharModoEdicao}
            toast={toast}
        />

        <Toast reference={toast} />

        <Titulo>Ver Movimentações</Titulo>
        <DataTable
            value={movimentacoes}
            paginator
            rowsPerPageOptions={[5, 10, 15, 20]}
            rows={5}
            size="large"
            loading={isLoading}
            emptyMessage="Nenhuma movimentação encontrada."
            globalFilter={filtroGlobal}
            filterDisplay="menu"
            globalFilterFields={['papel', 'nome', 'tipoDeRenda', 'tipoDeInvestimento', 'taxasIncidentes']}
            header={dataTableHeader}
            filters={filters}
        >
            <Column field="papel" header="Papel" sortable />
            <Column field="qtd" header="Quantidade" />
            <Column field="preco" header="Preço" body={ColumnPreco} />
            <Column field="tipoMovimentacao" header="Tipo" />
            <Column field="data" header="Data" body={ColumnData} sortable />
            <Column field="corretora" header="Corretora" />
            <Column header="Ações" body={ColumnAcoes} />
        </DataTable>
    </VerComprasWrapper>
}