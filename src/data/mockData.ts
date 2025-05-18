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
}

// Mock NFC cards data
export const mockNfcCards: NfcCard[] = [
  {
    id: 'card-001',
    userId: 'user-001',
    name: 'Carte Professionnelle',
    description: 'Ma carte professionnelle avec mes coordonnées de contact',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfcmanager.com/cards/card-001',
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
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfcmanager.com/cards/card-002',
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
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfcmanager.com/cards/card-003',
    isActive: false,
    createdAt: '2025-04-22T09:15:00Z',
    linkedin: 'https://linkedin.com/in/usertest',
    job: 'Marketing Specialist',
    company: 'Marketing Pro',
    email: 'user@example.com',
    phone: '+33 9 87 65 43 21',
    website: 'https://marketingpro.com',
    template: 'minimal'
  },
  {
    id: 'card-004',
    userId: 'user-002',
    name: 'Carte Événement',
    description: 'Ma carte pour les événements spéciaux',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfcmanager.com/cards/card-004',
    isActive: true,
    createdAt: '2025-05-05T16:20:00Z',
    template: 'light'
  },
  {
    id: 'card-005',
    userId: 'user-003',
    name: 'Carte Entreprise',
    description: 'Carte pour mon entreprise avec coordonnées et site web',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nfcmanager.com/cards/card-005',
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
    name: 'Utilisateur Test',
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
