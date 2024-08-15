import axios from "axios";
import Head from "next/head";
import { notFound } from "next/navigation";

const getProduct = async (id) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
};

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound(); // Show 404 page if product not found
    return null;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta
          property="og:url"
          content={`https://products.oonzoo.com/product/${product.id}`}
        />
        <meta property="og:type" content="product" />
      </Head>
      <div>
        <h1>{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "300px", height: "auto" }}
        />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
      </div>
    </>
  );
}
