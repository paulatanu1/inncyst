import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogAddExperienceComponent } from './add-experience-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IcontactData,
  MentorApiService,
} from '../mentor-services/mentor-api.service';
import { map, Observable, startWith } from 'rxjs';

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
    { value: 'other_tool', label: 'Other (Please Specify)' },
  ];

  // filteredTools = [...this.tools];
  filteredTools!: Observable<{ value: string; label: string }[]>;
  qualifications!: Observable<{ value: string; label: string }[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogMentorProfile>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private mentorService: MentorApiService
  ) {}

  openExperienceDialog() {
    const experienceDialogRef = this.dialog.open(DialogAddExperienceComponent);

    experienceDialogRef.afterClosed().subscribe((result) => {
      console.log(`Experience dialog result: ${result}`);
      // You can use the result if needed or perform further actions
    });
  }

  ngOnInit(): void {
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

    this.skillsAndToolsForm = this.fb.group({
      toolControl: ['', Validators.required],
      qualificationControl: ['', Validators.required],
    });

    this.filteredTools = this.skillsAndToolsForm.controls[
      'toolControl'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => (value ? this.filterTools(value) : this.tools)) // ✅ Ensure it always returns an array
    );

    this.qualifications = this.skillsAndToolsForm.controls[
      'qualificationControl'
    ].valueChanges.pipe(
      startWith(''),
      map((value) =>
        value ? this.filterQualificationOptions(value) : this.tools
      ) // ✅ Ensure it always returns an array
    );
  }

  // about mentor from submission

  //1st tab
  onSubmit() {
    if (this.mentorForm.valid) {
      console.log('Form Data:', this.mentorForm.value);
      const formData = this.mentorForm.value;
      const payload: MentorAboutPayload = {
        name: formData.fullname,
        heading: formData.profileHeading,
        workRole: formData.whatDoYouDo,
        about: formData.about,
        location: formData.country,
        state: formData.state,
        language: formData.languages,
      };
      this.mentorService.saveMentorAbout(payload).subscribe({
        next: (res) => {
          console.log(res, 'response');
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
}
