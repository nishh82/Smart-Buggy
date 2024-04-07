import React, {createContext, useState} from 'react';
import {Product} from './cartItem';

const products = [
  {
    id: 0,
    name: 'Multi Grain Cheerios',
    price: 4.97,
    image:
      'https://i5.walmartimages.com/asr/5bc156af-5398-4836-90b7-07fa5b8534cb.8b95daaf68d1d9688b330ba6770593d7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Cereals',
    tags: ['grain', 'breakfast'],
    location: '580412',
  },
  {
    id: 1,
    name: "Nescafe Taster's Choice",
    price: 10,
    image:
      'https://www.madewithnestle.ca/sites/default/files/tasters_choice_classic_250g.png',
    quantity: 1,
    category: 'Coffee',
    tags: ['coffee', 'beverage'],
    location: '580411',
  },
  {
    id: 2,
    name: 'Hans Dahi',
    price: 3.49,
    image:
      'https://hansdairy.com/wp-content/uploads/2018/03/hd-product-dahi-32-1.jpg',
    quantity: 1,
    category: 'Dairy',
    tags: ['yogurt', 'dairy'],
    location: '579498',
  },
  {
    id: 3,
    name: 'Lyzol Toilet',
    price: 10,
    image:
      'https://i5.walmartimages.ca/images/Enlarge/751/116/6000196751116.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Cleaning Supplies',
    tags: ['cleaning', 'household'],
    location: '579463',
  },
  {
    id: 4,
    name: 'Lysol Lingettes',
    price: 3.97,
    image:
      'https://i5.walmartimages.ca/images/Enlarge/902/243/6000198902243.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Cleaning Supplies',
    tags: ['cleaning', 'household'],
    location: '579463',
  },
  {
    id: 5,
    name: 'Mini wheats',
    price: 6,
    image:
      'https://i5.walmartimages.com/asr/e24af565-c428-4b3a-aef3-aa8e3cb259ff.4398fa1e3c3dcedd67a497bb51c4a5ac.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    ccategory: 'Cereals',
    tags: ['grain', 'breakfast'],
    location: '579465',
  },
  {
    id: 6,
    name: 'Nutella',
    price: 4.97,
    image:
      'https://i5.walmartimages.com/asr/9c4c3e64-dd6b-4928-b5ba-847d949572c2.02175f3edc155a8ce2afa5f54ab6b6d7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Spreads',
    tags: ['chocolate', 'spread'],
    location: '579465',
  },
  {
    id: 7,
    name: 'Breyers',
    price: 3.97,
    image:
      'https://i5.walmartimages.com/asr/508f81bf-aae5-4833-b7ab-57fcbe76be54.5e5b18a26b7fb9abd3eb653f8dfd534b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Ice Cream',
    tags: ['dessert', 'ice cream'],
    location: '579498',
  },
  {
    id: 8,
    name: 'Tide',
    price: 12.99,
    image:
      'https://images.ctfassets.net/snqjgnra1eqk/7cHLQ2AK6FJnnwsidupcAB/b75b58295956a302f9ae1e289bf07466/Tide_how_to_do_laundry_min1200_20220915.png',
    quantity: 1,
    category: 'Cleaning Supplies',
    tags: ['cleaning', 'household'],
    location: '579463',
  },
  {
    id: 9,
    name: 'BournVita',
    price: 17,
    image:
      'https://res.cloudinary.com/dojz2miyn/image/upload/v1711773758/products/axm6smf5dqyybhjvehs1.jpg',
    quantity: 1,
    category: 'Health Drinks',
    tags: ['health', 'drink'],
    location: '579498',
  },
  {
    id: 10,
    name: 'Kirkland Soft & Chewy Bars',
    price: 22,
    image: 'https://i.ebayimg.com/images/g/UvgAAOSw3WhlwUny/s-l1200.jpg',
    quantity: 1,
    category: 'Health Snacks',
    tags: ['snack', 'health'],
    location: '579464',
  },
  {
    id: 11,
    name: 'Tropicana Orange Juice',
    price: 5.88,
    image:
      'https://i5.walmartimages.com/asr/de0f8cb0-054d-4d64-95bd-58dff9d93f00.3ae31c90fdb57d0221affa20a990e8c6.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Beverages',
    tags: ['juice', 'drink'],
    location: '579465',
  },
  {
    id: 12,
    name: 'Colgate Optic White Toothpaste',
    price: 1.97,
    image:
      'https://i5.walmartimages.ca/images/Enlarge/340/278/6000205340278.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Personal Care',
    tags: ['dental', 'hygiene'],
    location: '579465',
  },
  {
    id: 13,
    name: 'Gala Apples',
    price: 0.99,
    image:
      'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Produce',
    tags: ['fruit', 'fresh'],
    location: '579500',
  },
  {
    id: 14,
    name: 'Dove Sensitive Skin Beauty Bar',
    price: 6.97,
    image:
      'https://i5.walmartimages.ca/images/Enlarge/900/686/6000200900686.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Personal Care',
    tags: ['soap', 'skincare'],
    location: '579500',
  },
  {
    id: 15,
    name: 'Charmin Ultra Soft Toilet Paper',
    price: 24.97,
    image:
      'https://i5.walmartimages.ca/images/Enlarge/176/093/6000207176093.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    quantity: 1,
    category: 'Household Supplies',
    tags: ['paper', 'bathroom'],
    location: '579463',
  },
];

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const removeItem = (id: number) => {
    setCartItems(prev => {
      const newCartItems = [...prev];
      return newCartItems.filter(item => item.id !== id);
    });
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const newCartItems = [...prev];
      const idx = newCartItems.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        newCartItems[idx].quantity = newCartItems[idx].quantity + 1;
      } else {
        newCartItems.push(product);
      }
      return newCartItems;
    });
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{cartItems, addToCart, emptyCart, removeItem, products}}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
