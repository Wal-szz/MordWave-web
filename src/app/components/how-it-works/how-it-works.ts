import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface Step {
  id: number;
  number: string;
  icon: 'chat' | 'design' | 'code' | 'rocket';
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  imports: [RevealDirective],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorks {
  readonly steps = signal<Step[]>([
    {
      id: 1,
      number: '01',
      icon: 'chat',
      title: 'Conversamos',
      description: 'Nos contás tu negocio y qué necesitás. Sin formularios complicados — una conversación directa por email o DM.',
    },
    {
      id: 2,
      number: '02',
      icon: 'design',
      title: 'Diseñamos',
      description: 'Creamos el diseño a medida de tu negocio antes de escribir una línea de código. Vos lo aprobás.',
    },
    {
      id: 3,
      number: '03',
      icon: 'code',
      title: 'Desarrollamos',
      description: 'Construimos tu sitio con tecnología moderna: rápido, seguro y optimizado para móvil y para que Google lo encuentre.',
    },
    {
      id: 4,
      number: '04',
      icon: 'rocket',
      title: 'Entregamos',
      description: 'Tu sitio live en menos de 7 días. Con revisiones incluidas y soporte post-entrega.',
    },
  ]);
}
