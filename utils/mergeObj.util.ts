/**
 * 
 * @param obj1 
 * @param obj2 
 * @returns 
 */

export function mergeObjects(obj1: any, obj2: any) {
  const merged = { ...obj1, ...obj2 };
  Object.keys(merged).forEach((key) => {
    if (
      merged[key] === null ||
      merged[key] === undefined ||
      merged[key] === ""
    ) {
      delete merged[key];
    }
  });
  return merged;
}
