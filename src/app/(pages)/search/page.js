import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PropTypes from "prop-types";
import Head from "next/head";

const fetchProducts = async (query) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
};

export default async function SearchPage({ searchParams }) {
  const { query } = searchParams;
  const products = await fetchProducts(query || "");

  if (!products.length) {
    notFound();
    return null;
  }
  const firstProduct = products[0];

  return (
    <>
      <Head>
        <title>Search Results for "{query}"</title>
        <meta name="description" content={`Search results for "${query}"`} />

        
        <meta property="og:title" content={firstProduct.title} />
        <meta property="og:description" content={firstProduct.description} />
        <meta property="og:image" content={firstProduct.image} />
        <meta
          property="og:url"
          content={`https://yourwebsite.com/products/${firstProduct.id}`}
        />
        <meta property="og:type" content="product" /> 


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={firstProduct.title} />
        <meta name="twitter:description" content={firstProduct.description} />
        <meta name="twitter:image" content={firstProduct.image} />
        <meta
          name="twitter:url"
          content={`https://yourwebsite.com/products/${firstProduct.id}`}
        />
      </Head>

      <div className="p-6 flex flex-col items-center h-screen">
        <h1 className="text-xl font-semibold flex gap-4 items-center">
          <Link
            href="/"
            className="bg-purple-800 py-2 px-8 flex rounded-md text-white font-semibold"
          >
            Back
          </Link>
          Search Results for "{query}"
        </h1>
        <div className="flex flex-wrap justify-center">
          {products.length ? (
            products.map((product) => (
              <div className="w-full sm:w-1/2 md:w-1/3 p-4" key={product.id}>
                <div className="p-4 shadow-lg rounded-lg bg-white">
                  <div className="bg-slate-100 rounded-md p-4">
                    <span className="relative h-64 w-full flex">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </span>
                  </div>
                  <h2 className="text-lg font-medium my-3">{product.title}</h2>
                  <p>Price: ${product.price}</p>
                  <p>{product.description}</p>
                </div>
              </div>
            ))
          ) : (
            <>
              <p>No products found.</p>
              <Link
                href="/"
                className="bg-purple-800 py-2 px-8 flex rounded-md text-white font-semibold"
              >
                Go back to Home
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

SearchPage.propTypes = {
  searchParams: PropTypes.shape({
    query: PropTypes.string,
  }).isRequired,
};
