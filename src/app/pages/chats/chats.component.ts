import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { UserChatConfig } from 'src/app/interfaces/ui-configs/user-chat-config.interface';
import { UserChatCardComponent } from 'src/app/components/user-chat-card/user-chat-card.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

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
    public authService: AuthService,
    private readonly chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.authService.getUserById().then((res) => {
      this.currentUser = res;
    }).catch((error) => {
      console.log(error);
    });
    this.getUsers();
  }

  getUsers() {
    this.chatService.userSubject.subscribe(
      (res) => {
        this.userChats = res.map((item, index) => {
          const user : UserChatConfig = {
            fullName: item.fullName,
            text: '',
            time: '20.00',
            profile: item.profile,
            isActive: false,
            onclick: () => {
              const chatUserId = item.userId;
              //this.senderUser = user;
              //this.userChats.map(())
            }
          }
          return user
        })
      }
    )
  }

  handleSearch ($event: string) {
    console.log('Parent: ', $event);
  }
}

const currentUser = "hola";
