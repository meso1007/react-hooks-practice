import React, { useEffect } from 'react'

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = React.useState(() => {
    const jsonValue = window.localStorage.getItem(key);
    if(jsonValue !== null) return JSON.parse(jsonValue); //json->value
    return defaultValue;
  });

  useEffect(()=> {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue];
}

export default useLocalStorage
