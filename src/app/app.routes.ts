import {Routes} from '@angular/router';
import {AboutUs} from "./about-us/aboutUs";
import {Home} from "./home/home";

export const routes: Routes =[
    { path: '', component: Home },
    { path: 'about-us', component: AboutUs },
];
