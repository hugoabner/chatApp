import { Component } from '@angular/core';
import { ChatBubbleComponent } from "../../components/chat-bubble/chat-bubble.component";
import { ChatBubbleConfig } from '../../interfaces/ui-configs/chat-bubble-config.interface';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ChatBubbleComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  leftConfig: ChatBubbleConfig = {
    text: 'Hellow how are you Left',
    position: 'left'
  }

  rightConfig: ChatBubbleConfig = {
    text: 'Hi man i am al good',
    position: 'right'
  }
}
