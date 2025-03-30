# Blinkit Clone

A fully functional clone of the Blinkit website, developed as a project to gain hands-on experience with various technologies.

## Tech Stack Used
- **Frontend**: HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, DaisyUI
- **Backend & Database**: PostgreSQL, Redis
- **State Management**: Redux
- **Tools Used**: Cursor, Claude, ChatGPT, Docke

## Why this Project?

This project was undertaken to:
- Gain a deeper understanding of real-time inventory management and geospatial queries
- Implement caching mechanisms for handling large-scale inventory efficiently
- Work with PostgreSQL and Redis to optimize performance
- Learn about store assignment based on geolocation

## Development Process

- **Prototype & Planning**: Documented the initial prototype and database schema in Notion.
- **Database Design**: Created normalized tables and integrated PostgreSQL with PostGIS for geospatial queries.
- **Caching Optimization**: Implemented Redis for frequently accessed inventory data.
- **Backend Implementation**: Built APIs for store assignment, cart management, and order processing.
- **Frontend Development**: Used Next.js with Tailwind CSS for a responsive UI.

## Challenges

### Database Structure & Choice
- **Primary Database**: PostgreSQL (with JSONB for semi-structured data)
- **Geospatial Queries**: PostGIS extension to store and query locations
- **Caching Layer**: Redis to improve query performance and reduce database load
- **Data Flow**: PostgreSQL acts as the source of truth, while Redis caches store inventory for faster access.

### Why PostgreSQL?
- Supports relational data modeling
- Ensures ACID compliance for transaction safety
- Scalability
- Provides JSONB support for flexible data storage
- Offers efficient indexing (e.g., on sub_category, brand_name for fast queries)

### Tables made
- user
- Categories
- Sub_categories
- Products
- stores
- orders

### Assigning the Nearest Store to a User
- Fetch the user's coordinates.
- Identify all stores within a 5km radius using PostGIS geospatial queries.
- among those stores the distance is calculated and the nearest one is assigned to the user. 

### Handling Vast Inventory Data Efficiently
- Directly querying PostgreSQL for each request was inefficient.
- Implemented a Redis caching layer for store inventories.
- Redis stores real-time inventory updates and uses TTL for cart items.
- Inventory updates occur on cart addition (with TTL expiration) and checkout.

## Demo Video

https://github.com/user-attachments/assets/4c8cf38d-3ec8-42d6-9a17-11e684f90238

