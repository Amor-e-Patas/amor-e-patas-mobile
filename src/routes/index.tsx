import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes, {MyDrawer }from './AuthRoutes.routes';

function Routes(){
  return(
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default Routes;