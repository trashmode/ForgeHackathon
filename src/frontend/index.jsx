import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke } from '@forge/bridge';
import { Label, Textfield, TextArea } from '@forge/react';


const App = () => {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState();
  const [polltitle, setPolltitle] = useState();
  const [context, setContext] = useState();
  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <>
      <Text>Hello world!</Text>
      <Text>{data ? data : 'Loading...'}</Text>
    </>
  );
};

const Config = () => {
  return (
     <>
       <Label>Add your poll title here</Label>
       <Textfield name="title" value="title" />
       <Label>Add comma-separated options here</Label>
       <TextArea name="options" value="options" />
  </> );
};

ForgeReconciler.addConfig(<Config />);

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
