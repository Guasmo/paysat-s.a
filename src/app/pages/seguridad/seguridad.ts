import { Component } from '@angular/core';
import { Contact } from '../../components/contact/contact';
import { SegHero } from './sections/seg-hero/seg-hero';
import { SegFeatures } from './sections/seg-features/seg-features';
import { SegDisclaimer } from './sections/seg-disclaimer/seg-disclaimer';

@Component({
  selector: 'app-seguridad',
  imports: [Contact, SegHero, SegFeatures, SegDisclaimer],
  templateUrl: './seguridad.html',
  styleUrl: './seguridad.css',
})
export class Seguridad { }
