import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  id: number;
  realIndex: number;
  name: string;
  role: string;
  imageUrl: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styles: [`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class TeamComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;

  originalMembers = [
    { id: 1, name: 'Gaules', role: 'STREAMER E CEO', imageUrl: 'images/gaules.png' },
    { id: 2, name: 'Liminha', role: 'STREAMER', imageUrl: 'images/liminha.jpg' },
    { id: 3, name: 'Bt0', role: 'STREAMER', imageUrl: 'images/bt0.png' },
    { id: 4, name: 'VelhoVamp', role: 'STREAMER', imageUrl: 'images/velhovamp.png' },
    { id: 5, name: 'Apoka', role: 'STREAMER', imageUrl: 'images/apoka.jpg' },
    { id: 6, name: 'Mch', role: 'STREAMER', imageUrl: 'images/mch.jpg' },
    { id: 7, name: 'llauqS', role: 'STREAMER', imageUrl: 'images/llauqs.png' },
  ];

  displayMembers: TeamMember[] = [];
  activeIndex = 0;
  realActiveIndex = 0;
  
  isDown = false;
  startX = 0;
  scrollLeft = 0;

  // Listeners para remover depois
  private touchStartListener: any;
  private touchEndListener: any;
  private touchMoveListener: any;
  private clickListener: any;
  private hasMoved = false;
  private isAutoScrolling = false;
  private scrollTimeout: any;

  constructor() {
    // 3 Sets para o infinito
    const list = this.originalMembers.map((m, i) => ({ ...m, realIndex: i }));
    this.displayMembers = [...list, ...list, ...list];
  }

  ngAfterViewInit() {
    // Começa com o Gaules (index 0) do set do meio (index 8) centralizado
    const startGaulesIndex = this.originalMembers.length;
    setTimeout(() => {
      this.scrollToIndex(startGaulesIndex, false);
    }, 100);

    // Adiciona suporte a Touch manualmente (pois o template pode não ter os bindings)
    this.touchStartListener = (e: TouchEvent) => this.startDrag(e);
    this.touchEndListener = () => this.stopDrag();
    this.touchMoveListener = (e: TouchEvent) => this.moveDrag(e);
    this.clickListener = (e: Event) => this.handleCardClick(e);

    const slider = this.carousel.nativeElement;
    slider.addEventListener('touchstart', this.touchStartListener, { passive: false });
    slider.addEventListener('touchend', this.touchEndListener);
    slider.addEventListener('touchmove', this.touchMoveListener, { passive: false });
    slider.addEventListener('click', this.clickListener);
  }

  ngOnDestroy() {
    const slider = this.carousel.nativeElement;
    slider.removeEventListener('touchstart', this.touchStartListener);
    slider.removeEventListener('touchend', this.touchEndListener);
    slider.removeEventListener('touchmove', this.touchMoveListener);
    slider.removeEventListener('click', this.clickListener);
  }

  onScroll() {
    // Só calcula o index se NÃO estiver arrastando (para economizar processamento)
    // ou se quiser atualização em tempo real, deixe sem o if.
    this.checkActiveIndex();
    if (this.isAutoScrolling) return;
    this.checkInfiniteLoop();
  }

  checkActiveIndex() {
    if (!this.carousel) return;
    const container = this.carousel.nativeElement;
    const centerPoint = container.scrollLeft + (container.clientWidth / 2);
    
    const cards = container.children;
    let closestDist = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < cards.length; i++) {
      const box = cards[i] as HTMLElement;
      const boxCenter = box.offsetLeft + (box.offsetWidth / 2);
      const dist = Math.abs(centerPoint - boxCenter);

      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    }

    if (closestIndex !== -1 && this.activeIndex !== closestIndex) {
      this.activeIndex = closestIndex;
      this.realActiveIndex = this.displayMembers[closestIndex].realIndex;
    }
  }

  checkInfiniteLoop() {
    // Pausa a verificação se estiver interagindo ou rolando automaticamente
    if (this.isDown || this.isAutoScrolling) return;

    const container = this.carousel.nativeElement;
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length < 2) return;

    // Calcula a largura exata de um conjunto (incluindo margens) medindo a distância entre cards
    const itemWidth = cards[1].offsetLeft - cards[0].offsetLeft;
    const oneSetWidth = itemWidth * this.originalMembers.length;

    if (container.scrollLeft < 50) { // Se chegar muito perto do início absoluto
       container.scrollLeft += oneSetWidth;
    }
    else if (container.scrollLeft > (oneSetWidth * 2)) { // Se passar do segundo set
       container.scrollLeft -= oneSetWidth;
    }
  }

  scrollToRealIndex(realIndex: number) {
    const middleSetStart = this.originalMembers.length;
    const targetIndex = middleSetStart + realIndex;
    this.scrollToIndex(targetIndex, true);
  }

  scrollToIndex(index: number, smooth: boolean) {
    if (!this.carousel) return;
    const container = this.carousel.nativeElement;
    const cards = container.children;
    
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const centerPos = Math.round(card.offsetLeft - (container.clientWidth / 2) + (card.offsetWidth / 2));

      this.isAutoScrolling = true;
      
      container.scrollTo({
        left: centerPos,
        behavior: smooth ? 'smooth' : 'auto'
      });

      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.isAutoScrolling = false;
        this.checkInfiniteLoop();
      }, 600);
    }
  }

  // --- DRAG (MODIFICADO PARA TRAVAR) ---
  
  startDrag(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.hasMoved = false;
    this.carousel.nativeElement.style.cursor = 'grabbing';
    
    const pageX = (e instanceof MouseEvent) ? e.pageX : e.touches[0].pageX;
    this.startX = pageX - this.carousel.nativeElement.offsetLeft;
    this.scrollLeft = this.carousel.nativeElement.scrollLeft;
    
    // Remove o smooth behavior enquanto arrasta para ficar responsivo
    this.carousel.nativeElement.style.scrollBehavior = 'auto';
  }

  stopDrag() {
    this.isDown = false;
    this.carousel.nativeElement.style.cursor = 'grab';
    this.carousel.nativeElement.style.scrollBehavior = 'smooth';

    // Se não houve movimento (foi apenas um clique), não fazemos o snap aqui.
    // Deixamos o evento de 'click' lidar com a navegação para evitar conflito.
    if (!this.hasMoved) return;

    // Recalcula qual é o card mais próximo AGORA, onde o usuário soltou
    this.checkActiveIndex();

    // AQUI ESTÁ A MÁGICA:
    // Ao soltar, forçamos o scroll para o item que estiver marcado como ativo (o mais próximo do centro)
    this.scrollToIndex(this.activeIndex, true);
  }

  moveDrag(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    
    const pageX = (e instanceof MouseEvent) ? e.pageX : e.touches[0].pageX;
    const x = pageX - this.carousel.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;

    // Adiciona um threshold (limite) para ignorar pequenos movimentos involuntários (tremor do mouse/dedo)
    // Isso garante que um clique não seja confundido com um arrasto
    if (Math.abs(walk) < 5) return;

    this.hasMoved = true;
    if (e.cancelable) e.preventDefault(); // Evita scroll da página no mobile enquanto arrasta

    this.carousel.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  handleCardClick(e: Event) {
    if (this.hasMoved) return; // Se estava arrastando, ignora o clique
    const target = e.target as HTMLElement;
    const card = target.closest('.team-card');
    if (card && this.carousel.nativeElement.contains(card)) {
      const index = Array.from(this.carousel.nativeElement.children).indexOf(card as HTMLElement);
      if (index !== -1) {
        this.scrollToIndex(index, true);
      }
    }
  }
}