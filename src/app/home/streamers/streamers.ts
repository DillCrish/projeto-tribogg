import { Component, inject } from '@angular/core'; // 1. Adicionei 'inject'
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // 2. Adicionei esses imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faCheckCircle,
  faHelmetSafety,
  faSignal
} from '@fortawesome/free-solid-svg-icons';

// Interface atualizada com 'channelName'
interface Streamer {
  id: number;
  name: string;
  channelName: string; // <--- NOVO: O nome do canal na URL da twitch (ex: 'gaules')
  title: string;
  game: string;
  viewers: string;
  thumbnailUrl: string; // Mantive caso queira usar como fallback
  avatarUrl: string;
  ctaImage: string;
  color: string;
}

@Component({
  selector: 'app-streamers',
  standalone: true,
    imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
  templateUrl: './streamers.html',
  styleUrls: ['./streamers.css']
})
export class Streamers {
  // 3. INJEÇÃO DE DEPENDÊNCIA (Para limpar a URL do Iframe)
  private sanitizer = inject(DomSanitizer);

  // Icons
  faArrowRight = faArrowRight;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCheckCircle = faCheckCircle;
  faHelmetSafety = faHelmetSafety;
  faSignal = faSignal;

  // Carousel State
  currentIndex = 0;
  itemsPerPage = 3;

  streamers: Streamer[] = [
    {
      id: 1,
      name: 'Gaules',
      channelName: 'gaules',
      title: 'Lobby do Alastro! Siga @Gaules',
      game: 'COUNTER-STRIKE 2',
      viewers: '12.1 mil',
      thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_gaules-440x248.jpg',
      avatarUrl: '/images/gaules-thumb-stream.png',
      ctaImage: '/images/gaules-thumb-stream.png',
      color: 'bg-[#0070f3]'
    },
    {
      id: 2,
      name: 'Liminha',
      channelName: 'liminhag0d',
      title: 'Transmissão Oficial do Major - Dia 3',
      game: 'COUNTER-STRIKE 2',
      viewers: '8.5 mil',
      thumbnailUrl: 'https://placehold.co/600x340/004d40/FFF?text=Stats+Screen',
      avatarUrl: '/images/gaules-thumb-stream.png',
      ctaImage: 'https://placehold.co/200x200/transparent/FFF?text=Liminha',
      color: 'bg-[#0070f3]'
    },
    {
      id: 3,
      name: 'VelhoVamp',
      channelName: 'velhovamp',
      title: 'JEFF do largados e pelados merece respeito',
      game: 'SÓ NA CONVERSA',
      viewers: '12.1 mil',
      thumbnailUrl: 'https://placehold.co/600x340/333/FFF?text=Racing+Sim',
      avatarUrl: '/images/velhovamp-thumb-stream.png',
      ctaImage: '/images/velhovamp-thumb-stream.png',
      color: 'bg-[#0070f3]'
    },
    {
      id: 4,
      name: 'Mch',
      channelName: 'mch_agg',
      title: 'Analisando as táticas da FURIA',
      game: 'VALORANT',
      viewers: '5.2 mil',
      thumbnailUrl: 'https://placehold.co/600x340/4a148c/FFF?text=Valorant',
      avatarUrl: 'https://placehold.co/100x100/444/FFF?text=M',
      ctaImage: 'https://placehold.co/200x200/transparent/FFF?text=Mch',
      color: 'bg-[#0070f3]'
    }
  ];

  // 4. NOVA FUNÇÃO: Gera a URL segura para o Iframe
  getStreamUrl(channel: string): SafeResourceUrl {
    const domain = window.location.hostname; // Pega o domínio do seu site (localhost ou produção)
    // muted=true é obrigatório para autoplay funcionar na maioria dos navegadores
    const url = `https://player.twitch.tv/?channel=${channel}&parent=${domain}&muted=true&autoplay=true`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  next() {
    if (this.currentIndex + this.itemsPerPage < this.streamers.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(0, this.streamers.length - this.itemsPerPage);
    }
  }

  get visibleStreamers(): Streamer[] {
    return this.streamers.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }
}
