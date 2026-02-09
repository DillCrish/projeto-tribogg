import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about',
    imports: [FontAwesomeModule, NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
}
