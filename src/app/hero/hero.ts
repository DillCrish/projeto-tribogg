import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html', // Verifique se o nome do arquivo HTML está correto aqui
  styleUrls: ['./hero.css'],
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
  protected sanitizer = inject(DomSanitizer);

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
