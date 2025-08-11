import * as cheerio from "cheerio";

async function recursiveFindIFrame(
    link: string
): Promise<string> {
    const res = await fetch(link);
    const page = await res.text();
    const $ = cheerio.load(page)
    const sources = $('iframe').map((i, el) => {
        let src = $(el).attr('src') || '';
        if (src.startsWith('//')) {
            src = 'https:' + src;
        }
        return src;
    }).get();
    if (sources.length > 0) {
        return recursiveFindIFrame(sources[0])
    } else {
        return link
    }
}

export async function POST(request: Request) {
    const { url } = await request.json()
    if (!url) {
        return new Response('URL is required', {
            status: 400,
        });
    }

    const source = await recursiveFindIFrame("https://" + decodeURIComponent(url))
    return new Response(source, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        },
        status: 200,
    })
}