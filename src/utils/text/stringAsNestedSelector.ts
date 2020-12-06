const getNestedObject = <T>(nestedObj: T, pathArr: string[]): T => {
  return pathArr.reduce(
    (obj: any, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

/**
 *
 * @param object The object which is to be selected from
 * @param selector A string such as 'errors[0].type', this will be converted as if you had written errors[0].type in code. This allows for dynamic selection of nested objects at runtime
 */
export const stringAsNestedSelector = <T>(object: T, selector: string): T => {
  const nest = selector.replace(']', '').replace('[', '.').split('.');
  return getNestedObject(object, nest);
};
