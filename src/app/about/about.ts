import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about',
    imports: [FontAwesomeModule, NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly faHeart = faHeart;
  protected readonly faHeartSolid = faHeartSolid;
}
