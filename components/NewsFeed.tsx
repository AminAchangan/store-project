import Image from "next/image";

const FeedPics = [
  { id: 1, url: "/bg3.png" },
  { id: 2, url: "/bg4.png" },
  { id: 3, url: "/bg5.png" },
  { id: 4, url: "/bg6.png" },
];

function NewsFeed() {
  return (
    <div className="flex flex-col items-center mt-12 gap-y-4 mb-10 max-w-6xl mx-auto px-4">
      <h3 className="text-primary-400 font-semibold text-lg">NEWSFEED</h3>
      <h1 className="text-4xl">Instagram</h1>
      <p className="text-lg text-primary-700 text-center">
        Follow us on social media for more discount & promotions
      </p>
      <h1 className="text-primary-400 text-xl mb-6">@mohamadaminachangan</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {FeedPics.map((pic) => (
          <Image
            src={pic.url}
            key={pic.id}
            alt="Instagram feed picture"
            width={264}
            height={264}
            className="w-full h-auto object-cover aspect-square rounded-3xl"
          />
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;
