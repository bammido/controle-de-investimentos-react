import { useState } from 'react'
import InputText, { InputTextProps } from "../InputText";

export default function PasswordInput(props: InputTextProps) {
    const [mostraSenha, setMostraSenha] = useState<boolean>()

    return <span className="p-input-icon-right">
        <i className={mostraSenha ? "pi pi-eye" : "pi pi-eye-slash"} onClick={() => setMostraSenha(prev => !prev)} />
        <InputText style={{ width: '100%' }} type={mostraSenha ? 'text' : 'password'}  {...props} />
    </span>
}