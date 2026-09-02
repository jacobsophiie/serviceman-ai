"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCcw, X } from "lucide-react";

/**
 * In-chat camera: live preview with a shutter, works wherever getUserMedia
 * does (desktop and mobile over https/localhost). When the camera can't be
 * opened — no permission, no hardware, insecure origin — `onUnavailable`
 * fires so the caller can fall back to the native capture file input.
 */
export function CameraCaptureModal({
  onCapture,
  onClose,
  onUnavailable,
}: {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
  onUnavailable: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        onUnavailable();
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setReady(true);
      } catch {
        if (!cancelled) onUnavailable();
      }
    }

    void start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [facing, onUnavailable]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    onCapture(canvas.toDataURL("image/jpeg", 0.85));
  }, [onCapture]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Take a photo"
    >
      <div className="flex items-center justify-between p-4">
        <p className="text-sm font-medium text-white/80">
          {ready ? "Point the camera at the problem" : "Starting camera…"}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close camera"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="relative mx-auto flex w-full max-w-2xl flex-1 items-center justify-center overflow-hidden px-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="max-h-full w-full rounded-lg object-contain"
        />
      </div>

      <div className="flex items-center justify-center gap-10 p-6">
        <span className="w-12" aria-hidden />
        <button
          type="button"
          onClick={capture}
          disabled={!ready}
          aria-label="Take photo"
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 transition-transform hover:scale-105 disabled:opacity-40"
        >
          <span className="h-11 w-11 rounded-full bg-white" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() =>
            setFacing((f) => (f === "environment" ? "user" : "environment"))
          }
          aria-label="Flip camera"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <RefreshCcw className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
