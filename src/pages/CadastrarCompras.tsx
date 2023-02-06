import { Formik, ErrorMessage, FormikErrors } from "formik";
import { useRef, useState } from "react";
import Button from "../Components/Button";
import DatePicker from "../Components/DatePicker";
import InputNumber from "../Components/InputNumber";
import InputText from "../Components/InputText";
import { initialValues, InitialValuesType, validation } from "../helpers/validationSchemas/CadastrarInvestimentos";
import { mensagemDeSucesso } from "../helpers/functions/Toast";
import { CadastrarInvestimentosForm, ErrorMessageSpan, FormInputsWrapper, InputLabel, InputWrapper, SubmitDiv, Titulo } from "../styles/CadastrarComprasStyle";
import { Toast } from "../Components/Toast/Toast";

export default function CadastrarCompras() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)

    function defineSeverity(errors: FormikErrors<InitialValuesType>) {
        const { dataDaCompra, corretora, preco, papel, qtd } = errors

        if (dataDaCompra || corretora || preco || papel || qtd) return 'erro'
        else if (sucesso) return 'sucesso'
        else return ''
    }

    async function cadastrar(values: InitialValuesType) {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setIsLoading(false)
        setSucesso(true)
        mensagemDeSucesso(toast, 'Sucesso!', 'Investimento cadastrado!', { life: 3000, closable: true })
    }

    return <>
        <div>
            <Toast Ref={toast} />
            <Titulo className="titulo">Cadastrar Compras</Titulo>
            <Formik
                onSubmit={cadastrar}
                initialValues={initialValues}
                validationSchema={validation}
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <div>
                        <CadastrarInvestimentosForm className="cadastrar-investimentos-form" onSubmit={handleSubmit}>
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
                                    <InputText
                                        id="papel"
                                        placeholder="ex: MXRF11"
                                        value={values.papel}
                                        onChange={handleChange}
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
                            </FormInputsWrapper>
                            <SubmitDiv className="submit-button" >
                                <Button
                                    type="submit"
                                    label="enviar"
                                    severity={defineSeverity(errors)}
                                    loading={isLoading}
                                />
                            </SubmitDiv>
                        </CadastrarInvestimentosForm>
                    </div>
                )}
            </Formik>
        </div>
    </>
}