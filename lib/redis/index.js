const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');

async function addCategory() {
    const categoryQuery = `select category_id, category_name from categories where is_active = true order by display_order`
    const { rows: categories } = await pool.query(categoryQuery);
    
    categories.map(async (cat) => {
        invalidateAllCaches();
        const exists = await redis.exists(`category:${cat.category_id}`);
        if(!exists){
            await redis.hset(
                `category:${cat.category_id}`,
                'name', cat.category_name,
            ); 
            await redis.sadd('categories:all', cat.category_id);
        }   

        // Subcategory
        const subcategoryQuery = `select sub_category_id, sub_category_name from sub_categories where category_id=$1 and is_active = true`
        const { rows: subcategories } = await pool.query(subcategoryQuery, [cat.category_id]);
        subcategories.map(async (subcat) => {
            // await redis.hset(
            //     `subcategory:${subcat.sub_category_id}`,
            //     'name', subcat.sub_category_name,
            // );
            await redis.sadd('subcategories:all', subcat.sub_category_id);

            // Products
            const productsQuery = `select product_id, product_name, brand_name, description, base_price, discounted_price, 
            weight, image_data, additional_attributes from products where sub_category_id=$1 `
            const { rows: products } = await pool.query(productsQuery, [subcat.sub_category_id]);

            const productUids = [];
    
            products.map(async (prod) => {
                const uid = prod.product_id.toString();
                productUids.push(uid);

                await redis.hset(
                    `product:${prod.product_id}`,
                    {
                        id: prod.product_id.toString(),
                        name: prod.product_name,
                        image_url: prod.image_data?.primary_image || '',
                        secondary_images: JSON.stringify(prod.image_data?.secondary_images || []),
                        price: prod.base_price.toString(),
                        discounted_price: prod.discounted_price?.toString() || '',
                        weight: prod.weight?.toString() || '',
                        subcategory_id: subcat.sub_category_id.toString(),
                        company: prod.brand_name || '',
                        additional_attributes: JSON.stringify(prod.additional_attributes || {})
                    }
                )

                await redis.hset(
                    `subcategory:${subcat.sub_category_id}`,
                    {
                      name: subcat.sub_category_name,
                      category_id: cat.category_id.toString(),
                      products: productUids.join(',')
                    }
                  );

                  if (productUids.length > 0) {
                    await redis.sadd(
                      `subcategory:${subcat.sub_category_id}:products`, 
                      ...productUids
                    );
                  }
                
                // Sort by company name
                await redis.sadd(
                    `company:${prod.brand_name.toLowerCase()}:products`, 
                    prod.product_id
                );

                // Store_Inventory
                const storeInventoryQuery = `select store_id, product_id, current_quantity, minimum_threshold, maximum_capacity, last_updated from store_inventory`
                const { rows: inventory } = await pool.query(storeInventoryQuery);

                inventory.map(async (item) => {
                    await redis.hset(
                        `store:${item.store_id}:inventory:${prod.product_id}`,
                        {
                          current_quantity: item.current_quantity.toString(),
                          minimum_threshold: item.minimum_threshold.toString(),
                          maximum_capacity: item.maximum_capacity.toString(),
                          last_updated: item.last_updated.toISOString()
                        }
                      );
                })
            })
        })
    })
}

async function addCategoriesAndSubcategories() {
    const joinTableQuery = `SELECT c.category_id, c.category_name, s.sub_category_id, s.sub_category_name, s.display_order
    FROM categories c
    LEFT JOIN sub_categories s ON c.category_id = s.category_id`;
    const { rows } = await pool.query(joinTableQuery);
    
    for(const row of rows){
        if (row.sub_category_id) {
            // Store in sorted set for easy retrieval
            await redis.zadd(
                `category-sub:${row.category_id}:subcategories`,
                row.display_order, // score
                JSON.stringify({
                    id: row.sub_category_id,
                    name: row.sub_category_name
                })
            );
        }
    }
}

async function getSubcategoriesByCategoryId(categoryId) {
    try {
        const subcategories = await redis.zrange(
            `category-sub:${categoryId}:subcategories`,
            0,
            -1
          );
        
        console.log(subcategories);
        return subcategories.map(sub => JSON.parse(sub));
    } catch (err) {
        console.log("error fetching sub-cat from cat", err);
    }
}

async function getProducts(req, res) {
    const subCategoryId = 'd0e6c978-e5ee-49a7-8b8e-577af537ae57';
    const productIds = await redis.smembers(`subcategory:${subCategoryId}:products`);
    const productDetails = [];
    for (const productId of productIds) {
      const productData = await redis.hgetall(`product:${productId}`);
      if (productData) {
        productDetails.push(productData);
      }
    }
    console.log(productDetails);
    // res.status(200).json(productDetails);
}

async function invalidateAllCaches() {
    const pipeline = redis.pipeline();
    pipeline.del('cached:categories');
    pipeline.del('cached:subcategories');
    pipeline.del('cached:products');
    await pipeline.exec();
}

// addCategoriesAndSubcategories();
// getSubcategoriesByCategoryId('96066f86-9f17-4179-bb03-0708e72a7215');
addCategory();
// getProducts();