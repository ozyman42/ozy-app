import * as React from 'react';
import { ErrorBoundary as EB } from 'react-error-boundary';

export const ErrorBoundary: React.FC<{fallback: () => React.JSX.Element, main: () => React.JSX.Element}> = (props) => {
  return <EB 
    fallbackRender={({error}) => <>
      <props.fallback />
      <div>
        <b>Error:</b><br />
        <pre>{(error as Error).toString()}</pre>
      </div>
    </>}
  >
    <props.main />
  </EB>
}
