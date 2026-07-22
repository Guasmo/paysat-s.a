import { Component } from '@angular/core';
import { Contact } from '../../components/contact/contact';
import { SolHero } from './sections/sol-hero/sol-hero';
import { SolGrid } from './sections/sol-grid/sol-grid';

@Component({
  selector: 'app-services',
  imports: [Contact, SolHero, SolGrid],
  templateUrl: './solutions.html',
  styleUrl: './solutions.css',
})
export class Solutions { }
