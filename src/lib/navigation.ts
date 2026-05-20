// Single source of truth for the sidebar and prev/next pager.
// Slugs match docs/<slug>.md (without the .md extension).

export interface NavItem {
  title: string
  path: string // route path
  slug: string // markdown file (relative to docs/, without .md)
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: 'Genel',
    items: [{ title: 'FishingPlus', path: '/', slug: 'README' }]
  },
  {
    title: 'Başlarken',
    items: [
      {
        title: 'Genel Mimari',
        path: '/getting-started/architecture',
        slug: 'getting-started/architecture'
      },
      {
        title: 'Konfigürasyon Dosyaları',
        path: '/getting-started/configuration-files',
        slug: 'getting-started/configuration-files'
      }
    ]
  },
  {
    title: 'Balık Tutma',
    items: [
      { title: 'Balık Türleri', path: '/fishing/fish-types', slug: 'fishing/fish-types' },
      { title: 'RNG ve Yakalama Mantığı', path: '/fishing/rng', slug: 'fishing/rng' },
      { title: 'Yakalama Modları', path: '/fishing/modes', slug: 'fishing/modes' },
      { title: 'Olta Parçaları', path: '/fishing/rod-parts', slug: 'fishing/rod-parts' }
    ]
  },
  {
    title: 'Eşyalar',
    items: [
      { title: 'Yemler', path: '/items/baits', slug: 'items/baits' },
      { title: 'Boosterlar', path: '/items/boosters', slug: 'items/boosters' },
      { title: 'Totemler', path: '/items/totems', slug: 'items/totems' }
    ]
  },
  {
    title: 'Dünya',
    items: [
      { title: 'Hotspot Sistemi', path: '/world/hotspots', slug: 'world/hotspots' },
      { title: 'Hava ve Ay Evresi', path: '/world/environment', slug: 'world/environment' },
      { title: 'Tazelik (Spoilage)', path: '/world/spoilage', slug: 'world/spoilage' },
      {
        title: 'Akvaryum Kovalar',
        path: '/world/aquarium-buckets',
        slug: 'world/aquarium-buckets'
      }
    ]
  },
  {
    title: 'İlerleme',
    items: [
      { title: 'Profil ve Seviye', path: '/progression/profile', slug: 'progression/profile' },
      {
        title: 'Başarımlar',
        path: '/progression/achievements',
        slug: 'progression/achievements'
      },
      {
        title: 'Turnuvalar',
        path: '/progression/tournaments',
        slug: 'progression/tournaments'
      }
    ]
  },
  {
    title: 'Ekonomi',
    items: [
      { title: 'Market', path: '/economy/market', slug: 'economy/market' },
      { title: 'Bounty Panosu', path: '/economy/bounty', slug: 'economy/bounty' },
      { title: 'NPC Tüccarı', path: '/economy/npc-trader', slug: 'economy/npc-trader' }
    ]
  },
  {
    title: 'İşleme',
    items: [
      {
        title: 'Tesisler ve Tarifler',
        path: '/processing/facilities',
        slug: 'processing/facilities'
      },
      { title: 'Malzemeler', path: '/processing/ingredients', slug: 'processing/ingredients' },
      {
        title: 'Sandık Otomasyonu',
        path: '/processing/automation',
        slug: 'processing/automation'
      }
    ]
  },
  {
    title: 'Diğer Sistemler',
    items: [
      { title: 'Balık Günlüğü', path: '/misc/journal', slug: 'misc/journal' },
      { title: 'Lokalizasyon', path: '/misc/localization', slug: 'misc/localization' },
      { title: 'Sohbet', path: '/misc/chat', slug: 'misc/chat' },
      { title: 'Hologramlar', path: '/misc/holograms', slug: 'misc/holograms' },
      { title: 'Bölge Koruma', path: '/misc/protection', slug: 'misc/protection' },
      { title: 'Yaklaşma Overlay’i', path: '/misc/overlay', slug: 'misc/overlay' },
      { title: 'PlaceholderAPI', path: '/misc/placeholderapi', slug: 'misc/placeholderapi' }
    ]
  },
  {
    title: 'Referans',
    items: [
      { title: 'Komutlar', path: '/reference/commands', slug: 'reference/commands' },
      { title: 'İzinler', path: '/reference/permissions', slug: 'reference/permissions' },
      { title: 'Veritabanı', path: '/reference/database', slug: 'reference/database' },
      {
        title: 'Geliştirici Notları',
        path: '/reference/developer-notes',
        slug: 'reference/developer-notes'
      }
    ]
  }
]

export const flatNav: NavItem[] = navigation.flatMap((s) => s.items)

export function findIndexByPath(path: string): number {
  return flatNav.findIndex((i) => i.path === path)
}

export function findItemByPath(path: string): NavItem | undefined {
  return flatNav.find((i) => i.path === path)
}

export function findItemBySlug(slug: string): NavItem | undefined {
  return flatNav.find((i) => i.slug === slug)
}
