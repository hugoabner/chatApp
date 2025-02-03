import { AuthService } from 'src/app/services/auth.service';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatRoom } from '../interfaces/models/chat-room.interface';
import { collection, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  USER = 'user';
  CHAT_ROOM = 'chat-room';
  authService = inject(AuthService);
  userSubject: Subject<any[]> = new Subject();
  chatRoomSubject: Subject<ChatRoom> = new Subject();
  constructor(private readonly firestore: Firestore) { }

  getAllUsers() {
    const userCollection = collection(this.firestore, this.USER);
    const userId = this.authService.getCurrentUser().uid ?? '';
    const queryRef = query(userCollection, where('userId', '!=', userId));
    let users: any[] = [];
    return onSnapshot(queryRef, (snapShot) => {
      const data = snapShot.docChanges().map((docs) => {
        if (docs.type === 'added') {
          if (userId !== docs.doc.id) {
            users.push(docs.doc.data());
            this.userSubject.next(users);
          }
        } else if (docs.type === 'removed') {

        } else if (docs.type === 'modified') {

        }
      })
    })
  }
}
