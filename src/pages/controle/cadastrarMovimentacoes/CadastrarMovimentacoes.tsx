import { Formik, FormikHelpers } from "formik";
import { useRef, useState } from "react";
import { Titulo } from "./style";
import { InitialValuesType, initialValues, validation } from "../../../helpers/validationSchemas/CadastrarCompras";
import { mensagemDeErro, mensagemDeSucesso } from "../../../helpers/functions/Toast";
import { Toast } from "../../../Components/Toast/Toast";
import verifyToken from "../../../helpers/functions/verifyToken";
import getTokenLocal from "../../../helpers/functions/getTokenLocal";
import MovimentacoesServiceMakePayload from "../../../services/MovimentacoesService/MovimentacoesServiceMakePayload";
import MovimentacoesService from "../../../services/MovimentacoesService/MovimentacoesService";
import CadastrarMovimentacoesForm from "./CadastrarMovimentacoesForm";

export default function CadastrarMovimentacoes() {
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)

    async function cadastrar(values: InitialValuesType, formikHelpers: FormikHelpers<InitialValuesType>) {
        try {
            const { resetForm, setFieldValue } = formikHelpers
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 3000))
            setSucesso(true)

            const token = getTokenLocal()

            const user = (await verifyToken(token))?.payload?.data

            const { data, preco, qtd, corretora, papel, tipoMovimentacao } = values
            const userId = user?.id

            const movimentacaoPayload = MovimentacoesServiceMakePayload.cadastrar(data, preco, qtd, corretora, papel, tipoMovimentacao, userId)

            const res = await MovimentacoesService.cadastrar(movimentacaoPayload)

            mensagemDeSucesso(toast, 'Sucesso!', 'Investimento cadastrado!', { life: 3000, closable: true })
            resetForm()

            setFieldValue("data", data)
        } catch (error: any) {
            const { cause } = error
            const errorMessage = cause?.data?.message
            mensagemDeErro(toast, 'Ops...', errorMessage || 'Algo deu errado, tente novamente mais tarde!')
            setSucesso(false)
        } finally {
            setIsLoading(false)
        }
    }

    return <>
        <div>
            <Toast reference={toast} />
            <Titulo className="titulo">Cadastrar Movimentação</Titulo>
            <Formik
                onSubmit={cadastrar}
                initialValues={initialValues}
                validationSchema={validation}
            >
                {() => (
                    <CadastrarMovimentacoesForm
                        loading={isLoading}
                        setLoading={setIsLoading}
                        sucesso={sucesso}
                        showErrorMessage={() => mensagemDeErro(toast, 'Ops...', 'erro na comunicação com o servidor, tente novamente mais tarde!')}
                    />
                )}
            </Formik>
        </div>
    </>
}