import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostService } from '../news-feed/news-feed.service';
@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.component.html',
  styleUrls: ['./registraion.component.css']
})
export class RegistraionComponent implements OnInit {

  registraionForm: FormGroup;
  id: number;
  imageURL:any;
  user: any = [];
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  validationmessage = {
    'fullName': {
      'required': 'Full Name is required',
      'minlength': 'Full Name must be at least 4 characters long',
    },
    'email': {
      'required': 'Email is required',
      'pattern': 'Give valid Email',
    },

    'passwd': {
      'required': 'Password is required',
      'minlength': 'Password must be at least 6 characters long'
    },
    'uploadPhoto': {
      'required': 'Photo is required'
    },
  };
  formError = {
    'fullName': '',
    'email': '',
    'passwd': '',
    'uploadPhoto': ''
  }

  constructor(private _router: Router, private fb: FormBuilder, private _postService: PostService) { }


  logIn() {

    this._router.navigateByUrl('/login');
  }


  ngOnInit() {
    this.registraionForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      passwd: ['', [Validators.required, Validators.minLength(6)]],
      uploadPhoto: ['', Validators.required]
    })
  }

  logValidationErrors(group: FormGroup = this.registraionForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formError[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationmessage[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formError[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

    })
  }

  register() {
    this.user = this._postService.getData('usersFeed');
    console.log(this.user);
    this.id = this.user[this.user.length - 1].id;
    console.log(this.id + 1);
    const object = {
      "id": this.id + 1,
      "fullname": this.registraionForm.get('fullName').value,
      "email": this.registraionForm.get('email').value,
      "imageURL": this.imageURL,
      "likes": 0,
      "dislikes": 0,
      "comments": [{
        "fullname": "",
        "image": "",
        "comment": "",
        "time": "3.58pm",
        "likes": 0,
        "dislikes": 0,
        "reply": [
          {
            "fullname": "",
            "image": "",
            "time": "4.58pm",
            "comment": "",
            "likes": 0,
            "dislikes": 0
          }

        ]
      
      }]
  }
    this.user.push(object);
    this._postService.setData('usersFeed', this.user);
    this._router.navigateByUrl('/login');
    console.log(this.user);
  }
  // loadImageFileAsURL(e) {
  //   const uploadPic=e.target.files[0].name;
  //   document.getElementById("myfile").onchange=function(e: Event){
  //     let file = (<HTMLInputElement>e.target).files[0];
  //   }
  //   console.log(uploadPic);

  // }
  loadImageFileAsURL(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.imageURL = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
