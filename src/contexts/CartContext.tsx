
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define category types and weights
export type Permission = 'location' | 'contacts' | 'microphone' | 'musicAndAudio' | 'nearbyDevice' | 'notification' | 'photosAndVideos';

export interface Category {
  id: string;
  name: string;
  baseWeight: number;
  permissionWeights: Record<Permission, number>;
  description: string;
  image: string;
}

export interface CartItem extends Category {
  selectedPermissions: Permission[];
}

export const categoryData: Category[] = [
  {
    id: 'music-taste',
    name: 'Music Taste',
    baseWeight: 4,
    permissionWeights: {
      location: 1,
      contacts: 0.5,
      microphone: 0.5,
      musicAndAudio: 0.5,
      nearbyDevice: 0.5,
      notification: 0.5,
      photosAndVideos: 0.5
    },
    description: 'Your music listening habits reveal personality traits, mood patterns, and social identity markers.',
    image: '/music-taste.webp'
  },
  {
    id: 'search-history',
    name: 'Search History',
    baseWeight: 18,
    permissionWeights: {
      location: 4,
      contacts: 2,
      microphone: 3,
      musicAndAudio: 4,
      nearbyDevice: 1,
      notification: 2,
      photosAndVideos: 2
    },
    description: 'Every search query builds a detailed profile of your interests, concerns, and intentions.',
    image: '/search-history.webp'
  },
  {
    id: 'dating-apps',
    name: 'Dating Apps',
    baseWeight: 12,
    permissionWeights: {
      location: 3,
      contacts: 2,
      microphone: 1.5,
      musicAndAudio: 1,
      nearbyDevice: 1,
      notification: 1.5,
      photosAndVideos: 2
    },
    description: 'Your romantic preferences and interactions create intimate behavioral profiles.',
    image: '/dating-apps.webp'
  },
  {
    id: 'food-delivery',
    name: 'Food Delivery Preferences',
    baseWeight: 10,
    permissionWeights: {
      location: 2.5,
      contacts: 1,
      microphone: 1.5,
      musicAndAudio: 1.5,
      nearbyDevice: 1,
      notification: 1.5,
      photosAndVideos: 1
    },
    description: 'Your eating habits and delivery patterns reveal lifestyle, schedule, and economic status.',
    image: '/food-delivery.webp'
  },
  {
    id: 'travel-history',
    name: 'Travel History',
    baseWeight: 15,
    permissionWeights: {
      location: 4,
      contacts: 2,
      microphone: 2,
      musicAndAudio: 3,
      nearbyDevice: 1.5,
      notification: 1.5,
      photosAndVideos: 1
    },
    description: 'Your movements create a detailed map of your life, routines, and relationships.',
    image: '/travel-history.webp'
  },
  {
    id: 'podcast-subscriptions',
    name: 'Podcast Subscriptions',
    baseWeight: 10,
    permissionWeights: {
      location: 2.5,
      contacts: 1,
      microphone: 2,
      musicAndAudio: 2,
      nearbyDevice: 1,
      notification: 1,
      photosAndVideos: 0.5
    },
    description: 'Your listening choices reveal political leanings, educational background, and values.',
    image: '/podcast-subscriptions.webp'
  },
  {
    id: 'work-email',
    name: 'Work Email Data',
    baseWeight: 20,
    permissionWeights: {
      location: 3,
      contacts: 4,
      microphone: 2,
      musicAndAudio: 2,
      nearbyDevice: 2,
      notification: 4,
      photosAndVideos: 3
    },
    description: 'Your professional communications expose network connections, decision patterns, and company secrets.',
    image: '/work-email.webp'
  },
  {
    id: 'fitness-trackers',
    name: 'Fitness Trackers',
    baseWeight: 11,
    permissionWeights: {
      location: 3,
      contacts: 1,
      microphone: 2,
      musicAndAudio: 2.5,
      nearbyDevice: 1,
      notification: 1,
      photosAndVideos: 0.5
    },
    description: 'Your health metrics build predictive models of medical conditions and behavioral patterns.',
    image: '/fitness-trackers.webp'
  }
];

export const permissionLabels: Record<Permission, string> = {
  location: 'Location',
  contacts: 'Contacts',
  microphone: 'Microphone',
  musicAndAudio: 'Music and Audio',
  nearbyDevice: 'Nearby Device',
  notification: 'Notification',
  photosAndVideos: 'Photos and Videos'
};

interface CartContextType {
  items: CartItem[];
  addToCart: (category: Category) => void;
  removeFromCart: (categoryId: string) => void;
  updatePermissions: (categoryId: string, permissions: Permission[]) => void;
  getCommodificationScore: () => number;
  getItemScore: (categoryId: string) => number;
  isInCart: (categoryId: string) => boolean;
  getCartItem: (categoryId: string) => CartItem | undefined;
  calculatePermissionImpact: (category: Category, permission: Permission) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (category: Category) => {
    if (items.some(item => item.id === category.id)) return;
    
    // Add all permissions by default
    const allPermissions: Permission[] = Object.keys(category.permissionWeights) as Permission[];
    
    setItems([...items, {
      ...category,
      selectedPermissions: allPermissions
    }]);
  };

  const removeFromCart = (categoryId: string) => {
    setItems(items.filter(item => item.id !== categoryId));
  };

  const updatePermissions = (categoryId: string, permissions: Permission[]) => {
    setItems(items.map(item => 
      item.id === categoryId 
        ? { ...item, selectedPermissions: permissions } 
        : item
    ));
  };

  const getItemScore = (categoryId: string) => {
    const item = items.find(item => item.id === categoryId);
    if (!item) return 0;

    const permissionTotal = item.selectedPermissions.reduce((total, permission) => {
      return total + item.permissionWeights[permission];
    }, 0);

    return Math.min(permissionTotal, item.baseWeight);
  };

  const getCommodificationScore = () => {
    const total = items.reduce((sum, item) => sum + getItemScore(item.id), 0);
    return Math.min(total, 100);
  };

  const isInCart = (categoryId: string) => {
    return items.some(item => item.id === categoryId);
  };

  const getCartItem = (categoryId: string) => {
    return items.find(item => item.id === categoryId);
  };

  const calculatePermissionImpact = (category: Category, permission: Permission) => {
    return category.permissionWeights[permission];
  };

  useEffect(() => {
    // For debugging
    console.log('Cart updated:', items);
    console.log('Current score:', getCommodificationScore());
  }, [items]);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updatePermissions,
      getCommodificationScore,
      getItemScore,
      isInCart,
      getCartItem,
      calculatePermissionImpact
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
