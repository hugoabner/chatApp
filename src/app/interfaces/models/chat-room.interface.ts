export interface Message {
  senderId: string,
  messageText: string,
  timestamp: Date,
  read : boolean,
  messageType : "text" | "image" | "video" | "audio",
  fullName: string
}

export interface ChatRoom {
  chatRoomId?: string,
  users: string[],
  lastMessage: string,
  lastMessageTimestamp: Date,
  messages: Message[],
}
