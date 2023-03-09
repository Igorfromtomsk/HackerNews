export const withRightPlural = (amount: number, str: string, postfix: string) => {
  if (amount <= 1) {
    return str;
  }

  return `${str}${postfix}`
}

export const isValidUrl = (url: string) => {
  const input = document.createElement('input');
  
  input.type = 'url';
  input.value = url;

  return input.checkValidity();
}