import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Navbar} from "../home/navbar/navbar";
import {LayoutNavbarService} from "../shared/layout-navbar-service";

@Component({
  selector: 'app-home-about',
    imports: [
        Navbar
    ],
  templateUrl: './aboutUs.html',
  styleUrl: './aboutUs.css',
})
export class AboutUs implements OnInit, OnDestroy {

    layoutNavbarService = inject(LayoutNavbarService);

    ngOnInit(): void {
        console.log('passou aqui ngonit About')
        this.layoutNavbarService.isAboutPage.set(true);
    }

    ngOnDestroy(): void {
        this.layoutNavbarService.isAboutPage.set(false);
    }

}
