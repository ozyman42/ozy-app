import * as React from 'react';

export function ErrorText({text}: {text?: string}) {
    if (!text) return null;
    return <div className='badge badge-error'>
        {text}
    </div>
}