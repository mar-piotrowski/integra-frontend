export interface Location {
	street: string;
	houseNo: string;
	apartmentNo: string;
	postalCode: string;
	city: string;
	country: string;
	commune: string;
	district: string;
	province: string;
	isPrivate: boolean;
	isCompany: boolean;
}

export interface Bank {
	name: string;
	number: number;
}
