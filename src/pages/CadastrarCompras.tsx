import { Formik, ErrorMessage, FormikErrors, FormikHelpers } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "../Components/Button";
import DatePicker from "../Components/DatePicker";
import InputNumber from "../Components/InputNumber";
import InputText from "../Components/InputText";
import { initialValues, InitialValuesType, validation } from "../helpers/validationSchemas/CadastrarCompras";
import { mensagemDeErro, mensagemDeSucesso } from "../helpers/functions/Toast";
import { CadastrarComprasForm, ErrorMessageSpan, FormInputsWrapper, InputLabel, InputWrapper, SubmitDiv, Titulo } from "../styles/CadastrarComprasStyle";
import { Toast } from "../Components/Toast/Toast";
import PapelService from "../services/PapelService/PapelService";
import Dropdown, { DropdownChangeParams } from "../Components/Dropdown";
import verifyToken from "../helpers/functions/verifyToken";
import getTokenLocal from "../helpers/functions/getTokenLocal";
import MovimentacoesServiceMakePayload from "../services/MovimentacoesService/MovimentacoesServiceMakePayload";
import MovimentacoesService from "../services/MovimentacoesService/MovimentacoesService";

export default function CadastrarCompras() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [papeis, setPapeis] = useState<any>([])

    const tiposMovimentacao = ['compra', 'venda']

    async function pegaPapeis() {
        try {
            const res = await PapelService.pegarPapeis()

            const codigos = res.data?.map((papel: any) => papel.papel)

            setPapeis(codigos)
            throw new Error('')
        } catch (error: any) {
            mensagemDeErro(toast, 'Ops...', 'erro ao buscar papeis, tente novamente mais tarde!')
        }
    }

    useEffect(() => {
        pegaPapeis()
    }, [])

    async function cadastrar(values: InitialValuesType, formikHelpers: FormikHelpers<InitialValuesType>) {
        try {
            const { resetForm } = formikHelpers
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 3000))
            setSucesso(true)

            const token = getTokenLocal()

            const user = (await verifyToken(token))?.payload?.data

            const { dataDaCompra, preco, qtd, corretora, papel, tipoMovimentacao } = values
            const userId = user?.id

            const movimentacaoPayload = MovimentacoesServiceMakePayload.cadastrar(dataDaCompra, preco, qtd, corretora, papel, tipoMovimentacao, userId)

            const res = await MovimentacoesService.cadastrar(movimentacaoPayload)

            mensagemDeSucesso(toast, 'Sucesso!', 'Investimento cadastrado!', { life: 3000, closable: true })
            resetForm()
        } catch (error: any) {
            mensagemDeErro(toast, 'Ops...', 'Algo deu errado, tente novamente mais tarde!')
            setSucesso(false)
        } finally {
            setIsLoading(false)
        }
    }

    return <>
        <div>
            <Toast reference={toast} />
            <Titulo className="titulo">Cadastrar Compra</Titulo>
            <Formik
                onSubmit={cadastrar}
                initialValues={initialValues}
                validationSchema={validation}
            >
                {({ values, handleChange, handleSubmit, errors, setFieldValue }) => (
                    <div>
                        <CadastrarComprasForm className="cadastrar-investimentos-form" onSubmit={handleSubmit}>
                            <FormInputsWrapper className="form-inputs" >
                                <InputWrapper className="input-div">
                                    <InputLabel htmlFor="dataDaCompra">Data da compra</InputLabel>
                                    <DatePicker
                                        id="dataDaCompra"
                                        value={values.dataDaCompra}
                                        onChange={handleChange}
                                        showButtonBar
                                        minDate={new Date()}
                                        touchUI
                                    />
                                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="dataDaCompra" />
                                </InputWrapper>

                                <InputWrapper className="input-div">
                                    <InputLabel htmlFor="papel">Papel</InputLabel>
                                    {/* <InputText
                                        id="papel"
                                        placeholder="ex: MXRF11"
                                        value={values.papel}
                                        onChange={handleChange}
                                    /> */}

                                    <Dropdown
                                        id='tipoDeRenda'
                                        value={values.papel}
                                        options={papeis}
                                        onChange={(e: DropdownChangeParams) => setFieldValue('papel', e.value)}
                                        placeholder="Selecione um papel"
                                    />  
                                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="papel" />
                                </InputWrapper>
                                <InputWrapper className="input-div">
                                    <InputLabel htmlFor="preco">Preço</InputLabel>
                                    <InputNumber
                                        id="preco"
                                        value={values.preco}
                                        onValueChange={handleChange}
                                        locale="pt-BR"
                                        mode="currency"
                                        currency="BRL"
                                        minFractionDigits={2}
                                        placeholder="R$"
                                    />
                                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="preco" />
                                </InputWrapper>
                                <InputWrapper className="input-div">
                                    <InputLabel htmlFor="corretora">Corretora</InputLabel>
                                    <InputText
                                        id="corretora"
                                        placeholder="ex: modal"
                                        value={values.corretora}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="corretora" />
                                </InputWrapper>
                                <InputWrapper className="input-div">
                                    <InputLabel htmlFor="qtd" >Quantidade</InputLabel>
                                    <InputNumber
                                        id="qtd"
                                        value={values.qtd}
                                        onValueChange={handleChange}
                                        mode="decimal"
                                        minFractionDigits={1}
                                        maxFractionDigits={10}
                                    />
                                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="qtd" />
                                </InputWrapper>
                                <InputWrapper className="input-div">
                                    <InputLabel htmlFor="qtd" >Tipo de movimentação</InputLabel>
                                    <Dropdown
                                        id="tipo de movimentação"
                                        options={tiposMovimentacao}
                                        value={values.tipoMovimentacao}
                                        onChange={(e: DropdownChangeParams) => setFieldValue('tipoMovimentacao', e.value)}
                                        placeholder="selecione tipo de movimentação"
                                    />
                                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="tipoMovimentacao" />
                                </InputWrapper>
                            </FormInputsWrapper>
                            <SubmitDiv className="submit-button" >
                                <Button
                                    type="submit"
                                    label="enviar"
                                    sucesso={sucesso ? `${true}` : undefined}
                                    errors={errors}
                                    loading={isLoading}
                                />
                            </SubmitDiv>
                        </CadastrarComprasForm>
                    </div>
                )}
            </Formik>
        </div>
    </>
}