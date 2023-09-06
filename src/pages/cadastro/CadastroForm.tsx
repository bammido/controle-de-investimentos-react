import { useFormikContext, ErrorMessage } from "formik"
import { initialValues, InitialValuesType, validation } from "../../helpers/validationSchemas/Cadastro";
import { CadastroFormStyled, CadastroPageWrapper, ErrorMessageSpan, InputDiv, InputLabel, NavButtonDiv } from "../../styles/CadastroStyle";
import Button from "../../Components/Button";
import InputText from "../../Components/InputText";
import PasswordInput from "../../Components/PasswordInput";
import RequisitosSenha from "../../Components/requistosSenha";
type Props = { loading: boolean }

export default function CadastroForm({ loading }: Props) {

    const { values, handleChange, handleSubmit, errors } = useFormikContext<InitialValuesType>();


    return <CadastroFormStyled onSubmit={handleSubmit}>
        <InputDiv>
            <InputLabel htmlFor="nome" >Nome</InputLabel>
            <InputText
                invalid={errors?.nome?.length}
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
                invalid={errors?.email?.length}
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
                footer={<RequisitosSenha senha={values.password} />}
                invalid={errors?.password?.length}
                value={values.password}
                id="password"
                name="password"
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
                invalid={errors?.repetePassword?.length}
                value={values.repetePassword}
                id="repetePassword"
                name="repetePassword"
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
            loading={loading}
        />
    </CadastroFormStyled>
}