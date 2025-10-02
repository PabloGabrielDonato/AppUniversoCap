import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context';
import { Loading, CustomDrawer } from '../components';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FichaScreen from '../screens/FichaScreen';
import InstitucionScreen from '../screens/InstitucionScreen';
import ArchivosScreen from '../screens/ArchivosScreen';
import EstadisticasScreen from '../screens/EstadisticasScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Escritorio' }} />
      <Drawer.Screen name="Ficha" component={FichaScreen} />
      <Drawer.Screen name="Institucion" component={InstitucionScreen} options={{ title: 'Institución' }} />
      <Drawer.Screen name="Archivos" component={ArchivosScreen} />
      <Drawer.Screen name="Estadisticas" component={EstadisticasScreen} options={{ title: 'Estadísticas' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}