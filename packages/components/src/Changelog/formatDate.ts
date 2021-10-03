export const formatDate = (isoDate: string, format: string): string => {
  const d = new Date(isoDate);
  const [day, month, date, year, time] = String(new Date(isoDate)).split(' ');
  const MM = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();

  if (format === 'DDD, dd MMM yyyy hh:mm:ss') {
    return `${day.toUpperCase()}, ${date} ${month} ${year} ${time}`;
  }

  if (format === 'dd.mm.yy') {
    return `${date}.${MM}.${String(d.getFullYear()).slice(2)}`;
  }

  return [day, month, date, year, time].join(' ');
};
