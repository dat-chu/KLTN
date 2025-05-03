export const formatDateToMMDDYYYY = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
  