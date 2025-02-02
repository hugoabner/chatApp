import { Component } from '@angular/core';
import { ChatBubbleComponent } from "../../components/chat-bubble/chat-bubble.component";
import { ChatBubbleConfig } from '../../interfaces/ui-configs/chat-bubble-config.interface';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { UserChatCardComponent } from "../../components/user-chat-card/user-chat-card.component";
import { UserChatConfig } from '../../interfaces/ui-configs/user-chat-config.interface';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ChatBubbleComponent,
    SearchInputComponent,
    UserChatCardComponent
],
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

  userChat: UserChatConfig = {
    fullName: 'John Doe',
    text: 'How are you',
    time: '20:00',
    profile: 'assets/images.png',
    isActive: false,
  }

  userChatActive: UserChatConfig = {
    fullName: 'John Doe',
    text: 'How are you',
    time: '20:00',
    profile: 'assets/images.png',
    isActive: true,
  }

  handleSearch ($event: string) {
    console.log('Parent: ', $event);
  }


}
