import { load_pages, type Article } from '$lib/load_posts';
import { title, website } from '../constants';

export const prerender = true;
export async function GET() {
	const articles = await load_pages();
	return new Response(format(articles), {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
}

const format = (posts: Article[]) => {
	return `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${title}</title>
    <link>${website}</link>
    <description>My blog where I talk about software / game development / design</description>
    ${posts.map((post) => {
			const link = `${website}/blog/${post.slug}`;

			return `<item>
  <title>${post.title}</title>
  <description>A blog built with SvelteKit about tech and stuff!</description>
  <link>${link}/</link>
  <pubDate>${new Date(post.updatedAt)}</pubDate>
  <content:encoded>${post.tagline} 
    <div style="margin-top: 50px; font-style: italic;">
      <strong>
        <a href="${link}">
          Keep reading
        </a>
      </strong>  
    </div>
  </content:encoded>
</item>`;
		})})}
  </channel>
</rss>`;
};
