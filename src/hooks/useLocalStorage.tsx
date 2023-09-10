import { useState } from "react";

const createLocalStorage = (store: string, value: string) => {
	localStorage.setItem(store, JSON.stringify(value));
};

const initialLocalStorage = (store: string, value: string) => {
	if (localStorage.getItem(store) == null) {
		createLocalStorage(store, value);
		return value;
	}
	try {
		const item = window.localStorage.getItem(store);
		return item ? JSON.parse(item) : value;
	} catch (error) {
		console.log(error);
		return value;
	}
};

const useLocalStorage = (store: string, value: string) => {
	const [storageValue, setStorageValue] = useState(() =>
		initialLocalStorage(store, value)
	);

	const setStorage = (value: unknown) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storageValue) : value;
			setStorageValue(valueToStore);

			localStorage.setItem(store, JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	};

	return [storageValue, setStorage];
};

export default useLocalStorage;
