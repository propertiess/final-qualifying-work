import { makeAutoObservable } from 'mobx';

import { PredictService } from '@/services';
import { Methods, TCompany } from '@/types';

class Companies {
  formData?: FormData;
  file: File | null = null;

  isLoading: Record<Methods, boolean> = {
    cnn: false,
    'linear-regression': false,
    'moving-average': false,
    ffnn: false,
    rnn: false
  };

  methods: Record<Methods, TCompany[]> = {
    cnn: [],
    'linear-regression': [],
    'moving-average': [],
    ffnn: [],
    rnn: []
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFormData(formData: FormData) {
    this.formData = formData;
  }

  setFile(file: File | null) {
    this.file = file;
  }

  *setMethod(method: Methods) {
    if (!this.formData) {
      return;
    }

    try {
      this.isLoading[method] = true;
      this.methods[method] = yield PredictService.getByType(
        this.formData,
        method
      );
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading[method] = false;
    }
  }
}

const companies = new Companies();

export const useCompaniesStore = () => companies;
