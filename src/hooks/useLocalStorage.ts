import { useState } from "react";
import type {
  LocalStorageReturnValue,
  LocalStorageSetValue,
  UseLocalStorage,
} from "../types/useLocalStorageTypes";

function getValueStorage(key: string): LocalStorageReturnValue {
  const savedValue = localStorage.getItem(key);
  if (!savedValue) {
    return null;
  }

  return savedValue;
}

const useLocalStorage: UseLocalStorage = (key) => {
  const [value, setValue] = useState<LocalStorageReturnValue>(() =>
    getValueStorage(key)
  );

  const setItem = (value: LocalStorageSetValue) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return [value, { setItem, removeItem }];
};

export { useLocalStorage };
