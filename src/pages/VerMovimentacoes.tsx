import { Toast } from "../Components/Toast/Toast";
import { useRef, useState, useEffect } from 'react'
import { DataTableHeader, Titulo, VerComprasWrapper } from "../styles/VerMovimentacoesStyle";
import DataTable from "../Components/DataTable";
import Column from "../Components/Column";
import sleep from "../helpers/functions/sleep";
import MovimentacoesService from "../services/MovimentacoesService/MovimentacoesService";
import formatDate from "../helpers/functions/formatDate";
import Button from "../Components/Button";
import InputText from "../Components/InputText";
import { FilterMatchMode } from "primereact/api";

export default function VerMovimentacoes() {
    const [movimentacoes, setMovimentacoes] = useState<[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [filtroGlobal, setFiltroGlobal] = useState<string>('')
    const [filters, setFilters] = useState<{ global: any }>({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    })

    async function pegarMovimentacoes() {
        try {
            setIsLoading(true)
            await sleep(3000)
            const res = (await MovimentacoesService.pegarMovimentacoes()).data
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
        "dataDaCompra": string,
        "corretora": string,
        "preco": number,
        "qtd": number,
        "tipoMovimentacao": string,
        "userId": string
    }

    function ColumnData(rowData: Movimentacoes) {
        const dataFormatada = formatDate(rowData.dataDaCompra)
        return <span>{`${dataFormatada}`}</span>
    }

    function ColumnPreco(rowData: Movimentacoes) {
        const precoFormatado = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(rowData.preco);
        return <span>{precoFormatado}</span>
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
            <Column field="dataDaCompra" header="Data" body={ColumnData} sortable />
            <Column field="corretora" header="Corretora" />
        </DataTable>
    </VerComprasWrapper>
}