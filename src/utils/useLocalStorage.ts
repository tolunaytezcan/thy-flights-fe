export const useLocalStorage = (key: string, initialValue: string) => {
	const storedValue = localStorage.getItem(key);
	if (storedValue) {
		return JSON.parse(storedValue);
	}
	localStorage.setItem(key, JSON.stringify(initialValue));
	return initialValue;
};
