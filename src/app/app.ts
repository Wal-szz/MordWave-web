import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Pricing } from './components/pricing/pricing';
import { Portfolio } from './components/portfolio/portfolio';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Services, Pricing, Portfolio, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
