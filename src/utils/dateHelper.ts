import moment from 'moment-timezone';

export const toEuropeDateString = (date: string) => {
    const convertedTime = moment.tz(date, "Europe/Warsaw");
    const now = new Date(date);
    return convertedTime.add(now.getHours() - 4, "h").add(now.getMinutes(), "m").format();
}

export const toEuropeDate = (date: string, format: string = "") => {
    const convertedTime = moment(date).tz("Europe/Warsaw").format(format);
    return convertedTime;
}

export const toDateString = (date: string) => new Date(date).toLocaleDateString();

export const toFullDateString = (date: string) => moment.tz(date, "Europe/Warsaw").format("DD/MM/YYYY mm:ss");

export const convertSecondsToStringHoursAndMinutes = (seconds: number) => {
    const hours = (seconds / 3600);
    let calculatedHours = Math.floor(hours);
    let calculatedMinutes = Math.floor((hours - calculatedHours) * 60);
    // if (calculatedMinutes == 60) {
    //     calculatedHours += 1;
    //     calculatedMinutes = 0;
    // }
    return `${complementTime(calculatedHours)}:${complementTime(calculatedMinutes)}`;
}

const complementTime = (value: number) =>  {
  const valueString = value.toString();
   if(valueString.length == 1)
       return `0${value}`;
   return value;
}