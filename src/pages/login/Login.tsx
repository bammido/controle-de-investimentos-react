import { useState, useRef, useContext } from "react"
import Button from "../../Components/Button";
import { ContentDiv, DividerHorizontalDiv, DividerVerticalDiv, LoginPageWrapper, LogoImg, NavButtonDiv } from "./style";
import { Formik } from "formik";
import Navigation from "../../Navigation";
import { initialValues, InitialValuesType, validation } from "../../helpers/validationSchemas/Login";
import { mensagemDeErro } from "../../helpers/functions/Toast";
import { Toast } from "../../Components/Toast/Toast";
import UsuariosService from "../../services/UsuariosService/UsuariosService";
import UsuariosServiceMakePayload from "../../services/UsuariosService/UsuariosServiceMakePayload";
import verifyToken from "../../helpers/functions/verifyToken";
import setTokenLocal from "../../helpers/functions/setTokenLocal";
import { globalContext, GlobalSettersType } from "../../Contexts/GlobalContext";
import MudaTemaButtonComponent from "../../Components/MudaTemaButton";
import { Divider } from 'primereact/divider';
import LoginForm from "./loginForm";
import ViteLogo from '../../assets/vite.svg'


export default function Login() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { goToHome, goToCadastrarUsuario } = Navigation()

    const { setters } = useContext(globalContext)

    const { setUser } = setters as GlobalSettersType


    async function Logar(values: InitialValuesType) {
        try {
            setIsLoading(true)

            const { email, password } = values

            const loginPayload = UsuariosServiceMakePayload.logar(email, password)

            const response = await UsuariosService.logar(loginPayload)

            const token = response.data?.token

            const { payload } = await verifyToken(token)

            const user = payload?.data || {}

            setUser(user)
            setTokenLocal(token)

            goToHome()

        } catch (error: any) {
            const { cause } = error
            const errorMessage = cause?.data?.message
            mensagemDeErro(toast, 'Ops...', errorMessage || 'Algo deu errado, tente novamente mais tarde!')
        } finally {
            setIsLoading(false)
        }
    }

    return <LoginPageWrapper>
        <Toast reference={toast} />
        <MudaTemaButtonComponent />
        <Formik
            initialValues={initialValues}
            onSubmit={Logar}
            validationSchema={validation}
        >
            {
                () => (
                    <div>
                        <LogoImg src={ViteLogo} />
                        <ContentDiv >
                            <LoginForm loading={isLoading} />
                            <DividerVerticalDiv>
                                <Divider layout="vertical" >
                                    <b>OU</b>
                                </Divider>
                            </DividerVerticalDiv>
                            <DividerHorizontalDiv>
                                <Divider align="center">
                                    <b>OU</b>
                                </Divider>
                            </DividerHorizontalDiv>
                            <NavButtonDiv>
                                <Button
                                    label="cadastre-se"
                                    icon="pi pi-user-plus"
                                    className="p-button-success"
                                    onClick={goToCadastrarUsuario}
                                    severity="sucesso"
                                />
                            </NavButtonDiv>
                        </ContentDiv>
                    </div>
                )
            }
        </Formik>
    </LoginPageWrapper>
}

