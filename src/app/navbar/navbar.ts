import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    protected isOpen = signal(false);

    toggleMenu() {
        this.isOpen.update((val) => !val);
    }
}
