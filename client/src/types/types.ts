export type Indicators = {
  profit: number;
  net_profit: number;
  net_loss: number;
  year: number;
};

export type TCompanies = [string, Indicators[]][];
export type TCompaniesByMA = [string, Indicators[], Indicators[]][];

export type Link = {
  href: string;
  title: string;
};
