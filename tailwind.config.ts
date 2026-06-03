import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#64748B',
        navy: '#0B1220',
        professional: '#0A66C2',
        action: '#2563EB'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)'
      }
    }
  }
}
