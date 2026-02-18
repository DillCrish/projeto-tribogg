import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LayoutNavbarService {
    isAboutPage = signal(false);
}
