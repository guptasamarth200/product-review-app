const { User, Product, Review } = require('./models');
const sequelize = require('./config/database');

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });

    // Create users
    const users = await User.bulkCreate([
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Bob Johnson', email: 'bob@example.com' }
    ]);

    // Create products
    const products = await Product.bulkCreate([
      {
        name: 'Smartphone X',
        description: 'Latest smartphone with advanced features and high-performance camera.',
        imageUrl: 'https://via.placeholder.com/400'
      },
      {
        name: 'Laptop Pro',
        description: 'Powerful laptop for professionals with long battery life.',
        imageUrl: 'https://via.placeholder.com/400'
      },
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with exceptional sound quality.',
        imageUrl: 'https://www.dell.com/en-us/shop/dell-laptops/scr/laptops'
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smart watch with health monitoring and long battery life.',
        imageUrl: 'https://via.placeholder.com/400'
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof speaker with immersive 360-degree sound and 20-hour battery life.',
        imageUrl: 'https://via.placeholder.com/400'
      }
    ]);

    // Create reviews
    await Review.bulkCreate([
      {
        userId: users[0].id,
        productId: products[0].id,
        rating: 5,
        review: 'Excellent phone! The camera quality is amazing and battery life is great.',
        tags: ['camera', 'battery', 'quality']
      },
      {
        userId: users[1].id,
        productId: products[0].id,
        rating: 4,
        review: 'Very good phone, but a bit expensive. The screen is beautiful though.',
        tags: ['screen', 'expensive', 'quality']
      },
      {
        userId: users[2].id,
        productId: products[1].id,
        rating: 5,
        review: 'Best laptop I have ever used. Perfect for work and gaming.',
        tags: ['performance', 'gaming', 'work']
      },
      {
        userId: users[0].id,
        productId: products[3].id,
        rating: 5,
        review: 'This smart watch exceeded my expectations! The health tracking features are accurate and the battery lasts for days.',
        tags: ['health', 'battery', 'design']
      },
      {
        userId: users[1].id,
        productId: products[3].id,
        rating: 4,
        review: 'Great smart watch with intuitive interface. The sleep tracking could be more accurate though.',
        tags: ['interface', 'tracking', 'sleep']
      },
      {
        userId: users[2].id,
        productId: products[4].id,
        rating: 5,
        review: 'Amazing sound quality for such a compact speaker! Its perfect for outdoor activities and the battery life is impressive.',
        tags: ['sound', 'portable', 'battery']

      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();