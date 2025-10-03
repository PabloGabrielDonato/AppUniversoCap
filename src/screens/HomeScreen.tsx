"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, Image } from "react-native"
import * as FileSystem from "expo-file-system/legacy"
import * as Sharing from "expo-sharing"
import { Header } from "../components"
import { useAuth } from "../context"
import { COLORS } from "../constants"
import { API_CONFIG } from "../constants/config"
import { userApi } from "../api"

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"ficha" | "institucion" | "archivos">("ficha")
  const [downloading, setDownloading] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [userRoles, setUserRoles] = useState<any[]>([])
  const [userLicences, setUserLicences] = useState<any[]>([])
  const [loadingRoles, setLoadingRoles] = useState(false)
  const [loadingLicences, setLoadingLicences] = useState(false)

  useEffect(() => {
    if (user) {
      console.log("[v0 HomeScreen] Usuario completo:", JSON.stringify(user, null, 2))
      console.log("[v0 HomeScreen] user_data:", user.user_data)
    }
  }, [user])



  const calculateAge = (dateString?: string) => {
    if (!dateString) return ""
    const birthDate = new Date(dateString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const viewFile = (fileName: string | undefined) => {
    if (!fileName) {
      Alert.alert("Error", "Archivo no disponible")
      return
    }

    const baseUrl = API_CONFIG.BASE_URL.endsWith("/") ? API_CONFIG.BASE_URL.slice(0, -1) : API_CONFIG.BASE_URL
    const fileUrl = `${baseUrl}/storage/${fileName}`

    setSelectedImage(fileUrl)
    setModalVisible(true)
  }

  const downloadFile = async (fileName: string | undefined) => {
    if (!fileName) {
      Alert.alert("Error", "Archivo no disponible")
      return
    }

    try {
      setDownloading(fileName)

      const baseUrl = API_CONFIG.BASE_URL.endsWith("/") ? API_CONFIG.BASE_URL.slice(0, -1) : API_CONFIG.BASE_URL
      const fileUrl = `${baseUrl}/storage/${fileName}`
      const fileUri = FileSystem.cacheDirectory + fileName

      console.log("=".repeat(60))
      console.log("[v0 HomeScreen] 🔍 INTENTANDO DESCARGAR ARCHIVO")
      console.log("[v0 HomeScreen] 📁 Nombre del archivo:", fileName)
      console.log("[v0 HomeScreen] 🌐 URL completa:", fileUrl)
      console.log("[v0 HomeScreen] 💾 Guardando en:", fileUri)
      console.log("=".repeat(60))

      const downloadResult = await FileSystem.downloadAsync(fileUrl, fileUri)

      console.log("[v0 HomeScreen] ✅ Resultado de descarga - Status:", downloadResult.status)

      setDownloading(null)

      if (downloadResult.status === 200) {
        console.log("[v0 HomeScreen] ✅ Descarga exitosa, intentando compartir...")

        const fileInfo = await FileSystem.getInfoAsync(downloadResult.uri)

        if (!fileInfo.exists) {
          console.error("[v0 HomeScreen] ❌ El archivo no existe después de descargar")
          Alert.alert("Error", "El archivo no se descargó correctamente")
          return
        }

        const isAvailable = await Sharing.isAvailableAsync()

        if (isAvailable) {
          try {
            await Sharing.shareAsync(downloadResult.uri, {
              mimeType: "image/jpeg",
              dialogTitle: "Guardar archivo",
            })
            console.log("[v0 HomeScreen] ✅ Archivo compartido exitosamente")
          } catch (shareError) {
            console.error("[v0 HomeScreen] ❌ Error al compartir:", shareError)
            Alert.alert("Error", `No se pudo compartir el archivo: ${shareError}`)
          }
        } else {
          Alert.alert("Descarga exitosa", `El archivo se ha descargado en: ${downloadResult.uri}`)
        }
      } else {
        console.error("=".repeat(60))
        console.error("[v0 HomeScreen] ❌ ERROR 404 - ARCHIVO NO ENCONTRADO")
        console.error("[v0 HomeScreen] La URL no existe en el servidor:", fileUrl)
        console.error("[v0 HomeScreen] Verifica que:")
        console.error("[v0 HomeScreen] 1. El symlink de storage esté configurado en Laravel")
        console.error("[v0 HomeScreen] 2. La ruta correcta sea /storage/ y no /public/storage/")
        console.error("[v0 HomeScreen] 3. Los archivos estén en storage/app/public/")
        console.error("=".repeat(60))
        Alert.alert(
          "Error 404",
          `El archivo no se encuentra en el servidor.\n\nURL intentada:\n${fileUrl}\n\nVerifica la configuración de storage en Laravel.`,
        )
      }
    } catch (error) {
      setDownloading(null)
      console.error("[v0 HomeScreen] ❌ Error al descargar archivo:", error)
      Alert.alert("Error", `Ocurrió un error al descargar el archivo: ${error}`)
    }
  }

  const renderFichaContent = () => {
    const userData = user?.user_data

    return (
      <View style={styles.contentContainer}>
        <View style={styles.infoCard}>
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
              <Text style={styles.infoValue}>{userData?.dni || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Edad</Text>
              <Text style={styles.infoValue}>{calculateAge(userData?.birth_date) || "N/A"}</Text>
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
                  <Text style={styles.infoValue}>
                    {userData?.birth_date ? new Date(userData.birth_date).toLocaleDateString() : "N/A"}
                  </Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Género</Text>
                  <Text style={styles.infoValue}>{userData?.gender || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Dirección</Text>
                  <Text style={styles.infoValue}>{userData?.address || "N/A"}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Ciudad</Text>
                  <Text style={styles.infoValue}>{userData?.city || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>CUIT</Text>
                  <Text style={styles.infoValue}>{userData?.cuit || "N/A"}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Nacionalidad</Text>
                  <Text style={styles.infoValue}>{userData?.nationality || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Provincia</Text>
                  <Text style={styles.infoValue}>{userData?.state || "N/A"}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Código Postal</Text>
                  <Text style={styles.infoValue}>{userData?.zip_code || "N/A"}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    )
  }

  const renderInstitucionContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.infoCard}>
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
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Rol</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Licencia</Text>

          </View>
        </View>
      </View>
    </View>
  )

  const renderArchivosContent = () => {
    const userData = user?.user_data || user?.userData

    const documents = [
      {
        id: 1,
        nombre: "Apto médico",
        fileName: undefined,
      },
      {
        id: 2,
        nombre: "Frente DNI",
        fileName: userData?.dni_front,
      },
      {
        id: 3,
        nombre: "Revés DNI",
        fileName: userData?.dni_back,
      },
    ]

    return (
      <View style={styles.contentContainer}>
        <View style={styles.infoCard}>
          {documents.map((doc, index) => (
            <View key={doc.id}>
              <View style={styles.documentItem}>
                <Text style={styles.documentName}>{doc.nombre}</Text>

                {downloading === doc.fileName ? (
                  <Text style={styles.loadingText}>Descargando...</Text>
                ) : (
                  <View style={styles.documentActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, !doc.fileName && styles.actionButtonDisabled]}
                      onPress={() => viewFile(doc.fileName)}
                      disabled={!doc.fileName}
                    >
                      <Text style={styles.actionButtonText}>Ver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, !doc.fileName && styles.actionButtonDisabled]}
                      onPress={() => downloadFile(doc.fileName)}
                      disabled={!doc.fileName}
                    >
                      <Text style={styles.actionButtonText}>Descargar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {index < documents.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </View>
    )
  }

  const renderModal = () => (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />}
        </View>
      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => navigation.openDrawer()} onProfilePress={() => navigation.navigate("Profile")} />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Escritorio</Text>

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

        {activeTab === "ficha" && renderFichaContent()}
        {activeTab === "institucion" && renderInstitucionContent()}
        {activeTab === "archivos" && renderArchivosContent()}
      </ScrollView>

      {renderModal()}
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
    fontSize: 14,
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
  actionButtonDisabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.5,
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
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: 0,
    zIndex: 1,
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: "700",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
})
