import axios from "axios";
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
    <div>
      <h1>Search Results for "{query}"</h1>
      <div>
        {products.length ? (
          products.map((product) => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100px", height: "auto" }}
              />
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  searchParams: PropTypes.any,
};
