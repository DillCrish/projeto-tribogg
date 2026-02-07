import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html', // Verifique se o nome do arquivo HTML está correto aqui
  styles: [`
    /* Custom utility for the hollow text effect if needed */
    .text-shadow-lg {
      text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }
    
    /* Smooth bounce animation for the mouse */
    @keyframes scrollBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(6px); }
    }
    .animate-scroll {
      animation: scrollBounce 2s infinite ease-in-out;
    }
  `]
})
export class HeroComponent implements OnInit {

  // Dados do Streamer (para usar no HTML)
  streamInfo = {
    game: 'Counter-Strike 2',
    title: 'ESL Qualifier - G2 vs Furia',
    badge: 'Ao Vivo Agora',
    viewers: '125K',
    channel: 'gaules' // Nome exato do canal na URL da twitch
  };

  // Variável que vai guardar a URL segura
  twitchUrl: SafeResourceUrl | undefined;

  // Injetamos o Sanitizer no construtor
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.setupTwitchUrl();
  }

  setupTwitchUrl() {
    // Pega o domínio atual automaticamente (localhost ou seu-site.com)
    // Isso evita o erro de tela cinza "Waa! Whoops!" da Twitch
    const domain = window.location.hostname;

    // Monta a URL usando o canal definido em streamInfo
    const url = `https://player.twitch.tv/?channel=${this.streamInfo.channel}&parent=${domain}&muted=true&autoplay=true`;

    // Sanitiza a URL para o Angular confiar nela dentro do <iframe>
    this.twitchUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}