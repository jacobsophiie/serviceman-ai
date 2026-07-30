import Link from "next/link";
import Image from "next/image";

export function Logo({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="serviceman.ai home"
    >
      {/* The hard-hat mark is navy — give it a light chip on dark surfaces */}
      <span
        className={`flex h-9 w-9 items-center justify-center ${
          dark ? "rounded-xl bg-white p-1" : ""
        }`}
      >
        <Image
          src="/images/logo-mark.png"
          alt=""
          width={36}
          height={36}
          priority
        />
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        serviceman<span className="text-blue">.ai</span>
      </span>
    </Link>
  );
}
