import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../news-feed/news-feed.service';
declare var $: any;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  loginForm: FormGroup;
  allusers: any;
  validationmessage = {
    'userName': {
      'required': 'Username is required',
      'pattern': 'Give valid Username',
    },
    'passwd': {
      'required': 'Password is required',
      'minlength': 'Password must be at least 6 characters long'
    },
  };
  formError = {
    'userName': '',
    'passwd': '',
  }

  constructor(private _router: Router, private fb: FormBuilder, private _postService: PostService) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      passwd: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  logIn() {
    if (this._postService.getData('usersFeed')) {
      this.allusers = this._postService.getData('usersFeed');
      for(var i=0;i<this.allusers.length;i++){
        if(this.allusers[i].email==this.loginForm.get('userName').value){
          const obj={
            'email':this.allusers[i].email,
            'fullname':this.allusers[i].fullname,
            'imageURL':this.allusers[i].imageURL
          }
          this._postService.setData('user',obj);
          this._router.navigateByUrl('/news-feed');
          $(".modal-backdrop").remove();
        }
        else{
          $("#cantLogin").modal('show');
        }
      }
    }
    else{
      $("#cantLogin").modal('show');
    }

  }
  registration() {
    this._router.navigateByUrl('/registration')
  }

  logValidationErrors(group: FormGroup = this.loginForm): void {
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

}
