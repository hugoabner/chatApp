import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { UserChatConfig } from 'src/app/interfaces/ui-configs/user-chat-config.interface';
import { UserChatCardComponent } from 'src/app/components/user-chat-card/user-chat-card.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    SearchInputComponent,
    UserChatCardComponent
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit {

  userChats: UserChatConfig[] = [];
  currentUser: any;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserById().then((res) => {
      this.currentUser = res;
    }).catch((error) => {
      console.log(error);
    })
  }

  handleSearch ($event: string) {
    console.log('Parent: ', $event);
  }
}
