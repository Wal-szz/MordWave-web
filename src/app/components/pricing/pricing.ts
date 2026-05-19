import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface Plan {
  id: number;
  name: string;
  badge: string | null;
  price: string;
  period: string;
  then: string | null;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

@Component({
  selector: 'app-pricing',
  imports: [RevealDirective],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  readonly plans = signal<Plan[]>([
    {
      id: 1,
      name: 'Solo la web',
      badge: null,
      price: '$60.000',
      period: 'Pago único',
      then: null,
      description: 'Ideal si ya tienes hosting y solo necesitas el sitio listo.',
      features: [
        'Diseño 100% a medida',
        'Optimizado para móvil',
        'Formulario de contacto',
        'Sin mensualidad',
        'Dominio y hosting por tu cuenta',
      ],
      cta: 'Empezar',
      highlighted: false,
    },
    {
      id: 2,
      name: 'Web + Soporte',
      badge: 'Más completo',
      price: '$80.000',
      period: 'Primer mes todo incluido',
      then: 'Luego $20.000/mes',
      description: 'Todo en un solo lugar: web, dominio, hosting y soporte mensual.',
      features: [
        'Diseño 100% a medida',
        'Dominio + Hosting incluido',
        'Soporte técnico mensual',
        'Cambios de contenido',
        'Optimizado para móvil',
      ],
      cta: 'Empezar',
      highlighted: true,
    },
  ]);
}
