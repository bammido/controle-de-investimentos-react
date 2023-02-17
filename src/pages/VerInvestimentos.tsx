import { FilterMatchMode } from 'primereact/api';
import { useEffect, useState, useRef } from 'react'
import Button from '../Components/Button';
import Column from "../Components/Column";
import DataTable from "../Components/DataTable";
import InputText from '../Components/InputText';
import { Toast } from '../Components/Toast/Toast';
import sleep from '../helpers/functions/sleep';
import { mensagemDeErro, mensagemDeSucesso } from '../helpers/functions/Toast';
import PapelService from '../services/PapelService/PapelService';
import { DataTableHeader, Titulo, VerInvestimentosWrapper } from "../styles/VerInvestimentosStyle";

export default function VerInvestimentos(){
    const toast = useRef(null)

    const [investimentos, setInvestimentos] = useState<[]>([])
    const [filtroGlobal, setFiltroGlobal] = useState<string>('')
    const [filters, setFilters] = useState<{ global: any }>({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function pegarPapeis() {
        try {
            setIsLoading(true)
            const papeis = (await PapelService.pegarPapeis()).data
            setInvestimentos(papeis)
            mensagemDeSucesso(toast, 'investimentos carregados com sucesso!')
        } catch (error: any) {
            mensagemDeErro(toast, 'Ops...', 'Não foi possível carregar os investimentos!')
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
        pegarPapeis()
    }, [])

    return <VerInvestimentosWrapper>

        <Toast reference={toast} />

        <Titulo>Ver Investimentos</Titulo>
        <DataTable
            value={investimentos}
            paginator
            rowsPerPageOptions={[5, 10, 15, 20]}
            rows={5}
            size="large"
            loading={isLoading}
            emptyMessage="Nenhum investimento encontrado."
            globalFilter={filtroGlobal}
            filterDisplay="menu"
            globalFilterFields={['papel', 'nome', 'tipoDeRenda', 'tipoDeInvestimento', 'taxasIncidentes']}
            header={dataTableHeader}
            filters={filters}
        >
            <Column field="papel" header="Papel" sortable />
            <Column field="nome" header="Nome" sortable />
            <Column field="tipoDeRenda" header="Tipo de Renda" />
            <Column field="tipoDeInvestimento" header="Tipo de Investimento" />
            <Column field="taxasIncidentes" header="Taxas Incidentes" />
        </DataTable>
    </VerInvestimentosWrapper>
}