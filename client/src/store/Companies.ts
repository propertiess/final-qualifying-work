import { makeAutoObservable } from 'mobx';

class Companies {
  formData: FormData | null = null;
  file: File | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFormData(formData: FormData | null) {
    this.formData = formData;
  }

  setFile(file: File | null) {
    this.file = file;
  }
}

const companies = new Companies();

export const getCompaniesStore = () => companies;
