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
    <div className={className ? `device ${className}` : "device"}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
