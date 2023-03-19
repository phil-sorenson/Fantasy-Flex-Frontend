import React, {useState, useEffect} from "react";

export const useLocalStorage = (key, initialValue) => {
  
  const [value, setValue] = useState(()=>{
    try {
      const item = window.localStorage.getItem(key);
      // console.log('item', item)
      return item ? JSON.parse(item) : initialValue;
        // CodeLogic: Code return => if item is found, return item
    } catch (error) {
      // console.error(`Error reading Local Data for key ${key}` )
    } return initialValue
  });
  useEffect(()=>{
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      // console.log('useEffect key', key)
    } catch (error) {
      console.error(`Error setting local storage for key ${key}`)
    }
  }, [key, value]);
  return [value, setValue];
}