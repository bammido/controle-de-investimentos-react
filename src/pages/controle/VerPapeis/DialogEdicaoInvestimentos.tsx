import { useEffect, useState } from "react";
import { Formik } from "formik";
import Dialog, { DialogProps } from "../../../Components/Dialog";
import { edicaoValidation } from "../../../helpers/validationSchemas/CadastrarInvestimentos";
import PapelServiceMakePayload from "../../../services/PapelService/PapelServiceMakePayload";
import PapelService from "../../../services/PapelService/PapelService";
import { mensagemDeErro, mensagemDeSucesso } from "../../../helpers/functions/Toast";
import { Toast as ToastPrimeReact } from "primereact/toast";
import CadastrarPapelForm from "../CadastrarPapel/CadastrarPapelForm""

type InvestimentosType = {
        id: string,
        papel: string,
        nome: string,
        tipoDeRenda: string,
        tipoDeInvestimento?: string,
        taxasIncidentes?: string
}

type RowData = {
        rowdata: InvestimentosType
}

type Toast = {
        toast: React.RefObject<ToastPrimeReact>
}

type Props = DialogProps & RowData & Toast & { fecharModoEdicao: () => void, pegarPapeis: () => Promise<void> }

export default function DialogEdicaoInvestimentos(props: Props) {
        const [isLoading, setIsLoading] = useState<boolean>(false)
        const [sucesso, setSucesso] = useState<boolean>(false)
        const [taxasIncidentesEdicao, setTaxasIncidentesEdicao] = useState<Array<any>>([])

        async function editar(values: any) {
                try {
                        setIsLoading(true)

                        const {
                                papel,
                                nome,
                                tipoDeInvestimento,
                                tipoDeRenda } = values

                        const editarPapelPayload = PapelServiceMakePayload.editar(papel, nome, tipoDeRenda, tipoDeInvestimento)

                        const res = await PapelService.editar(props.rowdata.id, editarPapelPayload)

                        mensagemDeSucesso(props.toast, 'sucesso', `${papel} editado com sucesso!`)

                        await props.pegarPapeis()

                        props.fecharModoEdicao()
                } catch (error) {
                        mensagemDeErro(props.toast, 'Ops...', 'falha ao editar papel!')
                } finally {
                        setIsLoading(false)
                }
        }

        useEffect(() => {
                const { rowdata } = props

                if (!rowdata?.taxasIncidentes) return setTaxasIncidentesEdicao([])
                const valoresTaxas = rowdata?.taxasIncidentes?.split(';')
                const taxas = valoresTaxas?.map((taxa: string, i) => {
                        const nomeTaxa = taxa.split(':')[0]
                        const valor = taxa.split(':')[1]
                        return { taxa: nomeTaxa, valor }
                })

                setTaxasIncidentesEdicao(taxas)

        }, [props.rowdata])

        const initialValues = {
                papel: props.rowdata.papel,
                nome: props.rowdata.nome,
                tipoDeInvestimento: props.rowdata.tipoDeInvestimento,
                tipoDeRenda: props.rowdata.tipoDeRenda,
                taxasIncidentes: taxasIncidentesEdicao
        }

        return <Dialog {...props} >
                <Formik
                        onSubmit={editar}
                        initialValues={initialValues}
                        validationSchema={edicaoValidation}
                >
                        {({ errors }) => (
                                <CadastrarPapelForm
                                        loading={isLoading}
                                        setLoading={setIsLoading}
                                        sucesso={sucesso}
                                        showErrorMessage={() => mensagemDeErro(props.toast, 'Algo deu errado :(', 'tente novamente mais tarde!')}
                                />
                        )}
                </Formik>
        </Dialog>
}