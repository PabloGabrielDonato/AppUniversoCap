export interface User {
  id: number
  name: string
  apellido?: string
  email: string
  dni?: string
  telefono?: string
  fecha_nacimiento?: string
  edad?: number
  foto_url?: string
  club_id?: string | number

  // Campos del modelo User
  last_name?: string
  phone?: string
  photo?: string
  status?: string
  slug?: string

  // Campos del modelo UserData (relación userData)
  userData?: UserData

  // Relaciones
  club?: Club
  federations?: Federation[]
  tournaments?: Tournament[]
}

export interface UserData {
  id: number
  user_id: number
  dni: string
  birth_date: string
  gender?: string
  nationality?: string
  country?: string
  address?: string
  zip_code?: string
  city?: string
  partido?: string
  state?: string

  // Documentos
  dni_front?: string
  dni_back?: string

  // Datos del padre/tutor
  parent_name?: string
  parent_last_name?: string
  parent_dni?: string
  parent_dni_front?: string
  parent_dni_back?: string

  cuit?: string
  age?: number
}

export interface Club {
  id: number
  name: string
  slug?: string
  federation_id?: number
}

export interface Federation {
  id: number
  name: string
  slug?: string
}

export interface Tournament {
  id: number
  name: string
  slug?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user?: User
}
