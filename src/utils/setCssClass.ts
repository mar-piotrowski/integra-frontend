export const setHtmlClass = (element: string, value: string) => {
	const html = document.querySelector(element);
	html?.classList.add(value);
};

export const removeHtmlClass = (element: string, value: string) => {
	const html = document.querySelector(element);
	html?.classList.remove(value);
};
