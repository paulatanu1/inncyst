import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

interface IaboutData {
  name: string;
  heading: string;
  workRole: string;
  about: string;
  location: string;
  state: string;
  language: string;
}

interface IcontactData {
  email: String;
  phone: String;
  linkedin: String;
  github: String;
  dribble: String;
  youtube: String;
  behance: String;
  instagram: String;
}

interface IExprienceData {
  jobTitle: String;
  company: String;
  startDate: Date;
  endDate: Date | string;
  currentWork: boolean;
  aboutRole: String;
  url: String;
}

@Injectable({
  providedIn: 'root',
})
export class MentorApiService {
  constructor(private apiService: ApiService) {}

  //getting mentor about
  getMentorAbout() {
    let url: string = '/mentor/mentor-about';
    return this.apiService.ApiCallWithLocalization('', url, 'get');
  }

  //save mentor about
  saveMentorAbout(aboutData: IaboutData) {
    let payload = {
      name: aboutData.name,
      heading: aboutData.heading,
      workRole: aboutData.workRole,
      about: aboutData.about,
      location: aboutData.location,
      state: aboutData.state,
      language: aboutData.language,
    };
    let url: string = '/mentor/submit-about';
    return this.apiService.ApiCallWithLocalization(payload, url, 'post');
  }

  //getting mentor contact
  getMentorContact() {
    let url: string = '/mentor/mentor-contact';
    return this.apiService.ApiCallWithLocalization('', url, 'get');
  }

  //save mentor contact
  saveMentorContact(contactData: IcontactData) {
    let payload = {
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      dribble: '',
      youtube: '',
      behance: '',
      instagram: '',
    };
    let url: string = '/mentor/contact-submit';
    return this.apiService.ApiCallWithLocalization(payload, url, 'post');
  }

  getMentorExperience() {
    let url: string = '/mentor/mentor-exp';
    return this.apiService.ApiCallWithLocalization('', url, 'get');
  }

  saveMentorExprience(exprienceData: IExprienceData) {
    let payload = {
      jobTitle: '',
      company: '',
      startDate: Date.now(),
      endDate: '',
      currentWork: false,
      aboutRole: '',
      url: '',
    };
    let url: string = '/mentor/add-exp';
    return this.apiService.ApiCallWithLocalization(payload, url, 'post');
  }

  deleteExprience(id: string) {
    let url: string = `exp-delete/${id}`;
    return this.apiService.ApiCallWithLocalization('', url, 'delete');
  }

  updateExprience(id: string) {
    let url: string = `update-delete/${id}`;
    return this.apiService.ApiCallWithLocalization('', url, 'put');
  }

  getExprienceList(id: string) {
    let url: string = `update-delete/${id}`;
    return this.apiService.ApiCallWithLocalization('', url, 'get');
  }
}
