import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alcoholic-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alcoholic-tag.component.html',
  styleUrl: './alcoholic-tag.component.scss'
})
export class AlcoholicTagComponent {
  isAlcoholic = input.required<boolean>()
}
