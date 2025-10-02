export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface User {
  id: number;
  email: string;
  name: string;
  dni?: string;
  last_name?: string;
  phone?: string;
  fecha_nacimiento?: string;
  age?: number;
  photo?: string;
  rol?: string;
  club_id?: string | number;
  [key: string]: any;
}

export interface PaymentStatus {
  dni: string;
  status: string;
  amount?: number;
  date?: string;
  [key: string]: any;
}

export interface MemberStatus {
  dni: string;
  status: string;
  active: boolean;
  [key: string]: any;
}

export interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  [key: string]: any;
}

export interface Participant {
  dni: string;
  name: string;
  tournament_id: number;
  [key: string]: any;
}

export interface Document {
  id: number;
  nombre: string;
  tipo: "pdf" | "image" | "other";
  url: string;
  fecha_subida?: string;
  tamaño?: number;
}

export interface Stats {
  peso: number;
  calzado: number;
  imc: number;
  talle: string;
  salto: string;
  potencia: string;
}

export interface Institution {
  federacion: string;
  club: string;
  deporte: string;
}
