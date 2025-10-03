"use client"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native"
import QRCode from "react-native-qrcode-svg"
import { useAuth } from "../context"
import { API_CONFIG } from "../constants/config"

export default function ProfileScreen({ navigation }: any) {
  const { user } = useAuth()

  console.log("[v0] Usuario completo:", JSON.stringify(user, null, 2))
  console.log("[v0] Campo photo del usuario:", user?.photo)
  console.log("[v0] Campo foto_url del usuario:", user?.foto_url)
  console.log("[v0] BASE_URL del API:", API_CONFIG.BASE_URL)

  const qrData = JSON.stringify({
    id: user?.id,
    name: user?.name,
    last_name: user?.last_name,
    email: user?.email,
    phone: user?.phone,
  })

  const getPhotoUrl = (fotoUrl?: string) => {
    console.log("[v0] getPhotoUrl recibió:", fotoUrl)
    if (!fotoUrl) {
      console.log("[v0] fotoUrl es null/undefined, retornando null")
      return null
    }
    // Si ya es una URL completa, usarla directamente
    if (fotoUrl.startsWith("http://") || fotoUrl.startsWith("https://")) {
      console.log("[v0] fotoUrl es una URL completa:", fotoUrl)
      return fotoUrl
    }
    // Si es solo el nombre del archivo, construir la URL completa
    const photoUrl = `${API_CONFIG.BASE_URL}storage/${fotoUrl}`
    console.log("[v0] URL de foto construida:", photoUrl)
    return photoUrl
  }

  const photoUrl = getPhotoUrl(user?.photo)
  console.log("[v0] photoUrl final:", photoUrl)
  console.log("[v0] ¿Mostrará foto?:", !!photoUrl)

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        {/* Profile Photo */}
        <View style={styles.photoContainer}>
          {photoUrl ? (
            <Image
              source={{ uri: photoUrl }}
              style={styles.photo}
              onError={(error) => {
                console.log("[v0] Error cargando foto:", error.nativeEvent.error)
                console.log("[v0] URL que falló:", photoUrl)
              }}
              onLoad={() => {
                console.log("[v0] Foto cargada exitosamente:", photoUrl)
              }}
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>{user?.name?.charAt(0).toUpperCase() || "U"}</Text>
            </View>
          )}
        </View>

        {/* Name */}
        <Text style={styles.name}>
          {user?.name || "Usuario"} {user?.last_name || ""}
        </Text>

        {/* Role */}
        <Text style={styles.role}>Atleta Nacional</Text>

        {/* QR Code Card */}
        <View style={styles.qrCard}>
          <QRCode value={qrData} size={280} backgroundColor="white" />
        </View>

        {/* Contact Information */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>{user?.phone || "N/A"}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>E-Mail</Text>
            <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Edad</Text>
            <Text style={styles.infoValue}>
              {formatDate(user?.user_data?.birth_date)} ({calculateAge(user?.user_data?.birth_date)})
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 24,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 60,
    fontWeight: "300",
    color: "#000",
  },
  photoContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  photoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#9CA3AF",
  },
  photoPlaceholderText: {
    fontSize: 56,
    fontWeight: "300",
    color: "#6B7280",
  },
  name: {
    fontSize: 28,
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  role: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
  },
  qrCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 8,
  },
  infoItem: {
    paddingVertical: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#0066FF",
  },
  divider: {
    height: 1,
    backgroundColor: "#D1D5DB",
  },
})
