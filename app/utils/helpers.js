export function sortByProp(categories, prop) {
  return categories.sort((a, b) => {
    const propA = a[prop].toUpperCase();
    const propB = b[prop].toUpperCase();
    return (propA < propB) ? -1 : (propA > propB) ? 1 : 0;
  });
}
