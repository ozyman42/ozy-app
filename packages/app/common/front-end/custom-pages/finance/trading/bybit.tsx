import * as React from 'react';
import { trpc } from '@/common/front-end/clients/trpc';
import { TextInput } from '@/common/front-end/components/TextInput';
import { SubmitButton } from '@/common/front-end/components/SubmitButton';

export function ByBit() {
    const [apiKey, setApiKey] = React.useState('');
    const setByBit = trpc.setByBit.useMutation();
    const hello = trpc.getByBit.useQuery();
    async function doSetByBit() {
        const hello = await setByBit.mutateAsync({apiKey});
        console.log('hello', hello);
    }
    return <div>
        <TextInput 
            onChange={setApiKey}
            value={apiKey}
            inputName='ByBit API Key'
        />
        <SubmitButton
            isActive={apiKey.length > 0}
            text='Save ByBit Key'
            onClick={doSetByBit}
        />
        shows open positions for {hello.data?.text ?? 'loading...'}
    </div>
}
