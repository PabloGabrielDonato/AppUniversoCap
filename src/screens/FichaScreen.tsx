import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components';
import { useAuth } from '../context';
import { COLORS } from '../constants';

export default function FichaScreen({ navigation }: any) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate("Profile")}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Ficha Personal</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Nombre</Text>
              <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Apellido</Text>
              <Text style={styles.infoValue}>{user?.last_name || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>D.N.I</Text>
              <Text style={styles.infoValue}>{user?.dni || 'N/A'}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Edad</Text>
              <Text style={styles.infoValue}>{user?.edad || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{user?.phone || 'N/A'}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>E-Mail</Text>
              <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    color: COLORS.text,
  },
  infoContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 16,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: COLORS.text,
  },
  infoValue: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.text,
  },
});