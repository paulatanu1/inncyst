import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

export interface IaboutData {
  name: string;
  heading: string;
  workRole: string;
  about: string;
  location: string;
  state: string;
  language: string;
}

export interface IcontactData {
  email: String;
  phone: String;
  linkedin: String;
  github: String;
  dribble: String;
  youtube: String;
  behance: String;
  instagram: String;
}

export interface IExprienceData {
  jobTitle: String;
  company: String;
  startDate: Date;
  endDate: Date | string;
  currentWork: boolean;
  aboutRole: String;
  url: String;
}

export interface IEducationAdd {
  degree: string;
  institute: string;
  fieldOfStudy: string;
  yearOfCompletion: string;
}

export interface ISkillSet {
  skills: [];
  tools: [];
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
    console.log(aboutData, 'payload');
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

  mentorEducationAdd(data: IEducationAdd) {
    const payload = {
      degree: data.degree,
      organization: data.institute,
      studyField: data.fieldOfStudy,
      completionYear: data.yearOfCompletion,
    };
    let url: string = '/mentor/mentor-education';
    return this.apiService.ApiCallWithLocalization(payload, url, 'post');
  }

  setMentorSkill(data: ISkillSet) {
    const payload = {
      skills: [...data.skills],
      tools: [...data.tools],
    };
    let url: string = '/mentor/mentor-skills-post';
    return this.apiService.ApiCallWithLocalization(payload, url, 'post');
  }

  getMentorSkill() {
    let url: string = '/mentor/mentor-skills';
    return this.apiService.ApiCallWithLocalization('', url, 'get');
  }

  getMentorEducations() {
    let url: string = '/mentor/mentor-education-list';
    return this.apiService.ApiCallWithLocalization('', url, 'get');
  }

  viewMentorEducations(id: string) {
    let url: string = `/mentor/education/${id}`;
    return this.apiService.ApiCallWithLocalization('', url, 'get');
  }

  updateMentorEducations(id: string) {
    let url: string = `/mentor/edit-mentor-education/${id}`;
    return this.apiService.ApiCallWithLocalization('', url, 'put');
  }
}
