import { Formik } from "formik";
import { useRef } from "react";
import { Toast } from "../Components/Toast/Toast";
import { initialValues, validation } from "../helpers/validationSchemas/CadastrarInvestimentos";
import { CadastrarInvestimentosForm, FormInputsWrapper, InputWrapper, Titulo } from "../styles/CadastrarInvestimentosStyle";

export default function CadastrarInvestimentos() {
    const toast = useRef(null)

    async function cadastrar() {

    }

    return <div>
        <Toast Reference={toast} />
        <Titulo className="titulo">Cadastrar Investimentos</Titulo>
        <Formik
            onSubmit={cadastrar}
            initialValues={initialValues}
            validationSchema={validation}
        >
            {({ values, handleChange, handleSubmit, errors }) => (
                <CadastrarInvestimentosForm onSubmit={handleSubmit}>
                    <FormInputsWrapper>
                        <InputWrapper>
                        </InputWrapper>
                    </FormInputsWrapper>
                </CadastrarInvestimentosForm>
            )}
        </Formik>
    </div>
}