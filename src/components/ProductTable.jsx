import { formatNumber } from "../helpers/formatNumber";
import ProductRow from "./ProductRow";

const getTotal = (items) => {
  let total = 0;

  if (!items) return total;

  for (const item of items) {
    total += item.revenue;
  }

  return formatNumber(total);
};

const ProductTable = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow product={product} key={product.name} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{getTotal(products)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ProductTable;
