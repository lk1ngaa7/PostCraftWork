import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        page: '#F8F5EF',
        surface: '#FFFFFF',
        ink: '#0F172A',
        muted: '#64748B',
        navy: '#101522',
        craft: '#D6A04A',
        craftSoft: '#FFF3DA',
        professional: '#0A66C2',
        action: '#2563EB',
        border: '#E2E8F0',
        soft: '#EEF2F7'
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.10)',
        subtle: '0 8px 22px rgba(15, 23, 42, 0.05)'
      }
    }
  }
}
