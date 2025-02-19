import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogAddExperienceComponent } from './add-experience-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IcontactData,
  MentorApiService,
} from '../mentor-services/mentor-api.service';
import { map, Observable, startWith } from 'rxjs';
import { ToastServiceService } from 'src/app/service/toast-service.service';

interface MentorAboutPayload {
  name: string;
  heading: string;
  workRole: string;
  about: string;
  location: string;
  state: string;
  language: string;
}
@Component({
  selector: 'mentor-add-profile',
  templateUrl: 'mentor-add-profile.html',
  styleUrls: ['./mentor-add-profile.scss'],
})
export class DialogMentorProfile {
  //from section
  mentorForm!: FormGroup;
  mentorContactForm!: FormGroup;
  skillsAndToolsForm!: FormGroup;
  educationForm!: FormGroup;
  options = [
    // Engineering & Manufacturing Mentorships
    { value: 'electrical_mentor', label: 'Electrical Engineering Mentor' },
    { value: 'mechanical_mentor', label: 'Mechanical Engineering Mentor' },
    { value: 'civil_mentor', label: 'Civil Engineering Mentor' },
    { value: 'electronics_mentor', label: 'Electronics Engineering Mentor' },
    { value: 'robotics_mentor', label: 'Robotics & Automation Mentor' },
    {
      value: '3d_printing_mentor',
      label: '3D Printing & Additive Manufacturing Mentor',
    },
    {
      value: 'manufacturing_mentor',
      label: 'Manufacturing & Production Mentor',
    },
    { value: 'automobile_mentor', label: 'Automobile Engineering Mentor' },
    { value: 'industrial_mentor', label: 'Industrial Engineering Mentor' },
    { value: 'aerospace_mentor', label: 'Aerospace Engineering Mentor' },
    { value: 'construction_mentor', label: 'Construction Engineering Mentor' },
    { value: 'marine_mentor', label: 'Marine Engineering Mentor' },
    { value: 'energy_mentor', label: 'Energy & Power Systems Mentor' },
    {
      value: 'metallurgy_mentor',
      label: 'Metallurgy & Materials Science Mentor',
    },
    { value: 'biomedical_mentor', label: 'Biomedical Engineering Mentor' },

    // IT, Software & Data Science Mentorships
    { value: 'software_mentor', label: 'Software Engineering Mentor' },
    { value: 'ai_ml_mentor', label: 'AI & Machine Learning Mentor' },
    { value: 'data_science_mentor', label: 'Data Science & Analytics Mentor' },
    { value: 'cloud_mentor', label: 'Cloud Computing Mentor' },
    { value: 'cybersecurity_mentor', label: 'Cybersecurity Mentor' },
    { value: 'fullstack_mentor', label: 'Full Stack Development Mentor' },
    { value: 'frontend_mentor', label: 'Frontend Development Mentor' },
    { value: 'backend_mentor', label: 'Backend Development Mentor' },
    { value: 'blockchain_mentor', label: 'Blockchain Mentor' },
    { value: 'iot_mentor', label: 'IoT (Internet of Things) Mentor' },
    { value: 'embedded_mentor', label: 'Embedded Systems Mentor' },
    { value: 'game_dev_mentor', label: 'Game Development Mentor' },

    // Business & Project Management Mentorships
    { value: 'tech_mentor', label: 'Technology Mentor' },
    { value: 'startup_mentor', label: 'Startup & Entrepreneurship Mentor' },
    { value: 'business_mentor', label: 'Business Strategy Mentor' },
    { value: 'project_management_mentor', label: 'Project Management Mentor' },
    { value: 'product_management_mentor', label: 'Product Management Mentor' },
    { value: 'design_thinking_mentor', label: 'Design Thinking Mentor' },

    // Networking, Cloud & IT Infrastructure Mentorships
    { value: 'networking_mentor', label: 'Networking & Infrastructure Mentor' },
    { value: 'cloud_architecture_mentor', label: 'Cloud Architecture Mentor' },
    { value: 'devops_mentor', label: 'DevOps & CI/CD Mentor' },
    { value: 'database_mentor', label: 'Database Administration Mentor' },

    // UI/UX & Creative Fields Mentorships
    { value: 'ui_ux_mentor', label: 'UI/UX Design Mentor' },
    { value: 'graphic_design_mentor', label: 'Graphic Design Mentor' },
    { value: 'digital_marketing_mentor', label: 'Digital Marketing Mentor' },

    // Miscellaneous Technical Mentorships
    {
      value: 'vr_ar_mentor',
      label: 'Virtual Reality (VR) & Augmented Reality (AR) Mentor',
    },
    { value: 'quantum_computing_mentor', label: 'Quantum Computing Mentor' },

    // "Other" option
    { value: 'other_mentor', label: 'Other (Please Specify)' },
  ];
  filteredOptions = [...this.options];
  tools = [
    // Software Development Tools
    { value: 'vs_code', label: 'VS Code' },
    { value: 'github', label: 'GitHub' },
    { value: 'gitlab', label: 'GitLab' },
    { value: 'bitbucket', label: 'Bitbucket' },
    { value: 'intellij', label: 'IntelliJ IDEA' },
    { value: 'pycharm', label: 'PyCharm' },
    { value: 'eclipse', label: 'Eclipse' },
    { value: 'netbeans', label: 'NetBeans' },
    { value: 'android_studio', label: 'Android Studio' },
    { value: 'xcode', label: 'Xcode' },
    { value: 'postman', label: 'Postman' },
    { value: 'swagger', label: 'Swagger' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'jenkins', label: 'Jenkins' },

    // AI/ML & Data Science Tools
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'jupyter', label: 'Jupyter Notebook' },
    { value: 'colab', label: 'Google Colab' },
    { value: 'rapidminer', label: 'RapidMiner' },
    { value: 'knime', label: 'KNIME' },

    // Cybersecurity Tools
    { value: 'kali_linux', label: 'Kali Linux' },
    { value: 'metasploit', label: 'Metasploit' },
    { value: 'nmap', label: 'Nmap' },
    { value: 'wireshark', label: 'Wireshark' },
    { value: 'burpsuite', label: 'Burp Suite' },

    // Cloud & DevOps Tools
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Microsoft Azure' },
    { value: 'gcp', label: 'Google Cloud Platform' },
    { value: 'terraform', label: 'Terraform' },
    { value: 'ansible', label: 'Ansible' },
    { value: 'prometheus', label: 'Prometheus' },
    { value: 'grafana', label: 'Grafana' },

    // Networking & IT Infrastructure Tools
    { value: 'cisco_packet_tracer', label: 'Cisco Packet Tracer' },
    { value: 'vmware', label: 'VMware' },
    { value: 'virtualbox', label: 'VirtualBox' },

    // Engineering & CAD Tools
    { value: 'autocad', label: 'AutoCAD' },
    { value: 'solidworks', label: 'SolidWorks' },
    { value: 'catia', label: 'CATIA' },
    { value: 'ansys', label: 'ANSYS' },
    { value: 'matlab', label: 'MATLAB' },

    // Electrical Engineering Tools
    { value: 'pscad', label: 'PSCAD' },
    { value: 'etap', label: 'ETAP' },
    { value: 'powerworld', label: 'PowerWorld Simulator' },
    { value: 'simulink', label: 'Simulink' },
    { value: 'labview', label: 'LabVIEW' },

    // Mechanical Engineering Tools
    { value: 'creo', label: 'PTC Creo' },
    { value: 'hypermesh', label: 'HyperMesh' },
    { value: 'abaqus', label: 'Abaqus' },
    { value: 'fluent', label: 'ANSYS Fluent' },
    { value: 'nastran', label: 'MSC Nastran' },

    // Civil Engineering Tools
    { value: 'staadpro', label: 'STAAD.Pro' },
    { value: 'revit', label: 'Autodesk Revit' },
    { value: 'sap2000', label: 'SAP2000' },
    { value: 'tekla', label: 'Tekla Structures' },
    { value: 'civil3d', label: 'AutoCAD Civil 3D' },

    // Electronics Engineering Tools
    { value: 'proteus', label: 'Proteus' },
    { value: 'multisim', label: 'NI Multisim' },
    { value: 'ltspice', label: 'LTSpice' },
    { value: 'orcad', label: 'OrCAD' },
    { value: 'altium', label: 'Altium Designer' },

    // Manufacturing & 3D Printing Tools
    { value: 'fusion360', label: 'Fusion 360' },
    { value: 'cura', label: 'Ultimaker Cura' },
    { value: 'blender', label: 'Blender (3D Modeling)' },
    { value: 'simplify3d', label: 'Simplify3D' },

    // UI/UX & Design Tools
    { value: 'figma', label: 'Figma' },
    { value: 'adobe_xd', label: 'Adobe XD' },
    { value: 'sketch', label: 'Sketch' },
    { value: 'photoshop', label: 'Adobe Photoshop' },
    { value: 'illustrator', label: 'Adobe Illustrator' },
    { value: 'gimp', label: 'GIMP' },

    // Miscellaneous
    { value: 'notion', label: 'Notion' },
    { value: 'slack', label: 'Slack' },
    { value: 'trello', label: 'Trello' },
    { value: 'jira', label: 'JIRA' },
  ];

  education = [
    // School-Level Qualifications
    { value: 'high_school', label: 'High School Diploma' },
    { value: 'secondary_education', label: 'Secondary Education (10th Grade)' },
    { value: 'higher_secondary', label: 'Higher Secondary (12th Grade)' },

    // Diploma & Certification Programs
    { value: 'diploma_engineering', label: 'Diploma in Engineering' },
    { value: 'diploma_it', label: 'Diploma in IT' },
    { value: 'diploma_business', label: 'Diploma in Business Administration' },
    { value: 'diploma_design', label: 'Diploma in Graphic Design' },
    { value: 'diploma_finance', label: 'Diploma in Finance & Accounting' },
    {
      value: 'diploma_hospitality',
      label: 'Diploma in Hospitality Management',
    },
    {
      value: 'certification_cybersecurity',
      label: 'Certification in Cybersecurity',
    },
    {
      value: 'certification_ai',
      label: 'Certification in AI & Machine Learning',
    },
    {
      value: 'certification_project_management',
      label: 'Certification in Project Management (PMP, PRINCE2)',
    },

    // Undergraduate Degrees
    { value: 'btech', label: 'Bachelor of Technology (B.Tech)' },
    { value: 'be', label: 'Bachelor of Engineering (B.E.)' },
    {
      value: 'bsc_cs',
      label: 'Bachelor of Science in Computer Science (B.Sc. CS)',
    },
    {
      value: 'bsc_it',
      label: 'Bachelor of Science in Information Technology (B.Sc. IT)',
    },
    { value: 'bca', label: 'Bachelor of Computer Applications (BCA)' },
    { value: 'bba', label: 'Bachelor of Business Administration (BBA)' },
    { value: 'bcom', label: 'Bachelor of Commerce (B.Com)' },
    { value: 'ba', label: 'Bachelor of Arts (B.A.)' },
    { value: 'bsc', label: 'Bachelor of Science (B.Sc.)' },
    { value: 'llb', label: 'Bachelor of Law (LLB)' },
    { value: 'mbbs', label: 'Bachelor of Medicine and Surgery (MBBS)' },
    { value: 'bds', label: 'Bachelor of Dental Surgery (BDS)' },
    { value: 'bpharm', label: 'Bachelor of Pharmacy (B.Pharm)' },
    { value: 'barch', label: 'Bachelor of Architecture (B.Arch)' },

    // Postgraduate Degrees
    { value: 'mtech', label: 'Master of Technology (M.Tech)' },
    { value: 'me', label: 'Master of Engineering (M.E.)' },
    {
      value: 'msc_cs',
      label: 'Master of Science in Computer Science (M.Sc. CS)',
    },
    { value: 'mca', label: 'Master of Computer Applications (MCA)' },
    { value: 'mba', label: 'Master of Business Administration (MBA)' },
    { value: 'mcom', label: 'Master of Commerce (M.Com)' },
    { value: 'ma', label: 'Master of Arts (M.A.)' },
    { value: 'msc', label: 'Master of Science (M.Sc.)' },
    { value: 'llm', label: 'Master of Law (LLM)' },
    { value: 'md', label: 'Doctor of Medicine (MD)' },
    { value: 'mpharm', label: 'Master of Pharmacy (M.Pharm)' },
    { value: 'march', label: 'Master of Architecture (M.Arch)' },

    // Doctoral & Research Degrees
    { value: 'phd', label: 'Doctor of Philosophy (Ph.D.)' },
    { value: 'dsc', label: 'Doctor of Science (D.Sc.)' },
    { value: 'dm', label: 'Doctorate of Medicine (DM)' },

    // Vocational & Skill-Based Qualifications
    { value: 'iti', label: 'Industrial Training Institute (ITI)' },
    { value: 'polytechnic', label: 'Polytechnic Diploma' },
    { value: 'trade_certification', label: 'Trade Certification' },
  ];

  technicalSkills = [
    // Programming Languages
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'c_plus_plus', label: 'C++' },
    { value: 'c_sharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'swift', label: 'Swift' },

    // Web Development
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'react', label: 'React.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nestjs', label: 'NestJS' },
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' },
    { value: 'spring_boot', label: 'Spring Boot' },
    { value: 'express', label: 'Express.js' },
    { value: 'laravel', label: 'Laravel' },

    // Mobile Development
    { value: 'flutter', label: 'Flutter' },
    { value: 'react_native', label: 'React Native' },
    { value: 'android', label: 'Android Development' },
    { value: 'ios', label: 'iOS Development' },
    { value: 'xamarin', label: 'Xamarin' },

    // Databases
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'redis', label: 'Redis' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'oracle_db', label: 'Oracle Database' },
    { value: 'firebase', label: 'Firebase' },

    // Cloud & DevOps
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Azure' },
    { value: 'gcp', label: 'Google Cloud Platform' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'terraform', label: 'Terraform' },
    { value: 'ansible', label: 'Ansible' },
    { value: 'jenkins', label: 'Jenkins' },
    { value: 'ci_cd', label: 'CI/CD' },

    // Cybersecurity
    { value: 'ethical_hacking', label: 'Ethical Hacking' },
    { value: 'penetration_testing', label: 'Penetration Testing' },
    { value: 'network_security', label: 'Network Security' },
    { value: 'cryptography', label: 'Cryptography' },
    { value: 'malware_analysis', label: 'Malware Analysis' },

    // AI/ML & Data Science
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'scikit_learn', label: 'Scikit-learn' },
    { value: 'pandas', label: 'Pandas' },
    { value: 'numpy', label: 'NumPy' },
    { value: 'opencv', label: 'OpenCV' },
    { value: 'nlp', label: 'Natural Language Processing (NLP)' },
    { value: 'computer_vision', label: 'Computer Vision' },
    { value: 'big_data', label: 'Big Data' },

    // Networking & System Administration
    { value: 'linux', label: 'Linux Administration' },
    { value: 'windows_server', label: 'Windows Server' },
    { value: 'networking', label: 'Networking' },
    { value: 'vmware', label: 'VMware' },
    { value: 'virtualbox', label: 'VirtualBox' },

    // IoT & Embedded Systems
    { value: 'arduino', label: 'Arduino' },
    { value: 'raspberry_pi', label: 'Raspberry Pi' },
    { value: 'fpga', label: 'FPGA Development' },
    { value: 'embedded_c', label: 'Embedded C' },

    // Engineering & CAD
    { value: 'autocad', label: 'AutoCAD' },
    { value: 'solidworks', label: 'SolidWorks' },
    { value: 'ansys', label: 'ANSYS' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'catia', label: 'CATIA' },

    // UI/UX Design
    { value: 'figma', label: 'Figma' },
    { value: 'adobe_xd', label: 'Adobe XD' },
    { value: 'sketch', label: 'Sketch' },
    { value: 'photoshop', label: 'Adobe Photoshop' },
    { value: 'illustrator', label: 'Adobe Illustrator' },
  ];

  countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Botswana',
    'Brazil',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Dominica',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Germany',
    'Ghana',
    'Greece',
    'Guatemala',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kuwait',
    'Latvia',
    'Lebanon',
    'Libya',
    'Lithuania',
    'Luxembourg',
    'Malaysia',
    'Maldives',
    'Mali',
    'Mexico',
    'Monaco',
    'Mongolia',
    'Morocco',
    'Myanmar',
    'Namibia',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nigeria',
    'North Korea',
    'Norway',
    'Oman',
    'Pakistan',
    'Palestine',
    'Panama',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Somalia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Tunisia',
    'Turkey',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  aboutMentorSubmited = false;
  // filteredTools = [...this.tools];
  filteredTools!: Observable<{ value: string; label: string }[]>;
  qualifications!: Observable<{ value: string; label: string }[]>;
  filterEducation!: Observable<{ value: string; label: string }[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogMentorProfile>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private mentorService: MentorApiService,
    private _toast: ToastServiceService
  ) {}

  openExperienceDialog() {
    const experienceDialogRef = this.dialog.open(DialogAddExperienceComponent);

    experienceDialogRef.afterClosed().subscribe((result) => {
      console.log(`Experience dialog result: ${result}`);
      // You can use the result if needed or perform further actions
    });
  }

  ngOnInit(): void {
    this.gettingMentorAbout();
    this.mentorForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      profileHeading: ['', Validators.required],
      whatDoYouDo: ['', Validators.required],
      about: ['', [Validators.required, Validators.minLength(20)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      languages: ['', Validators.required],
    });

    this.mentorContactForm = this.fb.group({
      mentorEmail: ['', [Validators.required, Validators.email]],
      mentorPhone: [null, Validators.required, Validators.minLength(10)],
      linkedinUrl: [''],
      gitHubUrl: [''],
      dribbleUrl: [''],
      youtubeUrl: [''],
      behanceUrl: [''],
      instaUrl: [''],
    });

    this.educationForm = this.fb.group({
      institute: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      yearOfCompletion: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
    });

    this.skillsAndToolsForm = this.fb.group({
      toolControl: ['', Validators.required],
      qualificationControl: ['', Validators.required],
    });

    this.filteredTools = this.skillsAndToolsForm.controls[
      'toolControl'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => (value ? this.filterTools(value) : this.tools))
    );

    this.qualifications = this.skillsAndToolsForm.controls[
      'qualificationControl'
    ].valueChanges.pipe(
      startWith(''),
      map((value) =>
        value ? this.filterQualificationOptions(value) : this.technicalSkills
      )
    );

    this.filterEducation = this.educationForm.controls[
      'degree'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => (value ? this.filterEducations(value) : this.education))
    );
  }

  // about mentor from submission

  //1st tab
  onSubmit() {
    if (this.mentorForm.valid) {
      console.log('Form Data:', this.mentorForm.value);
      const formData = this.mentorForm.value;
      const payload: MentorAboutPayload = {
        name: formData.fullName,
        heading: formData.profileHeading,
        workRole: formData.whatDoYouDo,
        about: formData.about,
        location: formData.country,
        state: formData.state,
        language: formData.languages,
      };
      this.mentorService.saveMentorAbout(payload).subscribe({
        next: (res) => {
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  //2nd tab
  onSubmitContact() {
    if (this.mentorContactForm.valid) {
      const formData = this.mentorContactForm.value;
      const payload: IcontactData = {
        email: formData.mentorEmail,
        phone: formData.mentorPhone,
        linkedin: formData.linkedinUrl,
        github: formData.gitHubUrl,
        dribble: formData.dribbleUrl,
        youtube: formData.youtubeUrl,
        behance: formData.behanceUrl,
        instagram: formData.instaUrl,
      };
      this.mentorService.saveMentorContact(payload).subscribe({
        next: (res) => {
          console.log(res, 'response');
          this.mentorContactForm.disable();
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
        },
        error: (err) => {
          console.log('Form is invalid');
        },
      });
    }
  }

  //4th tab

  // filterQualificationOptions(event: any) {
  //   event.stopPropagation();
  //   const searchTerm = event.target.value.toLowerCase();
  //   this.filteredOptions = this.options.filter((option) =>
  //     option.label.toLowerCase().includes(searchTerm)
  //   );
  // }

  private filterQualificationOptions(
    value: string
  ): { value: string; label: string }[] {
    const filterValue = value.toLowerCase();
    return this.tools.filter((tool) =>
      tool.label.toLowerCase().includes(filterValue)
    );
  }

  onSelectionChange(event: any) {
    console.log('Selected Value: ', event.value);
  }

  private filterTools(value: string): { value: string; label: string }[] {
    const filterValue = value.toLowerCase();
    return this.tools.filter((tool) =>
      tool.label.toLowerCase().includes(filterValue)
    );
  }

  private filterEducations(value: string): { value: string; label: string }[] {
    const filterValue = value.toLowerCase();
    return this.education.filter((tool) =>
      tool.label.toLowerCase().includes(filterValue)
    );
  }

  onSelectionToolsChange(event: any) {
    console.log('Selected Tool: ', event.value);
  }

  onSubmitSkillAndTools() {
    if (this.skillsAndToolsForm.valid) {
      console.log('Selected Tool:', this.skillsAndToolsForm.value.toolControl);
      console.log(
        'Selected Qualification:',
        this.skillsAndToolsForm.value.qualificationControl
      );
    } else {
      console.log('Form is invalid!');
    }
  }

  submitEducationForm() {
    console.log(this.educationForm.value);
    if (this.educationForm.valid) {
      console.log(this.educationForm.value);
    }
  }

  gettingMentorAbout() {
    // this.mentorForm.disable();
    this.mentorService.getMentorAbout().subscribe({
      next: (res) => {
        console.log(res);
        if (res.data) {
          this.mentorForm.patchValue({
            fullName: res.data.name,
            profileHeading: res.data.heading,
            whatDoYouDo: res.data.workRole,
            about: res.data.about,
            country: res.data.location,
            state: res.data.state,
            languages: res.data.language,
          });
          // this.mentorForm.disable();
          this.aboutMentorSubmited = true;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
