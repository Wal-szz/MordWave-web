import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  accentColor: string;
  image: string;
  imageAlt: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {
  readonly projects = signal<Project[]>([
    {
      id: 1,
      name: 'Ink & Soul',
      category: 'Landing Page',
      description:
        'Sitio web para estudio de tatuajes en Chillán. Diseño oscuro y elegante con galería de trabajos, formulario de reserva y sección de artistas.',
      tags: ['Angular', 'SCSS', 'Responsive', 'Vercel'],
      url: 'https://tatto-landingpage.vercel.app',
      accentColor: '#C9A96E',
      image: 'portfolio-ink-soul.png',
      imageAlt: 'Captura de pantalla del sitio web Ink & Soul, estudio de tatuajes',
    },
  ]);
}
