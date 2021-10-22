import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './AuthRoutes.routes';

function Routes(){
  return(
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}

export default Routes;