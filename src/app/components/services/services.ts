import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface Service {
  id: number;
  icon: 'landing' | 'web' | 'pyme';
  number: string;
  title: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  imports: [RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  readonly services = signal<Service[]>([
    {
      id: 1,
      icon: 'landing',
      number: '01',
      title: 'Landing Page',
      description: 'Una página de presentación profesional, diseñada para convertir visitas en clientes.',
      features: [
        'Diseño personalizado',
        'Optimizada para móvil',
        'Formulario de contacto',
        'Sin mensualidad',
      ],
    },
    {
      id: 2,
      icon: 'web',
      number: '02',
      title: 'Sitio Web',
      description: 'Páginas web completas con múltiples secciones, ideal para negocios que necesitan más.',
      features: [
        'Varias secciones y páginas',
        'Panel de administración',
        'SEO básico incluido',
        'Soporte post-entrega',
      ],
    },
    {
      id: 3,
      icon: 'pyme',
      number: '03',
      title: 'Pymes',
      description: 'Solución web para pequeñas y medianas empresas locales que quieren presencia digital profesional sin pagar precios de agencia.',
      features: [
        'Análisis de necesidades',
        'Diseño acorde al negocio',
        'Integración con redes sociales',
        'Precios accesibles',
      ],
    },
  ]);
}
