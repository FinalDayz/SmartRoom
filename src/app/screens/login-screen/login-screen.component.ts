import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  @Output() successLogin: EventEmitter<any> = new EventEmitter();
  error: string|null = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  login(pass: string) {
    try {
      fetch('http://api.smartroom.codeweb.nl/status',
        {
          headers: {
            "Authorization": pass
          }
        })
        .then((res: Response) => {
          if (res.status < 200 || res.status > 299) {
            this.errorLogin(true);
          } else {
            this.setLogin(pass);
          }
        })
        .catch(err => {
          this.errorLogin(false);
        });

    } catch (err) {
      console.log("error");
    }
  }

  errorLogin(invalidPass: boolean) {
    if(invalidPass)
      this.error = "Invalid key";
    else
      this.error = "Unknown error while logging in, please check connection with server";
  }

  setLogin(pass: string) {
    localStorage.setItem('key', pass);
    this.successLogin.emit();
  }

}
