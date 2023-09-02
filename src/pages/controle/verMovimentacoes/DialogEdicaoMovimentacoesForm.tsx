import { useEffect, useState } from "react";
import { Formik } from "formik";
import Dialog, { DialogProps } from "../../../Components/Dialog";
import { edicaoValidation } from "../../../helpers/validationSchemas/CadastrarInvestimentos";
import sleep from "../../../helpers/functions/sleep";
import PapelServiceMakePayload from "../../../services/PapelService/PapelServiceMakePayload";
import PapelService from "../../../services/PapelService/PapelService";
import { mensagemDeErro, mensagemDeSucesso } from "../../../helpers/functions/Toast";
import { Toast as ToastPrimeReact } from "primereact/toast";
import CadastrarMovimentacoesForm from "../cadastrarMovimentacoes/CadastrarMovimentacoesForm";
import MovimentacoesServiceMakePayload from "../../../services/MovimentacoesService/MovimentacoesServiceMakePayload";
import MovimentacoesService from "../../../services/MovimentacoesService/MovimentacoesService";

type Movimentacoes = {
    "id": string,
    "papel": string,
    "data": string | Date,
    "corretora": string,
    "preco": number,
    "qtd": number,
    "tipoMovimentacao": string,
    "userId": string
}

type RowData = {
    rowdata: Movimentacoes
}

type Toast = {
    toast: React.RefObject<ToastPrimeReact>
}

type Props = DialogProps & RowData & Toast & { pegarMovimentacoes: () => Promise<void>, fecharModoEdicao: () => void }

export default function DialogEdicaoMovimentacoes(props: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState<Movimentacoes>({
        id: props.rowdata.id,
        papel: props.rowdata.papel,
        data: new Date(props.rowdata.data),
        corretora: props.rowdata.corretora,
        preco: props.rowdata.preco,
        qtd: props.rowdata.qtd,
        tipoMovimentacao: props.rowdata.tipoMovimentacao,
        userId: props.rowdata.userId
    })

    async function editar(values: Movimentacoes) {
        try {
            setIsLoading(true)

            const { corretora, data, id, papel, preco, qtd, tipoMovimentacao } = values

            const editarMovimentacoesPayload = MovimentacoesServiceMakePayload.editar((data as Date), preco, qtd, corretora, papel, tipoMovimentacao)

            const res = await MovimentacoesService.editar(id, editarMovimentacoesPayload)

            mensagemDeSucesso(props.toast, 'sucesso', `Movimentação editada com sucesso!`)

            await props.pegarMovimentacoes()

            props.fecharModoEdicao()
        } catch (error) {
            mensagemDeErro(props.toast, 'Ops...', 'falha ao editar papel!')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setInitialValues({
            id: props.rowdata.id,
            papel: props.rowdata.papel,
            data: new Date(props.rowdata.data),
            corretora: props.rowdata.corretora,
            preco: props.rowdata.preco,
            qtd: props.rowdata.qtd,
            tipoMovimentacao: props.rowdata.tipoMovimentacao,
            userId: props.rowdata.userId
        })
    }, [props.rowdata])

    return <Dialog {...props} >
        <Formik
            onSubmit={editar}
            initialValues={initialValues}
            validationSchema={edicaoValidation}
        >
            {() => (
                <CadastrarMovimentacoesForm
                    loading={isLoading}
                    setLoading={setIsLoading}
                    sucesso={sucesso}
                    showErrorMessage={() => mensagemDeErro(props.toast, 'Algo deu errado :(', 'tente novamente mais tarde!')}
                />
            )}
        </Formik>
    </Dialog>
}