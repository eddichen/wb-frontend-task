const calculateRevenue = (unitPrice, sold) => {
  return unitPrice * sold;
};

const sortAlphabetically = (products) => {
  return products.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};

const fetchBranches = async () => {
  const branches = [
    fetch("/api/branch1.json"),
    fetch("/api/branch2.json"),
    fetch("/api/branch3.json"),
  ];

  try {
    const response = await Promise.all(branches);
    const allBranches = await Promise.all(
      response.map((branch) => branch.json()),
    );

    return allBranches;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProducts = async () => {
  const allBranches = await fetchBranches();

  let products = [];

  for (let branch of allBranches) {
    for (let product of branch.products) {
      const productIndex = products.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        const currentProductRevenue = calculateRevenue(
          product.unitPrice,
          product.sold,
        );
        const existingRevenue = products[productIndex].revenue;
        products[productIndex].revenue =
          existingRevenue + currentProductRevenue;
      } else {
        products.push({
          id: product.id,
          name: product.name,
          revenue: calculateRevenue(product.unitPrice, product.sold),
        });
      }
    }
  }

  return sortAlphabetically(products);
};
