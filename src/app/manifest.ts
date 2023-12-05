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
    "icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}]
  }
}