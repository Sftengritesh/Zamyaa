import axios from 'axios'

const API_BASE = '/api'

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zamyaa_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Cloudinary direct upload helper or server proxy
export async function uploadToCloudinary(file: File, folder = 'zamyaa/products') {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('folder', folder)

  const res = await api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}

export async function uploadMultipleToCloudinary(files: File[], folder = 'zamyaa/products') {
  const formData = new FormData()
  files.forEach((f) => formData.append('images', f))
  formData.append('folder', folder)

  const res = await api.post('/upload/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}
