import React, {useEffect} from 'react';
import Navigation from './screens/Navigation/Navigation';
import UserContext from './contexts/User';
// import {DCVBarcodeReader} from 'dynamsoft-capture-vision-react-native';

const user = {
  name: '',
  first: '',
  last: '',
  password: '',
  token: '',
  expiration: '',
};

const App = () => {
  // useEffect(() => {
  //   DCVBarcodeReader.initLicense(
  //     'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxNTE2MDY4LVRYbE5iMkpwYkdWUWNtOXFYMlJpY2ciLCJvcmdhbml6YXRpb25JRCI6IjEwMTUxNjA2OCIsImNoZWNrQ29kZSI6LTM3NjkwNzg2N30=',
  //   );
  // }, []);
  return (
    <UserContext.Provider value={user}>
      <Navigation />
    </UserContext.Provider>
  );
};

export default App;
