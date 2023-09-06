import { ErrorMessage, Formik } from "formik";
import { useState, useRef } from "react";
import Button from "../../Components/Button";
import InputText from "../../Components/InputText";
import PasswordInput from "../../Components/PasswordInput";
import { Toast } from "../../Components/Toast/Toast";
import { mensagemDeErro, mensagemDeSucesso } from "../../helpers/functions/Toast";
import { initialValues, InitialValuesType, validation } from "../../helpers/validationSchemas/Cadastro";
import UsuariosService from "../../services/UsuariosService/UsuariosService";
import UsuariosServiceMakePayload from "../../services/UsuariosService/UsuariosServiceMakePayload";
import { CadastroPageWrapper, ContentCadastroDIv, NavButtonDiv } from "../../styles/CadastroStyle";
import Navigation from "../../Navigation";
import NavButton from "../../Components/NavButton";
import MudaTemaButtonComponent from "../../Components/MudaTemaButton";
import CadastroForm from "./CadastroForm";

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
            mensagemDeErro(toast, 'Algo deu errado :(', 'tente novamente mais tarde!')
        } finally {
            setIsLoading(false)
        }
    }

    return <CadastroPageWrapper>
        <Toast reference={toast} />
        <MudaTemaButtonComponent />
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={cadastrar}
        >
            {
                () => (
                    <ContentCadastroDIv>
                        <CadastroForm
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
                    </ContentCadastroDIv>
                )
            }
        </Formik>
    </CadastroPageWrapper>
}

