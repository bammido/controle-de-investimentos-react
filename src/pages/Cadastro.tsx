import { ErrorMessage, Formik } from "formik";
import { useState, useRef } from "react";
import Button from "../Components/Button";
import InputText from "../Components/InputText";
import PasswordInput from "../Components/PasswordInput";
import { Toast } from "../Components/Toast/Toast";
import sleep from "../helpers/functions/sleep";
import { mensagemDeErro, mensagemDeSucesso } from "../helpers/functions/Toast";
import { initialValues, InitialValuesType, validation } from "../helpers/validationSchemas/Cadastro";
import { CadastroForm, CadastroPageWrapper, ErrorMessageSpan, InputDiv, InputLabel } from "../styles/CadastroStyle";

export default function Cadastro() {
    const toast = useRef(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function cadastrar(values: InitialValuesType) {
        try {
            setIsLoading(true)
            await sleep(3000)
            mensagemDeSucesso(toast, 'Sucesso!', 'usuário cadastrado com sucesso')
        } catch (error) {
            mensagemDeErro(toast, 'Algo deu errado :(', 'tente novamente mais tarde!')
        } finally {
            setIsLoading(false)
        }
    }

    return <CadastroPageWrapper>
        <Toast Ref={toast} />
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={cadastrar}
        >
            {
                ({ values, handleChange, handleSubmit, errors }) => (
                    <CadastroForm onSubmit={handleSubmit}>
                        <InputDiv>
                            <InputLabel htmlFor="nome" >Nome</InputLabel>
                            <InputText
                                isInvalid={errors?.nome?.length ? true : false}
                                value={values.nome}
                                id="nome"
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="nome"
                            />
                        </InputDiv>
                        <InputDiv>
                            <InputLabel htmlFor="email" >Email</InputLabel>
                            <InputText
                                isInvalid={errors?.email?.length ? true : false}
                                value={values.email}
                                id="email"
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="email"
                            />
                        </InputDiv>
                        <InputDiv>
                            <InputLabel htmlFor="password" >Senha</InputLabel>
                            <PasswordInput
                                isInvalid={errors?.password?.length ? true : false}
                                value={values.password}
                                id="password"
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="password"
                            />
                        </InputDiv>
                        <InputDiv>
                            <InputLabel htmlFor="repetePassword" >Confirme a senha</InputLabel>
                            <PasswordInput
                                isInvalid={errors?.repetePassword?.length ? true : false}
                                value={values.repetePassword}
                                id="repetePassword"
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                component={ErrorMessageSpan}
                                className="error-message"
                                name="repetePassword"
                            />
                        </InputDiv>
                        <Button
                            type="submit"
                            label="cadastrar"
                            aria-label="cadastrar"
                            loading={isLoading}
                        />
                    </CadastroForm>
                )
            }
        </Formik>
    </CadastroPageWrapper>
}

