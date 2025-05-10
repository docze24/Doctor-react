export const setCookie = (name, value, days) => {
    const expires = days
      ? `; expires=${new Date(Date.now() + days * 86400000).toUTCString()}`
      : '';
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
  };

 export const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

 export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };