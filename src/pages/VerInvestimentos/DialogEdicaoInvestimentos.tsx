import { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import Button from "../../Components/Button";
import Dialog, { DialogProps } from "../../Components/Dialog";
import InputText from "../../Components/InputText";
import { CadastrarInvestimentosForm, ErrorMessageSpan, FormInputsWrapper, InputLabel, InputPrefixado, InputPrefixadoCloseIcon, InputstaxasWrapper, InputTaxasLabel, InputWrapper, Span, SubmitDiv, SubTitulo } from "../../styles/CadastrarInvestimentosStyle";
import MultiSelect from "../../Components/MultiSelect";
import Dropdown, { DropdownChangeParams } from "../../Components/Dropdown";
import { edicaoValidation } from "../../helpers/validationSchemas/CadastrarInvestimentos";
import { somenteUmEspacoEntrePalavras, toUpperCase, transformValue } from "../../helpers/functions/transformers/valueTransforms";
import { tiposDeRenda, tiposDeInvestimentosRendaFixa, tiposDeInvestimentosRendaVariavel, taxasIncidentes } from "../CadastrarInvestimentos/options";
import InputNumber, { InputNumberChangeParams } from "../../Components/InputNumber";
import sleep from "../../helpers/functions/sleep";
import PapelServiceMakePayload from "../../services/PapelService/PapelServiceMakePayload";
import PapelService from "../../services/PapelService/PapelService";
import { mensagemDeErro, mensagemDeSucesso } from "../../helpers/functions/Toast";
import { Toast as ToastPrimeReact } from "primereact/toast";
import Chip from "../../Components/Chip";

type InvestimentosType = {
        id: string,
        papel: string,
        nome: string,
        tipoDeRenda: string,
        tipoDeInvestimento?: string,
        taxasIncidentes?: string
}

type RowData = {
        rowdata: InvestimentosType
}

type Toast = {
        toast: React.RefObject<ToastPrimeReact>
}

type Props = DialogProps & RowData & Toast

export default function DialogEdicaoInvestimentos(props: Props) {
        const [isLoading, setIsloading] = useState<boolean>(false)
        const [taxasIncidentesEdicao, setTaxasIncidentesEdicao] = useState<Array<any>>([])

        async function editar(values: any) {
                try {
                        setIsloading(true)
                        await sleep(3000)

                        const {
                                papel,
                                nome,
                                tipoDeInvestimento,
                                tipoDeRenda,
                                'taxasIncidentes': taxas } = values

                        const taxasIncidentesString = taxas && taxas.length ? taxas.map((taxa: any) => `${taxa.taxa}:${taxa.valor}`).join(';') : null

                        const editarPapelPayload = PapelServiceMakePayload.editar(papel, nome, tipoDeRenda, tipoDeInvestimento, taxasIncidentesString)

                        const res = await PapelService.editar(props.rowdata.id, editarPapelPayload)

                        mensagemDeSucesso(props.toast, 'sucesso', `${papel} editado com sucesso!`)
                } catch (error) {
                        mensagemDeErro(props.toast, 'Ops...', 'falha ao editar papel!')
                } finally {
                        setIsloading(false)
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


        function onChangePapel(e: React.ChangeEvent<any>, setFieldValue: SetFieldValueType) {
                const { value } = e.target

                const transformers = [toUpperCase, somenteUmEspacoEntrePalavras]
                const newValue = transformValue({ transformers, value })

                setFieldValue('papel', newValue)
        }

        function onRemoveTaxa(taxaParaRemover: any, setFieldValue: SetFieldValueType, taxasIncidentes: []) {
                const novasTaxas = taxasIncidentes.filter((taxa: any) => taxa.taxa !== taxaParaRemover.taxa)

                return setFieldValue('taxasIncidentes', novasTaxas)
        }


        useEffect(() => {
                const { rowdata } = props


                if (!rowdata?.taxasIncidentes) return setTaxasIncidentesEdicao([])
                const valoresTaxas = rowdata?.taxasIncidentes?.split(';')
                const taxas = valoresTaxas?.map((taxa: string, i) => {
                        const nomeTaxa = taxa.split(':')[0]
                        const valor = taxa.split(':')[1]
                        return { taxa: nomeTaxa, valor }
                })

                setTaxasIncidentesEdicao(taxas)
                console.log(taxas)

        }, [props.rowdata])

        const initialValues = {
                papel: props.rowdata.papel,
                nome: props.rowdata.nome,
                tipoDeInvestimento: props.rowdata.tipoDeInvestimento,
                tipoDeRenda: props.rowdata.tipoDeRenda,
                taxasIncidentes: taxasIncidentesEdicao
        }

        return <Dialog {...props} >
                <Formik
                        onSubmit={editar}
                        initialValues={initialValues}
                        validationSchema={edicaoValidation}
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
                                                                onChange={e => onChangePapel(e, setFieldValue)}
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
                                                <SubTitulo>Verifique a porcentagem das(s) taxa(s)</SubTitulo>
                                                <ErrorMessage
                                                        component={ErrorMessageSpan}
                                                        className="error-message"
                                                        name="taxasIncidentes"
                                                />
                                                <InputstaxasWrapper>
                                                        {values.taxasIncidentes?.map((taxaIncidente: any, i: number) => <div key={new Date().getSeconds() + i}>
                                                                <InputWrapper >
                                                                        {taxaIncidente.taxa.toUpperCase() !== 'PREFIXADO' && <>
                                                                                <Chip
                                                                                        label={taxaIncidente.taxa.toUpperCase()}
                                                                                        removable
                                                                                        onRemove={() => onRemoveTaxa(taxaIncidente, setFieldValue, values.taxasIncidentes as [])}
                                                                                />
                                                                        </>}
                                                                        {taxaIncidente.taxa.toUpperCase() === 'PREFIXADO' && <>
                                                                                <span className="p-input-icon-right">
                                                                                        <InputPrefixadoCloseIcon className={"pi pi-times-circle"} onClick={() => onRemoveTaxa(taxaIncidente, setFieldValue, values.taxasIncidentes as [])} />
                                                                                        <InputPrefixado
                                                                                                id={taxaIncidente.taxa}
                                                                                                mode='decimal'
                                                                                                value={taxaIncidente.valor}
                                                                                                placeholder='digite o valor'
                                                                                                onValueChange={(e: InputNumberChangeParams) => onChangeValorTaxasIncidentes(e, setFieldValue, values.taxasIncidentes as [], taxaIncidente.taxa)}
                                                                                                suffix={' %'}
                                                                                        />
                                                                                </span>
                                                                        </>}
                                                                </InputWrapper>
                                                                {(values.taxasIncidentes && values.taxasIncidentes.length - 1 !== i) && <Span>+</Span>}
                                                        </div>)
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
        </Dialog>
}