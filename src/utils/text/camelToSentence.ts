/**
 * Turn `camelCase` strings into `Sentence Case` strings
 * @param string
 */
export const camel2Sentence = (string: string) =>
  string.charAt(0).toUpperCase() +
  string
    .substr(1)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z])([0-9])/gi, '$1 $2')
    .replace(/([0-9])([a-z])/gi, '$1 $2');
