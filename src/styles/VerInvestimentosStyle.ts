import styled from "styled-components";
import Button from "../Components/Button";
import { Titulo as TituloCadastrarInvestimentos } from "./CadastrarPapelStyle";

export const Titulo = styled(TituloCadastrarInvestimentos)``

export const DataTableHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const VerInvestimentosWrapper = styled.div`
    padding: 5vh 5vw;

    
    & .p-datatable .p-datatable-header{
        background-color: ${props => props.theme.pallete.secondary.main} ;
        
        border: 1px solid ${props => props.theme.pallete.secondary.contrastText};
        border-left: none;
        border-right: none;
    }

    & .p-datatable.p-datatable-lg .p-datatable-thead > tr > th{
        background-color: ${props => props.theme.pallete.secondary.main} ;
        
        border: 1px solid ${props => props.theme.pallete.secondary.contrastText};
        border-left: none;
        border-right: none;
        border-top: none;
    }

    & .p-datatable .p-column-header-content{
        color: ${props => props.theme.pallete.secondary.contrastText} ;
    }

    & .p-datatable .p-datatable-tbody > tr > td {
        background-color: ${props => props.theme.pallete.secondary.main} ;
        color: ${props => props.theme.pallete.secondary.contrastText} ;
        
        border: 1px solid ${props => props.theme.pallete.secondary.contrastText};
        border-left: none;
        border-right: none;    
    }

    & .p-paginator{
        background-color: ${props => props.theme.pallete.secondary.main} ;
        
        border: 1px solid ${props => props.theme.pallete.secondary.contrastText};
        border-left: none;
        border-right: none;
        border-top: none;
    }

    & .p-datatable .p-sortable-column .p-sortable-column-icon{
        color:${props => props.theme.pallete.secondary.contrastText} ;
    }

    & .p-datatable .p-sortable-column .p-highligh{
        color:${props => props.theme.pallete.secondary.contrastText} !important;
    }

    & .p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon{
        color:${props => props.theme.pallete.secondary.contrastText} !important;
    }

    & .p-datatable .p-sortable-column:hover{
        background-color: rgba(255,255,255,0.2) !important ;

        & .p-sortable-column-icon{
            color:${props => props.theme.pallete.secondary.contrastText} !important;
        }
    }
`

export const EditButton = styled(Button)`
    border-radius: 50%;
`