import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { IUser } from '../../interfaces/IUser';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent implements OnInit {
  public date: string | null;
  public time = '';
  user: IUser | null | undefined;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  showPassword = false;

  constructor(private authService: AuthService) {
    this.date = this.getCurrentDate();
  }

  ngOnInit() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  updateTime() {
    const tmpDate = new Date();
    const hours = this.formatTime(tmpDate.getHours());
    const minutes = this.formatTime(tmpDate.getMinutes());
    const seconds = this.formatTime(tmpDate.getSeconds());
    this.time = `${hours}:${minutes}:${seconds}`;
  }

  formatTime(time: number): string {
    if (time < 10) {
      return `0${time}`;
    }
    return `${time}`;
  }

  getCurrentDate(): string | null {
    const today = Date.now();
    const pipe = new DatePipe('en-US');

    return pipe.transform(today, 'dd.MM.yyyy');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      return;
    }
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        // Handle authentication error.
        console.error(error);
      });
      this.loginForm.reset();
  }

  onRegister() {
    console.log("Registered");
  }

  onLogOut() {
    this.authService.logout();
  }

  onSmallSubmit() {
    console.log("Modal opened: Logged in");
  }

  onSmallRegister() {
    console.log("Modal opened: Registered");
  }
}
