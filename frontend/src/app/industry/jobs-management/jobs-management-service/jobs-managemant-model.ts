export interface IpostJob {
  type: string;
  salary: number;
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
  id?:string
  location:string
}

export interface Ipayload {
  type: string;
  salary: number;
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
  id?:string
  location:string
}
