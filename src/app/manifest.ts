import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "ACADEMIA | Empowering Minds, Elevating Futures",
        short_name: "ACADEMIA",
        description: 'ACADEMIA revolutionizes education by providing seamless access to academic resources. Students can effortlessly discover, browse, and download study materials while faculty members can easily share knowledge and contribute to the learning ecosystem.',
        start_url: '/',
        id: '/',
        scope: '/',
        background_color: '#FAFAFA',
        theme_color: '#FAFAFA',
        orientation: "portrait",
        display: 'standalone',
        display_override: [
            "standalone",
            "fullscreen",
            "window-controls-overlay"
        ],
        categories: [
            "productivity",
            "education",
            "social"
        ],
        icons: [
            {
                sizes: "144x144",
                src: "icons/144.png",
                type: "image/png",
                purpose: "any",
            },
            {
                sizes: "192x192",
                src: "icons/192.png",
                type: "image/png",
                purpose: "maskable"
            },
            {
                sizes: "384x384",
                src: "icons/384.png",
                type: "image/png",
                purpose: "any"
            },
            {
                sizes: "512x512",
                src: "icons/512.png",
                type: "image/png",
                purpose: "any"
            }
        ],
        screenshots: [
            {
                src: "screenshots/ACADEMIA_Screenshot.png",
                sizes: "768x359",
                type: "image/png",
                form_factor: "wide",
                label: "ACADEMIA | Empowering Minds, Elevating Futures",
            },
            {
                src: "screenshots/ACADEMIA_Screenshot_Mobile.png",
                sizes: "354x787",
                type: "image/png",
                label: "ACADEMIA | Empowering Minds, Elevating Futures",
            },
        ]
    }
}