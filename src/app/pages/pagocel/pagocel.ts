import { Component, ViewEncapsulation } from '@angular/core';
import { Contact } from '../../components/contact/contact';
import { PgcHero } from './sections/pgc-hero/pgc-hero';
import { PgcTransfer } from './sections/pgc-transfer/pgc-transfer';
import { PgcQr } from './sections/pgc-qr/pgc-qr';
import { PgcCore } from './sections/pgc-core/pgc-core';

@Component({
  selector: 'app-pagocel',
  imports: [Contact, PgcHero, PgcTransfer, PgcQr, PgcCore],
  templateUrl: './pagocel.html',
  styleUrl: './pagocel.css',
  encapsulation: ViewEncapsulation.None
})
export class Pagocel { }