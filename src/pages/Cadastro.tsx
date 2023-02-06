import { ErrorMessage, Formik } from "formik";
import { useState, useRef } from "react";
import Button from "../Components/Button";
import InputText from "../Components/InputText";
import PasswordInput from "../Components/PasswordInput";
import { Toast } from "../Components/Toast/Toast";
import sleep from "../helpers/functions/sleep";
import { mensagemDeErro, mensagemDeSucesso } from "../helpers/functions/Toast";
import { initialValues, InitialValuesType, validation } from "../helpers/validationSchemas/Cadastro";
import UsuariosService from "../services/UsuariosService/UsuariosService";
import UsuariosServiceMakePayload from "../services/UsuariosService/UsuariosServiceMakePayload";
import { CadastroForm, CadastroPageWrapper, ErrorMessageSpan, InputDiv, InputLabel, NavButtonDiv } from "../styles/CadastroStyle";

import axios from 'axios'
import Navigation from "../Navigation";
import NavButton from "../Components/NavButton";

export default function Cadastro() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { goToLogin } = Navigation()

    async function cadastrar(values: InitialValuesType) {
        try {
            setIsLoading(true)

            const { email, nome, password } = values

            const cadastrarPayload = UsuariosServiceMakePayload.cadastrar(email, password, nome)

            await UsuariosService.cadastrar(cadastrarPayload)

            goToLogin()

            mensagemDeSucesso(toast, 'Sucesso!', 'usuário cadastrado com sucesso')
        } catch (error: any) {
            console.log(error.cause)
            mensagemDeErro(toast, 'Algo deu errado :(', 'tente novamente mais tarde!')
        } finally {
            setIsLoading(false)
        }
    }

    return <CadastroPageWrapper>
        <Toast Reference={toast} />
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
                        <NavButtonDiv>
                            <NavButton
                                type="button"
                                label="Já possui cadastro? ir para login"
                                className="p-button-link"
                                onClick={goToLogin}
                            />
                        </NavButtonDiv>
                    </CadastroForm>
                )
            }
        </Formik>
    </CadastroPageWrapper>
}

