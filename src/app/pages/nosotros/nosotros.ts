import { Component } from '@angular/core';
import { Contact } from '../../components/contact/contact';
import { NosMission } from './sections/nos-mission/nos-mission';
import { NosVision } from './sections/nos-vision/nos-vision';
import { NosHero } from './sections/nos-hero/nos-hero';
import { NosClients } from './sections/nos-clients/nos-clients';

@Component({
  selector: 'app-nosotros',
  imports: [Contact, NosHero, NosMission, NosVision, NosClients],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros { }