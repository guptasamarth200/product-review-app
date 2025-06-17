const User = require('./User');
const Product = require('./Product');
const Review = require('./Review');

// Define associations
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Product,
  Review
}; 