import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

declare var $: any;

declare var $ : any 
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
  fileTypeValid = false;
  message: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
      ) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    const acceptedTypes = ["key"]
    if(acceptedTypes.includes(this.file.name.split(".")[this.file.name.split(".").length-1])){
      this.fileTypeValid = true;
    } else {
      this.fileTypeValid = false;
    }
  }


  login(text) {
    console.log(text);
    if (text != "" && text != null) {
      this.loading = true;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        if(this.fileTypeValid && (fileReader.result.toString().includes("-----BEGIN PRIVATE KEY-----")&& fileReader.result.toString().includes("-----END PRIVATE KEY-----"))){
          this.authenticationService.login(this.model.username, fileReader.result.toString());
          this.router.navigate(['/overview']);
        } else {
          this.changeMessage("File is not valid, please enter the right key file for use with our application");
        }
      }
      fileReader.readAsText(this.file);
    } else {
      this.changeMessage(this.alertService.notifyUser('noUsername'));
    }
  }

  changeMessage(message:string) {
    this.message = message;
    $('.modal').fadeIn(300);
  }

  closeModal() {
    $('.modal').hide();
  }

}
