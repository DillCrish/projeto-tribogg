import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// SEUS COMPONENTES (Mantidos)
import { Navbar } from './navbar/navbar';
import { HeroComponent } from './hero/hero';
import { About } from './about/about';
import { Streamers } from './streamers/streamers';

// 1. IMPORTS DO FONTAWESOME (Novos)
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// Ícones de Marcas (Brands)
import { faTwitch, faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons';
// Ícones Sólidos (Solid)
import {
    faUser,
    faBars,
    faPlay,
    faHeart,
    faChevronDown,
    faChevronUp,
    faArrowRight,
    faCartShopping,
    faCircleCheck,
    faPaperPlane,
    faListUl,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
// Ícones Regulares/Outline (Regular)
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-root',
    // Mantive seus componentes aqui
    imports: [Navbar, HeroComponent, About, Streamers],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('tribogg');

    // 2. CONSTRUTOR PARA INJETAR OS ÍCONES (Novo)
    constructor(library: FaIconLibrary) {
        // Adiciona todos os ícones que você vai usar no site inteiro de uma vez
        library.addIcons(
            // Marcas
            faTwitch,
            faDiscord,
            faXTwitter,

            // Sólidos
            faUser,
            faBars,
            faPlay,
            faHeart,
            faChevronDown,
            faChevronUp,
            faArrowRight,
            faCartShopping, // Adicionei extra pois vi no seu design (Shop)
            faCircleCheck, // Adicionei extra (Verificado)
            faPaperPlane,
            faListUl,
            faAngleLeft,
            faAngleRight,

            // Regulares
            faHeartRegular,
        );
    }
}
