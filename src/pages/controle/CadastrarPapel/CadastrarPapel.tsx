import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { useRef, useState } from "react";
import Button from "../../../Components/Button";
import Dropdown, { DropdownChangeParams } from "../../../Components/Dropdown";
import InputNumber, { InputNumberChangeParams } from "../../../Components/InputNumber";
import InputText from "../../../Components/InputText";
import MultiSelect from "../../../Components/MultiSelect";
import { Toast } from "../../../Components/Toast/Toast";
import { mensagemDeErro, mensagemDeSucesso } from "../../../helpers/functions/Toast";
import { initialValues, validation, InitialValuesType } from "../../../helpers/validationSchemas/CadastrarInvestimentos";
import { Titulo } from "./style";
import PapelServiceMakePayload from "../../../services/PapelService/PapelServiceMakePayload";
import PapelService from "../../../services/PapelService/PapelService";
import CadastrarPapelForm from "./CadastrarPapelForm";

export default function CadastrarPapel() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)

    async function cadastrar(values: InitialValuesType, formikHelpers: FormikHelpers<InitialValuesType>) {
        try {
            const { resetForm } = formikHelpers
            setIsLoading(true)
            const {
                papel,
                nome,
                tipoDeInvestimento,
                tipoDeRenda } = values

            const papelPayload = PapelServiceMakePayload.cadastrar(papel, nome, tipoDeRenda, tipoDeInvestimento)
            const response = await PapelService.cadastrar(papelPayload)

            mensagemDeSucesso(toast, 'Sucesso!', 'papel cadastrado!', { life: 3000, closable: true })
            setSucesso(true)
            resetForm()
        } catch (error: any) {
            const errorStatus = error.cause?.status
            const errorStatusText = error.cause?.statusText
            const errorMessage = error.cause?.data?.message

            if (errorStatus === 409 || errorStatusText?.toLowerCase() === 'conflict') {
                return mensagemDeErro(toast, 'Algo deu errado :(', 'Papel já cadastrado!')
            }

            return mensagemDeErro(toast, 'Algo deu errado :(', 'tente novamente mais tarde!')
        } finally {
            setIsLoading(false)
        }
    }

    return <div>
        <Toast reference={toast} />
        <Titulo className="titulo">Cadastrar Papel</Titulo>
        <Formik
            onSubmit={cadastrar}
            initialValues={initialValues}
            validationSchema={validation}
        >
            {() => (
                <CadastrarPapelForm
                    loading={isLoading}
                    setLoading={setIsLoading}
                    sucesso={sucesso}
                    showErrorMessage={() => mensagemDeErro(toast, 'Algo deu errado :(', 'tente novamente mais tarde!')}
                />
            )}
        </Formik>
    </div>
}