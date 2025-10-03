"use client"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Header } from "../components"
import { useAuth } from "../context"
import { COLORS } from "../constants"

export default function EstadisticasScreen({ navigation }: any) {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate("Profile")}
        userPhoto={user?.photo}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Estadísticas</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Peso</Text>
              <Text style={styles.statValue}>80kg</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Calzado</Text>
              <Text style={styles.statValue}>43</Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>I.M.C</Text>
              <Text style={styles.statValue}>38%</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Talle</Text>
              <Text style={styles.statValue}>XL</Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Salto</Text>
              <Text style={styles.statValue}>3M</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Potencia</Text>
              <Text style={styles.statValue}>xxxx</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
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
    fontWeight: "700",
    marginBottom: 24,
    color: COLORS.text,
  },
  statsContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 16,
    padding: 20,
  },
  statRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 16,
  },
  statColumn: {
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: COLORS.text,
  },
  statValue: {
    fontSize: 16,
    fontStyle: "italic",
    color: COLORS.text,
  },
})
