import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { 
  faChevronLeft, faChevronRight, faList, faCalendarAlt, faPlay 
} from '@fortawesome/free-solid-svg-icons';
import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  duration: number;
  platform: 'twitch' | 'youtube';
  channelName: string;
  color: string;
  textColor: string;
  startRow: number;
  videoUrl?: SafeResourceUrl;
}

interface DayColumn {
  dayName: string;
  date: string;
  active: boolean;
}

interface AccordionItem {
  dateLabel: string;
  isOpen: boolean;
  events: { name: string; time: string }[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './calendar.html',
  styles: [`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class CalendarComponent {
  private sanitizer = inject(DomSanitizer);

  // Ícones
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faList = faList;
  faCalendarAlt = faCalendarAlt;
  faTwitch = faTwitch;
  faYoutube = faYoutube;
  faPlay = faPlay;

  // Estado
  hoveredEventId: number | null = null;
  currentDayIndex = 0;
  daysToShow = 6; 

  // --- MOCK DATA: Lista Expandida ---
  allDays: DayColumn[] = [
    { dayName: 'Seg', date: '02/08', active: false },
    { dayName: 'Ter', date: '03/08', active: false },
    { dayName: 'Qua', date: '04/08', active: false },
    { dayName: 'Qui', date: '05/08', active: true }, // Começa ativo
    { dayName: 'Sex', date: '06/08', active: false },
    { dayName: 'Sáb', date: '07/08', active: false },
    { dayName: 'Dom', date: '08/08', active: false },
    { dayName: 'Seg', date: '09/08', active: false },
    { dayName: 'Ter', date: '10/08', active: false },
    { dayName: 'Qua', date: '11/08', active: false },
    { dayName: 'Qui', date: '12/08', active: false },
    { dayName: 'Sex', date: '13/08', active: false },
  ];

  // Mock Events
  scheduleEvents: CalendarEvent[] = [
    {
      id: 1,
      title: 'CS:GO ESL 2025',
      time: '10:00 - Twitch',
      duration: 2,
      platform: 'twitch',
      channelName: 'gaules',
      color: 'bg-[#FFD600]',
      textColor: 'text-black',
      startRow: 2
    },
    {
      id: 2,
      title: 'Apex Legends Esports World Cup 2024',
      time: '11:30 - Twitch & Youtube',
      duration: 1.5,
      platform: 'youtube',
      channelName: 'gaules.tv',
      color: 'bg-[#9AE1FF]',
      textColor: 'text-black',
      startRow: 3.5
    },
    {
      id: 3,
      title: 'VALORANT Champions',
      time: '13:00 - Twitch',
      duration: 2,
      platform: 'twitch',
      channelName: 'mch_agg',
      color: 'bg-[#D50000]',
      textColor: 'text-white',
      startRow: 5
    }
  ];

  accordionItems: AccordionItem[] = [
    {
      dateLabel: 'Hoje (07/08)',
      isOpen: true,
      events: [
        { name: 'CS:GO ESL 2025', time: '10:00' },
        { name: 'Apex Legends Esports World Cup', time: '12:00' },
        { name: 'Cloud9 vs NIP - BLAST Premier', time: '16:00' },
        { name: 'MIBR X ODDIK - ESL Challenger', time: '17:00' },
      ]
    },
    {
      dateLabel: 'Amanhã (08/08)',
      isOpen: false,
      events: [ { name: 'Furia vs Navi', time: '14:00' } ]
    },
    {
      dateLabel: 'Quinta-feira (09/08)',
      isOpen: false,
      events: []
    },
    {
      dateLabel: 'Sexta-feira (10/08)',
      isOpen: false,
      events: []
    }
  ];

  // --- LÓGICA DO CARROSSEL DE DATAS ---
  get visibleDays(): DayColumn[] {
    return this.allDays.slice(this.currentDayIndex, this.currentDayIndex + this.daysToShow);
  }

  nextDays() {
    if (this.currentDayIndex + this.daysToShow < this.allDays.length) {
      this.currentDayIndex++;
    }
  }

  prevDays() {
    if (this.currentDayIndex > 0) {
      this.currentDayIndex--;
    }
  }

  // NOVA LÓGICA: Selecionar Dia ao Clicar
  selectDay(selectedDay: DayColumn) {
    // Desativa todos e ativa só o clicado
    this.allDays.forEach(day => day.active = false);
    selectedDay.active = true;
    
    // Opcional: Aqui você carregaria os eventos daquele dia específico
    // this.loadEventsForDate(selectedDay.date);
  }

  toggleAccordion(index: number) {
    this.accordionItems.forEach((item, i) => {
      if (i === index) {
        item.isOpen = !item.isOpen;
      } else {
        item.isOpen = false;
      }
    });
  }

  // --- LÓGICA DO VÍDEO HOVER ---
  onEventHover(event: CalendarEvent) {
    this.hoveredEventId = event.id;
    if (!event.videoUrl) {
      event.videoUrl = this.getSafeUrl(event.platform, event.channelName);
    }
  }

  onEventLeave() {
    this.hoveredEventId = null;
  }

  getSafeUrl(platform: string, channel: string): SafeResourceUrl {
    let url = '';
    const domain = window.location.hostname;
    
    // muted=true É OBRIGATÓRIO PARA AUTOPLAY NO CHROME
    if (platform === 'twitch') {
      url = `https://player.twitch.tv/?channel=${channel}&parent=${domain}&muted=true&autoplay=true&controls=false`;
    } else {
      url = `https://www.youtube.com/embed/live_stream?channel=${channel}&autoplay=1&mute=1&controls=0`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}