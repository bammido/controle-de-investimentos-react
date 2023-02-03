import { useState } from "react"
import Button from "../Components/Button";
import InputText from "../Components/InputText";
import { InputDiv, LoginForm, LoginPageWrapper, InputLabel, NavButtonDiv } from "../styles/LoginStyle";
import ViteLogo from '../../public/vite.svg'
import { Formik } from "formik";
import NavButton from "../Components/NavButton";
import Navigation from "../Navigation";
import sleep from "../helpers/functions/sleep";

export default function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { goToHome, goToCadastrarUsuario } = Navigation()

    async function Logar(values: any) {
        setIsLoading(true)
        await sleep(3000)
        setIsLoading(false)
        goToHome()
    }

    return <LoginPageWrapper>
        <Formik
            initialValues={{}}
            onSubmit={Logar}
        >
            {
                ({ values, handleChange, handleSubmit, errors }) => (
                    <div>
                        <LoginForm onSubmit={handleSubmit}>
                            <img src={ViteLogo} style={{ width: '100%', height: '100px', marginBottom: '3vh' }} />
                            <InputDiv>
                                <InputLabel htmlFor="email" >Email</InputLabel>
                                <InputText
                                    id="email"
                                    onChange={handleChange}
                                />
                            </InputDiv>
                            <InputDiv>
                                <InputLabel htmlFor="password">Senha</InputLabel>
                                <InputText
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

