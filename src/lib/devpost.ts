import axios from "axios";

export const getHackathons = async () => {
  try {
    const response = await axios.get("https://devpost.com/api/hackathons", {
      withCredentials: true,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      //   referrer: "https://devpost.com/hackathons",
    });
    return response.data.hackathons as Hackathon[];
  } catch (error) {
    console.error(error);
    return null;
  }
};

type Theme = {
  id: number;
  name: string;
};

type DisplayedLocation = {
  icon: string;
  location: string;
};

type Hackathon = {
  id: number;
  title: string;
  displayed_location: DisplayedLocation;
  open_state: string;
  thumbnail_url: string;
  analytics_identifier: string;
  url: string;
  time_left_to_submission: string;
  submission_period_dates: string;
  themes: Theme[];
  prize_amount: string;
  registrations_count: number;
  featured: boolean;
  organization_name: string;
  winners_announced: boolean;
  submission_gallery_url: string;
  start_a_submission_url: string;
  invite_only: boolean;
  eligibility_requirement_invite_only_description: string | null;
};
