import { ErrorMessage, useFormikContext } from "formik";
import Button from "../../Components/Button";
import DatePicker from "../../Components/DatePicker";
import InputNumber from "../../Components/InputNumber";
import InputText from "../../Components/InputText";
import { CadastrarComprasForm, ErrorMessageSpan, FieldSetStyled, FormInputsWrapper, InputLabel, InputWrapper, SubmitDiv } from "../../styles/CadastrarMovimentacoesStyle";
import Dropdown, { DropdownChangeParams } from "../../Components/Dropdown";
import { InitialValuesType } from "../../helpers/validationSchemas/CadastrarCompras";
import { useEffect, useState } from "react";
import PapelService from "../../services/PapelService/PapelService";

type cadastrarMovimentacaoFormPropsType = { loading: boolean, setLoading: React.Dispatch<boolean>, sucesso: boolean, showErrorMessage: () => void }

export default function CadastrarMovimentacoesForm({ loading, setLoading, sucesso, showErrorMessage }: cadastrarMovimentacaoFormPropsType) {
    const [papeis, setPapeis] = useState<string[]>([])

    const tiposMovimentacao = ['compra', 'venda']

    const { values, handleChange, handleSubmit, errors, setFieldValue } = useFormikContext<InitialValuesType>()

    async function pegaPapeis() {
        try {
            const res = await PapelService.pegarPapeis()

            const codigos = res.data?.map((papel: any) => papel.papel)

            setPapeis(codigos)
        } catch (error: any) {
            showErrorMessage()
        }
    }

    useEffect(() => {
        pegaPapeis()
    }, [])

    return <div>
        <CadastrarComprasForm className="cadastrar-investimentos-form" onSubmit={handleSubmit}>
            <FieldSetStyled>
                <div>
                    <InputLabel htmlFor="dataDaCompra">Data da compra</InputLabel>
                    <DatePicker
                        id="dataDaCompra"
                        value={values.dataDaCompra}
                        onChange={handleChange}
                        showButtonBar
                        maxDate={new Date()}
                        touchUI
                    />
                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="dataDaCompra" />
                </div>


                <div>
                    <InputLabel htmlFor="papel">Papel</InputLabel>
                    <Dropdown
                        id='tipoDeRenda'
                        value={values.papel}
                        options={papeis}
                        onChange={(e: DropdownChangeParams) => setFieldValue('papel', e.value)}
                        placeholder="Selecione um papel"
                    />
                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="papel" />
                </div>

                <div>
                    <InputLabel htmlFor="preco">Preço</InputLabel>
                    <InputNumber
                        id="preco"
                        value={values.preco}
                        onValueChange={handleChange}
                        locale="pt-BR"
                        mode="currency"
                        currency="BRL"
                        minFractionDigits={2}
                        placeholder="R$"
                    />
                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="preco" />
                </div>

                <div>
                    <InputLabel htmlFor="corretora">Corretora</InputLabel>
                    <InputText
                        id="corretora"
                        placeholder="ex: modal"
                        value={values.corretora}
                        onChange={handleChange}
                    />
                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="corretora" />
                </div>

                <div>
                    <InputLabel htmlFor="qtd" >Quantidade</InputLabel>
                    <InputNumber
                        id="qtd"
                        value={values.qtd}
                        onValueChange={handleChange}
                        mode="decimal"
                        minFractionDigits={1}
                        maxFractionDigits={10}
                    />
                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="qtd" />
                </div>

                <div>
                    <InputLabel htmlFor="qtd" >Tipo de movimentação</InputLabel>
                    <Dropdown
                        id="tipo de movimentação"
                        options={tiposMovimentacao}
                        value={values.tipoMovimentacao}
                        onChange={(e: DropdownChangeParams) => setFieldValue('tipoMovimentacao', e.value)}
                        placeholder="selecione tipo de movimentação"
                    />
                    <ErrorMessage component={ErrorMessageSpan} className="error-message" name="tipoMovimentacao" />
                </div>


                <SubmitDiv className="submit-button" >
                    <Button
                        type="submit"
                        label="enviar"
                        sucesso={sucesso ? `${true}` : undefined}
                        errors={errors}
                        loading={loading}
                    />
                </SubmitDiv>
            </FieldSetStyled>
        </CadastrarComprasForm>
    </div>
}

