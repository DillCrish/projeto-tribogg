import { Component } from '@angular/core';
import {About} from "./about/about";
import {CalendarComponent} from "./calendar/calendar";
import {FooterComponent} from "./footer/footer";
import {HeroComponent} from "./hero/hero";
import {Navbar} from "./navbar/navbar";
import {NewsComponent} from "./news/news";
import {ShopComponent} from "./shop/shop";
import {Streamers} from "./streamers/streamers";
import {TeamComponent} from "./team/team";

@Component({
  selector: 'app-home-main',
    imports: [
        About,
        CalendarComponent,
        FooterComponent,
        HeroComponent,
        Navbar,
        NewsComponent,
        ShopComponent,
        Streamers,
        TeamComponent
    ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
