import { Component, signal } from '@angular/core';
import { Contact } from '../../components/contact/contact';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  open: boolean;
  height: number;
}

@Component({
  selector: 'app-recursos',
  imports: [Contact],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
})
export class Recursos {
  faqs: FaqItem[] = [
    {
      id: 1,
      question: '¿Qué es PAYSAT?',
      answer: 'PAYSAT Money S.A. es una empresa de tecnología financiera que ofrece infraestructura tecnológica para instituciones financieras. No somos un banco; prestamos servicios tecnológicos como integración bancaria, pagos móviles, wallets digitales, KYC, AML y monitoreo de fraude.',
      open: false,
      height: 0,
    },
    {
      id: 2,
      question: '¿Qué tipos de instituciones pueden usar PAYSAT?',
      answer: 'PAYSAT está diseñado para Bancos, Cooperativas, Mutualistas, Fintech, BPO Financiero, Factoring Electrónico y Sistemas ERP en Ecuador. Cualquier institución financiera regulada puede integrar nuestras soluciones tecnológicas.',
      open: false,
      height: 0,
    },
    {
      id: 3,
      question: '¿En qué países opera PAYSAT?',
      answer: 'Actualmente operamos en Ecuador, Colombia y Perú. Nuestra infraestructura está diseñada para expandirse a toda América Latina, permitiendo conexiones internacionales para remesas y pagos transfronterizos.',
      open: false,
      height: 0,
    },
    {
      id: 4,
      question: '¿Qué monedas admite la plataforma?',
      answer: 'La plataforma soporta USD (dólar estadounidense) como moneda principal en Ecuador, con soporte para múltiples monedas en transacciones internacionales dependiendo de la institución conectada.',
      open: false,
      height: 0,
    },
    {
      id: 5,
      question: '¿Puedo recibir y enviar transferencias internacionales?',
      answer: 'Sí, PAYSAT se conecta con corredores internacionales para habilitar recepción y envío de remesas con tarifas competitivas y acreditación inmediata. La disponibilidad depende de la institución financiera asociada.',
      open: false,
      height: 0,
    },
    {
      id: 6,
      question: '¿PAYSAT emite tarjetas de débito?',
      answer: 'PAYSAT提供 tecnología para emisión y gestión de tarjetas de débito y crédito bajo tu marca, con soporte para chip EMV y pagos sin contacto. La emisión real la realiza la institución financiera regulada.',
      open: false,
      height: 0,
    },
    {
      id: 7,
      question: '¿Las tarjetas y cuentas están vinculadas a una billetera digital?',
      answer: 'Sí, nuestras wallets digitales permiten vincular múltiples cuentas y tarjetas. Los usuarios pueden realizar transferencias P2P, pagos QR y gestión de beneficiarios desde una sola aplicación.',
      open: false,
      height: 0,
    },
    {
      id: 8,
      question: '¿Es seguro usar PAYSAT?',
      answer: 'Sí, contamos con certificación PCI DSS Nivel 1, cifrado de extremo a extremo, autenticación biométrica y monitoreo de fraude 24/7 con inteligencia artificial. Todos los datos se procesan bajo los más altos estándares de seguridad.',
      open: false,
      height: 0,
    },
    {
      id: 9,
      question: '¿Qué procesos de verificación se requieren?',
      answer: 'Para instituciones: due diligence y verificación regulatoria. Para usuarios finales: KYC con reconocimiento facial, validación de documentos OCR y verificación en listas OFAC/PEP. Todo el proceso es 100% digital.',
      open: false,
      height: 0,
    },
    {
      id: 10,
      question: '¿PAYSAT es un banco?',
      answer: 'No. PAYSAT Money S.A. es una empresa de tecnología financiera que presta servicios tecnológicos. No recibe depósitos, no otorga créditos y no realiza intermediación financiera directa. Todas las operaciones financieras son procesadas por la institución regulada correspondiente.',
      open: false,
      height: 0,
    },
    {
      id: 11,
      question: '¿Puedo integrar PAYSAT a mi sistema o plataforma?',
      answer: 'Sí, ofrecemos integración vía API REST bidireccional certificada. Nuestra guía de integración documenta todos los endpoints, autenticación OAuth 2.0 y flujos de trabajo para conectar tu core bancario en menos de 8 semanas.',
      open: false,
      height: 0,
    },
  ];

  toggleFaq(faq: FaqItem) {
    if (!faq.open) {
      // Calculate height before opening
      setTimeout(() => {
        const el = document.getElementById('faq-answer-' + faq.id);
        if (el) {
          faq.height = el.scrollHeight;
        }
      }, 0);
    }
    faq.open = !faq.open;
  }
}
