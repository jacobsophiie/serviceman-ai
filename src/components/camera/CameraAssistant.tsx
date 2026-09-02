"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  Captions,
  ImagePlus,
  Mic,
  RefreshCcw,
  X,
  Zap,
  ZapOff,
} from "lucide-react";
import { Logo } from "@/components/Logo";

/*
 * Camera conversation with a real device camera.
 *
 * The viewfinder uses getUserMedia when the customer grants permission, and
 * photo captures grab real frames from the stream. If no camera is available
 * (or permission is declined) it falls back to a simulated preview. The AI
 * side of the conversation is still scripted — captions follow a branch
 * chosen by the customer; nothing is uploaded anywhere.
 */

interface CameraStep {
  caption: string;
  capture?: boolean;
  safety?: boolean;
}

interface Branch {
  id: string;
  label: string;
  reply: string;
  chatPrompt: string;
  steps: CameraStep[];
}

const intro =
  "Hi! Point your camera at what needs fixing and tell me what's going on.";

const branches: Branch[] = [
  {
    id: "leak",
    label: "“Water is leaking under my sink”",
    reply: "Water is leaking under my sink.",
    chatPrompt: "I showed the camera assistant a water leak under my kitchen sink",
    steps: [
      {
        caption:
          "Can you move the camera slightly closer to the pipe under the sink?",
      },
      {
        caption:
          "Thank you. Can you show me where the water appears when the tap is running?",
      },
      {
        caption:
          "If it's safe and easy to reach, could you briefly turn the tap on so I can watch the flow?",
      },
      {
        caption:
          "It looks like water may be leaking near the tap connection. I've captured an image for your job brief.",
        capture: true,
      },
      {
        caption:
          "That gives me a good picture. A plumber will need to inspect the connection to confirm the fix — let's finish the job details.",
      },
    ],
  },
  {
    id: "fence",
    label: "“A fence or gate is damaged”",
    reply: "A fence panel at my place is damaged.",
    chatPrompt: "I showed the camera assistant a damaged fence panel",
    steps: [
      { caption: "Can you move closer to the damaged section of the fence?" },
      {
        caption:
          "Thanks. Now step back a little so I can see the whole panel — that helps with scale.",
      },
      {
        caption:
          "Is the post beside it solid? Give it a gentle push if it's safe to do so.",
      },
      {
        caption:
          "It looks like one panel and possibly a post need attention. I've captured an image for your job brief.",
        capture: true,
      },
      {
        caption:
          "Great — that's everything I need from the camera. Let's finish the job details.",
      },
    ],
  },
  {
    id: "powerpoint",
    label: "“A power point looks burnt”",
    reply: "A power point looks burnt and I heard it crackle.",
    chatPrompt:
      "The camera assistant looked at a burnt power point that crackles — it may be urgent",
    steps: [
      {
        caption:
          "This may be unsafe. Please move away from the area and avoid touching any electrical, gas or structural components.",
        safety: true,
      },
      {
        caption:
          "From a safe distance, can you show me the power point and the wall around it?",
      },
      {
        caption:
          "Thank you — that's close enough. Please don't touch it or plug anything in. I've captured an image.",
        capture: true,
      },
      {
        caption:
          "This may require a licensed electrician, and I'll flag it as urgent. If you see smoke or sparks, call 000. Let's finish the job details.",
      },
    ],
  },
  {
    id: "other",
    label: "“It's something else”",
    reply: "It's something else — I'll show you.",
    chatPrompt: "",
    steps: [
      {
        caption:
          "No problem. Slowly pan across the area so I can see the context.",
      },
      {
        caption: "Can you move a little closer to the part that concerns you most?",
      },
      {
        caption:
          "Got it — I've captured an image for your job brief. Tell me a bit more and we'll sort out the rest in chat.",
        capture: true,
      },
    ],
  },
];

interface TranscriptLine {
  speaker: "ai" | "you";
  text: string;
}

type Phase = "launch" | "permission" | "live";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function CameraAssistant({
  /** What the customer already typed before choosing the camera, if anything. */
  initialPrompt,
}: {
  initialPrompt?: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("launch");
  const [caption, setCaption] = useState<string>("");
  const [captionSafety, setCaptionSafety] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [finished, setFinished] = useState(false);
  /** Captured photos: a data URL frame when the live camera is on, null when simulated. */
  const [shots, setShots] = useState<(string | null)[]>([]);
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [flashPulse, setFlashPulse] = useState(false);
  const [liveCamera, setLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const cancelledRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    // Reset on every effect run — hot reload and StrictMode fire
    // cleanup+setup pairs, and a stuck true flag kills the camera silently.
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
      stopStream();
    };
  }, [stopStream]);

  const startStream = useCallback(
    async (facing: "environment" | "user") => {
      stopStream();
      if (!navigator.mediaDevices?.getUserMedia) {
        setLiveCamera(false);
        setCameraError(
          "This browser doesn't support camera access, so you're seeing a simulated preview.",
        );
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: false,
        });
        if (cancelledRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        setLiveCamera(true);
        setCameraError(null);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch {
        setLiveCamera(false);
        setCameraError(
          "We couldn't access your camera, so you're seeing a simulated preview. You can still follow the conversation.",
        );
      }
    },
    [stopStream],
  );

  /** Grab a small JPEG frame from the live stream, or null when simulated. */
  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!liveCamera || !video || video.videoWidth === 0) return null;
    const canvas = document.createElement("canvas");
    const width = 480;
    canvas.width = width;
    canvas.height = Math.round((video.videoHeight / video.videoWidth) * width);
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.75);
  }, [liveCamera]);

  const say = useCallback(
    async (line: CameraStep) => {
      setSpeaking(true);
      setCaptionSafety(Boolean(line.safety));
      setCaption(line.caption);
      setTranscript((prev) => [...prev, { speaker: "ai", text: line.caption }]);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      await sleep(reduced ? 300 : 1000 + Math.min(line.caption.length * 28, 2600));
      setSpeaking(false);
      if (line.capture) {
        setFlashPulse(true);
        setShots((prev) => [...prev, captureFrame()]);
        await sleep(reduced ? 100 : 450);
        setFlashPulse(false);
      }
      await sleep(reduced ? 100 : 600);
    },
    [captureFrame],
  );

  async function beginLive() {
    setPhase("live");
    // Wait a tick so the <video> element is mounted, then request the camera.
    await sleep(60);
    if (cancelledRef.current) return;
    void startStream(frontCamera ? "user" : "environment");
    await sleep(700);
    if (cancelledRef.current) return;
    await say({ caption: intro });
    if (cancelledRef.current) return;
    setChoicesVisible(true);
  }

  async function chooseBranch(chosen: Branch) {
    setChoicesVisible(false);
    setTranscript((prev) => [...prev, { speaker: "you", text: chosen.reply }]);
    setBranch(chosen);
    await sleep(500);
    for (const step of chosen.steps) {
      if (cancelledRef.current) return;
      await say(step);
    }
    if (cancelledRef.current) return;
    setFinished(true);
  }

  function capturePhoto() {
    setFlashPulse(true);
    setShots((prev) => [...prev, captureFrame()]);
    setTimeout(() => setFlashPulse(false), 350);
  }

  function switchCamera() {
    const next = !frontCamera;
    setFrontCamera(next);
    if (liveCamera) {
      void startStream(next ? "user" : "environment");
    }
  }

  function toggleFlash() {
    const next = !flashOn;
    setFlashOn(next);
    // Torch is only supported on some devices (mostly phones); ignore failures.
    const track = streamRef.current?.getVideoTracks()[0];
    track
      ?.applyConstraints({
        advanced: [{ torch: next } as MediaTrackConstraintSet],
      })
      .catch(() => {});
  }

  function endConversation() {
    stopStream();
    router.push("/");
  }

  function continueToChat() {
    stopStream();
    const params = new URLSearchParams();
    // What the customer already typed beats the scripted branch summary.
    const chatPrompt = initialPrompt?.trim() || branch?.chatPrompt;
    if (chatPrompt) params.set("prompt", chatPrompt);
    if (shots.length > 0) params.set("photos", String(shots.length));
    router.push(`/chat${params.size > 0 ? `?${params}` : ""}`);
  }

  function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    const params = new URLSearchParams();
    params.set("photos", String(files.length));
    params.set(
      "prompt",
      files.length === 1
        ? "I've uploaded a photo of the problem"
        : `I've uploaded ${files.length} photos of the problem`,
    );
    router.push(`/chat?${params}`);
  }

  /* ------------------------------------------------------- launch screen */

  if (phase !== "live") {
    return (
      <div className="flex min-h-dvh flex-col bg-cloud">
        <header className="flex h-14 items-center justify-between border-b border-line bg-white px-4">
          <Logo />
          <Link
            href="/"
            aria-label="Close camera assistant"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-cloud hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden />
          </Link>
        </header>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue/10 text-blue">
            <Camera className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold text-navy">
            Show us what needs fixing
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Point your camera at the problem and describe what you can see.
            Our AI agent will guide you through the next steps.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setPhase("permission")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              <Camera className="h-5 w-5" aria-hidden />
              Open camera
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-4 text-base font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
            >
              <ImagePlus className="h-5 w-5" aria-hidden />
              Upload a photo instead
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => handleUpload(event.target.files)}
              aria-label="Upload photos of the problem"
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            serviceman.ai will only access your camera after you give
            permission — your browser will ask you to confirm. In this
            meantime the preview stays on your device and nothing is
            uploaded; the AI conversation is simulated.
          </p>
        </div>

        {phase === "permission" && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <button
              type="button"
              aria-label="Cancel"
              onClick={() => setPhase("launch")}
              className="absolute inset-0 bg-navy/50"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cam-permission-title"
              className="relative w-full max-w-sm rounded-lg bg-white p-6"
            >
              <h2
                id="cam-permission-title"
                className="font-display text-lg font-bold text-navy"
              >
                Allow camera access?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                serviceman.ai uses your camera so the AI agent can see the
                problem while you talk it through. After you select Allow,
                your browser will ask to confirm. The preview stays on your
                device — nothing is uploaded without your say-so.
              </p>
              <div className="mt-5 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => void beginLive()}
                  autoFocus
                  className="flex-1 rounded-md bg-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-deep"
                >
                  Allow
                </button>
                <button
                  type="button"
                  onClick={() => setPhase("launch")}
                  className="flex-1 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-muted hover:text-ink"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ------------------------------------------------------ live interface */

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-camera lg:bg-navy lg:py-8">
      <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-camera lg:h-[780px] lg:max-w-[400px] lg:rounded-[2rem] lg:border-8 lg:border-black/60 lg:">
        {/* Viewfinder: live camera stream, with a simulated fallback */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          aria-label="Live camera preview"
          className={`absolute inset-0 h-full w-full object-cover ${
            liveCamera ? "" : "hidden"
          } ${frontCamera ? "scale-x-[-1]" : ""}`}
        />
        {!liveCamera && (
          <>
            <div className="camera-preview absolute inset-0" aria-hidden />
            <p className="absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center text-sm text-white/30">
              {cameraError ??
                "Waiting for camera permission — a simulated preview is shown until then."}
            </p>
          </>
        )}
        {flashPulse && (
          <div className="absolute inset-0 z-30 bg-white/70" aria-hidden />
        )}

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between gap-2 px-4 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            AI agent connected
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleFlash}
              aria-pressed={flashOn}
              aria-label={flashOn ? "Turn flash off" : "Turn flash on"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/60"
            >
              {flashOn ? (
                <Zap className="h-4 w-4" aria-hidden />
              ) : (
                <ZapOff className="h-4 w-4" aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={switchCamera}
              aria-label="Switch camera"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/60"
            >
              <RefreshCcw className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={endConversation}
              aria-label="End conversation"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-danger"
            >
              <X className="h-4.5 w-4.5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Mic status */}
        <div className="relative z-10 mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
            <Mic className="soft-pulse h-3 w-3 text-success" aria-hidden />
            Microphone on — voice replies aren&rsquo;t available just yet
          </span>
        </div>

        {/* Photo thumbnails */}
        {shots.length > 0 && (
          <div
            className="relative z-10 mt-3 flex justify-center gap-1.5"
            aria-label={`${shots.length} photos captured`}
          >
            {shots.slice(-5).map((shot, index) =>
              shot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={shot}
                  alt={`Captured photo ${index + 1}`}
                  className="h-9 w-9 rounded-lg border border-white/30 object-cover"
                />
              ) : (
                <span
                  key={index}
                  className="camera-preview flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white/70"
                  aria-hidden
                >
                  <Camera className="h-3.5 w-3.5" />
                </span>
              ),
            )}
          </div>
        )}

        {/* Caption area */}
        <div className="relative z-10 mt-auto flex flex-col gap-3 px-4">
          {caption && (
            <div
              aria-live="polite"
              className={`rounded-lg px-4 py-3.5 backdrop-blur ${
                captionSafety
                  ? "border border-danger/60 bg-danger/25"
                  : "bg-black/55"
              }`}
            >
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/60">
                {captionSafety && (
                  <AlertTriangle className="h-3.5 w-3.5 text-white" aria-hidden />
                )}
                AI agent
                {speaking && (
                  <span className="inline-flex items-center gap-1 normal-case tracking-normal text-white/50">
                    <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-success" />
                    speaking…
                  </span>
                )}
              </p>
              <p className="mt-1 text-[15px] leading-snug text-white">
                {caption}
              </p>
            </div>
          )}

          {choicesVisible && (
            <div
              className="flex flex-col gap-2"
              role="group"
              aria-label="Choose what to tell the AI agent"
            >
              {branches.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => void chooseBranch(option)}
                  className="rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-navy backdrop-blur transition-colors hover:bg-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {finished && (
            <div className="rounded-lg bg-white p-4">
              <p className="text-sm font-semibold text-navy">
                {shots.length > 0
                  ? `${shots.length} ${shots.length === 1 ? "image" : "images"} added to your job brief.`
                  : "Observations added to your job brief."}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Next we&rsquo;ll confirm a few details like timing, location
                and how tradies can reach you.
              </p>
              <button
                type="button"
                onClick={continueToChat}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-deep"
              >
                Continue to job details
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 flex items-center justify-between px-8 pb-6 pt-4">
          <button
            type="button"
            onClick={() => setTranscriptOpen(true)}
            aria-label="Open transcript"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/60"
          >
            <Captions className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={capturePhoto}
            aria-label="Capture photo"
            className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur transition-transform hover:scale-105"
          >
            <span className="h-11 w-11 rounded-full bg-white" aria-hidden />
          </button>
          <span className="w-11 text-center text-[10px] leading-tight text-white/50">
            Private &amp; secure
          </span>
        </div>

        {/* Transcript drawer */}
        {transcriptOpen && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end">
            <button
              type="button"
              aria-label="Close transcript"
              onClick={() => setTranscriptOpen(false)}
              className="absolute inset-0 bg-black/50"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Conversation transcript"
              className="relative max-h-[70%] overflow-y-auto rounded-t-3xl bg-white p-5"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" aria-hidden />
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
                Transcript
              </h2>
              <ul className="mt-3 space-y-3">
                {transcript.map((line, index) => (
                  <li key={index} className="text-sm leading-relaxed">
                    <span
                      className={`font-semibold ${
                        line.speaker === "ai" ? "text-blue" : "text-navy"
                      }`}
                    >
                      {line.speaker === "ai" ? "AI agent: " : "You: "}
                    </span>
                    <span className="text-ink">{line.text}</span>
                  </li>
                ))}
                {transcript.length === 0 && (
                  <li className="text-sm italic text-muted">
                    The conversation transcript will appear here.
                  </li>
                )}
              </ul>
              <button
                type="button"
                onClick={() => setTranscriptOpen(false)}
                className="mt-5 w-full rounded-md border border-line px-5 py-3 text-sm font-semibold text-navy"
              >
                Back to camera
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="hidden pt-4 text-xs text-white/50 lg:block">
        Simulated camera experience — best viewed on a phone.
      </p>
    </div>
  );
}
