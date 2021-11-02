export const formatDate = (isoDate: string, format?: string): string => {
  const d = new Date(isoDate);
  const [day, month, date, year, time] = String(new Date(isoDate)).split(' ');
  const MM = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;

  if (format === 'DDD, dd MMM yyyy hh:mm:ss') {
    return `${day.toUpperCase()}, ${date} ${month} ${year} ${time}`;
  }

  if (format === 'dd.mm.yy') {
    return `${date}.${MM}.${String(year).slice(2)}`;
  }

  return [day, month, date, year, time].join(' ');
};
