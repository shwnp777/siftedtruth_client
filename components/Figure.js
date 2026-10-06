import Image from 'next/image';

/**
 * Image with caption. Until real media lives in S3/CloudFront, posts have
 * `src: null` and render a labelled placeholder of the same proportions.
 */
export default function Figure({
  image,
  ratio = '16 / 9',
  dark = false,
  caption = true,
  label = true,
  priority = false,
  children,
}) {
  if (!image) return null;
  return (
    <figure className="figure">
      <div className={`figure-frame${dark ? ' dark' : ''}`} style={{ aspectRatio: ratio }}>
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            fill
            priority={priority}
            sizes="(max-width: 900px) 100vw, 1080px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <span className="figure-placeholder" role="img" aria-label={image.alt}>
            {label ? `[Image: ${image.alt}]` : null}
          </span>
        )}
        {children}
      </div>
      {caption && image.caption && (
        <figcaption>
          {image.caption}
          {image.credit && <span className="credit">{image.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
