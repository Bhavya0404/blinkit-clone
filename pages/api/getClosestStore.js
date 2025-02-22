const pool = require('@/app/database/postgres')

export default async function findNearestDarkStore(req, res) {
    // if (req.method === 'POST') {
        const {lat,lng} = req.body;
        const query = `-- Define the user's location and create a hexagon around it
        WITH user_location AS (
            SELECT ST_SetSRID(ST_MakePoint($1, $2), 4326) AS location
        ),
        hexagon AS (
            SELECT 
                ST_Transform(
                    ST_SetSRID(
                        ST_Buffer(
                            ST_Transform((SELECT location FROM user_location), 3857),
                            3000, -- 3 km buffer distance for hexagon sides
                            'quad_segs=6' -- Creates a hexagon shape
                        ),
                        3857
                    ),
                    4326
                ) AS hexagon
        )
        -- Retrieve stores within the hexagon and find the nearest one
        SELECT 
            s.store_id,
            s.latitude,
            s.longitude,
            ST_Distance(u.location::geography, s.location::geography) AS distance_in_meters
        FROM 
            stores s,
            user_location u,
            hexagon h
        WHERE 
            s.location::geometry && h.hexagon -- Bounding box check for efficiency
            AND ST_Contains(h.hexagon, s.location::geometry) -- Ensures store is inside hexagon
        ORDER BY 
            distance_in_meters ASC
        LIMIT 1`
        
        const result =  await pool.query(query, [lng, lat]);
        res.status(200).json(result.rows[0]);
    // }
    
}
