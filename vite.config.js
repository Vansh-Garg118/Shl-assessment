import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   // proxy: {
  //   //   "/api": {
  //   //   target: "https://shl-assessment-backend-vanshgarg.up.railway.app/api",
  //   //   changeOrigin: true,
  //   //   rewrite: (path) => path.replace(/^\/api/, ""),
  //   // },
  //   // }  
  // } ,
  plugins: [tailwindcss(),react()],
})
