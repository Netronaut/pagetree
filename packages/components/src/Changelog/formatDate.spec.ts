import { formatDate } from './formatDate';

it('formatDate without format', () => {
  expect(formatDate('2021-01-01T13:01:17.277Z')).toBe('Fri Jan 01 2021 15:01:17');
  expect(formatDate('2021-11-31T13:01:17.277Z')).toBe('Wed Dec 01 2021 15:01:17');
});

it('formatDate with the "DDD, dd MMM yyyy hh:mm:ss" format', () => {
  expect(formatDate('2021-01-08T13:01:17.277Z', 'DDD, dd MMM yyyy hh:mm:ss')).toBe(
    'FRI, 08 Jan 2021 15:01:17',
  );
  expect(formatDate('2021-11-31T13:01:17.277Z', 'DDD, dd MMM yyyy hh:mm:ss')).toBe(
    'WED, 01 Dec 2021 15:01:17',
  );
});

it('formatDate with the "dd.mm.yy" format', () => {
  expect(formatDate('2021-09-11T13:01:17.277Z', 'dd.mm.yy')).toBe('11.09.21');
  expect(formatDate('2021-10-01T13:01:17.277Z', 'dd.mm.yy')).toBe('01.10.21');
});
