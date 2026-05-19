import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly year = signal(new Date().getFullYear());
  readonly navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Servicios', href: '#services' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Precios', href: '#pricing' },
    { label: 'Portafolio', href: '#portfolio' },
    { label: 'Contacto', href: '#contact' },
  ];
}
