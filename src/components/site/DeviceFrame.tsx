import Image from "next/image";

/** A real screenshot inside a plain device bezel. */
export default function DeviceFrame({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 900px) 100vw, 55vw",
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[26px] bg-[#1d1915] p-2 shadow-[0_30px_80px_-30px_rgba(36,30,24,0.55)] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full rounded-[19px]"
      />
    </div>
  );
}
