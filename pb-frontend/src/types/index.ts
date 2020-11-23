export type TBasePage = {
  title: string;
  route: string;
};

export type TPage = TBasePage & {
  _id: string;
};

export type TPages = TPage[];
