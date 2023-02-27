import { makeAutoObservable } from 'mobx';

class Companies {
  formData?: FormData;
  file: File | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFormData(formData: FormData) {
    this.formData = formData;
  }

  setFile(file: File | null) {
    this.file = file;
  }
}

const companies = new Companies();

export const getCompaniesStore = () => companies;
