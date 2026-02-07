import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from "./navbar/navbar";
import { HeroComponent } from './hero/hero';
import { About } from "./about/about";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroComponent, About],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tribogg');
}
