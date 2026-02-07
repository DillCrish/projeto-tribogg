import {CommonModule} from '@angular/common';
import {Component, signal} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faTwitch} from "@fortawesome/free-brands-svg-icons/faTwitch";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faBars, faXmark} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, FontAwesomeModule, RouterLink],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    protected isOpen = signal(false);

    protected readonly faTwitch = faTwitch;
    protected readonly faUser = faUser;
    protected readonly faBars = faBars;
    protected readonly faXmark = faXmark;

    toggleMenu() {
        this.isOpen.update(val => !val);
    }
}
