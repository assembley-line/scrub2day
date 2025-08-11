'use client'

import {use, useEffect, useState} from "react";

export default function Page({params}: { params: Promise<{ url: string[] }> }) {
    const {url} = use(params)
    const [videoSource, setVideoSource] = useState<string | undefined>(undefined);

    // Remove any protocol headers from url, only www etc
    function cleanURL(url: string[]): string {
        if (url[0] && url[0].includes('http')) {
            return url.slice(1).join('/')
        }
        return url.join('/')
    }

    useEffect(() => {
        async function fetchVideoSource() {
            const res = await fetch('/api/video', {
                method: 'POST',
                body: JSON.stringify({
                    url: encodeURIComponent(cleanURL(url))
                })
            });
            if (!res.ok) {
                throw new Error('Failed to fetch video source');
            }
            const source = await res.text();
            setVideoSource(source);
        }

        void fetchVideoSource();
    }, [url]);

    return (
        <div className={'w-full h-full'}>
            {videoSource ?
                <iframe src={videoSource} title={videoSource} className={'w-full h-full'}/>
                :
                <div className={'w-full h-full bg-red-500'}/>
            }
        </div>);
}