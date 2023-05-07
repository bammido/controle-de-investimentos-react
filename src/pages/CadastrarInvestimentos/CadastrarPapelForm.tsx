import { ErrorMessage, useFormikContext } from "formik";
import InputText from "../../Components/InputText";
import { CadastrarInvestimentosForm, ErrorMessageSpan, FormInputsWrapper, InputLabel, InputWrapper, InputstaxasWrapper, SubTitulo, SubmitDiv } from "../../styles/CadastrarInvestimentosStyle";
import Dropdown, { DropdownChangeParams } from "../../Components/Dropdown";
import Button from "../../Components/Button";
import { InitialValuesType } from "../../helpers/validationSchemas/CadastrarInvestimentos";
import { PapelForm } from "./style";
import { useEffect, useState } from "react";
import TipoDeRendaService from "../../services/TipoDeRendaService/TipoDeRendaService";
import sleep from "../../helpers/functions/sleep";
import { FieldSetStyled } from "../../styles/CadastrarComprasStyle";
import TipoDeInvestimentoService from "../../services/TipoDeInvestimentoService/TipoDeInvestimentoService";

type cadastrarPapelFormPropsType = { loading: boolean, setLoading: React.Dispatch<boolean>, sucesso: boolean }

export default function CadastrarPapelForm({ loading, setLoading, sucesso }: cadastrarPapelFormPropsType) {
    const [tiposDeRenda, setTiposDeRenda] = useState<string[]>([])
    const [tiposDeInvestimentosRendaFixa, setTiposDeInvestimentosRendaFixa] = useState<string[]>([])
    const [tiposDeInvestimentosRendaVariavel, setTiposDeInvestimentosRendaVariavel] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)

                await sleep(3000)

                // const data = (await TipoDeRendaService.pegarRendas()).data


                // const investimentosData = (await TipoDeInvestimentoService.pegarInvestimentos()).data

                const [resRendas, resInvestimentos] = await Promise.all([TipoDeRendaService.pegarRendas(), TipoDeInvestimentoService.pegarInvestimentos()])

                const rendas = resRendas?.data.length > 0 && resRendas?.data.map((renda: any) => renda.tipo)

                const investimentosData = resInvestimentos.data

                console.log(investimentosData)

                Array.isArray(investimentosData.rendaFixa) && setTiposDeInvestimentosRendaFixa(investimentosData.rendaFixa)
                Array.isArray(investimentosData.rendaVariavel) && setTiposDeInvestimentosRendaVariavel(investimentosData.rendaVariavel)
                Array.isArray(rendas) && setTiposDeRenda(rendas)
            } catch (error: any) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const { values, handleChange, handleSubmit, errors, setFieldValue } = useFormikContext<InitialValuesType>()
    return <PapelForm onSubmit={handleSubmit}>
        <FieldSetStyled>
            <div>
                <InputLabel htmlFor="papel">Papel *</InputLabel>

                <InputText
                    id="papel"
                    placeholder="ex: RECT11"
                    value={values.papel}
                    onChange={e => setFieldValue('papel', e.target.value.toUpperCase())}
                />
                <ErrorMessage component={ErrorMessageSpan} className="error-message" name="papel" />
            </div>
            <div>
                <InputLabel htmlFor="nome">Nome *</InputLabel>

                <InputText
                    id="nome"
                    placeholder="ex: RECT11"
                    value={values.nome}
                    onChange={handleChange}
                />
                <ErrorMessage component={ErrorMessageSpan} className="error-message" name="nome" />
            </div>
            <div>
                <InputLabel htmlFor="tipoDeRenda">Tipo de Renda *</InputLabel>

                <Dropdown
                    disabled={loading}
                    id='tipoDeRenda'
                    value={values.tipoDeRenda}
                    options={tiposDeRenda}
                    onChange={(e: DropdownChangeParams) => setFieldValue('tipoDeRenda', e.value)}
                    placeholder="Selecione um tipo"
                    loading={loading}
                />
                <ErrorMessage component={ErrorMessageSpan} className="error-message" name="tipoDeRenda" />
            </div>

            <div>
                <InputLabel htmlFor="tipoDeInvestimento">Tipo de Investimento</InputLabel>

                <Dropdown
                    disabled={loading || !values.tipoDeRenda || (values.tipoDeRenda.toUpperCase() !== "RENDA FIXA" && values.tipoDeRenda.toUpperCase() !== "RENDA VARIAVEL")}
                    id='tipoDeInvestimento'
                    value={values.tipoDeInvestimento}
                    options={values.tipoDeRenda.toUpperCase() === "RENDA FIXA" ? tiposDeInvestimentosRendaFixa : values.tipoDeRenda.toUpperCase() === "RENDA VARIAVEL" ? tiposDeInvestimentosRendaVariavel : []}
                    onChange={(e: DropdownChangeParams) => setFieldValue('tipoDeInvestimento', e.value)}
                    placeholder="Selecione um tipo"
                />
                <ErrorMessage component={ErrorMessageSpan} className="error-message" name="tipoDeInvestimento" />
            </div>
            <SubmitDiv className="submit-button" >
                <Button
                    type="submit"
                    label="enviar"
                    sucesso={sucesso}
                    errors={errors}
                    loading={loading}
                />
            </SubmitDiv>
        </FieldSetStyled>
    </PapelForm>
} 