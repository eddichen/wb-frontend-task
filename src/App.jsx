import { useEffect, useState } from "react";
import { getProducts } from "./api/getProducts";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

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

  return (
    <>
      {!isLoading && !isError && (
        <div className="product-list">
          <label>Search Products</label>
          <input type="text" />

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{formatNumber(product.revenue)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>{getTotal(filteredProducts)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      {!isLoading && isError && <ErrorMessage />}
      {isLoading && <Loading />}
    </>
  );
}

export default App;
