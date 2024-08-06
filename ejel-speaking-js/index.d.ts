interface RoomManagerConfig {
  url: string;
  token: string;
  name: string;
  apiKey: string;
  apiUrl: string;
}
type ChatState =
  | "new"
  | "loading"
  | "loaded"
  | "joining-chat"
  | "joined-chat"
  | "left-chat"
  | "error";

declare class RoomManager {
  constructor(config: RoomManagerConfig);
  setOnMessage(handler: (arg0: string) => void): void;
  setOnAgentEnter(handler: () => void): void;
  setOnError(handler: (arg0: any) => void): void;
  setOnAgentSpeakingStart(handler: () => void): void;
  setOnAgentSpeakingEnd(handler: () => void): void;
  setOnClose(handler: () => void): void;
  addAgentVideoTile(parentSelector?: string): void;
  clearAgentVideoTile(): void;
  start(): Promise<void>;
  leave(): Promise<void>;
  sendMessage(text: string, bgImage?: File): Promise<void>;
  userChatState(): ChatState;
  isAgentSpeaking(): boolean | null;
  isUserExists(): boolean;
  isAgentExists(): boolean;
  #private;
}

export { RoomManager as default };
