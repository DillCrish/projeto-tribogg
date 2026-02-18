import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './footer.html',
  styles: []
})
export class FooterComponent {
  faArrowRight = faArrowRight;
}
