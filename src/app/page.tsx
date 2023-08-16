import { getHackathons } from "@/lib/devpost";

const getMoney = (input: string) => {
  const regex = /<span data-currency-value>([\d,]+)<\/span>/;
  const match = input.match(regex);

  if (match) {
    const currencyValue = match[1].replace(",", ""); // Remove commas from the value
    // parse it as number and format it nicely
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseInt(currencyValue));
  } else {
    console.log("No match found.");
    return null;
  }
};

export default async function Home() {
  const hackathons = await getHackathons();
  if (!hackathons) return <>Error</>;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">hackathon List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="bg-white rounded shadow-md p-4">
            <img
              src={hackathon.thumbnail_url}
              alt="Challenge Thumbnail"
              className="w-full h-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{hackathon.title}</h2>
            <p className="text-gray-600 mb-2">
              Organization: {hackathon.organization_name}
            </p>
            <p className="text-gray-600 mb-2">
              Submissions left: {hackathon.time_left_to_submission}
            </p>
            <p className="text-gray-600 mb-2">
              Money: {getMoney(hackathon.prize_amount)}
            </p>
            <div className="flex gap-2 flex-wrap">
              {hackathon.themes.map((theme, idx) => {
                return (
                  <span
                    key={idx}
                    className="rounded-full px-2 py-1 bg-blue-400 text-sm font-bold text-white"
                  >
                    {theme.name}
                  </span>
                );
              })}
            </div>
            <a
              href={hackathon.url}
              className="text-blue-600 hover:underline mt-3 inline-flex"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
