import { invoke } from '@forge/bridge';
import ForgeReconciler, { Box, Button, Heading, ProgressBar, Tag, TagGroup, Text, xcss } from '@forge/react';
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState(['Oscar Piastri', 'Daniel Riccardo', 'Valteri Bottas']);
  const [isToggled, setIsToggled] = useState(false);
  const [progress, setProgress] = useState(0.3)

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

  const signUpUser = async () => {
    try {
      const user = await invoke('getUser');
      const userName = user.publicName;
      console.log([...data, userName]);
      setData([...data, userName]);
      toggleButton();
      setProgress(progress + 0.1);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <>
      <Heading as="h1">Participants</Heading>
      <Box xcss={xcss({height:"1rem"})}/>
      <ProgressBar ariaLabel="Done: 3 of 10 issues" value={progress} />
      {data ? (
        <TagGroup>
          {data.map((participant, index) => (
            <Tag key={index} text={participant} />
          ))}
        </TagGroup>
      ) : (
        <Text>Loading...</Text>
      )}
      <Box xcss={xcss({height:"1rem"})}/>
      <Button onClick={signUpUser} appearance='primary' isDisabled={isToggled}>
        Sign up!
      </Button>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
