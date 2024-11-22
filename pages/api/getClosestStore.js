const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: process.env.NEXT_PUBLIC_AIVEN_PASS,
    host: "pg-12bafbcc-blinkit-clone.i.aivencloud.com",
    port: 27239,
    database: "dark_stores",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
};

export default async function findNearestDarkStore(req, res) {
    // if (req.method === 'POST') {
        const {lat,lng} = req.body;
        console.log("HI",lat, lng);
        const client = new pg.Client(config);
        await client.connect((err) => {
            if (err)
                throw err;
        
            client.query("SELECT VERSION()", [], (err, result) => {
                if (err)
                    throw err;
        
                // console.log(result.rows[0].version);
                client.end( (err) => {
                    if (err)
                        throw err;
                });
            });
        });
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
            s.store_name,
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
        
        const result =  await client.query(query, [lng, lat]);
        console.log('Rows in dark_store', result);
        res.status(200).json(result.rows[0]);
    // }
    
}
