import {
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    differenceInMonths,
    differenceInYears,
  } from "date-fns";


  const getTimeDifference = (date: string | Date): string => {
    let dateReference = null;
    const today = new Date();
    if (typeof date === "string") {
      dateReference = new Date(date);
    } else {
      dateReference = date;
    }
    const years = differenceInYears(today, dateReference);
    if (years > 0) return `${years} years ago`;

    const months = differenceInMonths(today, dateReference);
    if (months > 0) return `${months} months ago`;

    const days = differenceInDays(today, dateReference);
    if (days > 0) return `${days} days ago`;

    const hours = differenceInHours(today, dateReference);
    if (hours > 0) return `${hours} hours ago`;

    const minutes = differenceInMinutes(today, dateReference);
    if (minutes > 0) return `${minutes} minutes ago`;

    return "just now";
  };

  export default getTimeDifference