export const saveToLocalStorage = (key: string, value: unknown) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return {} as T;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return {} as T;
  }
};
