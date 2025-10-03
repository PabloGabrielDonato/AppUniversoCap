"use client"

import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native"
import { COLORS, API_CONFIG } from "../constants"
import { useAuth } from "../context/AuthContext"

interface HeaderProps {
  onMenuPress: () => void
  onProfilePress?: () => void
}

export default function Header({ onMenuPress, onProfilePress }: HeaderProps) {
  const { user } = useAuth()

  const getPhotoUrl = (fotoUrl?: string) => {
    if (!fotoUrl) return null

    // Si ya es una URL completa, usarla directamente
    if (fotoUrl.startsWith("http://") || fotoUrl.startsWith("https://")) {
      return fotoUrl
    }

    // Eliminar la barra final de BASE_URL si existe
    const baseUrl = API_CONFIG.BASE_URL.endsWith("/") ? API_CONFIG.BASE_URL.slice(0, -1) : API_CONFIG.BASE_URL

    // Construir la URL completa
    return `${baseUrl}/storage/${fotoUrl}`
  }

  const photoUrl = getPhotoUrl(user?.photo)
  const userName = user?.name || "P"

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.avatar} onPress={onProfilePress}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  menuIcon: {
    fontSize: 32,
    color: "white",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  bellIcon: {
    fontSize: 24,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
})
