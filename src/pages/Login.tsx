import { useState } from "react"
import Button from "../Components/Button";
import InputText from "../Components/InputText";
import { InputDiv, LoginForm, LoginPageWrapper, InputLabel } from "../styles/LoginStyle";
import ViteLogo from '../../public/vite.svg'
import { Formik } from "formik";

export default function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function Logar(values: any) {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setIsLoading(false)
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
                        </LoginForm>
                    </div>
                )
            }
        </Formik>
    </LoginPageWrapper>
}

