import { useState, useRef, useContext } from "react"
import Button from "../Components/Button";
import InputText from "../Components/InputText";
import { InputDiv, LoginForm, LoginPageWrapper, InputLabel, NavButtonDiv } from "../styles/LoginStyle";
import ViteLogo from '../assets/vite.svg'
import { Formik } from "formik";
import NavButton from "../Components/NavButton";
import Navigation from "../Navigation";
import { initialValues, InitialValuesType, validation } from "../helpers/validationSchemas/Login";
import PasswordInput from "../Components/PasswordInput";
import { mensagemDeErro } from "../helpers/functions/Toast";
import { Toast } from "../Components/Toast/Toast";
import UsuariosService from "../services/UsuariosService/UsuariosService";
import UsuariosServiceMakePayload from "../services/UsuariosService/UsuariosServiceMakePayload";
import verifyToken from "../helpers/functions/verifyToken";
import setTokenLocal from "../helpers/functions/setTokenLocal";
import { globalContext } from "../Contexts/GlobalContext";
import sleep from "../helpers/functions/sleep";

export default function Login() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { goToHome, goToCadastrarUsuario } = Navigation()

    const { setters } = useContext(globalContext)

    const { setUser } = setters

    async function Logar(values: InitialValuesType) {
        try {
            setIsLoading(true)

            const { email, password } = values

            const loginPayload = UsuariosServiceMakePayload.logar(email, password)

            const response = await UsuariosService.logar(loginPayload)

            const token = response.data?.token

            await sleep(2000)

            const { payload } = await verifyToken(token)

            const user = payload?.data

            setUser(user)
            setTokenLocal(token)

            goToHome()

        } catch (error: any) {
            mensagemDeErro(toast, error.message || 'Algo deu errado!')
        } finally {
            setIsLoading(false)
        }
    }

    return <LoginPageWrapper>
        <Toast reference={toast} />
        <Formik
            initialValues={initialValues}
            onSubmit={Logar}
            validationSchema={validation}
        >
            {
                ({ values, handleChange, handleSubmit }) => (
                    <div>
                        <LoginForm onSubmit={handleSubmit}>
                            <img src={ViteLogo} style={{ width: '100%', height: '100px', marginBottom: '3vh' }} />
                            <InputDiv>
                                <InputLabel htmlFor="email" >Email</InputLabel>
                                <InputText
                                    value={values.email}
                                    id="email"
                                    onChange={handleChange}
                                />
                            </InputDiv>
                            <InputDiv>
                                <InputLabel htmlFor="password">Senha</InputLabel>
                                <PasswordInput
                                    value={values.password}
                                    id="password"
                                    onChange={handleChange}
                                />
                            </InputDiv>
                            <Button
                                type="submit"
                                label="entrar"
                                aria-label="entrar"
                                loading={isLoading}
                            />
                            <NavButtonDiv>
                                <NavButton
                                    type="button"
                                    label="cadastre-se"
                                    className="p-button-link"
                                    onClick={goToCadastrarUsuario}
                                />
                            </NavButtonDiv>
                        </LoginForm>
                    </div>
                )
            }
        </Formik>
    </LoginPageWrapper>
}

