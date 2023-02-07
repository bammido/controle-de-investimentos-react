import { ErrorMessage, Formik } from "formik";
import { useRef, useState } from "react";
import Button from "../Components/Button";
import Dropdown, { DropdownChangeParams } from "../Components/Dropdown";
import InputNumber, { InputNumberChangeParams } from "../Components/InputNumber";
import InputText from "../Components/InputText";
import MultiSelect from "../Components/MultiSelect";
import { Toast } from "../Components/Toast/Toast";
import { mensagemDeErro } from "../helpers/functions/Toast";
import { initialValues, validation, InitialValuesType } from "../helpers/validationSchemas/CadastrarInvestimentos";
import { CadastrarInvestimentosForm, ErrorMessageSpan, FormInputsWrapper, InputLabel, InputTaxasLabel, InputWrapper, SubmitDiv, SubTitulo, Titulo } from "../styles/CadastrarInvestimentosStyle";

export default function CadastrarInvestimentos() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    const tiposDeRenda = [
        { label: 'Renda fixa', value: 'fixa' },
        { label: 'Renda variável', value: 'variavel' },
        { label: 'Tesouro direto', value: 'tesouro' },
    ]

    const tiposDeInvestimentosRendaFixa = [
        { label: 'CDB', value: 'CDB' },
        { label: 'CRI', value: 'CRI' },
        { label: 'CRA', value: 'CRA' },
        { label: 'LCI', value: 'LCI' },
        { label: 'LCA', value: 'LCA' },
    ]

    const taxasIncidentes = [
        { label: 'CDI', value: 'CDI' },
        { label: 'Selic', value: 'Selic' },
        { label: 'IPCA', value: 'IPCA' },
        { label: 'Real', value: 'Real' },
    ]

    async function cadastrar(values: InitialValuesType) {
        try {
            const {
                nome,
                tipoDeInvestimento,
                tipoDeRenda,
                'taxasIncidentes': taxas } = values

            const taxasIncidentes = taxas.length ? taxas.map((taxa: any) => `${taxa.taxa}:${taxa.valor}`).join(';') : null

            console.log(taxasIncidentes)
        } catch (error: any) {
            mensagemDeErro(toast, 'Erro')
        }
    }

    type SetFieldValueType = (field: string, value: any, shouldValidate?: boolean) => void

    function onChangeValorTaxasIncidentes(e: InputNumberChangeParams, setFieldValue: SetFieldValueType, taxasIncidentes: number[], taxaIncidente: string) {
        const newTaxasIncidentes = taxasIncidentes.map((taxa: any) => taxa.taxa === taxaIncidente ? { taxa: taxaIncidente, valor: e.value } : taxa)

        setFieldValue('taxasIncidentes', newTaxasIncidentes)
    }

    function OnChangeTaxas(e: DropdownChangeParams, setFieldValue: SetFieldValueType, taxasIncidentes: []) {
        const value = e.value

        if (!taxasIncidentes.length) {
            const novasTaxas = value.map((taxa: any) => { return { taxa, valor: null } })
            return setFieldValue('taxasIncidentes', novasTaxas)
        }

        if (taxasIncidentes.length > e.value.length) {
            const novasTaxas = taxasIncidentes.filter((taxa: any) => value.includes(taxa.taxa))
            return setFieldValue('taxasIncidentes', novasTaxas)
        }

        if (taxasIncidentes.length < e.value.length) {
            const novaTaxa = value[value.length - 1]
            const novasTaxas = [...taxasIncidentes, { taxa: novaTaxa, valor: null }]
            return setFieldValue('taxasIncidentes', novasTaxas)
        }

    } 

    return <div>
        <Toast Reference={toast} />
        <Titulo className="titulo">Cadastrar Investimentos</Titulo>
        <Formik
            onSubmit={cadastrar}
            initialValues={initialValues}
            validationSchema={validation}
        >
            {({ values, handleChange, handleSubmit, errors, setFieldValue }) => (
                <CadastrarInvestimentosForm onSubmit={handleSubmit}>
                    <FormInputsWrapper>
                        <InputWrapper>
                            <InputLabel htmlFor="papel">Papel</InputLabel>
                            <InputText
                                id="papel"
                                placeholder="ex: NSLU11"
                                value={values.papel}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="papel" />
                        </InputWrapper>
                        <InputWrapper>
                            <InputLabel htmlFor="nome">Nome</InputLabel>
                            <InputText
                                id="nome"
                                placeholder="Hospital Nossa Senhora de Lurdes"
                                value={values.nome}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="nome" />
                        </InputWrapper>
                        <InputWrapper>
                            <InputLabel htmlFor="tipoDeRenda">Tipo de renda</InputLabel>
                            <Dropdown
                                id='tipoDeRenda'
                                value={values.tipoDeRenda}
                                options={tiposDeRenda}
                                onChange={(e: DropdownChangeParams) => setFieldValue('tipoDeRenda', e.value)}
                                placeholder="Selecione um tipo de renda"
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="tipoDeRenda" />
                        </InputWrapper>
                        <InputWrapper>
                            <InputLabel htmlFor="tipoDeInvestimento">Tipo de investimento</InputLabel>
                            <Dropdown
                                id='tipoDeRenda'
                                value={values.tipoDeInvestimento}
                                options={tiposDeInvestimentosRendaFixa}
                                onChange={(e: DropdownChangeParams) => setFieldValue('tipoDeInvestimento', e.value)}
                                placeholder="Selecione um tipo de investimento"
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="tipoDeInvestimento" />
                        </InputWrapper>
                        <InputWrapper>
                            <InputLabel htmlFor="taxasIncidentes">Taxa(s) que incide(m)</InputLabel>
                            <MultiSelect
                                id='taxasIncidentes'
                                selectedItemsLabel="taxa"
                                value={values.taxasIncidentes?.map((taxa: any) => taxa.taxa)}
                                options={taxasIncidentes}
                                onChange={(e: DropdownChangeParams) => OnChangeTaxas(e, setFieldValue, values.taxasIncidentes as [])}
                                placeholder="Selecione um tipo de investimento"
                            />
                        </InputWrapper>
                    </FormInputsWrapper>
                    {values?.taxasIncidentes?.length ? <>
                        <SubTitulo>Defina a porcentagem das(s) taxa(s)</SubTitulo>
                        <FormInputsWrapper>
                            {values.taxasIncidentes?.map((taxaIncidente: any, i: number) => <InputWrapper key={new Date().getSeconds() + i}>
                                <InputTaxasLabel htmlFor={`${taxaIncidente.taxa}${i}`}>{taxaIncidente.taxa}</InputTaxasLabel>
                                <InputNumber
                                    id={`${taxaIncidente.taxa}${i}`}
                                    mode='decimal'
                                    value={taxaIncidente.valor}
                                    onValueChange={(e: InputNumberChangeParams) => onChangeValorTaxasIncidentes(e, setFieldValue, values.taxasIncidentes as [], taxaIncidente.taxa)}
                                    suffix=" %"
                                />
                            </InputWrapper>)
                            }
                        </FormInputsWrapper>
                    </> : <></>}
                    <SubmitDiv className="submit-button" >
                        <Button
                            type="submit"
                            label="enviar"
                            loading={isLoading}
                        />
                    </SubmitDiv>
                </CadastrarInvestimentosForm>
            )}
        </Formik>
    </div>
}