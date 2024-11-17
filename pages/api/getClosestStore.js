const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_1WMZMZHmHDNGP2vp_sB",
    host: "pg-12bafbcc-blinkit-clone.i.aivencloud.com",
    port: 27239,
    database: "dark_stores",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUKK9TH09Gygh1fHs/Rr4kneu+PKowDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvOWM1NjAyMTUtZDcwZi00N2NhLTlmZjgtMzE5MTNjMTRh
NDZlIFByb2plY3QgQ0EwHhcNMjQxMTEwMTYwMzA2WhcNMzQxMTA4MTYwMzA2WjA6
MTgwNgYDVQQDDC85YzU2MDIxNS1kNzBmLTQ3Y2EtOWZmOC0zMTkxM2MxNGE0NmUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAOpR/TMH
vu1j1zLcpmYGfoT9FSdmEwoaF/HuVOhO5vE5A31m0dJD5ScXfWA3NLvNwZFt96pc
6ybQ4QE7Nygj9gUYL7ju+BtMqLFpguLd2cVxBqCW16MH/y/43UlcGThPRv5HG9aI
d+ju5chMdvDxmJuPn1kQ9AliY1HRj79hmKpepMlDBPptawwWPpLwOPoXfErcQ+cR
zY4mJ/CsHrw1oj3KbsZes9vdZVgsg38hay2CBU6zNFHzBdpEYiCBoF0lmJpC0Dwi
EhHFyfTvgVUJ7I/BNjR6Wb7mgjR6hf/QVHSFekUeGZFZveFX7r7UKKfaxjbdO4LI
nfl4eWIkylPMjJm7RzsiC1ap6ns9yYuUUWk0zMimDHKyeib0ftDDQMULUpFJ8+5m
MqZ7MlMQ5znd5g2N5C7KKX3xUpaIK2N0LcB8n53oecJFcsql+nJoRBPnQeTD1tZ+
Wuk+ro0uknoZVT57PetFWfMXJlOIO2qwsMJ+4dJ8TWizRTIBvX7LoF0sEwIDAQAB
oz8wPTAdBgNVHQ4EFgQUTFPyPK2mbUjqI6xde+A+xknqdRcwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAEY/rbK0rxVt8Zd4
QxYXBIIkz8eIn2GnCBxL/A+5vD0+pzfEdT2XPsD5NgXPm5pUYUrD+8u2C8Mh4vyq
EhAkB1H2xn4reVM3ndzAe/gxu3fzJWAQucpu1XZC7gglVWoRc7kLPwLO2rT58mHx
ZkO/YLYF5Q5dhFH/iF9Y+0O1SbN9mzAhOH/7WLSoSCokWg20orqv0x6QGOzn/lbh
6hCWA/OgyJRRwRpn02w84kw7H158DfhyN3UKh2psdHUsy4pl5a/jXaOwrJ1aE8Dt
p93iuUdNTgku049X6Xhx8lqTj+ic7B5X22XMtWe8Pj3GljB4MkHfYo3NLCQbqEHR
OAyuVVgC/QG3TvRm2JZ3d6XeccEDlbERCKi6KfFdnW+BANqcc489FddP5WyqFQeg
oo9eEzGjl9cMPGWwHkoONJ4tzu/zrlEM3wy5aG7xujOxXv4GQhiJdxd9faNJY4H3
c4fY0ilQWOJTMgJA0NA8Y/s9ZL6LX8ULB2uuSzJrjMCr0VRPXQ==
-----END CERTIFICATE-----`,
    },
};
const query = `-- Define the user's location and create a hexagon around it
WITH user_location AS (
    SELECT ST_SetSRID(ST_MakePoint(77.0871, 28.6388), 4326) AS location
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
export default async function findNearestDarkStore(req, res) {
    if (req.method === 'POST') {
        const client = new pg.Client(config);
        await client.connect((err) => {
            if (err)
                throw err;
        
            client.query("SELECT VERSION()", [], (err, result) => {
                if (err)
                    throw err;
        
                console.log(result.rows[0].version);
                client.end( (err) => {
                    if (err)
                        throw err;
                });
            });
        });

        const result =  await client.query(query);
        console.log('Rows in dark_store', result.rows[0]);
        res.status(200).json(result.rows[0]);
    }
    
}
// findNearestDarkStore();
// export default findNearestDarkStore;