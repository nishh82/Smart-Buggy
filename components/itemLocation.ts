export interface Product {
  id: number;
  name: string;
  description: string;
  location: string;
}
// Sample product data
export const products: Product[] = [
  {
    id: 1,
    name: 'Milk',
    description:
      'Milk is Located in the Dairy Section next to the the bakery section. ',
    location: 's_b1d4443e25d146c5',
  },
  {
    id: 2,
    name: 'Bread',
    description:
      'Bread is located in the Bakery section just across the Aisle 1 and left to the Furniture section',
    location: 's_ed5d54671f43eb4c',
  },
  {
    id: 3,
    name: 'Butter',
    description:
      'Butter is Located in the Dairy Section next to the the bakery section.',
    location: 's_ed5d54671f43eb4c',
  },
  {
    id: 4,
    name: 'Eggs',
    description:
      'Eggs is Located in the Dairy Section next to the the bakery section. ',
    location: 's_b1d4443e25d146c5',
  },
  {
    id: 5,
    name: 'Flour',
    description:
      'Flour is Located in the Health Foods Section next to the the bakery section. ',
    location: 's_b1d4443e25d146c5',
  },
  {
    id: 6,
    name: 'Salt',
    description:
      'Salt is Located in the Spices & Seasonings Section next to the the bakery section. ',
    location: 's_b1d4443e25d146c5',
  },
  {
    id: 7,
    name: 'Sugar',
    description:
      'Sugar is Located in the Spices & Seasonings Section next to the the bakery section. ',
    location: 's_b1d4443e25d146c5',
  },
  {
    id: 8,
    name: 'Butter',
    description:
      'Butter is Located in the Dairy Section next to the the bakery section. ',
    location: 's_b1d4443e25d146c5',
  },
  // Add more products as needed
];
