import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor( private formBuilder: FormBuilder,
    private http: HttpClient, 
    private router: Router) { }
  
    // inicialize form 
  ngOnInit(): void {
    this.form = this.formBuilder.group({email: '', password: ''});
  }

  // create new user
  submit(): void {
    console.log(this.form.getRawValue());
    this.http.post('http://localhost:3000/users/register', this.form.getRawValue())
    .subscribe(() => this.router.navigate(['login']));

  }

}
