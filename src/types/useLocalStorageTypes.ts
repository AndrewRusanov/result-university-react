export type LocalStorageSetValue = string;
export type LocalStorageReturnValue = LocalStorageSetValue | null;

export type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  }
];
