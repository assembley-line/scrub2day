import Image from "next/image";

export default async function Home() {
  const res = await fetch('http://localhost:3001/api/video', {
    method: 'POST',
    body: JSON.stringify({
      url: 'https://ww25.soap2day.day/fantastic-four-2005-soap2day/'
    })
  });
    if (!res.ok) {
        throw new Error('Failed to fetch video source');
    }

    const videoSource = await res.text();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <p>Video down here cuz</p>
      <iframe src={videoSource} autoFocus={true} seamless={true} className={'w-full h-full'} />
    </div>
  );
}
