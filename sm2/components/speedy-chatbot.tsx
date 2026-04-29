"use client";

import { useState, useRef, useEffect } from "react";
import { ChatSession, ChatMessage } from "@/lib/chat-types";
import {
  loadSessions,
  saveSessions,
  createNewSession,
  deleteSession,
  renameSession,
} from "@/lib/chat-storage";
import {
  Send,
  Plus,
  Trash2,
  Menu,
  X,
  Settings,
  Copy,
  Edit2,
  Check,
  Loader,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function SpeedyChatbot() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadedSessions = loadSessions();
    setSessions(loadedSessions);
    if (loadedSessions.length === 0) {
      const newSession = createNewSession();
      setSessions([newSession]);
      setCurrentSessionId(newSession.id);
    } else {
      setCurrentSessionId(loadedSessions[0].id);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions]);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  const handleNewChat = () => {
    const newSession = createNewSession();
    const updated = [newSession, ...sessions];
    setSessions(updated);
    saveSessions(updated);
    setCurrentSessionId(newSession.id);
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);
    if (currentSessionId === sessionId && updated.length > 0) {
      setCurrentSessionId(updated[0].id);
    }
  };

  const handleRenameSession = (sessionId: string, newTitle: string) => {
    renameSession(sessionId, newTitle);
    const updated = sessions.map((s) =>
      s.id === sessionId ? { ...s, title: newTitle } : s
    );
    setSessions(updated);
    setEditingSessionId(null);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !currentSession || loading) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      updatedAt: new Date(),
    };

    const updatedSessions = sessions.map((s) =>
      s.id === currentSessionId ? updatedSession : s
    );
    setSessions(updatedSessions);
    saveSessions(updatedSessions);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedSession.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, assistantMessage],
        updatedAt: new Date(),
      };

      const finalSessions = updatedSessions.map((s) =>
        s.id === currentSessionId ? finalSession : s
      );
      setSessions(finalSessions);
      saveSessions(finalSessions);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content:
          "Chirp! Something went wrong. Make sure your OPENAI_API_KEY is set up properly!",
        timestamp: new Date(),
      };

      const errorSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, errorMessage],
      };

      const errorSessions = updatedSessions.map((s) =>
        s.id === currentSessionId ? errorSession : s
      );
      setSessions(errorSessions);
      saveSessions(errorSessions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } border-r bg-card transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group rounded-lg p-3 cursor-pointer transition-colors ${
                currentSessionId === session.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-muted-foreground"
              }`}
              onClick={() => setCurrentSessionId(session.id)}
            >
              {editingSessionId === session.id ? (
                <div className="flex gap-2">
                  <input
                    autoFocus
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="flex-1 bg-background border rounded px-2 py-1 text-xs"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRenameSession(session.id, editingTitle);
                      }
                    }}
                  />
                  <button
                    onClick={() =>
                      handleRenameSession(session.id, editingTitle)
                    }
                    className="p-1 hover:bg-primary/20 rounded"
                  >
                    <Check className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm truncate">{session.title}</span>
                  <div className="hidden group-hover:flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSessionId(session.id);
                        setEditingTitle(session.title);
                      }}
                      className="p-1 hover:bg-primary/20 rounded"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSession(session.id);
                      }}
                      className="p-1 hover:bg-red-500/20 rounded text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold">SpeedyChat</h1>
            <p className="text-xs text-muted-foreground">
              Powered by Speedy the Bird
            </p>
          </div>
          <div className="w-10" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentSession && currentSession.messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">🐦</div>
              <h2 className="text-2xl font-bold mb-2">Hey there!</h2>
              <p className="text-muted-foreground max-w-md">
                I'm Speedy, your witty laundry companion. Ask me anything about
                SpeedyMat, laundry, or just chat for some laughs! I promise to
                keep things CLEAN. 😄
              </p>
            </div>
          )}

          {currentSession?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md lg:max-w-2xl rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground border"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === "user"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground border rounded-lg p-4 flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span className="text-sm">Speedy is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-card p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask Speedy anything..."
              disabled={loading}
              className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="rounded-lg bg-primary px-4 py-2.5 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl border p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-4">SpeedyChat Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Model</label>
                <p className="text-sm text-muted-foreground mt-1">
                  GPT-4o Mini (OpenAI's fastest model)
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Temperature</label>
                <p className="text-sm text-muted-foreground mt-1">
                  0.9 (Very creative & funny)
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Max Tokens</label>
                <p className="text-sm text-muted-foreground mt-1">500</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Speedy is configured to be witty, helpful, and always keep
                  things CLEAN! 🐦
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="w-full mt-6 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
