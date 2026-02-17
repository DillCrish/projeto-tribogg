import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './shop.html',
  styles: [`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class ShopComponent {
  @ViewChild('productCarousel') productCarousel!: ElementRef<HTMLElement>;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  products: Product[] = [
    {
      id: 1,
      name: 'Moletom Tribo 2024',
      description: 'Moletom leve e confortável, com design clean e cores neutras, ideal para todas as ocasiões.',
      imageUrl: 'images/moletomtribo.png' // Troque por imagem sem fundo (PNG)
    },
    {
      id: 2,
      name: 'Camiseta Tribo 2024',
      description: 'Camiseta de tecido leve e respirável, com um visual moderno e minimalista para o dia a dia.',
      imageUrl: 'images/camisetatribo.png'
    },
    {
      id: 3,
      name: 'Camiseta Tribo Blue',
      description: 'Camiseta de tecido leve e cores vibrantes, combinando conforto e estilo em um único produto.',
      imageUrl: 'images/camisetaazul.png'
    },
    {
      id: 4,
      name: 'Boné Snapback',
      description: 'Proteção e estilo com a logo bordada em alta qualidade.',
      imageUrl: 'https://placehold.co/400x400/transparent/111?text=Bone'
    },
    {
      id: 5,
      name: 'Jaqueta Corta-Vento',
      description: 'Ideal para dias ventosos, mantendo o estilo da Tribo.',
      imageUrl: 'https://placehold.co/400x400/transparent/111?text=Jaqueta'
    }
  ];

  scroll(direction: 'left' | 'right') {
    if (!this.productCarousel) return;
    const container = this.productCarousel.nativeElement;
    // Rola o equivalente a largura de um card + gap (aprox 350px)
    const scrollAmount = 350;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}