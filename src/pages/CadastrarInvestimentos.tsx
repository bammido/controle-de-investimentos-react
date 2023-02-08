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
import { CadastrarInvestimentosForm, ErrorMessageSpan, FormInputsWrapper, InputLabel, InputstaxasWrapper, InputTaxasLabel, InputWrapper, Span, SubmitDiv, SubTitulo, Titulo } from "../styles/CadastrarInvestimentosStyle";

export default function CadastrarInvestimentos() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    const tiposDeRenda = [
        { label: 'Renda fixa', value: 'fixa' },
        { label: 'Renda variável', value: 'variavel' },
        { label: 'Tesouro direto', value: 'tesouro' },
        { label: 'Fundos de investimentos', value: 'fundos' },
    ]

    const tiposDeInvestimentosRendaFixa = [
        { label: 'CDB', value: 'CDB' },
        { label: 'CRI', value: 'CRI' },
        { label: 'CRA', value: 'CRA' },
        { label: 'LCI', value: 'LCI' },
        { label: 'LCA', value: 'LCA' },
    ]

    const tiposDeInvestimentosRendaVariavel = [
        { label: 'Ação', value: 'acao' },
        { label: 'Fundo Imobiliario', value: 'Fundo imobiliario' },
        { label: 'ETF', value: 'ETF' },
    ]

    const taxasIncidentes = [
        { label: 'CDI', value: 'CDI' },
        { label: 'Selic', value: 'selic' },
        { label: 'IPCA', value: 'IPCA' },
        { label: 'Prefixado', value: 'prefixado' },
        { label: 'Teste1', value: 'Teste1' },
        { label: 'Teste2', value: 'Teste2' },
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

    function onChangeTipoDeRenda(e: DropdownChangeParams, setFieldValue: SetFieldValueType) {
        setFieldValue('tipoDeInvestimento', '')
        setFieldValue('tipoDeRenda', e.value)
    }


    function onChangeValorTaxasIncidentes(e: InputNumberChangeParams, setFieldValue: SetFieldValueType, taxasIncidentes: number[], taxaIncidente: string) {
        const newTaxasIncidentes = taxasIncidentes.map((taxa: any) => taxa.taxa === taxaIncidente ? { taxa: taxaIncidente, valor: e.value } : taxa)

        setFieldValue('taxasIncidentes', newTaxasIncidentes)
    }

    function OnChangeTaxas(e: DropdownChangeParams, setFieldValue: SetFieldValueType, taxasIncidentes: []) {
        const value = e.value
        let novasTaxas: any[] = []

        if (taxasIncidentes.length > e.value.length) {
            novasTaxas = taxasIncidentes.filter((taxa: any) => value.includes(taxa.taxa))
        }

        if (taxasIncidentes.length < e.value.length) {
            const taxasIncidentesAux = taxasIncidentes.map((taxa: any) => taxa.taxa)
            novasTaxas = value.map((taxa: any) => taxasIncidentesAux.includes(taxa) ? taxasIncidentes.find((taxaIncidente: any) => taxaIncidente.taxa === taxa) : { taxa: taxa, valor: null })
        }

        novasTaxas = novasTaxas.map((taxa: any) => taxa.taxa.toUpperCase() !== 'PREFIXADO' ? { taxa: taxa.taxa, valor: taxa.taxa } : taxa)

        return setFieldValue('taxasIncidentes', novasTaxas)

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
                                onChange={(e: DropdownChangeParams) => onChangeTipoDeRenda(e, setFieldValue)}
                                placeholder="Selecione um tipo de renda"
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="tipoDeRenda" />
                        </InputWrapper>
                        {
                            values.tipoDeRenda && (values.tipoDeRenda.toLowerCase() !== 'tesouro' && values.tipoDeRenda.toLowerCase() !== 'fundos') && < InputWrapper >
                            <InputLabel htmlFor="tipoDeInvestimento">Tipo de investimento</InputLabel>
                            <Dropdown
                                id='tipoDeRenda'
                                value={values.tipoDeInvestimento}
                                    options={values.tipoDeRenda.toLowerCase() === 'fixa' ? tiposDeInvestimentosRendaFixa : tiposDeInvestimentosRendaVariavel}
                                    onChange={(e: DropdownChangeParams) => setFieldValue('tipoDeInvestimento', e.value)}
                                placeholder="Selecione um tipo de investimento"
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                    name="tipoDeInvestimento"
                                />
                        </InputWrapper>
                        }
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
                        <ErrorMessage
                            component={ErrorMessageSpan}
                            className="error-message"
                            name="taxasIncidentes"
                        />
                        <InputstaxasWrapper>
                            {values.taxasIncidentes?.map((taxaIncidente: any, i: number) => <>
                                <InputWrapper key={new Date().getSeconds() + i}>
                                    {taxaIncidente.taxa.toUpperCase() !== 'PREFIXADO' && <>
                                        <InputTaxasLabel htmlFor={taxaIncidente.taxa}>{taxaIncidente.taxa.toUpperCase()}</InputTaxasLabel>
                                        <InputText
                                            disabled={true}
                                            id={taxaIncidente.taxa}
                                            value={taxaIncidente.valor}
                                        />
                                    </>}
                                    {taxaIncidente.taxa.toUpperCase() === 'PREFIXADO' && <>
                                        <InputTaxasLabel htmlFor={taxaIncidente.taxa}>{taxaIncidente.taxa.toUpperCase()}</InputTaxasLabel>
                                <InputNumber
                                            id={taxaIncidente.taxa}
                                    mode='decimal'
                                    value={taxaIncidente.valor}
                                    onValueChange={(e: InputNumberChangeParams) => onChangeValorTaxasIncidentes(e, setFieldValue, values.taxasIncidentes as [], taxaIncidente.taxa)}
                                    suffix=" %"
                                />
                                    </>}
                                </InputWrapper>
                                {(values.taxasIncidentes.length - 1 !== i) && <Span>+</Span>}
                            </>)
                            }
                        </InputstaxasWrapper>
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