export type House = {
  id: string;
  name: string;
  website: string;
  description: string;
  location: string;
  housingType: string;
  duration: string;
  funding: string;
  audience: string;
  contact?: string;
  tags: string[];
};

export const houses: House[] = [
  {
    id: "hh-nautilus",
    name: "Nautilus",
    website: "https://www.nautilus.quest/",
    description: "Young artist, maker, founder house with patron funding",
    location: "San Francisco, CA",
    housingType: "Community house",
    duration: "3 months",
    funding: "Yes",
    audience: "Young makers, artists, and founders",
    contact: "https://x.com/zeldapoem",
    tags: ["Community", "Makers", "Artists", "Founders"],
  },
  {
    id: "hh-fr8",
    name: "FR8",
    website: "https://www.fr8.so/",
    description: "Build the future with young mavericks in Europe",
    location: "Finland",
    housingType: "Hotel",
    duration: "3 months",
    funding: "No",
    audience: "Young makers",
    contact: "https://x.com/ErnestSarigo",
    tags: ["Makers", "Europe"],
  },
  {
    id: "hh-the-residency",
    name: "The Residency",
    website: "https://www.theliveresidency.com/",
    description: "Live with ambitious builders",
    location: "Global",
    housingType: "Community house",
    duration: "Varied",
    funding: "No",
    audience: "Ambitious makers",
    contact: "https://x.com/nick_linck",
    tags: ["Community", "Makers", "Builders"],
  },
  {
    id: "hh-nucleate",
    name: "Nucleate Dojo House",
    website: "https://dojo.nucleate.xyz/dojohouse",
    description: "Undergrad biotech house",
    location: "Boston, MA + San Francisco, CA",
    housingType: "Community house",
    duration: "Varied",
    funding: "Yes",
    audience: "Undergrad biotech",
    tags: ["Biotech", "Undergrad", "Community"],
  },
  {
    id: "hh-haight-commons",
    name: "Haight St. Commons",
    website: "https://haight-st-commons.org/",
    description: "List of Bay Area community houses",
    location: "Bay Area, CA",
    housingType: "Community houses",
    duration: "Varied",
    funding: "No",
    audience: "People interested in community living",
    tags: ["Community", "Bay Area"],
  },
  {
    id: "hh-aevitas",
    name: "Aevitas House",
    website: "https://www.aevitashouse.bio",
    description: "Community house/residency in SF for longevity science (+ biotech, neurotech)",
    location: "San Francisco, CA",
    housingType: "Community house",
    duration: "Varied",
    funding: "No",
    audience: "Entrepreneurs, scientists & students in biotech",
    contact: "https://x.com/technoptimist",
    tags: ["Longevity", "Biotech", "Neurotech"],
  },
  {
    id: "hh-edge-city",
    name: "Edge City",
    website: "https://x.com/JoinEdgeCity",
    description: "Pop up city",
    location: "San Francisco, CA + International",
    housingType: "Dorm/Hotel",
    duration: "Varied",
    funding: "Yes",
    audience: "Young makers under 25",
    contact: "https://x.com/JoinEdgeCity",
    tags: ["Youth", "Makers", "Pop-up"],
  },
  {
    id: "hh-the-bridge",
    name: "The Bridge",
    website: "https://www.join-thebridge.com/",
    description: "Maker/Entrepreneur house",
    location: "Germany/Europe",
    housingType: "Castle",
    duration: "Summer",
    funding: "No",
    audience: "Makers, entrepreneurs",
    tags: ["Makers", "Entrepreneurs", "Europe"],
  },
  {
    id: "hh-davinci",
    name: "Davinci Fellowship",
    website: "https://davincifellowship.com/",
    description: "Europe fellowship with housing components",
    location: "Europe",
    housingType: "Fellowship",
    duration: "Varied",
    funding: "Yes",
    audience: "Young builders (under 25)",
    tags: ["Youth", "Europe", "Fellowship"],
  },
];