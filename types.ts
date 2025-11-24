export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  image?: string;
  isStreaming?: boolean;
  error?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}