import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  file: any;
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      //private alertService: AlertService
      ) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  login() {
    this.loading = true;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.authenticationService.login(this.model.username, fileReader.result.toString());
      this.router.navigate(['/overview']);
    }
    fileReader.readAsText(this.file);
  }
}
