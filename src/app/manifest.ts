import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "short_name": "FC Coffee",
    "name": "FullCount Coffee Tracker",
    "start_url": "/smithaFC.github.io/",
    "display": "standalone",
    "theme_color": "#565296",
    "background_color": "#ffffff",
    "id": "/smithaFC.github.io/",
    "scope": ".",
    "icons": [
        {
          "src": "./favicon.ico",
          "sizes": "32x32",
          "type": "image/x-icon"
        },
        {
          "src": "./icon-192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "./icon-192-maskable.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "./icon-512.png",
          "type": "image/png",
          "sizes": "512x512"
        },
        {
          "src": "./icon-512-maskable.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ],
  }
}