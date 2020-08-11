import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar, Text } from 'react-native';

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <View style={{ flex: 1, backgroundColor: '#7159c1' }}>
        <Text>dale do dale</Text>
      </View>
    </>
  );
};

export default App;
