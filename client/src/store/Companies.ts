import { makeAutoObservable } from 'mobx';

import { TCompanies } from '@/types';

class Companies {
  byMA: TCompanies = [];
  byLR: TCompanies = [];

  constructor() {
    makeAutoObservable(this);
  }

  setByMovingAverage(companies: TCompanies) {
    this.byMA = companies;
  }

  setByLinearRegression(companies: TCompanies) {
    this.byLR = companies;
  }
}

const companies = new Companies();

export const getCompaniesStore = () => companies;
