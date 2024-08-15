import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PropTypes from "prop-types";

const fetchProducts = async (query) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
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

  return (
    <div className="p-6 flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold flex gap-4 items-center">
        <Link
          href="/"
          className="bg-purple-800 py-2 px-8 flex rounded-md text-white font-semibold"
        >
          Back
        </Link>
        Search Results for "{query}"
      </h1>
      <div className="flex">
        {products.length ? (
          products.map((product) => (
            <div className="w-1/3 p-4" key={product.id}>
              <div className="p-4 shadow-lg rounded-lg">
                <div className=" bg-slate-100 rounded-md p-8">
                  <span className="p-6 relative h-64 flex">
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
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
  );
}

SearchPage.propTypes = {
  searchParams: PropTypes.any,
};
