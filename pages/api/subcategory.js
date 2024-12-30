const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');


export default async function getSubCategory(req, res) {
    const categoryId = '96066f86-9f17-4179-bb03-0708e72a7215';
    try {
        const subcategories = await redis.zrange(
            `category-sub:${categoryId}:subcategories`,
            0,
            -1
          );
        
        // console.log(subcategories);
        const parsedSubcategories = subcategories.map(sub => JSON.parse(sub));
        res.status(200).json(parsedSubcategories);
    } catch (err) {
        console.log("error fetching sub-cat from cat", err);
    }
}
