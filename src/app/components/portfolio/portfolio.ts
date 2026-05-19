import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

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
  isDemo?: boolean;
  highlight?: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [RevealDirective],
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
        'Proyecto concepto para estudio de tatuajes en Chillán. Diseño oscuro y elegante con galería de trabajos, formulario de reserva de sesión y sección de artistas.',
      tags: ['Angular', 'SCSS', 'Responsive', 'Vercel'],
      url: 'https://tatto-landingpage.vercel.app',
      accentColor: '#C9A96E',
      image: 'portfolio-ink-soul.png',
      imageAlt: 'Captura de pantalla del sitio web Ink & Soul, estudio de tatuajes',
      isDemo: true,
    },
    {
      id: 2,
      name: "Nulanio's Burgers",
      category: 'Sitio Web',
      description:
        'Emprendimiento familiar de hamburguesas artesanales en Coihueco, recién lanzado. Necesitaban presencia digital rápida: menú visible, historia del negocio y pedidos directos por WhatsApp.',
      tags: ['Angular', 'SCSS', 'Responsive', 'Vercel'],
      url: 'https://nulanios-burgers.vercel.app',
      accentColor: '#D4A017',
      image: 'portfolio-nulanios.png',
      imageAlt: "Captura de pantalla del sitio web Nulanio's Burgers",
      highlight: 'Entregado en 1 día',
    },
  ]);
}
