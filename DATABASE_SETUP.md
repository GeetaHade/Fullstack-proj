# Database Setup Guide

This ecommerce application uses MongoDB to store product data. Follow these steps to set up your database:

## 1. MongoDB Setup

### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/ecommerce-nextjs`

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the cluster dashboard

## 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/ecommerce-nextjs

# For MongoDB Atlas (replace with your actual connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce-nextjs?retryWrites=true&w=majority
```

## 3. Seed the Database

Run the following command to populate the database with 50 products:

```bash
npm run seed
```

This will:
- Connect to your MongoDB database
- Clear any existing products
- Insert all 50 products from `app/product-data.ts`
- Display confirmation of the seeding process

## 4. Verify Setup

After seeding, you can verify the setup by:

1. Starting the development server: `npm run dev`
2. Visiting `http://localhost:3000` to see the homepage
3. Checking the products page at `http://localhost:3000/products`
4. Viewing individual product pages

## 5. API Endpoints

The application provides the following API endpoints:

- `GET /api/products` - Fetch all products
- `GET /api/products/[id]` - Fetch a specific product by ID
- `POST /api/seed` - Seed the database (alternative to npm script)
- `GET /api/seed` - Check database status

## 6. Troubleshooting

### Connection Issues
- Ensure MongoDB is running (for local setup)
- Check your connection string in `.env.local`
- Verify network connectivity (for Atlas)

### Seeding Issues
- Make sure the database is accessible
- Check that the `MONGODB_URI` environment variable is set
- Ensure you have write permissions to the database

### Product Images
- Product images use Picsum Photos for placeholder images
- Images are categorized based on product names
- The `next.config.mjs` file is configured to allow images from `picsum.photos`

## 7. Database Schema

Products are stored with the following structure:

```typescript
interface Product {
  _id?: string;        // MongoDB ObjectId
  id: string;          // Product ID (string)
  imageUrl: string;    // Product image URL
  name: string;        // Product name
  description: string; // Product description
  price: number;       // Product price
}
```

## 8. Development Workflow

1. Set up MongoDB and environment variables
2. Seed the database: `npm run seed`
3. Start development server: `npm run dev`
4. Make changes to product data in `app/product-data.ts`
5. Re-seed the database when needed: `npm run seed`

The application will automatically fetch products from the database and display them with proper loading states and error handling. 