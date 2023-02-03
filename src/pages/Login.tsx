import { useState, useRef } from "react"
import Button from "../Components/Button";
import InputText from "../Components/InputText";
import { InputDiv, LoginForm, LoginPageWrapper, InputLabel, NavButtonDiv } from "../styles/LoginStyle";
import ViteLogo from '../../public/vite.svg'
import { Formik } from "formik";
import NavButton from "../Components/NavButton";
import Navigation from "../Navigation";
import sleep from "../helpers/functions/sleep";
import { initialValues, InitialValuesType, validation } from "../helpers/validationSchemas/Login";
import PasswordInput from "../Components/PasswordInput";
import { mensagemDeErro } from "../helpers/functions/Toast";
import { Toast } from "../Components/Toast/Toast";

export default function Login() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { goToHome, goToCadastrarUsuario } = Navigation()

    async function Logar(values: InitialValuesType) {
        try {
            setIsLoading(true)
            await sleep(3000)

            const { email, password } = values

            if (email === 'teste@email.com' && password === '123456') goToHome()

            throw new Error('Usuário ou senha incorretos')

        } catch (error: any) {
            mensagemDeErro(toast, error.message || 'Algo deu errado!')
        } finally {
            setIsLoading(false)
        }
    }

    return <LoginPageWrapper>
        <Toast Ref={toast} />
        <Formik
            initialValues={initialValues}
            onSubmit={Logar}
            validationSchema={validation}
        >
            {
                ({ values, handleChange, handleSubmit, errors }) => (
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

