import { Formik, ErrorMessage } from "formik";
import React, { useRef, useState } from "react";
import Button from "../Components/Button";
import DatePicker from "../Components/DatePicker";
import InputNumber from "../Components/InputNumber";
import InputText from "../Components/InputText";
import { initialValues, validation } from "../helpers/validationSchemas/CadastrarInvestimentos";
import CadastrarInvestimentosStyle from "../styles/CadastrarInvestimentosStyle";
import { Toast } from 'primereact/toast';
import { mensagemDeSucesso } from "../helpers/functions/Toast";

export default function CadastrarInvestimentos(){
    const toast = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)

    function defineSeverity(errors){
        const {dataDaCompra, corretora, preco, papel, qtd} = errors

        if(dataDaCompra || corretora || preco || papel || qtd) return 'erro'
        else if(sucesso) return 'sucesso'
        else return ''
    }

    async function cadastrar(values){
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setIsLoading(false)
        setSucesso(true)
        mensagemDeSucesso(toast, 'Sucesso!', 'Investimento cadastrado!', {life: 3000, closable: true})
    }

    return <>
    <div>
        <Toast ref={toast} />
        <h1 className="titulo">Cadastrar Investimentos</h1>
        <Formik 
        onSubmit={cadastrar}
        initialValues={initialValues}
        validationSchema={validation}
        >
            {({values, handleChange, handleSubmit, errors})=>(
                <div>
                    <form className="cadastrar-investimentos-form" onSubmit={handleSubmit}>
                        <div className="form-inputs" >
                            <div className="input-div">
                                {console.log(values)}
                                <label htmlFor="dataDaCompra">Data da compra</label>
                                <DatePicker 
                                id="dataDaCompra" 
                                value={values.dataDaCompra} 
                                onChange={handleChange} 
                                showButtonBar 
                                minDate={new Date()}
                                touchUI 
                                />
                                <ErrorMessage component='span' className="error-message" name="dataDaCompra" />
                            </div>

                            <div className="input-div">
                                <label htmlFor="papel">Papel</label>
                                <InputText
                                id="papel"
                                placeholder="ex: MXRF11"
                                value={values.papel}
                                onChange={handleChange}
                                />
                                <ErrorMessage component='span' className="error-message" name="papel" />
                            </div>
                            <div className="input-div">
                                <label htmlFor="preco">Preço</label>
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
                                <ErrorMessage component='span' className="error-message" name="preco" />
                            </div>
                            <div className="input-div">
                                <label htmlFor="corretora">Corretora</label>
                                <InputText
                                id="corretora"
                                placeholder="ex: modal"
                                value={values.corretora}
                                onChange={handleChange}
                                />
                                <ErrorMessage component='span' className="error-message" name="corretora" />
                            </div>
                            <div className="input-div">
                                <label htmlFor="qtd" >Quantidade</label>
                                <InputNumber 
                                id="qtd" 
                                value={values.qtd} 
                                onValueChange={handleChange}
                                mode="decimal"
                                minFractionDigits={1}
                                maxFractionDigits={10}
                                />
                                <ErrorMessage component='span' className="error-message" name="qtd" />
                            </div>
                        </div>
                        <div className="submit-button" >
                            <Button 
                            type="submit" 
                            label="enviar" 
                            severity={defineSeverity(errors)} 
                            loading={isLoading}
                            />
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    </div>
    <CadastrarInvestimentosStyle />
    </>
}