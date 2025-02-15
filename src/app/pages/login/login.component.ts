import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  faGoogle = faGoogle;

  toastrService = inject(ToastrService);
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  handleSignInWithGoogle() {
    this.authService.signInWithGoogle().then((result) => {
      console.log(result);
      const user = result.user;
      this.authService.addUserData(user, null);
      this.authService.setCurrentUser(user);
      this.router.navigateByUrl("");
    });
  }
}
