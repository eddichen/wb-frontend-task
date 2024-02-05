const ProductSearch = ({ searchInput, handleSearch }) => {
  return (
    <div className="form-field">
      <label htmlFor="search">Search Products</label>
      <input
        type="text"
        name="search"
        id="search"
        value={searchInput}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default ProductSearch;
