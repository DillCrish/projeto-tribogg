import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, inject, Injectable, signal} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LayoutNavbarService} from "../../shared/layout-navbar-service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, FontAwesomeModule, NgOptimizedImage, RouterLink],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
@Injectable({providedIn: 'root'})
export class Navbar {

    public layoutService = inject(LayoutNavbarService);
    protected isOpen = signal(false);

    toggleMenu() {
        this.isOpen.update((val) => !val);
    }

}
