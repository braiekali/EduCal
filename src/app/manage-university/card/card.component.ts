import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() university: any;
  @Output()sendmsg=new EventEmitter();


  sendDataToParent(){
    this.sendmsg.emit('bonjour');
  }
}
