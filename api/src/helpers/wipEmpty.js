export const removeEmptyStringElements = (obj) => {
  for (var prop in obj) {
    if (typeof obj[prop] === 'object') {// dive deeper in
      removeEmptyStringElements(obj[prop]);
    } else if(obj[prop] === '') {// delete elements that are empty strings
      delete obj[prop];
    }
  }
  return obj;
}