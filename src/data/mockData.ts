export interface NfcCard {
  id: string;
  userId: string;
  name: string;
  description: string;
  qrCode: string;
  isActive: boolean;
  createdAt: string;
  // Added social media links
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  // Added personal/professional info
  job?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  // Added template styling
  template?: 'dark' | 'light' | 'gradient' | 'minimal' | 'default';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  profileImage?: string;
}

// Mock NFC cards data
export const mockNfcCards: NfcCard[] = [
  {
    id: 'card-001',
    userId: 'user-001',
    name: 'Carte Professionnelle',
    description: 'Ma carte professionnelle avec mes coordonnées de contact',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-001',
    isActive: true,
    createdAt: '2025-02-15T10:30:00Z',
    linkedin: 'https://linkedin.com/in/admintest',
    twitter: 'https://twitter.com/admintest',
    facebook: 'https://facebook.com/admintest',
    instagram: 'https://instagram.com/admintest',
    job: 'Développeur Web',
    company: 'Tech Solutions',
    email: 'admin@example.com',
    phone: '+33 1 23 45 67 89',
    website: 'https://example.com',
    template: 'dark'
  },
  {
    id: 'card-002',
    userId: 'user-001',
    name: 'Carte Personnelle',
    description: 'Ma carte personnelle pour mes amis',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-002',
    isActive: true,
    createdAt: '2025-03-10T14:45:00Z',
    linkedin: '',
    twitter: 'https://twitter.com/personal',
    facebook: 'https://facebook.com/personal',
    instagram: 'https://instagram.com/personal',
    job: 'Freelance',
    template: 'gradient'
  },
  {
    id: 'card-003',
    userId: 'user-002',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-003',
    isActive: false,
    createdAt: '2025-04-22T09:15:00Z',
    linkedin: 'https://www.linkedin.com/in/boully-galissa-17922089?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Chef de Cabinet du Ministre du Travail',
    company: 'Présidence du Sénégal',
    email: 'user@example.com',
    phone: '78 527 87 73',
    website: 'https://marketingpro.com',
    template: 'minimal'
  },
  {
    id: 'card-006',
    userId: 'user-006',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-006/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/boully-galissa-17922089?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Chef de Cabinet du Ministre du Travail',
    company: '',
    email: 'boully.galissa@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'minimal'
  },
  {
    id: 'card-004',
    userId: 'user-002',
    name: 'Carte Événement',
    description: 'Ma carte pour les événements spéciaux',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-004',
    isActive: true,
    createdAt: '2025-05-05T16:20:00Z',
    template: 'light'
  },
  {
    id: 'card-005',
    userId: 'user-003',
    name: 'Carte Entreprise',
    description: 'Carte pour mon entreprise avec coordonnées et site web',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-005',
    isActive: true,
    createdAt: '2025-01-30T11:10:00Z',
    linkedin: 'https://linkedin.com/company/paulcompany',
    job: 'CEO',
    company: 'Paul Company',
    email: 'paul@example.com',
    phone: '+33 6 12 34 56 78',
    website: 'https://paulcompany.com',
    template: 'dark'
  },
 
  {
    id: 'card-007',
    userId: 'user-007',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-007/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/moulayeofficiel?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Responsable des projets',
    company: '',
    email: 'moulaye.diop@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-008',
    userId: 'user-008',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-008/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: '',
    job: 'Ministre du travail',
    company: '',
    email: 'abass.fall@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-009',
    userId: 'user-009',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-009/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: '',
    job: 'Ministre de la communication et des Télécommunications',
    company: '',
    email: 'aliou.sall@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-010',
    userId: 'user-010',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-010/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/sonkoofficiel?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Premier Ministre du Sénégal',
    company: '',
    email: 'ousmane.sonko@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-011',
    userId: 'user-011',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-011/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/fadilou-keïta-06183863?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Directeur Général de la Caisse des dépôts et dds Consignations',
    company: '',
    email: 'fadilou.keita@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-012',
    userId: 'user-012',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-012/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/assane-diouf-69020b74?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Inspecteur Principal des Impôts',
    company: '',
    email: 'assane.diouf@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-013',
    userId: 'user-013',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-013/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/dahirou-thiam-19374b309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Directeur Général de l\'ARTP',
    company: '',
    email: 'dahirou.thiam@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-014',
    userId: 'user-014',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-014/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/jean-michel-sene-071a83110?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Directeur Général ASER',
    company: '',
    email: 'jean.michel.sene@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-015',
    userId: 'user-015',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-015/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: 'https://www.linkedin.com/in/cheikh-ismaël-daffe-34aa9427?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    job: 'Entrepreneur',
    company: '',
    email: 'ismael.daffe@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
  {
    id: 'card-016',
    userId: 'user-016',
    name: 'Carte Networking',
    description: 'Ma carte pour le networking professionnel',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfc-card-demo.vercel.app/cards/card-016/view',
    isActive: true,
    createdAt: '2025-05-18T00:00:00Z',
    linkedin: '',
    job: 'Ministre du travail',
    company: '',
    email: 'abass.fall@example.com',
    phone: '78 527 87 73',
    website: '',
    template: 'dark'
  },
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'user-001',
    email: 'admin@example.com',
    name: 'Admin Test',
    role: 'admin',
    createdAt: '2025-01-01T08:00:00Z',
  },
  {
    id: 'user-002',
    email: 'user@example.com',
    name: 'Boully galissa',
    role: 'user',
    createdAt: '2025-01-15T13:45:00Z',
  },
  {
    id: 'user-003',
    email: 'paul@example.com',
    name: 'Paul Martin',
    role: 'user',
    createdAt: '2025-02-05T09:30:00Z',
  },
  {
    id: 'user-004',
    email: 'marie@example.com',
    name: 'Marie Dubois',
    role: 'user',
    createdAt: '2025-02-20T15:20:00Z',
  },
  {
    id: 'user-005',
    email: 'sophie@example.com',
    name: 'Sophie Bernard',
    role: 'user',
    createdAt: '2025-03-10T10:15:00Z',
  },
  {
    id: 'user-006',
    email: 'boully.galissa@example.com',
    name: 'Boully Galissa',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '',
  },
  {
    id: 'user-007',
    email: 'moulaye.diop@example.com',
    name: 'Moulaye Diop',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '',
  },
  {
    id: 'user-008',
    email: 'abass.fall@example.com',
    name: 'Abass Fall',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/abbase_fall.png',
  },
  {
    id: 'user-009',
    email: 'aliou.sall@example.com',
    name: 'Aliou Sall',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/aliou_sall.png',
  },
  {
    id: 'user-010',
    email: 'ousmane.sonko@example.com',
    name: 'Ousmane Sonko',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/ousmane_sonko.png',
  },
  {
    id: 'user-011',
    email: 'fadilou.keita@example.com',
    name: 'Fadilou Keita',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/fadilou_keita.png',
  },
  {
    id: 'user-012',
    email: 'assane.diouf@example.com',
    name: 'Assane Diouf',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/assane_diouf.png',
  },
  {
    id: 'user-013',
    email: 'dahirou.thiam@example.com',
    name: 'Dahirou Thiam',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/dahirou_thiam.png',
  },
  {
    id: 'user-014',
    email: 'jean.michel.sene@example.com',
    name: 'Jean Michel Sene',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/jean_micheal_sene.png',
  },
  {
    id: 'user-015',
    email: 'ismael.daffe@example.com',
    name: 'Ismael Daffe',
    role: 'user',
    createdAt: '2025-05-18T00:00:00Z',
    profileImage: '/profiles/Ismael_Daffe.png',
  },
];

// Generate stats based on mock data
export const generateStats = () => {
  const totalCards = mockNfcCards.length;
  const activeCards = mockNfcCards.filter(card => card.isActive).length;
  const totalUsers = mockUsers.filter(user => user.role === 'user').length;
  const cardsPerUser = mockUsers
    .filter(user => user.role === 'user')
    .map(user => ({
      userId: user.id,
      userName: user.name,
      cardCount: mockNfcCards.filter(card => card.userId === user.id).length,
    }));

  return {
    totalCards,
    activeCards,
    inactiveCards: totalCards - activeCards,
    totalUsers,
    cardsPerUser,
    activeCardPercentage: Math.round((activeCards / totalCards) * 100),
  };
};

// Helper function to get cards for a specific user
export const getUserCards = (userId: string) => {
  return mockNfcCards.filter(card => card.userId === userId);
};

// Helper function to get a specific card by ID
export const getCardById = (cardId: string) => {
  return mockNfcCards.find(card => card.id === cardId);
};

// Helper function to get a specific user by ID
export const getUserById = (userId: string) => {
  return mockUsers.find(user => user.id === userId);
};
