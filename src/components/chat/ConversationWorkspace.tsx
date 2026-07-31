"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  ClipboardList,
  Mic,
  Paperclip,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import {
  advance,
  photoAdded,
  progressStepFor,
  skipPhoto,
  startConversation,
  type ConversationState,
  type EngineAction,
  type EngineResult,
  type SafetyNotice,
  type StartOptions,
} from "@/lib/engine";
import { Logo } from "@/components/Logo";
import { CameraCaptureModal } from "@/components/chat/CameraCaptureModal";
import { SafetyAlert } from "@/components/chat/SafetyAlert";
import { JobProgress } from "@/components/chat/JobProgress";
import { LiveJobSummary } from "@/components/chat/LiveJobSummary";
import { JobReview } from "@/components/chat/JobReview";
import { SubmissionConfirmation } from "@/components/chat/SubmissionConfirmation";

interface DisplayMessage {
  id: number;
  role: "ai" | "user";
  text: string;
  safety?: SafetyNotice;
  /** Attached photo previews (object/data URLs). */
  photos?: string[];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeReference() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SM-${out}`;
}

export function ConversationWorkspace(props: StartOptions) {
  const router = useRouter();
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [engineState, setEngineState] = useState<ConversationState | null>(null);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [actions, setActions] = useState<EngineAction[]>([]);
  const [inputHint, setInputHint] = useState<string | undefined>();
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const idRef = useRef(0);
  const startedRef = useRef(false);
  const cancelledRef = useRef(false);
  const stateRef = useRef<ConversationState | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLInputElement>(null);

  const pushMessage = useCallback(
    (message: Omit<DisplayMessage, "id">) => {
      setMessages((prev) => [...prev, { ...message, id: ++idRef.current }]);
    },
    [],
  );

  const deliver = useCallback(
    async (result: EngineResult) => {
      setEngineState(result.state);
      stateRef.current = result.state;
      setQuickReplies([]);
      setActions([]);
      setInputHint(result.inputHint);
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      for (const message of result.messages) {
        setTyping(true);
        await sleep(reduced ? 60 : 450 + Math.min(message.text.length * 6, 650));
        if (cancelledRef.current) {
          setTyping(false);
          return;
        }
        setTyping(false);
        pushMessage({ role: "ai", text: message.text, safety: message.safety });
      }
      setQuickReplies(result.quickReplies ?? []);
      setActions(result.actions ?? []);
    },
    [pushMessage],
  );

  // Kick off the conversation once (guards against StrictMode double-run).
  useEffect(() => {
    // Always un-cancel on effect (re-)run. Cleanup+setup pairs fire on hot
    // reload and StrictMode remounts — resetting only on the first run left
    // the flag stuck true, silently killing every message afterwards.
    cancelledRef.current = false;
    if (startedRef.current) return;
    startedRef.current = true;
    if (props.initialMessage) {
      pushMessage({ role: "user", text: props.initialMessage });
    }
    void deliver(startConversation(props));
    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, typing, quickReplies, actions]);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      const state = stateRef.current;
      if (!trimmed || !state || typing) return;
      pushMessage({ role: "user", text: trimmed });
      setValue("");
      if (state.stage === "review") {
        const nextState: ConversationState = {
          ...state,
          brief: {
            ...state.brief,
            notes: [...state.brief.notes, trimmed],
          },
        };
        setEngineState(nextState);
        stateRef.current = nextState;
        void deliver({
          messages: [
            {
              text: "I've added that to your job notes. Anything else, or are you ready to send it?",
            },
          ],
          state: nextState,
        });
        return;
      }
      void deliver(advance(state, trimmed));
    },
    [deliver, pushMessage, typing],
  );

  const handlePhotos = useCallback(
    (label: string, photos: string[]) => {
      const state = stateRef.current;
      if (!state || photos.length === 0) return;
      const count = photos.length;
      setPhotoUrls((prev) => [...prev, ...photos]);
      pushMessage({ role: "user", text: label, photos });
      if (state.stage === "photo") {
        void deliver(photoAdded(state, count));
        return;
      }
      const nextState: ConversationState = {
        ...state,
        brief: { ...state.brief, photos: state.brief.photos + count },
      };
      void deliver({
        messages: [
          {
            text: `Thanks — I've attached ${count === 1 ? "the photo" : `${count} photos`} to your job request.`,
          },
        ],
        quickReplies,
        state: nextState,
      });
    },
    [deliver, pushMessage, quickReplies],
  );

  function handleAction(action: EngineAction) {
    const state = stateRef.current;
    if (!state) return;
    if (action.action === "upload-photo") {
      fileRef.current?.click();
      return;
    }
    if (action.action === "open-camera") {
      setCameraOpen(true);
      return;
    }
    pushMessage({ role: "user", text: action.label });
    void deliver(skipPhoto(state));
  }

  function handleFiles(files: FileList | null, input: HTMLInputElement | null) {
    if (!files || files.length === 0) return;
    const urls = [...files]
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => URL.createObjectURL(file));
    if (urls.length > 0) {
      handlePhotos(
        urls.length === 1 ? "Uploaded a photo" : `Uploaded ${urls.length} photos`,
        urls,
      );
    }
    if (input) input.value = "";
  }

  const handleCapture = useCallback(
    (dataUrl: string) => {
      setCameraOpen(false);
      handlePhotos("Captured a photo with the camera", [dataUrl]);
    },
    [handlePhotos],
  );

  // No camera available (denied, missing, or insecure origin): fall back to
  // the native capture input — on phones that opens the camera app directly.
  const handleCameraUnavailable = useCallback(() => {
    setCameraOpen(false);
    captureRef.current?.click();
  }, []);

  function restart() {
    cancelledRef.current = true;
    setMessages([]);
    setQuickReplies([]);
    setActions([]);
    setTyping(false);
    setSubmitted(false);
    setSummaryOpen(false);
    setValue("");
    // Let the previous deliver loop observe the cancel flag, then restart.
    setTimeout(() => {
      cancelledRef.current = false;
      void deliver(startConversation({}));
    }, 50);
  }

  function submitJob() {
    setReference(makeReference());
    setSubmitted(true);
  }

  const brief = engineState?.brief;
  const progressStep = engineState ? progressStepFor(engineState.stage) : 0;
  const showReview =
    !submitted && !typing && engineState?.stage === "review";

  if (submitted && brief) {
    return (
      <div className="flex min-h-dvh flex-col bg-cloud">
        <header className="flex h-14 items-center justify-between border-b border-line bg-white px-4">
          <Logo />
          <Link href="/privacy" className="text-xs text-muted hover:text-ink">
            Privacy
          </Link>
        </header>
        <SubmissionConfirmation
          brief={brief}
          reference={reference}
          onRestart={restart}
        />
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-cloud">
      {/* Header */}
      <header className="z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-white px-3 sm:px-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden items-center gap-1.5 rounded-full bg-cloud px-2.5 py-1 text-xs font-medium text-muted sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            AI job assistant
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            href="/privacy"
            className="hidden px-2 text-xs text-muted hover:text-ink sm:block"
          >
            Privacy
          </Link>
          <button
            type="button"
            onClick={() => setSummaryOpen(!summaryOpen)}
            aria-expanded={summaryOpen}
            className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-semibold text-navy hover:border-blue hover:text-blue lg:hidden"
          >
            <ClipboardList className="h-3.5 w-3.5" aria-hidden />
            Job details
          </button>
          <button
            type="button"
            onClick={restart}
            aria-label="Restart conversation"
            title="Restart conversation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-cloud hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setExitConfirm(true)}
            aria-label="Exit conversation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-cloud hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 overflow-hidden px-0 sm:px-4 lg:px-6">
        {/* Conversation column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className="flex-1 overflow-y-auto px-4 py-6 sm:px-2"
            aria-live="polite"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              {messages.map((message) =>
                message.safety ? (
                  <div key={message.id} className="rise-in">
                    <SafetyAlert notice={message.safety} />
                  </div>
                ) : (
                  <div
                    key={message.id}
                    className={`rise-in max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                      message.role === "user"
                        ? "self-end rounded-br-md bg-blue text-white"
                        : "self-start rounded-bl-md border border-line bg-white text-ink"
                    }`}
                  >
                    {message.text}
                    {message.photos && message.photos.length > 0 && (
                      <span className="mt-2 flex flex-wrap gap-2">
                        {message.photos.map((src, index) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={index}
                            src={src}
                            alt={`Attached photo ${index + 1}`}
                            className="h-24 w-24 rounded-xl border border-white/30 object-cover"
                          />
                        ))}
                      </span>
                    )}
                  </div>
                ),
              )}

              {typing && (
                <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3.5">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
                  <span className="sr-only">AI agent is typing</span>
                </div>
              )}

              {!typing && quickReplies.length > 0 && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="Quick replies">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => send(reply)}
                      className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {!typing && actions.length > 0 && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="Options">
                  {actions.map((action) => (
                    <button
                      key={action.action}
                      type="button"
                      onClick={() => handleAction(action)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        action.action === "skip-photo"
                          ? "border border-line bg-white text-muted hover:text-ink"
                          : "bg-blue text-white hover:bg-blue-deep"
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {showReview && brief && engineState && (
                <JobReview
                  brief={brief}
                  onUpdate={(field, fieldValue) => {
                    const next = {
                      ...engineState,
                      brief: { ...engineState.brief, [field]: fieldValue },
                    };
                    setEngineState(next);
                    stateRef.current = next;
                  }}
                  onAddMore={() => inputRef.current?.focus()}
                  onSubmit={submitJob}
                />
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-line bg-white px-3 py-3 sm:rounded-t-2xl sm:border sm:border-b-0">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(value);
              }}
              className="mx-auto flex max-w-2xl items-center gap-1.5"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) =>
                  handleFiles(event.target.files, fileRef.current)
                }
                aria-label="Upload photos"
              />
              <input
                ref={captureRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(event) =>
                  handleFiles(event.target.files, captureRef.current)
                }
                aria-label="Take a photo with your device camera"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Attach photos"
                title="Attach photos"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted hover:bg-cloud hover:text-blue"
              >
                <Paperclip className="h-4.5 w-4.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setCameraOpen(true)}
                aria-label="Take a photo"
                title="Take a photo"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted hover:bg-cloud hover:text-blue"
              >
                <Camera className="h-4.5 w-4.5" aria-hidden />
              </button>
              <label htmlFor="chat-input" className="sr-only">
                Type your answer
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={inputHint ?? "Type your answer…"}
                autoComplete="off"
                className="h-11 min-w-0 flex-1 rounded-full border border-line bg-cloud px-4 text-[15px] text-ink placeholder:text-muted focus:border-blue focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setMicActive(!micActive)}
                aria-pressed={micActive}
                aria-label="Voice input"
                title="Voice input (simulated in this prototype)"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                  micActive
                    ? "soft-pulse bg-danger/10 text-danger"
                    : "text-muted hover:bg-cloud hover:text-blue"
                }`}
              >
                <Mic className="h-4.5 w-4.5" aria-hidden />
              </button>
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-white transition-colors hover:bg-blue-deep disabled:opacity-40"
                disabled={!value.trim()}
              >
                <Send className="h-4.5 w-4.5" aria-hidden />
              </button>
            </form>
            {micActive && (
              <p className="mx-auto mt-2 max-w-2xl px-1 text-xs text-muted">
                Voice input is simulated in this prototype — type your answer
                instead.
              </p>
            )}
          </div>
        </div>

        {/* Desktop side panel */}
        <aside
          className="hidden w-80 shrink-0 flex-col gap-6 overflow-y-auto py-6 lg:flex"
          aria-label="Job request details"
        >
          <div className="rounded-3xl border border-line bg-white p-5">
            <JobProgress current={progressStep} />
          </div>
          {brief && (
            <div className="rounded-3xl border border-line bg-white p-5">
              <LiveJobSummary brief={brief} photoUrls={photoUrls} />
            </div>
          )}
        </aside>
      </div>

      {/* Mobile summary sheet */}
      {summaryOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button
            type="button"
            aria-label="Close job details"
            onClick={() => setSummaryOpen(false)}
            className="absolute inset-0 bg-navy/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Job request details"
            className="absolute inset-x-0 bottom-0 max-h-[80dvh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-lift"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" aria-hidden />
            <JobProgress current={progressStep} />
            <div className="mt-6">{brief && <LiveJobSummary brief={brief} photoUrls={photoUrls} />}</div>
            <button
              type="button"
              onClick={() => setSummaryOpen(false)}
              className="mt-5 w-full rounded-full border border-line px-5 py-3 text-sm font-semibold text-navy"
            >
              Back to conversation
            </button>
          </div>
        </div>
      )}

      {/* Exit confirmation */}
      {cameraOpen && (
        <CameraCaptureModal
          onCapture={handleCapture}
          onClose={() => setCameraOpen(false)}
          onUnavailable={handleCameraUnavailable}
        />
      )}

      {exitConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Cancel exit"
            onClick={() => setExitConfirm(false)}
            className="absolute inset-0 bg-navy/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-lift"
          >
            <h2 id="exit-title" className="font-display text-lg font-bold text-navy">
              Leave this conversation?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your job request hasn&rsquo;t been submitted yet. If you leave
              now, the details you&rsquo;ve shared will be lost.
            </p>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => setExitConfirm(false)}
                autoFocus
                className="flex-1 rounded-full bg-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-deep"
              >
                Keep going
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="flex-1 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted hover:text-ink"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
