import React from 'react';
import Navigation from './screens/Navigation/Navigation';
import UserContext from './contexts/User';

const user = {
  name: '',
  first: '',
  last: '',
  password: '',
  token: '',
  expiration: '',
};

const App = () => {
  return (
    <UserContext.Provider value={user}>
      <Navigation />
    </UserContext.Provider>
  );
};

export default App;
