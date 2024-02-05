import { formatNumber } from "../helpers/formatNumber";

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{formatNumber(product.revenue)}</td>
    </tr>
  );
};

export default ProductRow;
