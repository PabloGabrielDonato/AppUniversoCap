import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Header } from '../components';
import { COLORS } from '../constants';

export default function ArchivosScreen({ navigation }: any) {
  const documents = [
    { id: 1, nombre: 'Apto médico' },
    { id: 2, nombre: 'Frente DNI' },
    { id: 3, nombre: 'Revés DNI' },
  ];

  const handleView = (doc: any) => {
    Alert.alert('Ver documento', `Abriendo: ${doc.nombre}`);
  };

  const handleDownload = (doc: any) => {
    Alert.alert('Descargar', `Descargando: ${doc.nombre}`);
  };

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate("Profile")}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Archivos</Text>

        <View style={styles.documentsContainer}>
          {documents.map((doc) => (
            <View key={doc.id} style={styles.documentItem}>
              <Text style={styles.documentName}>{doc.nombre}</Text>
              
              <View style={styles.documentActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleView(doc)}
                >
                  <Text style={styles.actionButtonText}>Ver</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleDownload(doc)}
                >
                  <Text style={styles.actionButtonText}>Descargar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  documentsContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 16,
    padding: 20,
  },
  documentItem: {
    marginBottom: 24,
  },
  documentName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: COLORS.text,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});