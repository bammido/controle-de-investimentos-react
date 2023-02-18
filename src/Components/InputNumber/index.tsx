import React from 'react';
import { InputNumber as Input, InputNumberProps, InputNumberChangeParams as InputNumberChangeParamsOrimeReact } from 'primereact/inputnumber';

export type InputNumberChangeParams = InputNumberChangeParamsOrimeReact

export default function InputNumber(props: InputNumberProps) {
    return <Input {...props} />
}