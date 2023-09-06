import InputText from "../../Components/InputText";
import { InputDiv, LoginFormStyled, InputLabel } from "../../styles/LoginStyle";
import { InitialValuesType } from "../../helpers/validationSchemas/Login";
import PasswordInput from "../../Components/PasswordInput";
import { useFormikContext } from "formik";
import Button from "../../Components/Button";
import { Divider } from "primereact/divider";

type Props = { loading: boolean }

export default function LoginForm({ loading }: Props) {

    const content = <h6>content</h6>
    const header = <h6>Pick a password</h6>;
    const footer = (
        <div>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </div>
    );

    const { values, handleChange, handleSubmit } = useFormikContext<InitialValuesType>()

    return <LoginFormStyled
        onSubmit={handleSubmit}
    >
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
                name="password"
                onChange={handleChange}
                feedback={false}
            />
        </InputDiv>
        <Button
            type="submit"
            label="entrar"
            aria-label="entrar"
            loading={loading}
        />
    </LoginFormStyled>
}