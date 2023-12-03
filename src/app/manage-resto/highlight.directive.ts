import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor: string = 'pink';

  // Déclarez une sortie (output) pour émettre un événement lors du survol
  @Output() highlightEvent = new EventEmitter<string>();
  constructor(private el: ElementRef) {}

  // Utilisez HostListener pour écouter l'événement de survol
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor); // Appliquez la surbrillance avec la couleur spécifiée
    this.highlightEvent.emit('Mouse entered!'); // Émettez l'événement de survol
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null); // Supprimez la surbrillance lorsqu'on quitte l'élément
    this.highlightEvent.emit('Mouse left!'); // Émettez l'événement lorsque le curseur quitte l'élément
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
