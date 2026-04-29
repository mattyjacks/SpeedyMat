import { ChatSession, ChatMessage } from "./chat-types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "speedychat_sessions";
const SETTINGS_KEY = "speedychat_settings";

export function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: ChatSession[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    console.error("Failed to save chat sessions");
  }
}

export function createNewSession(title?: string): ChatSession {
  return {
    id: uuidv4(),
    title: title || `Chat ${new Date().toLocaleDateString()}`,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function addMessageToSession(
  sessionId: string,
  message: ChatMessage
): ChatSession | null {
  const sessions = loadSessions();
  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return null;

  session.messages.push(message);
  session.updatedAt = new Date();
  saveSessions(sessions);
  return session;
}

export function deleteSession(sessionId: string): void {
  const sessions = loadSessions();
  const filtered = sessions.filter((s) => s.id !== sessionId);
  saveSessions(filtered);
}

export function renameSession(sessionId: string, newTitle: string): void {
  const sessions = loadSessions();
  const session = sessions.find((s) => s.id === sessionId);
  if (session) {
    session.title = newTitle;
    session.updatedAt = new Date();
    saveSessions(sessions);
  }
}

export function clearAllSessions(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.error("Failed to clear chat sessions");
  }
}
