const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');

async function addCategory() {
    const categoryQuery = `select category_id, category_name from categories where is_active = true order by display_order`
    const { rows: categories } = await pool.query(categoryQuery);
    // console.log(categories);
    categories.map(async (res) => {
        const exists = await redis.exists(`category:${res.category_id}`);
        if(!exists){
            await redis.hset(
                `category:${res.category_id}`,
                'name', res.category_name,
            ); 
            await redis.sadd('categories:all', res.category_id);
            // console.log("Pushed");
        }
    })
    // console.log("already Pushed");
}


addCategory();