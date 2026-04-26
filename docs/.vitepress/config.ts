import {defineConfig} from 'vitepress'

export default defineConfig({
    title: 'My Examples',
    description: 'Dokumentation',
    head: [['link', {rel: 'icon', href: '/favicon.png'}]],
    srcDir: '.',
    themeConfig: {
        search: {
            provider: 'local'
        },
        sidebar: [
            {
                text: 'VPS Server',
                collapsed: true,  // aufgeklappt beim Start, aber zuklappbar
                items: [
                    {text: 'Server Aufsetzen', link: '/vps/Server_Aufsetzen'},
                    {text: 'Firewall', link: '/vps/Firewall'},
                    {text: 'Benutzer', link: '/vps/Benutzer'},
                    {text: 'Docker', link: '/vps/Docker'},
                    {text: 'Domain', link: '/vps/Domain'},
                    {text: 'Reverse Proxy', link: '/vps/Proxy'},
                    {text: 'SSO', link: '/vps/SSO'},
                    {text: 'VPN', link: '/vps/Vpn'},
                    {text: 'Docker Compose Struktur', link: '/vps/dcs'},
                    {text: 'CI/CD Pipeline', link: '/vps/CICD'},
                ]
            },
            {
                text: 'Java',
                collapsed: true,
                items: [
                    {text: 'Enums', link: '/java/enums'},
                    {text: 'Firewall', link: '/java/solid'},
                    {text: 'Varinaz', link: '/java/varianz'},
                    {text: 'Generics', link: '/java/generics'},
                    {text: 'Lambda', link: '/java/lambda'},
                ]
            }
        ]
    }
})
