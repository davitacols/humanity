import Image from "next/image";

export function StockPhoto({
  src,
  alt,
  label,
  ratio = "landscape",
  sizes = "(max-width: 820px) 100vw, 40vw",
  priority = false,
  className = ""
}) {
  return (
    <figure className={`stock-photo stock-photo--${ratio} ${className}`.trim()}>
      {label ? <span className="stock-photo__label">{label}</span> : null}
      <Image
        src={src}
        alt={alt}
        fill
        className="stock-photo__image"
        sizes={sizes}
        priority={priority}
      />
    </figure>
  );
}
