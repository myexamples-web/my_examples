import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Examples',
  description: 'Dokumentation',
    head: [['link', { rel: 'icon', href: '/favicon.png' }]],  // <-- das hier

    srcDir: '.',
  themeConfig: {
    search: {
      provider: 'local'
    }
  },
  sidebar: [
    {
      text: 'VPS Server',
      items: [
        { text: 'Server Aufsetzen', link: '/vps/Server_Aufsetzen' },
        { text: 'Firewall', link: '/vps/Firewall' },
        { text: 'Benutzer', link: '/vps/Benutzer' },
        { text: 'Docker', link: '/vps/Docker' },
        { text: 'Domain', link: '/vps/Domain' },
        { text: 'Reverse Proxy', link: '/vps/Proxy' },
        { text: 'SSO', link: '/vps/SSO' },
        { text: 'VPN', link: '/vps/Vpn' },
        { text: 'Docker Compose Struktur', link: '/vps/dcs' },
        { text: 'CI/CD Pipeline', link: '/vps/CICD' },
      ]
    }
  ]
})
