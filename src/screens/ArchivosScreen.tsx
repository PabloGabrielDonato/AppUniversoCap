"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, Image } from "react-native"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { Header } from "../components"
import { useAuth } from "../context"
import { COLORS } from "../constants"
import { API_CONFIG } from "../constants/config"

export default function ArchivosScreen({ navigation }: any) {
  const { user } = useAuth()
  const [downloading, setDownloading] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const userData = user?.user_data || user?.userData

  useEffect(() => {
    if (user) {
      console.log("[v0 ArchivosScreen] Usuario completo:", JSON.stringify(user, null, 2))
      console.log("[v0 ArchivosScreen] user.photo:", user.photo)
      console.log("[v0 ArchivosScreen] user.foto_url:", user.foto_url)
    }
  }, [user])

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

      console.log("[v0 ArchivosScreen] Descargando archivo desde:", fileUrl)
      console.log("[v0 ArchivosScreen] Guardando en:", fileUri)

      const downloadResult = await FileSystem.downloadAsync(fileUrl, fileUri)

      console.log("[v0 ArchivosScreen] Status code:", downloadResult.status)

      setDownloading(null)

      if (downloadResult.status === 200) {
        const fileInfo = await FileSystem.getInfoAsync(downloadResult.uri)

        if (!fileInfo.exists) {
          Alert.alert("Error", "El archivo no se descargó correctamente")
          return
        }

        const isAvailable = await Sharing.isAvailableAsync()

        if (isAvailable) {
          await Sharing.shareAsync(downloadResult.uri, {
            mimeType: "image/jpeg",
            dialogTitle: "Guardar archivo",
          })
        } else {
          Alert.alert("Descarga exitosa", `El archivo se ha descargado en: ${downloadResult.uri}`)
        }
      } else {
        Alert.alert("Error", `No se pudo descargar el archivo. Código de estado: ${downloadResult.status}`)
      }
    } catch (error) {
      setDownloading(null)
      console.error("[v0 ArchivosScreen] Error al descargar archivo:", error)
      Alert.alert("Error", "No se pudo descargar el archivo")
    }
  }

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate("Profile")}
        userName={user?.name}
        userPhoto={user?.photo}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Archivos</Text>

        <View style={styles.documentsContainer}>
          {documents.map((doc) => (
            <View key={doc.id} style={styles.documentItem}>
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
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />}
          </View>
        </View>
      </Modal>
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
  loadingText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    fontStyle: "italic",
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
