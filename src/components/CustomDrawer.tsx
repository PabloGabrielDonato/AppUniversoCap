import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useAuth } from '../context';
import { COLORS } from '../constants';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo Section - Ahora con fondo blanco */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/cap-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Línea separadora después del logo */}
      <View style={styles.divider} />

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>
          {user?.name || 'Usuario'} {user?.apellido || ''}
        </Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
      </View>

      {/* Línea separadora después del usuario */}
      <View style={styles.divider} />

      {/* Menu Items */}
      <DrawerContentScrollView {...props} style={styles.menuContainer}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>⎋</Text>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    backgroundColor: COLORS.white, // <CHANGE> Cambiado de azul oscuro a blanco
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  userInfo: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  logoutIcon: {
    fontSize: 20,
    color: COLORS.white,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});