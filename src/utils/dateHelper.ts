import moment from 'moment-timezone';

export const toEuropeDateString = (date: string) => {
    const convertedTime = moment.tz(date, "Europe/Warsaw");
    const now = new Date(date);
    return convertedTime.add(now.getHours() - 4, "h").add(now.getMinutes(), "m").format();
}

export const toEuropeDate = (date: string) => {
    const convertedTime = moment.tz(date, "Europe/Warsaw");
    return new Date(convertedTime.format());
}


