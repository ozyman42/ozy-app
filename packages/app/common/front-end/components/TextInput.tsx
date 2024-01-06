import * as React from 'react';
import { ErrorText } from './ErrorText';

export type TextInputProps = {
    value: string;
    inputName: string;
    onChange: (val: string) => void;
    error?: string;
}

export function TextInput({inputName, onChange, error, value}: TextInputProps) {
    return <label className="form-control w-full max-w-xs">
        <input type="text" placeholder={inputName} onChange={e => {onChange(e.target.value);}} value={value} className="input input-bordered w-full max-w-xs" />
        <div className="label">
            <ErrorText text={error} />
        </div>
    </label>;
}