"use client"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Header } from "../components"
import { useAuth } from "../context" // Importado useAuth
import { COLORS } from "../constants"

export default function InstitucionScreen({ navigation }: any) {
  const { user } = useAuth() // Usando useAuth para obtener el usuario

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate("Profile")}
        userName={user?.name}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Institución</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Federación</Text>
              <Text style={styles.infoValue}>
                {user?.federations && user.federations.length > 0 ? user.federations[0].name : "N/A"}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Club</Text>
              <Text style={styles.infoValue}>{user?.club?.name || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Deporte</Text>
              <Text style={styles.infoValue}>Patín artístico</Text>
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
  infoContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 16,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 16,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: COLORS.text,
  },
  infoValue: {
    fontSize: 16,
    fontStyle: "italic",
    color: COLORS.text,
  },
})
