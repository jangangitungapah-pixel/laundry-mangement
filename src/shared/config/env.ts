import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_NAME: z.string().trim().min(1).default('LaundryKita'),
  VITE_API_BASE_URL: z.url().default('http://localhost:3000'),
})

export const env = envSchema.parse(import.meta.env)
