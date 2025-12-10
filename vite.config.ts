import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 環境変数をロード (Vercel等の環境変数も含む)
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    base: './',
    define: {
      // コード内の `process.env.API_KEY` を、ビルド時に実際の環境変数の値に置換する設定
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})