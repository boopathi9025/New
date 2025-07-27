export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Seeds' | 'Tools' | 'Fertilizers' | 'Produce';
  sellerId: string;
  stock: number;
  dataAiHint: string;
}

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Organic Heirloom Tomatoes',
    description: 'Juicy, non-GMO heirloom tomatoes grown with organic farming methods. Perfect for salads, sauces, and sandwiches.',
    price: 4.99,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'fresh tomatoes',
    category: 'Produce',
    sellerId: 'seller_a',
    stock: 150,
  },
  {
    id: 'prod_002',
    name: 'Carrot Seeds "Nantes"',
    description: 'High-yield carrot seeds that produce sweet, crisp, and coreless carrots. Ideal for home gardens and market farming.',
    price: 2.49,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'carrot seeds',
    category: 'Seeds',
    sellerId: 'seller_b',
    stock: 500,
  },
  {
    id: 'prod_003',
    name: 'Heavy-Duty Garden Hoe',
    description: 'A durable garden hoe with a sharp steel blade and a comfortable hardwood handle. Built to last for years of tough weeding and soil preparation.',
    price: 29.99,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'gardening tool',
    category: 'Tools',
    sellerId: 'seller_a',
    stock: 75,
  },
  {
    id: 'prod_004',
    name: 'All-Purpose Plant Fertilizer',
    description: 'A balanced, slow-release fertilizer that promotes healthy growth for a wide variety of plants, from vegetables to flowers.',
    price: 15.75,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'plant fertilizer',
    category: 'Fertilizers',
    sellerId: 'seller_b',
    stock: 200,
  },
  {
    id: 'prod_005',
    name: 'Fresh Kale Bunch',
    description: 'A vibrant bunch of fresh, leafy green kale. Rich in vitamins and perfect for smoothies, salads, and cooking.',
    price: 3.50,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'fresh kale',
    category: 'Produce',
    sellerId: 'seller_a',
    stock: 120,
  },
  {
    id: 'prod_006',
    name: 'Wildflower Seed Mix',
    description: 'A beautiful mix of wildflower seeds to attract pollinators like bees and butterflies to your garden.',
    price: 7.99,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'flower seeds',
    category: 'Seeds',
    sellerId: 'seller_b',
    stock: 300,
  },
  {
    id: 'prod_007',
    name: 'Ergonomic Hand Trowel',
    description: 'A comfortable and sturdy hand trowel for all your planting and potting needs. Features a non-slip grip.',
    price: 12.50,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'gardening trowel',
    category: 'Tools',
    sellerId: 'seller_a',
    stock: 150,
  },
  {
    id: 'prod_008',
    name: 'Organic Compost Bag',
    description: 'Nutrient-rich organic compost to improve your garden soil structure and fertility. 10 lbs bag.',
    price: 9.99,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'compost bag',
    category: 'Fertilizers',
    sellerId: 'seller_b',
    stock: 180,
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
}

export const users: User[] = [
  { id: 'user_1', name: 'Alice Buyer', email: 'alice@example.com', role: 'buyer' },
  { id: 'seller_a', name: 'Bob Farmer', email: 'bob@example.com', role: 'seller' },
  { id: 'seller_b', name: 'Charlie Green', email: 'charlie@example.com', role: 'seller' },
];

export interface Order {
  id: string;
  userId: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export const orders: Order[] = [
    {
        id: 'order_101',
        userId: 'user_1',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        total: 34.98,
        status: 'Delivered',
        items: [
            {
                productId: 'prod_003',
                productName: 'Heavy-Duty Garden Hoe',
                quantity: 1,
                price: 29.99
            },
            {
                productId: 'prod_001',
                productName: 'Organic Heirloom Tomatoes',
                quantity: 1,
                price: 4.99
            }
        ]
    },
    {
        id: 'order_102',
        userId: 'user_1',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        total: 18.24,
        status: 'Delivered',
        items: [
            {
                productId: 'prod_004',
                productName: 'All-Purpose Plant Fertilizer',
                quantity: 1,
                price: 15.75
            },
            {
                productId: 'prod_002',
                productName: 'Carrot Seeds "Nantes"',
                quantity: 1,
                price: 2.49
            }
        ]
    },
];

export const getProductById = (id: string) => products.find(p => p.id === id);
