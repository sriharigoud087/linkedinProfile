import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(public dialogService: DialogService, public fb: FormBuilder) {}
  bioData: any = {
    fullName: 'Kasala Srihari Goud',
    bio: 'Intern at ByteRidge Solutions',
    phoneNumber: '9059146746',
    eMail: 'sriharigoud087@gmail.com',
    country: 'India',
  };
  bioSection = new FormGroup({
    fullName: new FormControl(this.bioData.fullName),
    bio: new FormControl(this.bioData.bio),
    phoneNumber: new FormControl(this.bioData.phoneNumber),
    eMail: new FormControl(this.bioData.eMail),
    country: new FormControl(this.bioData.country),
  });
  educationData = {
    school: 'Sadhana High School',
    qualification: 'B-tech',
    filedofStudy: 'Computer Science Engineering',
    endYear: '',
    grade: 'A+',
    activities: '',
    description: '',
  };
  educationSection = new FormGroup({
    school: new FormControl('Sadhana High School'),
    qualification: new FormControl('B-tech'),
    filedofStudy: new FormControl('Computer Science Engineering'),
    endYear: new FormControl('2020-12-1'),
    grade: new FormControl('A+'),
    activities: new FormControl('Front-End'),
    description: new FormControl('Full Stack Development'),
  });
  experienceData = {
    title: '',
    employementType: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    headLine: '',
    description: '',
  };
  experienceSection = new FormGroup({
    title: new FormControl('Software Developer'),
    employementType: new FormControl('Full-Time'),
    company: new FormControl('Byte Ridge'),
    location: new FormControl('Hyderabad'),
    startDate: new FormControl('2020-12-02'),
    endDate: new FormControl('2021-05-23'),
    headLine: new FormControl('Good'),
    description: new FormControl('Good At Work'),
  });
  onFormSubmit(): void {
    console.log(this.bioSection.value);
    this.bioData = this.bioSection.value;
    //console.log('Name:' + this.bioSection.get('fullName').value);
  }

  educationDatArray: any[] = [];
  onEduSubmit() {
    // alert(JSON.stringify(this.educationSection.value));
    //this.educationDetails = JSON.stringify(this.educationSection.value);
    let educationdata = this.educationSection.value;
    educationdata.eduId = this.educationDatArray.length + 1;
    this.educationDatArray.push(educationdata);
  }

  experienceDataArray: any = [];
  onExpeSubmit() {
    //this.experienceDetails = JSON.stringify(this.experienceSection.value);

    let experiencedata = this.experienceSection.value;
    experiencedata.expiId = this.educationDatArray.length + 1;
    this.experienceDataArray.push(experiencedata);
  }
  displayBasicEdu = false;
  displayBasicExpe = false;
  display: boolean = false;
  displayBasic: boolean;
  displaySkills: boolean;
  showBasicDialogEdu() {
    this.displayBasicEdu = true;
  }
  showBasicDialogExpi() {
    this.displayBasicExpe = true;
  }
  closeDialog() {
    this.display = false;
  }
  showDialog() {
    this.display = true;
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicSkills() {
    this.displaySkills = true;
  }
  onDeleteEdu(eduId) {
    // console.log(eduId);
    this.educationDatArray.splice(this.educationDatArray.indexOf(eduId - 1), 1);
    console.log(this.educationDatArray);
  }
  onDeleteExpi(expiId) {
    this.experienceDataArray.splice(
      this.educationDatArray.indexOf(expiId - 1, 1)
    );
  }

  eduID: number;
  callEditEdu() {
    let educationdata = this.educationSection.value;
    // alert(JSON.stringify(this.educationDatArray[this.eduID - 1]));
    this.educationDatArray[this.eduID - 1] = educationdata;
  }

  displayEditChanges = true;

  editBasicDialogEdu(eduId) {
    this.displayEditChanges = false;
    this.displayBasicEdu = true;
    this.eduID = eduId;
  }
  expiID: number;
  editBasicDialofExpi(expiId) {
    this.displayEditChanges = false;
    this.displayBasicExpe = true;
    this.expiID = expiId;
  }
  callEditExpi() {
    let experienceData = this.experienceSection.value;
    // alert(JSON.stringify(this.educationDatArray[this.eduID - 1]));
    this.experienceDataArray[this.expiID - 1] = experienceData;
  }
  items: any[];

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.items = [
      {
        label: 'File',

        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [{ label: 'Project' }, { label: 'Other' }],
          },
          { label: 'Open' },
          { label: 'Quit' },
        ],
      },
      {
        label: 'menu',
      },
      {
        label: 'Context',
      },
      {
        label: 'About',
      },
      {
        label: 'Profile',
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
        ],
      },
    ];
  }

  isSubmitted = false;

  // City Names
  Languages: any = [
    'C',
    'Java',
    '.Net',
    'Angular',
    'Sql Server',
    'Machine Learning',
    'Artificail Intelligence',
  ];
  selectedlang: any[] = [];

  /*########### Form ###########*/
  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]],
  });

  // Getter method to access formcontrols
  get langName() {
    return this.registrationForm.get('langName');
  }
  langs: any = [];
  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      //this.selectedlang = [];
      this.selectedlang = [];
      let val = this.registrationForm.value;
      this.selectedlang.push(val.cityName);
      console.log(val.cityName);
    }
  }
  changeLang(e) {
    this.langName.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  control = new FormControl();
  Skills: string[] = [
    'Categorizing',
    'data',
    'Goal setting',
    'Meeting deadlines',
    'Multi-tasking',
    'Prioritizing',
    'Project management',
    'Scheduling',
    'Strategic Planning',
    'Time management',
  ];
  filteredStreets: Observable<string[]>;
  autoCompleteValue = '';
  private _filter(value: string): string[] {
    this.autoCompleteValue = value;
    const filterValue = this._normalizeValue(value);
    return this.Skills.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
