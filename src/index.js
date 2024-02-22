import express from 'express';
import dotenv from 'dotenv';
import { getProduct, getProducts, getPages, getCollection } from './services/shopify.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const product = await getProduct();
  console.log('product', product.title);
  return res.status(200).json(product);
});

app.get('/products', async (req, res) => {
  const products = await getProducts();
  console.log('products', products);
  return res.status(200).json(products);
});

app.get('/pages', async (req, res) => {
  const pages = await getPages();
  console.log('pages', pages);
  return res.status(200).json(pages);
});

app.get('/collection', async (req, res) => {
  const collections = await getCollection();
  console.log('collections', collections);
  return res.status(200).json(collections);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});