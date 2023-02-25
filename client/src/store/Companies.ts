import { makeAutoObservable } from 'mobx';

import { PredictService } from '@/services';
import { TCompanies, TCompaniesByMA } from '@/types';

class Companies {
  byMA: TCompaniesByMA = [];
  byLR: TCompanies = [];
  isLoading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getPredictByMovingAverage(formData: FormData) {
    this.setIsLoading(true);
    this.setError(null);
    this.byMA.length && this.setByMA([]);

    try {
      const response = await PredictService.getPredictByMovingAverage(formData);
      this.setByMA(response);
    } catch (e) {
      if (e instanceof Error) {
        this.setError(e);
      }
    }
    this.setIsLoading(false);
  }

  async getPredictByLinearRegression(formData: FormData) {
    this.setIsLoading(true);
    this.setError(null);
    this.byLR.length && this.setByLR([]);

    try {
      const response = await PredictService.getPredictByLinearRegression(
        formData
      );
      this.setByLR(response);
    } catch (e) {
      if (e instanceof Error) {
        this.setError(e);
      }
    }
    this.setIsLoading(false);
  }

  private setIsLoading(loading: boolean) {
    this.isLoading = loading;
  }

  private setError(error: Error | null) {
    this.error = error;
  }

  private setByLR(companies: TCompanies) {
    this.byLR = companies;
  }

  private setByMA(companies: TCompaniesByMA) {
    this.byMA = companies;
  }

  clearCompanies() {
    this.byLR = [];
    this.byMA = [];
  }
}

const companies = new Companies();

export const getCompaniesStore = () => companies;
