"use client"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Header } from "../components"
import { useAuth } from "../context"
import { COLORS } from "../constants"

export default function FichaScreen({ navigation }: any) {
  const { user } = useAuth()
  const userData = user?.userData || user?.user_data

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate("Profile")}
        userPhoto={user?.photo}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Ficha Personal</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Nombre</Text>
              <Text style={styles.infoValue}>{user?.name || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Apellido</Text>
              <Text style={styles.infoValue}>{user?.last_name || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>D.N.I</Text>
              <Text style={styles.infoValue}>{user?.dni || userData?.dni || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Edad</Text>
              <Text style={styles.infoValue}>{user?.edad || userData?.age || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{user?.phone || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>E-Mail</Text>
              <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>
            </View>
          </View>

          {userData && (
            <>
              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Fecha de Nacimiento</Text>
                  <Text style={styles.infoValue}>{formatDate(userData.birth_date)}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Género</Text>
                  <Text style={styles.infoValue}>{userData.gender || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Nacionalidad</Text>
                  <Text style={styles.infoValue}>{userData.nationality || "N/A"}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>País</Text>
                  <Text style={styles.infoValue}>{userData.country || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Dirección</Text>
                  <Text style={styles.infoValue}>{userData.address || "N/A"}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Código Postal</Text>
                  <Text style={styles.infoValue}>{userData.zip_code || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Ciudad</Text>
                  <Text style={styles.infoValue}>{userData.city || "N/A"}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Partido</Text>
                  <Text style={styles.infoValue}>{userData.partido || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Provincia</Text>
                  <Text style={styles.infoValue}>{userData.state || "N/A"}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>CUIT</Text>
                  <Text style={styles.infoValue}>{userData.cuit || "N/A"}</Text>
                </View>
              </View>

              {(userData.parent_name || userData.parent_last_name) && (
                <>
                  <Text style={[styles.infoLabel, { marginTop: 20, marginBottom: 10 }]}>Datos del Padre/Tutor</Text>
                  <View style={styles.infoRow}>
                    <View style={styles.infoColumn}>
                      <Text style={styles.infoLabel}>Nombre</Text>
                      <Text style={styles.infoValue}>{userData.parent_name || "N/A"}</Text>
                    </View>
                    <View style={styles.infoColumn}>
                      <Text style={styles.infoLabel}>Apellido</Text>
                      <Text style={styles.infoValue}>{userData.parent_last_name || "N/A"}</Text>
                    </View>
                  </View>
                  <View style={styles.infoRow}>
                    <View style={styles.infoColumn}>
                      <Text style={styles.infoLabel}>DNI</Text>
                      <Text style={styles.infoValue}>{userData.parent_dni || "N/A"}</Text>
                    </View>
                    <View style={styles.infoColumn} />
                  </View>
                </>
              )}
            </>
          )}
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
