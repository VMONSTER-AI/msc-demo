declare class RoomManager {
    constructor(config: any);
    setOnMessage(handler: any): void;
    setOnAgentEnter(handler: any): void;
    setOnError(handler: any): void;
    setOnAgentSpeakingStart(handler: any): void;
    setOnAgentSpeakingEnd(handler: any): void;
    setOnClose(handler: any): void;
    addAgentVideoTile(parentSelector?: string): void;
    clearAgentVideoTile(): void;
    start(): Promise<void>;
    leave(): Promise<void>;
    sendMessage(text: any, bgImage: any, position_x: any, position_y: any, scale: any): Promise<void>;
    userChatState(): any;
    isAgentSpeaking(): null;
    isUserExists(): boolean;
    isAgentExists(): boolean;
    #private;
}

export { RoomManager as default };
