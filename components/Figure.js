import Image from 'next/image';

/**
 * Image with caption and credit (linked to its source when `credit_url` is set).
 * Posts without an image simply render nothing.
 */
export default function Figure({
  image,
  ratio = '16 / 9',
  dark = false,
  caption = true,
  priority = false,
  children,
}) {
  if (!image?.src) return null;
  return (
    <figure className="figure">
      <div className={`figure-frame${dark ? ' dark' : ''}`} style={{ aspectRatio: ratio }}>
        <Image
          src={image.src}
          alt={image.alt ?? ''}
          fill
          priority={priority}
          sizes="(max-width: 900px) 100vw, 1080px"
          // Remote images (Wikimedia now, any URL pasted in the studio) load
          // straight from their host; local /public images are optimized.
          unoptimized={/^https?:\/\//.test(image.src)}
          style={{ objectFit: 'cover' }}
        />
        {children}
      </div>
      {caption && image.caption && (
        <figcaption>
          {image.caption}
          {image.credit &&
            (image.credit_url ? (
              <a className="credit" href={image.credit_url} target="_blank" rel="noopener noreferrer">
                {image.credit}
              </a>
            ) : (
              <span className="credit">{image.credit}</span>
            ))}
        </figcaption>
      )}
    </figure>
  );
}
