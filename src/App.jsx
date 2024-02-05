import { useEffect, useState } from "react";
import { getProducts } from "./api/getProducts";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import ProductSearch from "./components/ProductSearch";
import ProductTable from "./components/ProductTable";

const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

const getTotal = (items) => {
  let total = 0;

  if (!items) return total;

  for (const item of items) {
    total += item.revenue;
  }

  return formatNumber(total);
};

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
        setFilteredProducts(products);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        console.error("There was a problem fetching products", e);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    const filteredProducts = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchValue);
    });
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      {!isLoading && !isError && (
        <div className="product-list">
          <ProductSearch
            handleSearch={handleSearch}
            searchInput={searchInput}
          />
          <ProductTable products={filteredProducts} />
        </div>
      )}
      {!isLoading && isError && <ErrorMessage />}
      {isLoading && <Loading />}
    </>
  );
}

export default App;
