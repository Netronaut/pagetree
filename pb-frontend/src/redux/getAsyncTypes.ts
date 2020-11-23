export const REQUEST_PREFIX = '_REQUEST';
export const SUCCESS_PREFIX = '_SUCCESS';
export const ERROR_PREFIX = '_ERROR';

export default function getAsyncTypes(type: string): [string, string, string] {
  return [
    `${type}${REQUEST_PREFIX}`,
    `${type}${SUCCESS_PREFIX}`,
    `${type}${ERROR_PREFIX}`,
  ];
}
