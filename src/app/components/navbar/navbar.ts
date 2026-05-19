import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class Navbar {
  scrolled  = signal(false);
  menuOpen  = signal(false);

  navLinks = [
    { label: 'Inicio',     href: '#hero' },
    { label: 'Servicios',  href: '#services' },
    { label: 'Proceso',    href: '#proceso' },
    { label: 'Precios',    href: '#pricing' },
    { label: 'Portafolio', href: '#portfolio' },
    { label: 'Contacto',   href: '#contact' },
  ];

  onScroll() { this.scrolled.set(window.scrollY > 40); }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
