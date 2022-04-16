declare module 'changeset' {
  export interface Diff {
    type: 'put' | 'del';
    key: Array<string>;
    value: string | number | boolean;
  }

  export default function diff<T>(a: T, b: T): Array<Diff>;
}
