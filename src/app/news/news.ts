import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date?: string;
  excerpt?: string; // Apenas para a lista da esquerda
  imageUrl: string;
  link?: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './news.html',
  styles: [`
    /* Garante que as imagens não estiquem */
    img { pointer-events: none; }
  `]
})
export class NewsComponent {
  faArrowRight = faArrowRight;

  // --- COLUNA DA ESQUERDA (Lista com Texto) ---
  featuredNews: NewsItem[] = [
    {
      id: 1,
      title: 'Imperial anuncia novos patrocinadores e nova staff para a Temporada de 2025',
      category: 'COUNTER-STRIKE 2',
      date: '24/07/24',
      excerpt: 'A Imperial fechou parcerias com a HyperX e a Red Bull, além de anunciar a chegada de dois novos técnicos.',
      imageUrl: 'images/imperial.jpg', // Troque pela imagem real
      link: '#'
    },
    {
      id: 2,
      title: 'Tribo e CazeTV: A fusão das maiores companhias do entretenimento na Twitch',
      category: 'TRIBO',
      date: '24/07/24',
      excerpt: 'A Tribo e a CazeTV uniram forças, prometendo transformar o cenário de streaming com conteúdos exclusivos e colaborações inovadoras.',
      imageUrl: 'images/caze.jpg', // Troque pela imagem real
      link: '#'
    }
  ];

  // --- COLUNA DA DIREITA (Grid de Imagens) ---
  gridNews: NewsItem[] = [
    {
      id: 3,
      title: 'EPL S19: FURIA teve a partida mais assistida da 1ª fase',
      category: 'COUNTER-STRIKE 2',
      imageUrl: 'images/epl.png' 
    },
    {
      id: 4,
      title: 'Brasil vence na Copa Mundial de Overwatch 2 e segue firme no campeonato!',
      category: 'OVERWATCH 2',
      imageUrl: 'images/brasil vence.png'
    },
    {
      id: 5,
      title: 'PH Team SIBOL vence o campeonato IESF MLBB de 2023',
      category: 'MOBILE LEGENDS',
      imageUrl: 'images/ph team.png'
    },
    {
      id: 6,
      title: 'CS2: Imperial contrata noway, jovem promessa',
      category: 'COUNTER-STRIKE 2',
      imageUrl: 'images/cs2 imperial.png'
    },
    {
      id: 7,
      title: 'G2 começará BLAST sem m0NESY',
      category: 'COUNTER-STRIKE 2',
      imageUrl: 'images/g2 começara.png'
    },
    {
      id: 8,
      title: 'Vencendo o M3 Mobile Legends, OhMyV33NUS se aposentará?',
      category: 'MOBILE LEGENDS',
      imageUrl: 'images/vencendo o m3 mobile.png'
    }
  ];
}