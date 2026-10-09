import { ImageResponse } from 'next/og';
import { getPost, getTopic } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { ogFonts, ogPhoto } from './assets';
import { OG_SIZE, StoryCard, ClaimCard, BrandCard } from './cards';

async function render(element) {
  return new ImageResponse(element, { ...OG_SIZE, fonts: await ogFonts() });
}

/** Share image for one post, by type and slug. Falls back to the brand card. */
export async function postImage(type, slug) {
  const post = await getPost(type, slug).catch(() => null);
  if (!post) return render(<BrandCard />);

  if (type === 'claim') {
    const c = post.claim ?? {};
    return render(
      <ClaimCard
        statement={c.statement || post.title}
        rating={c.rating}
        confidence={c.confidence}
        sources={post.source_ids.length}
        photo={await ogPhoto(post.hero?.src)}
      />
    );
  }

  if (type === 'video') {
    const v = post.video ?? {};
    const thumb = post.hero?.src || (v.youtube_id ? `https://i.ytimg.com/vi/${v.youtube_id}/maxresdefault.jpg` : null);
    const photo = (await ogPhoto(thumb)) || (v.youtube_id ? await ogPhoto(`https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg`) : null);
    return render(
      <StoryCard
        kicker={['Watch', v.series].filter(Boolean).join(' · ')}
        title={post.title}
        dek={post.dek}
        meta={[v.duration, post.topic?.name]}
        photo={photo}
        play
      />
    );
  }

  const photo = await ogPhoto(post.hero?.src);
  if (type === 'dispatch') {
    return render(
      <StoryCard
        kicker={['Dispatch', post.dispatch?.label].filter(Boolean).join(' · ')}
        title={post.title}
        dek={post.dek}
        meta={[formatDate(post.published_at), post.author?.name && `By ${post.author.name}`]}
        photo={photo}
      />
    );
  }

  const sources = post.source_ids.length;
  return render(
    <StoryCard
      kicker={post.topic?.name || 'Long read'}
      title={post.title}
      dek={post.dek}
      meta={[
        post.author?.name && `By ${post.author.name}`,
        post.reading_minutes && `${post.reading_minutes} min read`,
        sources > 0 && `${sources} sources`,
      ]}
      photo={photo}
    />
  );
}

export async function topicImage(slug) {
  const topic = await getTopic(slug).catch(() => null);
  return render(topic ? <BrandCard kicker="Topic" title={topic.name} text={topic.description} /> : <BrandCard />);
}

export function sectionImage({ kicker, title, text }) {
  return render(<BrandCard kicker={kicker} title={title} text={text} />);
}

export function homeImage() {
  return render(<BrandCard />);
}

