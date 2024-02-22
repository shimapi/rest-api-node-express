import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-10';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const API_ADMIN_ACCESS_TOKEN = process.env.API_ADMIN_ACCESS_TOKEN;
const API_HOSTNAME = process.env.API_HOSTNAME;
const API_CUSTOM_APP_SESSION = process.env.API_CUSTOM_APP_SESSION;

const shopify = shopifyApi({
  apiKey: API_KEY,
  apiSecretKey: API_SECRET,
  adminApiAccessToken: API_ADMIN_ACCESS_TOKEN,
  apiVersion: LATEST_API_VERSION,
  scopes: ['read_products', 'read_online_store_pages', 'read_product_listings', 'read_product_feeds'],
  hostName: API_HOSTNAME, // negrok url
  isEmbeddedApp: false,
  isCustomStoreApp: true,
  restResources,
});

const session = shopify.session.customAppSession(API_CUSTOM_APP_SESSION)
const client = new shopify.clients.Rest({ session });

export const getProduct = async () => {
  const data = await client.get({
    path: 'products/9057143062821',
  });
  console.log('data', data.body.product.title); // obtengo titulo del producto
  return data;
}

export const getProducts = async () => {
  const data = await client.get({
    path: 'products',
  });
  console.log('data', data.body.products); // obtengo productos
  return data;
}

export const getCollection = async () => {
  const data = await client.get({
    path: 'collections/470605005093',
  });
  console.log('data', data.body.collections); // obtengo colecciones
  return data;
}

export const getPages = async () => {
  const pages = await client.get({
    path: 'pages',
  });
  console.log('pages', pages); // obtengo paginas
  return pages;
}