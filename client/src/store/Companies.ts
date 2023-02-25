import { makeAutoObservable } from 'mobx';

class Companies {
  formData: FormData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFormData(formData: FormData) {
    this.formData = formData;
  }
}

const companies = new Companies();

export const getCompaniesStore = () => companies;
