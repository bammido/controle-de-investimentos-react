import * as yup from 'yup'
import { ObjectShape, TypeOfShape } from 'yup/lib/object';

export type InitialValuesType = {
    papel: string,
    nome: string,
    tipoDeRenda: string,
    tipoDeInvestimento?: string,
    taxasIncidentes: []
}

export const initialValues: InitialValuesType = {
    papel: 'teste',
    nome: '',
    tipoDeInvestimento: '',
    tipoDeRenda: '',
    taxasIncidentes: []
}

export const validation = yup.object().shape({
    tipoDeRenda: yup.string().required('Campo obrigatório'),
    tipoDeInvestimento: yup.string(),
    papel: yup.string().required('Campo obrigatório'),
    nome: yup.string().required('Campo obrigatório'),
    taxasIncidentes: yup.array().of(yup.object()).test('verificaTaxas', 'os valores das taxas devem ser preenchidos', verificaTaxas)
});

function verificaTaxas(taxas: TypeOfShape<ObjectShape>[] | undefined): boolean {
    if (taxas && taxas.length) {
        const taxaSemValor = taxas.find((taxa: any) => !taxa.valor)

        return taxaSemValor ? false : true
    }

    return true
}