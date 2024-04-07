export const productCountInitial = {
  0: {count: 0, sum: 0},
  1: {count: 0, sum: 0},
  2: {count: 0, sum: 0},
  3: {count: 0, sum: 0},
  4: {count: 0, sum: 0},
  5: {count: 0, sum: 0},
  6: {count: 0, sum: 0},
  7: {count: 0, sum: 0},
  8: {count: 0, sum: 0},
  9: {count: 0, sum: 0},
  10: {count: 0, sum: 0},
};

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

export const allCartItems: Product[] = [
  {
    id: 2354263,
    name: 'Nielson Milk',
    price: 6.89,
    quantity: 1,
    image: require('../assets/milk.png'),
  },
  {
    id: 3453423,
    name: 'Tropicana Juice',
    price: 2.49,
    quantity: 1,
    image: require('../assets/juice.png'),
  },
  {
    id: 5452674,
    name: 'Marble Cake',
    price: 14.99,
    quantity: 1,
    image: require('../assets/cake.png'),
  },
  {
    id: 5248651,
    name: 'Heinz Ketchup',
    price: 5.89,
    quantity: 1,
    image: require('../assets/ketchup.png'),
  },
  {
    id: 7541265,
    name: 'Dempster Bread',
    price: 8.99,
    quantity: 1,
    image: require('../assets/bread.png'),
  },
];
