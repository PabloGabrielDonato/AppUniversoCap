import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileCard({user}:{user:any}) {
  // si user es null, usa datos de ejemplo del PDF
  const u = user ?? {
    nombre: 'Pablo Gabriel Donato',
    rol: 'Atleta Nacional',
    telefono: '1123456789',
    email: 'pablo@gmail.com',
    edad: '18/07/2002 (23)',
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{u.nombre}</Text>
      <Text style={styles.role}>{u.rol}</Text>
      <View style={styles.row}><Text style={styles.label}>Teléfono: </Text><Text>{u.telefono}</Text></View>
      <View style={styles.row}><Text style={styles.label}>E-Mail: </Text><Text>{u.email}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Edad: </Text><Text>{u.edad}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding:16, borderRadius:12, backgroundColor:'#f7f7fb', margin:12, shadowColor:'#000', shadowOpacity:0.05 },
  name: { fontSize:18, fontWeight:'700' },
  role: { color:'#666', marginBottom:8 },
  row: { flexDirection:'row', marginTop:4 },
  label: { fontWeight:'600' },
});
