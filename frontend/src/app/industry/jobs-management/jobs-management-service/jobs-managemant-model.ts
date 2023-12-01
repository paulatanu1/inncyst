export interface IpostJob {
  experienceTime: string;
  durationIn: string;
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
  id?:string;
  location:string;
  education:string;
  experience:number;
  
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
  location:string,
  experienceTime:string,
  durationIn:string,
  education:string,
  experience:number
}
