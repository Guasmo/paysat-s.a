import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Contact } from '../contact/contact';
import { FeaturesSection } from "./sections/features-section/features-section";
import { IntegrationSection } from "./sections/integration-section/integration-section";
import { InstitutionalBenefitsSection } from "./sections/institutional-benefits-section/institutional-benefits-section";
import { WhyPaysatSection } from "./sections/why-paysat/why-paysat";

@Component({
  selector: 'app-main-content',
  imports: [Contact, FeaturesSection, IntegrationSection, InstitutionalBenefitsSection, WhyPaysatSection],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
})
export class MainContent { }
