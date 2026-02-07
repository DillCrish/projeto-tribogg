import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faTwitch} from "@fortawesome/free-brands-svg-icons/faTwitch";
import {faUser} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
    protected readonly faTwitch = faTwitch;
    protected readonly faUser = faUser;
}
