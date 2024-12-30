const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');


export default async function getProducts(req, res) {
    const subCategoryId = 'd0e6c978-e5ee-49a7-8b8e-577af537ae57';
    const productIds = await redis.smembers(`subcategory:${subCategoryId}:products`);
    const productDetails = [];
    for (const productId of productIds) {
      const productData = await redis.hgetall(`product:${productId}`);
      if (productData) {
        productDetails.push(productData);
      }
    }
    res.status(200).json(productDetails);
}
