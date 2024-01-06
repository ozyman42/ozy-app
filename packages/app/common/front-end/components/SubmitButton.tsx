import * as React from 'react';

export type SubmitButtonProps = {
    text: string;
    onClick: () => void;
    isActive: boolean;
}

export function SubmitButton({text, onClick, isActive}: SubmitButtonProps) {
    const buttonClass = isActive ? 'btn-primary' : 'btn-disabled';
    return <div className={`btn ${buttonClass} w-full`} onClick={() => { if(isActive) { onClick(); } }}>
        {text}
    </div>
}