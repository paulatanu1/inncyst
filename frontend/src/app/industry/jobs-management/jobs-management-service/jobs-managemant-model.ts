export interface IpostJob {
  opportunityTypes: string;
  salary: string;
  salaryType: string;
  perks: string;
  skills: string[];
  details: string;
  intranshipType: string;
  startDate: string;
  duration: string;
  jobOpening: number;
  responsibilities: string[];
  stipend: string;
}

export interface Ipayload {
  type: string;
  salary: string;
  salaryType: string;
  perks: string;
  skills: string[];
  details: string;
  intranshipType: string;
  startDate: string;
  duration: string;
  jobOpening: number;
  responsibilities: string[];
  stipend: string;
}
