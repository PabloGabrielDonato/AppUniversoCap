"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Header } from "../components"
import { useAuth } from "../context"
import { COLORS } from "../constants"

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"ficha" | "institucion" | "archivos">("ficha")

  // Contenido de Ficha
  const renderFichaContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>{user?.name || "N/A"}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Apellido</Text>
            <Text style={styles.infoValue}>{user?.apellido || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>D.N.I</Text>
            <Text style={styles.infoValue}>{user?.dni || "N/A"}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Edad</Text>
            <Text style={styles.infoValue}>{user?.edad || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>{user?.telefono || "N/A"}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>E-Mail</Text>
            <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>
          </View>
        </View>
      </View>
    </View>
  )

  // Contenido de Institución
  const renderInstitucionContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Federación</Text>
            <Text style={styles.infoValue}>Rioplatense</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Club</Text>
            <Text style={styles.infoValue}>{user?.club_id || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Deporte</Text>
            <Text style={styles.infoValue}>Patín artístico</Text>
          </View>
        </View>
      </View>
    </View>
  )

  // Contenido de Archivos
  const renderArchivosContent = () => {
    const documents = [
      { id: 1, nombre: "Apto médico" },
      { id: 2, nombre: "Frente DNI" },
      { id: 3, nombre: "Revés DNI" },
    ]

    return (
      <View style={styles.contentContainer}>
        <View style={styles.infoCard}>
          {documents.map((doc, index) => (
            <View key={doc.id}>
              <View style={styles.documentItem}>
                <Text style={styles.documentName}>{doc.nombre}</Text>

                <View style={styles.documentActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Ver</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Descargar</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {index < documents.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate("Profile")}
        userName={user?.name}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Escritorio</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "ficha" && styles.tabActive]}
            onPress={() => setActiveTab("ficha")}
          >
            <Text style={[styles.tabText, activeTab === "ficha" && styles.tabTextActive]}>Ficha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "institucion" && styles.tabActive]}
            onPress={() => setActiveTab("institucion")}
          >
            <Text style={[styles.tabText, activeTab === "institucion" && styles.tabTextActive]}>Institución</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "archivos" && styles.tabActive]}
            onPress={() => setActiveTab("archivos")}
          >
            <Text style={[styles.tabText, activeTab === "archivos" && styles.tabTextActive]}>Archivos</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido dinámico según tab activa */}
        {activeTab === "ficha" && renderFichaContent()}
        {activeTab === "institucion" && renderInstitucionContent()}
        {activeTab === "archivos" && renderArchivosContent()}
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
  tabs: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    fontStyle: "italic",
  },
  tabTextActive: {
    color: COLORS.white,
  },
  contentContainer: {
    marginTop: 8,
  },
  infoCard: {
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
  documentItem: {
    paddingVertical: 16,
  },
  documentName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: COLORS.text,
  },
  documentActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginVertical: 8,
  },
})
