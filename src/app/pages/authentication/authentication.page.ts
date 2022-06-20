import { LoginService } from '../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const FORM_VALIDATION = {
  email: [
    { type: 'required', message: 'Email requis.' },
  ],
  password: [
    { type: 'required', message: 'Mot de passe requis.' },
  ]
};
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  public loginForm: FormGroup;
  public hidePassword = true;
  public email: string;
  public password: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, control => Validators.required(control)),
      password: new FormControl(null, control => Validators.required(control)),
      remember: new FormControl(false),
    },
      { validators: [Validators.required] }
    );
  }
  login() {
    this.email = this.loginForm.get('email').value;
    this.password = this.loginForm.get('password').value;

    if (!this.loginForm.valid) {
      this.loginForm.markAsDirty();
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginService.login(this.email, this.password).subscribe(
      (res: any) => {
        if (res.accessToken){
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.router.navigate(['/home']);
        }
      }
    );

  }
  getError(fieldName: string): string | null {
    const field = this.loginForm.get(fieldName);
    if (!field) {
      return null;
    }
    if (!field.dirty && !field.touched) {
      return null;
    }
    for (const validation of FORM_VALIDATION[fieldName]) {
      if (field.hasError(validation.type)) {
        return validation.message;
      }
    }
    return null;
  }
}
