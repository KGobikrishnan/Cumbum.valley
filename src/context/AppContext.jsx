import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const MILLETS_DATABASE = [
  {
    id: 'pearl-grain',
    name: 'Organic Pearl Millet Grain',
    tamilName: 'Kambu',
    scientificName: 'Pennisetum glaucum',
    type: 'Major',
    form: 'Raw Grain',
    moq: '1 kg',
    pricePerKg: 180,
    availableSizes: [0.5, 1, 2, 5],
    rating: 4.9,
    reviewsCount: 142,
    purity: '99.9% Sortex Clean',
    moisture: '< 11.5% Max',
    origin: 'Cumbum Valley, Tamil Nadu',
    protein: '11.8g / 100g',
    fiber: '8.5g / 100g',
    certification: 'NPOP / USDA Organic',
    description: 'Heritage high-density grain cultivated in pristine, nutrient-rich soils. Sorted using ultra-precise optical sorters to guarantee unparalleled purity for premium culinary standards.',
    image: '/pearl_millet.png',
    premiumMetric: 'High Iron & Zinc Content',
    inStock: true
  },
  {
    id: 'finger-flour',
    name: 'Heritage Finger Millet Flour',
    tamilName: 'Ragi',
    scientificName: 'Eleusine coracana',
    type: 'Major',
    form: 'Fine Flour',
    moq: '1 kg',
    pricePerKg: 160,
    availableSizes: [0.5, 1, 2, 5],
    rating: 4.8,
    reviewsCount: 118,
    purity: '99.8% Stone-Ground Superfine',
    moisture: '< 10.0% Max',
    origin: 'Cumbum Valley Foothills',
    protein: '7.3g / 100g',
    fiber: '11.2g / 100g',
    certification: 'NPOP Organic Certified',
    description: 'Slow stone-ground red millet flour processed under chilled temperatures to retain dietary fibers, calcium, and delicate structural nutrients. Optimal for premium home bakery.',
    image: '/finger_millet.png',
    premiumMetric: 'Elite Dietary Calcium',
    inStock: true
  },
  {
    id: 'foxtail-grain',
    name: 'Golden Foxtail Millet Flakes',
    tamilName: 'Thinai',
    scientificName: 'Setaria italica',
    type: 'Minor',
    form: 'Flakes',
    moq: '500 g',
    pricePerKg: 210,
    availableSizes: [0.5, 1, 2],
    rating: 4.9,
    reviewsCount: 95,
    purity: '99.9% Steam-Rolled',
    moisture: '< 9.5% Max',
    origin: 'Lower Cumbum Highlands',
    protein: '12.3g / 100g',
    fiber: '8.0g / 100g',
    certification: 'USDA & EU Organic',
    description: 'Lightly parboiled and precision flat-rolled heritage foxtail grains. Delivers an exquisite nutty aroma and perfect structural integrity for nourishing breakfasts.',
    image: '/foxtail_millet.png',
    premiumMetric: 'Low Glycemic Index',
    inStock: true
  },
  {
    id: 'kodo-grain',
    name: 'Select Kodo Millet Grain',
    tamilName: 'Varagu',
    scientificName: 'Paspalum scrobiculatum',
    type: 'Minor',
    form: 'Raw Grain',
    moq: '1 kg',
    pricePerKg: 195,
    availableSizes: [0.5, 1, 2, 5],
    rating: 4.7,
    reviewsCount: 64,
    purity: '99.9% De-hulled Sortex Clean',
    moisture: '< 12.0% Max',
    origin: 'Bodi Hills Boundary',
    protein: '8.3g / 100g',
    fiber: '9.0g / 100g',
    certification: 'NPOP Organic',
    description: 'Elite de-hulled minor millet, rich in polyphenols and antioxidants. Highly resistant to pests and cultivated through authentic dryland agroecology in southern Tamil Nadu.',
    image: '/pearl_millet.png',
    premiumMetric: 'Rich in Polyphenols',
    inStock: true
  },
  {
    id: 'little-grain',
    name: 'Pristine Little Millet Grain',
    tamilName: 'Samai',
    scientificName: 'Panicum sumatrense',
    type: 'Minor',
    form: 'Raw Grain',
    moq: '1 kg',
    pricePerKg: 185,
    availableSizes: [0.5, 1, 2, 5],
    rating: 4.8,
    reviewsCount: 77,
    purity: '99.9% Triple-Polished Sortex',
    moisture: '< 11.0% Max',
    origin: 'Cumbum Valley Organic Zone A',
    protein: '7.7g / 100g',
    fiber: '7.6g / 100g',
    certification: 'USDA Organic & FairTrade',
    description: 'Small-seeded ancient grain perfect for premium gluten-free culinary applications. Cleaned via state-of-the-art gravity separators and de-stoned under pristine hygienic control.',
    image: '/foxtail_millet.png',
    premiumMetric: 'High Heat Resistance',
    inStock: true
  },
  {
    id: 'barnyard-flour',
    name: 'Barnyard Millet Fine Flour',
    tamilName: 'Kuthiraivali',
    scientificName: 'Echinochloa frumentacea',
    type: 'Minor',
    form: 'Fine Flour',
    moq: '1 kg',
    pricePerKg: 220,
    availableSizes: [0.5, 1, 2, 5],
    rating: 4.9,
    reviewsCount: 53,
    purity: '99.8% Stone-Ground Superfine',
    moisture: '< 10.5% Max',
    origin: 'Cumbum Valley Irrigation Basin',
    protein: '11.2g / 100g',
    fiber: '10.1g / 100g',
    certification: 'NPOP Certified Organic',
    description: 'Extremely light, easily digestible grain pulverized to a premium superfine mesh. High in digestible protein and fiber, making it the perfect foundation for wholesome nutrition.',
    image: '/finger_millet.png',
    premiumMetric: 'Ultra Digestible Mesh',
    inStock: true
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-88901',
    items: [
      {
        id: 'pearl-grain-1',
        product: MILLETS_DATABASE[0],
        quantity: 2,
        size: 1,
        price: 180
      },
      {
        id: 'finger-flour-2',
        product: MILLETS_DATABASE[1],
        quantity: 1,
        size: 2,
        price: 320
      }
    ],
    total: 680,
    shippingDetails: {
      signatory: 'Alexander Vance',
      company: 'Vanguard Foods Group',
      email: 'a.vance@vanguardfoods.com',
      phone: '+1 (555) 234-8902',
      address: 'Suite 400, 500 Enterprise Parkway',
      pincode: '600001',
      timeline: 'Standard Delivery'
    },
    status: 'Logged',
    createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    accountExecutive: 'Siddharth R.',
    trackingNotes: 'Order logged. Packaging lines initialized under optical monitoring.'
  },
  {
    id: 'ORD-88742',
    items: [
      {
        id: 'foxtail-grain-0.5',
        product: MILLETS_DATABASE[2],
        quantity: 4,
        size: 0.5,
        price: 105
      }
    ],
    total: 420,
    shippingDetails: {
      signatory: 'Elisa Moreno',
      company: 'NaturaCéleste S.A.',
      email: 'e.moreno@naturaceleste.fr',
      phone: '+33 1 42 68 53 00',
      address: '12 Rue de la Paix, Paris',
      pincode: '750002',
      timeline: 'Express Air Cargo'
    },
    status: 'Processing',
    createdAt: new Date(Date.now() - 19.2 * 60 * 60 * 1000).toISOString(),
    accountExecutive: 'Priya Narayanan',
    trackingNotes: 'Optical cleanliness verified. Pre-assigned to temperature-controlled air freight.'
  }
];

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('landing'); // 'landing', 'shop', 'checkout', 'portal', 'admin'
  const [activeMobileTab, setActiveMobileTab] = useState('home'); // 'home', 'catalog', 'portal', 'admin'
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cumbum_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cumbum_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cumbum_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cumbum_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync mobile tabs
  useEffect(() => {
    const tabMap = {
      'home': 'landing',
      'catalog': 'shop',
      'portal': 'portal',
      'admin': 'admin'
    };
    setActivePage(tabMap[activeMobileTab]);
  }, [activeMobileTab]);

  const addToCart = (product, quantity = 1, size = 1) => {
    triggerHaptic(20);
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += quantity;
        return nextCart;
      }

      const itemPrice = Math.round(product.pricePerKg * size);
      const cartItemId = `${product.id}-${size}-${Date.now()}`;
      return [...prev, { id: cartItemId, product, quantity, size, price: itemPrice }];
    });
    setIsCartOpen(true); // Auto-open cart for premium shopping experience feedback!
  };

  const removeFromCart = (cartItemId) => {
    triggerHaptic(15);
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    triggerHaptic(10);
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const submitCheckout = (shippingDetails) => {
    triggerHaptic(30);
    const newId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: newId,
      items: [...cart],
      total: subtotal,
      shippingDetails,
      status: 'Logged',
      createdAt: new Date().toISOString(),
      accountExecutive: 'Siddharth R.',
      trackingNotes: 'Secure payment cleared. Packaging lines packaging your heritage millet grains.'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (id, newStatus, extraData = {}) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === id
          ? {
              ...ord,
              status: newStatus,
              ...extraData,
            }
          : ord
      )
    );
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  const triggerHaptic = (ms = 15) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(ms);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        activeMobileTab,
        setActiveMobileTab,
        products: MILLETS_DATABASE,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        submitCheckout,
        updateOrderStatus,
        deleteOrder,
        isCartOpen,
        setIsCartOpen,
        isDetailsOpen,
        setIsDetailsOpen,
        activeProduct,
        setActiveProduct,
        lastCompletedOrder,
        setLastCompletedOrder,
        triggerHaptic
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
