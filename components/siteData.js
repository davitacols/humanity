import { stockMedia } from "./stockMedia";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/programs", label: "Programs" },
  { href: "/education", label: "Education" },
  { href: "/arts", label: "Arts" },
  { href: "/health", label: "Health" },
  { href: "/sports", label: "Sports" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/donate", label: "Donate" },
  { href: "/get-involved", label: "Get Involved" }
];

export const headerUtilityItems = [
  { label: "4 live program routes", href: "/programs" },
  { label: "Latest field updates", href: "/blog" },
  { label: "Sib profile live", href: "/team#sib" },
  { label: "Education platform", href: "/education" }
];

export const proofStats = [
  { value: "24", label: "documented projects and field updates" },
  { value: "4", label: "core program areas under one mission" },
  { value: "Regional", label: "collaboration with Ghana partnerships developing" }
];

export const spotlightStories = [
  {
    eyebrow: "Health outreach",
    title: "Maternal and child health support in focus",
    body: "Mobile clinic visits, hygiene kits, and follow‑up check‑ins for mothers and newborns in underserved communities.",
    meta: "Maternal care, hygiene kits, follow‑ups",
    tone: "forest"
  },
  {
    eyebrow: "Youth development",
    title: "Sports as a path to discipline and belonging",
    body: "Weekly training sessions, mentorship, and local tournaments that keep young people engaged and growing.",
    meta: "Training, mentorship, local tournaments",
    tone: "sand"
  },
  {
    eyebrow: "Creative advocacy",
    title: "Film, arts, and storytelling with social purpose",
    body: "Short films, photo essays, and spoken‑word features that amplify community voices and campaign goals.",
    meta: "Film, photography, spoken word",
    tone: "ocean"
  }
];

export const homeMissionPoints = [
  "Maternal and child health outreach",
  "Phone-friendly education resources",
  "Ghana partnership development"
];

export const homeTrustSignals = [
  {
    eyebrow: "Documented impact",
    title: "Published updates stay tied to specific program work.",
    body: "Support is anchored in health outreach, education resources, sports development, creative campaigns, and field notes people can review.",
    tone: "mist"
  },
  {
    eyebrow: "Trusted support path",
    title: "Donation asks are connected to the route they fund.",
    body: "Visitors can see whether support is going toward maternal care, learning resources, youth equipment, or campaign storytelling.",
    tone: "sand"
  },
  {
    eyebrow: "Regional growth",
    title: "The network is expanding through named collaborators and partner routes.",
    body: "Ghana relationships, creative contributors, and specialist partners are shown through clear public roles as the network develops.",
    tone: "leaf"
  }
];

export const profileSpotlight = {
  name: "Ikokwu Chidozie Ikemba",
  role: "Psychologist, strategist, media practitioner, and environmental entrepreneur",
  summary:
    "Chidozie works across journalism, sustainability advocacy, creative storytelling, and public communication with a focus on governance, civic engagement, and social impact.",
  body:
    "As Chief Executive Officer of Rehoboth Waste Management Services, he leads waste recovery, recycling innovation, and carbon-conscious environmental solutions while also supporting documentary concepts, public campaigns, and institutional messaging for African-facing audiences.",
  tags: [
    "Strategic communication",
    "Journalism and commentary",
    "Circular economy",
    "Environmental advocacy",
    "Creative direction"
  ],
  website: "https://www.rwms.ng",
  update:
    "He is open to collaborations with organizations, policy platforms, development initiatives, and creative teams seeking culturally grounded strategy with public impact."
};

export const platformProfiles = [
  {
    eyebrow: "Founder",
    name: "Adam Mustafa",
    role: "Founder — mental health and community support advocate",
    location: "United Kingdom",
    summary:
      "Founder of Humanity First Initiative, drawing on more than a decade supporting families affected by mental health challenges through community engagement and talking therapies.",
    body:
      "Adam has supported families affected by mental health challenges for over ten years, drawing on both professional and personal experience following a family breakdown in 2016. He works closely with local authorities to strengthen community relations and bridge the gap between Community Mental Health Teams and the people they serve, championing communication, support, and talking therapies alongside medical treatment where appropriate. As a former BAME Officer for the Labour Party, he gained valuable experience engaging communities across a wide range of cultural backgrounds, and brings more than twenty years of community work to improving mental health awareness, support, and engagement for individuals and families.",
    tags: [
      "Mental health advocacy",
      "Community relations",
      "Talking therapies",
      "Diversity & inclusion"
    ],
    imageSrc: "/Adams.jpeg",
    imageAlt: "Adam Mustafa, founder of Humanity First Initiative.",
    imageLabel: "Founder",
    imageRatio: "portrait"
  },
  {
    eyebrow: "Strategy and communications",
    name: "Ikokwu Chidozie Ikemba",
    role: "Psychologist, strategist, media practitioner, and environmental entrepreneur",
    location: "Nigeria",
    summary:
      "Supports campaign strategy, public communication, sustainability framing, and partner-facing storytelling for the initiative.",
    body:
      "Ikemba brings experience from psychology, media practice, environmental enterprise, and civic communication. His contribution helps projects with clearer messaging, public context, campaign structure, and sustainability framing.",
    tags: [
      "Strategic communication",
      "Sustainability",
      "Creative direction",
      "Public impact"
    ],
    href: "https://www.rwms.ng",
    hrefLabel: "Visit RWMS",
    imageSrc: "/profile/chidozie-portrait.jpeg",
    imageAlt: "Ikokwu Chidozie Ikemba in a white traditional outfit during a public event.",
    imageLabel: "Contributor profile",
    imageRatio: "portrait"
  },
  {
    eyebrow: "Ghana partnerships",
    name: "Regional partner in Ghana",
    role: "Community collaborator and regional growth partner",
    location: "Ghana",
    summary:
      "Helps build Ghana-based relationships, listen to community needs, and identify credible local collaboration paths.",
    body:
      "This partner gives the team a practical regional point of view as the platform grows beyond one country. The role is focused on introductions, community listening, field coordination, and helping local changemakers or organizations connect with the right support route.",
    tags: [
      "Regional partnerships",
      "Community outreach",
      "Field coordination",
      "Growth across countries"
    ],
    href: "/get-involved",
    hrefLabel: "Discuss partnership",
    imageSrc: stockMedia.aboutMission.src,
    imageAlt: stockMedia.aboutMission.alt,
    imageLabel: "Ghana partnership",
    imageRatio: stockMedia.aboutMission.ratio || "landscape"
  },
  {
    eyebrow: "Film, pay-per-view screenings & visual storytelling",
    name: "Sib",
    role: "Cinematographer, video editor, creative photographer, and pay-per-view screening contributor",
    location: "West Midlands, United Kingdom",
    summary:
      "Contributes film, editing, photography, and pay-per-view screening content for campaigns, profiles, and supporter-facing updates.",
    body:
      "Sib is a West Midlands-based cinematographer and video editor crafting visually compelling stories that connect with audiences and drive impact — for brands, organisations, and independent projects, including a feature documentary. For Humanity First Initiative, this includes producing pay-per-view screening content that helps fund and sustain the work. Their practice is shaped by a commitment to more accessible content and a perspective informed by being autistic, and extends to creative food and travel photography focused on authenticity.",
    tags: [
      "Cinematography",
      "Video editing",
      "Pay-per-view screenings",
      "Accessibility-led storytelling",
      "Food and travel photography",
      "Documentary"
    ],
    href: "https://sib-cinematographer.squarespace.com/",
    hrefLabel: "View portfolio",
    imageSrc: "/sib.jpeg",
    imageAlt: "Sib, cinematographer and video editor based in the West Midlands.",
    imageLabel: "Film & visual storytelling",
    imageRatio: "portrait"
  }
];

export const sportsSpotlight = {
  title: "Dodoma Best Sports Center",
  location: "Nzuguni C, Dodoma City",
  founded: "June 2023",
  beneficiaries: "100 children and youth enrolled",
  orphanSupport: "20 orphans currently supported",
  ageGroups: "Ages 7 to 16 across U-7 to U-16 groups",
  totalRequest: "TZS 6,905,000 requested in the translated proposal",
  summary:
    "Dodoma Best Sports Center uses football as a tool for social, health, and economic development for children and youth, including orphans and young people from disadvantaged backgrounds.",
  body:
    "Since its launch, experienced volunteer coaches have built a structured youth program focused on identifying talent, strengthening discipline and teamwork, and creating better long-term opportunities through sports.",
  priorities: [
    {
      title: "Training equipment and kits",
      body: "Balls, cones, markers, ladders, poles, jerseys, socks, and other practical training essentials are needed to sustain weekly sessions."
    },
    {
      title: "Safe weekly participation",
      body: "The center wants to keep training regular, accessible, and safe for children across its current age groups."
    },
    {
      title: "Pathway to leagues and competitions",
      body: "The medium-term plan includes community youth leagues, school collaboration, and participation in regional and national competitions."
    },
    {
      title: "Long-term academy vision",
      body: "The long-term ambition is to build a modern training ground, grow into a recognized sports academy, and open professional opportunities for talented youth."
    }
  ],
  supportAreas: [
    "Financial contributions for equipment and training operations",
    "Provision of sports materials such as balls, jerseys, shoes, cones, and markers",
    "Training and mentorship support for coaches and administrators",
    "Legal, administrative, and child-protection support through public institutions"
  ],
  futureExpectations: [
    "Increase beneficiaries to at least 200 children by 2026",
    "Create pathways for talented youth into academies and major clubs",
    "Reduce youth exposure to risky behaviors by offering structured alternatives",
    "Support access to sports education and employment opportunities through athletics"
  ]
};

export const programPillars = [
  {
    title: "Education Platform",
    body: "A login-based course platform for lessons, modules, quizzes, assignments, certificates, and learner progress.",
    tone: "mist",
    href: "/education"
  },
  {
    title: "Arts and Music",
    body: "Creative advocacy campaigns, artist spotlights, spoken word, and culture-led community storytelling.",
    tone: "blush",
    href: "/arts"
  },
  {
    title: "Public Health",
    body: "Prevention, hygiene, maternal and child health, safety education, and field campaign reporting.",
    tone: "leaf",
    href: "/health"
  },
  {
    title: "Sports Development",
    body: "Grassroots training, youth tournaments, talent spotlighting, and sports as a leadership pathway.",
    tone: "sand",
    href: "/sports"
  }
];

export const featuredProject = {
  title: "Safe beginnings for mothers and children",
  body: "The health route focuses on mothers, newborns, caregivers, and the practical support families need during vulnerable early-care moments: hygiene kits, nutrition guidance, basic safety information, and follow-up contact.",
  quote: "Current support helps prepare maternal kits, print simple health guidance, and keep follow-up visits possible."
};

export const projectCards = [
  {
    title: "Maternal health kits",
    tag: "Health",
    body: "Distribution of basic care kits for mothers and newborns with on‑ground follow‑ups."
  },
  {
    title: "Coding club launch",
    tag: "Education",
    body: "Beginner coding sessions for teens using low‑data, phone‑first materials."
  },
  {
    title: "Youth football outreach",
    tag: "Sports",
    body: "Structured training, mentorship, and community matches for youth teams."
  },
  {
    title: "Storytelling for advocacy",
    tag: "Arts and Music",
    body: "Campaign films and creative features that make impact stories easy to share."
  },
  {
    title: "School safety awareness",
    tag: "Public Health",
    body: "Safety education for schools and families with simple checklists and flyers."
  },
  {
    title: "Nutrition flyer campaign",
    tag: "Public Health",
    body: "Nutrition guides and quick‑use flyers for parents, schools, and caregivers."
  }
];

export const premiumVideoProject = {
  slug: "premium-video",
  title: "Campaign Documentary Screening",
  eyebrow: "Special film release",
  teaser:
    "A dedicated screening route for campaign documentaries, event recordings, and supporter-facing film releases.",
  description:
    "This release path gives campaign films their own context, viewing window, playback area, and supporter call to action.",
  price: "NGN 4,500",
  runtime: "12 minute documentary cut",
  accessWindow: "48-hour viewing window",
  videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  benefits: [
    "A single-title access window for campaigns or special releases",
    "A focused viewing space for supporter-facing film content",
    "Space for context, partner acknowledgements, and a support call after the film",
    "A structure that can connect to the final payment and access provider"
  ]
};

export const donationTiers = ["NGN 10k", "NGN 25k", "NGN 50k", "NGN 100k"];

export const donationCauses = [
  "Maternal and child health support",
  "Education access and digital skills",
  "Youth sports development",
  "Creative advocacy campaigns"
];

export const donationFunds = [
  {
    slug: "maternal-child-health",
    eyebrow: "Health route",
    title: "Maternal and child health outreach",
    supportArea: donationCauses[0],
    summary:
      "Supports hygiene kits, maternal check-ins, community health education, and nutrition-focused follow-up for women and children.",
    amountLabel: "Current goal: NGN 2,500,000",
    targetAmount: 2500000,
    raisedAmount: 0,
    beneficiariesLabel: "50 families in the active outreach pipeline",
    statusLabel: "Current quarter funding gap",
    href: "/health",
    hrefLabel: "Visit health program"
  },
  {
    slug: "education-access",
    eyebrow: "Education route",
    title: "Education LMS and digital skills",
    supportArea: donationCauses[1],
    summary:
      "Keeps books, low-bandwidth learning materials, facilitator guides, and beginner digital-skills sessions available to learners.",
    amountLabel: "Current goal: NGN 1,800,000",
    targetAmount: 1800000,
    raisedAmount: 0,
    beneficiariesLabel: "Three learning tracks in active development",
    statusLabel: "Resource build-out in progress",
    href: "/education",
    hrefLabel: "Open education"
  },
  {
    slug: "youth-sports",
    eyebrow: "Sports route",
    title: "Youth sports development",
    supportArea: donationCauses[2],
    summary:
      "Backs grassroots training, equipment, tournament logistics, and mentorship for youth programs like Dodoma Best Sports Center.",
    amountLabel: "Current goal: NGN 1,950,000",
    targetAmount: 1950000,
    raisedAmount: 0,
    beneficiariesLabel: "Current pathway includes 100 youth participants",
    statusLabel: "Equipment and logistics still needed",
    href: "/sports",
    hrefLabel: "Visit sports program"
  },
  {
    slug: "creative-advocacy",
    eyebrow: "Arts route",
    title: "Creative advocacy campaigns",
    supportArea: donationCauses[3],
    summary:
      "Supports documentary production, photography, storytelling campaigns, and artist-led advocacy tied directly to humanitarian work.",
    amountLabel: "Current goal: NGN 950,000",
    targetAmount: 950000,
    raisedAmount: 0,
    beneficiariesLabel: "Campaign storytelling and artist collaboration fund",
    statusLabel: "Next creative campaign preparing for release",
    href: "/arts",
    hrefLabel: "Visit arts section"
  }
];

export const transparencyEntries = [
  {
    periodLabel: "Allocation plan",
    title: "Health outreach and family support",
    summary:
      "Planned allocations will direct support toward maternal kits, follow-up visits, and practical community health care for women and children.",
    amountLabel: "Allocations published as funds are received",
    allocationLabel: "Planned split — maternal kits 45%, follow-up visits 30%, nutrition support 15%, volunteer logistics 10%",
    statusLabel: "Tracking begins with the first documented donation",
    href: "/health",
    ctaLabel: "Open health work"
  },
  {
    periodLabel: "Allocation plan",
    title: "Education resources and facilitator preparation",
    summary:
      "Planned funding will support downloadable materials, coding introductions, and the preparation needed for community-led learning sessions.",
    amountLabel: "Allocations published as funds are received",
    allocationLabel: "Planned split — learning materials 40%, facilitator prep 30%, printing 20%, connectivity support 10%",
    statusLabel: "Tracking begins with the first documented donation",
    href: "/education",
    ctaLabel: "Open education"
  },
  {
    periodLabel: "Allocation plan",
    title: "Youth sports equipment and training logistics",
    summary:
      "Planned support covers balls, bibs, markers, and session logistics tied to structured youth development through sports.",
    amountLabel: "Allocations published as funds are received",
    allocationLabel: "Planned split — equipment 55%, coaching logistics 25%, community events 20%",
    statusLabel: "Tracking begins with the first documented donation",
    href: "/projects/dodoma-best-sports-center",
    ctaLabel: "Open sports project"
  },
  {
    periodLabel: "Allocation plan",
    title: "Creative advocacy production",
    summary:
      "Planned creative support covers concept development, field documentation, and campaign delivery for public-interest storytelling.",
    amountLabel: "Allocations published as funds are received",
    allocationLabel: "Planned split — field capture 50%, editing prep 30%, campaign distribution 20%",
    statusLabel: "Tracking begins with the first documented donation",
    href: "/arts",
    ctaLabel: "Open arts section"
  }
];

export const supportInquiryRoutes = [
  { value: "donor", label: "Donor" },
  { value: "volunteer", label: "Volunteer" },
  { value: "partner", label: "Partner organization" },
  { value: "creative", label: "Creative contributor" },
  { value: "specialist", label: "Specialist advisor" },
  { value: "sponsor", label: "Sponsor" }
];

export const supportInquiryAreas = [
  ...donationCauses,
  "Cross-program and general support"
];

export const donationCadences = [
  "One-time gift",
  "Monthly support",
  "Campaign sponsorship",
  "Need a follow-up conversation first"
];

export const supportAvailabilityOptions = [
  "Ready this month",
  "Available this quarter",
  "Flexible timing",
  "Just exploring options"
];

export const homeSupportAssurances = [
  {
    title: "Every support route stays tied to visible work",
    body: "Campaigns, projects, learning paths, and sector pages are structured so donors and partners move from first impression to context before they commit support."
  },
  {
    title: "The site works well on phones first",
    body: "Phone-first sections keep the site usable for supporters, partners, and communities across different devices and bandwidth conditions."
  },
  {
    title: "Growth is built into the structure, not bolted on later",
    body: "New contributors, country stories, campaigns, resources, and partner-led initiatives are added without breaking the credibility or usability of the initiative."
  }
];

export const involvementPaths = [
  {
    title: "Volunteer",
    body: "Support field events, learning sessions, and humanitarian programs on the ground."
  },
  {
    title: "Partner",
    body: "Collaborate as an NGO, donor, development partner, or community organization."
  },
  {
    title: "Contribute",
    body: "Share creative work, stories, resources, or specialist support with the initiative."
  },
  {
    title: "Sponsor",
    body: "Back a program, campaign, or flagship intervention with direct financial support."
  }
];

export const platformUpdates = [
  {
    title: "Sib creative profile and portfolio added to the network",
    category: "Profile",
    date: "April 11, 2026",
    body:
      "The public profile now reflects Sib's cinematography, video editing, photography, accessibility-led storytelling, and password-protected screening direction for supporter-facing media.",
    href: "/projects/premium-video",
    ctaLabel: "Open screening page"
  },
  {
    title: "Maternal health kits reach 50 families in first outreach",
    category: "Field report",
    date: "April 2026",
    body:
      "The first batch of maternal health kits was distributed to mothers and newborns across three communities, with follow-up visits scheduled for the coming weeks."
  },
  {
    title: "Dodoma Best Sports Center launches U-7 training group",
    category: "Program update",
    date: "March 2026",
    body:
      "The youngest age group at the sports center began structured training sessions, expanding the program's reach to children as young as seven."
  },
  {
    title: "Education hub crosses 12 curated resources",
    category: "Milestone",
    date: "March 2026",
    body:
      "The education library now includes downloadable guides, external lessons, facilitator toolkits, and coding pathways - all reviewed and organized into tracks."
  },
  {
    title: "Community storytelling campaign opens for submissions",
    category: "Campaign",
    date: "February 2026",
    body:
      "Artists, photographers, and spoken word performers are invited to submit work for the Voices of Resilience creative advocacy campaign."
  },
  {
    title: "Volunteer call for community tournament support",
    category: "Volunteer",
    date: "February 2026",
    body:
      "The initiative is looking for volunteers to help organize, referee, and document upcoming community football tournaments."
  },
  {
    title: "Nutrition flyer campaign enters design phase",
    category: "Campaign",
    date: "January 2026",
    body:
      "Quick-use nutrition guides for parents and caregivers are being designed for print distribution at community health events."
  }
];

export const blogPosts = [
  {
    slug: "why-visible-proof-matters-in-humanitarian-work",
    title: "Why visible proof matters in humanitarian work",
    excerpt: "Humanitarian trust grows when communities, supporters, and partners can see what is happening, where support is going, and what still needs attention.",
    category: "Field notes",
    author: "Humanity First Initiative",
    publishedAt: "2026-04-18",
    readingTime: "4 min read",
    imageSrc: stockMedia.donateHero.src,
    imageAlt: stockMedia.donateHero.alt,
    status: "published",
    featured: true,
    body: "Humanitarian work cannot rely on good intentions alone. People need to see the route from concern to action: the community need, the support pathway, the people served, and the follow-up that happens after the first visit.\n\nThat is why the platform treats stories, transparent donation routes, program pages, and field updates as part of the work itself. They help supporters understand where help is useful, and they help communities stay visible without being reduced to statistics.\n\nThe goal is simple: publish proof that is respectful, practical, and connected to real needs. When the work is documented clearly, trust becomes easier to build and easier to protect."
  },
  {
    slug: "building-support-routes-around-real-community-needs",
    title: "Building support routes around real community needs",
    excerpt: "Donation routes work best when they are connected to specific program areas: maternal health, education access, youth sports, and creative advocacy.",
    category: "Transparency",
    author: "Humanity First Initiative",
    publishedAt: "2026-04-10",
    readingTime: "5 min read",
    imageSrc: stockMedia.aboutMission.src,
    imageAlt: stockMedia.aboutMission.alt,
    status: "published",
    featured: false,
    body: "A useful support route starts with a real need, not a vague appeal. Families may need maternal health kits, learners may need low-data resources, youth programs may need equipment, and creative campaigns may need documentation support.\n\nThe platform organizes these needs into clear routes so donors and partners can understand what each contribution is meant to strengthen. That structure also makes it easier to report back with practical updates instead of broad promises.\n\nAs the work grows, the route system can keep expanding: new programs, new countries, new community partners, and new evidence from the field."
  },
  {
    slug: "creative-storytelling-without-losing-dignity",
    title: "Creative storytelling without losing dignity",
    excerpt: "Photography, film, writing, and design can make humanitarian work more visible while still protecting the dignity of people and communities.",
    category: "Storytelling",
    author: "Humanity First Initiative",
    publishedAt: "2026-03-29",
    readingTime: "3 min read",
    imageSrc: stockMedia.screeningHero.src,
    imageAlt: stockMedia.screeningHero.alt,
    status: "published",
    featured: false,
    body: "Creative work can carry humanitarian stories farther than reports alone. A photograph, short film, field note, or campaign poster can help people understand the human reality behind a program.\n\nBut visibility must be handled with care. The aim is not to turn people into symbols of suffering. The aim is to show context, strength, need, and practical action with consent and respect.\n\nThat is the standard this platform is moving toward: storytelling that invites support without flattening the people it exists to serve."
  },
  {
    slug: "sahel-food-crisis-what-communities-need-now",
    title: "Sahel food crisis: what communities need now",
    excerpt: "Across the Sahel region, over 45 million people face acute food insecurity driven by conflict, climate shocks, and rising costs. Local response networks are stretched thin.",
    category: "Humanitarian report",
    author: "Humanity First Initiative",
    publishedAt: "2026-04-22",
    readingTime: "6 min read",
    imageSrc: stockMedia.homeStories[0].src,
    imageAlt: stockMedia.homeStories[0].alt,
    status: "published",
    featured: false,
    body: "The Sahel food crisis is not new, but its scale in 2026 is unprecedented. Burkina Faso, Mali, Niger, Chad, and northern Nigeria are experiencing overlapping emergencies: armed conflict displacing millions, erratic rainfall destroying harvests, and global food price inflation making basic staples unaffordable.\n\nFor families already living on the edge, the gap between one meal and none is measured in days, not weeks. Mothers are walking hours to reach distribution points. Children under five are arriving at nutrition centers with severe acute malnutrition.\n\nWhat communities need is not abstract. They need ready-to-use therapeutic food for malnourished children, clean water access at displacement sites, seed and tool kits so displaced farmers can plant again, and cash transfers that let families buy what they actually need at local markets.\n\nThe humanitarian system is responding, but funding gaps remain enormous. Community-based organizations are often the first responders, yet they receive a fraction of the resources. Supporting local networks is not just efficient — it is the only way to reach people in areas where international access is restricted."
  },
  {
    slug: "maternal-health-gaps-in-sub-saharan-africa",
    title: "Maternal health gaps in sub-Saharan Africa",
    excerpt: "Sub-Saharan Africa accounts for roughly two-thirds of global maternal deaths. Most are preventable with basic care, skilled birth attendance, and postnatal follow-up.",
    category: "Health report",
    author: "Humanity First Initiative",
    publishedAt: "2026-04-15",
    readingTime: "5 min read",
    imageSrc: stockMedia.homeStories[0].src,
    imageAlt: stockMedia.homeStories[0].alt,
    status: "published",
    featured: false,
    body: "Every year, approximately 287,000 women die from complications during pregnancy and childbirth globally. Sub-Saharan Africa carries a disproportionate share of this burden — roughly two out of every three maternal deaths happen in the region.\n\nThe causes are well understood: hemorrhage, infection, hypertensive disorders, and unsafe abortion. The solutions are equally well documented: skilled birth attendants, emergency obstetric care, antenatal check-ups, postnatal follow-up, and access to family planning.\n\nYet millions of women still deliver without a trained health worker present. Rural clinics lack basic supplies. Transport to referral hospitals can take hours on unpaved roads. And cultural barriers sometimes delay care-seeking until complications become emergencies.\n\nCommunity health workers, mobile clinics, and maternal health kit distribution programs are closing some of these gaps. But sustained funding, training, and supply chain support are needed to make these interventions reliable rather than occasional."
  },
  {
    slug: "education-access-after-conflict-rebuilding-classrooms",
    title: "Education access after conflict: rebuilding classrooms",
    excerpt: "Over 100 million children in conflict-affected countries are out of school. Rebuilding education infrastructure is one of the slowest parts of post-conflict recovery.",
    category: "Education report",
    author: "Humanity First Initiative",
    publishedAt: "2026-04-08",
    readingTime: "5 min read",
    imageSrc: stockMedia.educationFeature.src,
    imageAlt: stockMedia.educationFeature.alt,
    status: "published",
    featured: false,
    body: "When conflict ends, schools are often among the last institutions to recover. Buildings are damaged or occupied. Teachers have fled. Curricula are outdated. And children who spent years out of school face learning gaps that standard classrooms are not designed to address.\n\nAcross the Democratic Republic of Congo, South Sudan, northern Mozambique, and the Lake Chad Basin, millions of children have missed years of formal education. For girls, the disruption is often permanent — early marriage, pregnancy, and household labor replace the classroom.\n\nAccelerated learning programs, community-based education, radio and phone-based instruction, and teacher training initiatives are showing results in some contexts. But they need consistent funding and local ownership to scale.\n\nThe education hub model — curated resources, facilitator guides, and low-bandwidth materials — is one practical response. It does not replace a functioning school system, but it keeps learning alive while systems are being rebuilt."
  },
  {
    slug: "climate-displacement-east-africa-horn",
    title: "Climate displacement across the Horn of Africa",
    excerpt: "Prolonged drought followed by devastating floods has displaced over 8 million people across Somalia, Ethiopia, and Kenya. Climate adaptation funding remains critically low.",
    category: "Humanitarian report",
    author: "Humanity First Initiative",
    publishedAt: "2026-03-25",
    readingTime: "6 min read",
    imageSrc: stockMedia.aboutHero.src,
    imageAlt: stockMedia.aboutHero.alt,
    status: "published",
    featured: false,
    body: "The Horn of Africa has experienced five consecutive failed rainy seasons followed by catastrophic flooding — a pattern climate scientists attribute directly to accelerating global warming. The result is a displacement crisis that has uprooted over 8 million people.\n\nPastoralist communities have lost entire herds. Farmers have watched crops fail year after year. Urban areas are absorbing displaced populations faster than services can expand. And women and children bear the heaviest burden — walking further for water, facing greater protection risks in displacement camps, and losing access to healthcare and education.\n\nInternational climate adaptation funding for Africa remains far below what is needed. Less than 10 percent of global climate finance reaches the continent, despite Africa contributing less than 4 percent of global emissions.\n\nLocal organizations are leading the response: early warning systems, drought-resistant seed distribution, water harvesting, and community-managed displacement sites. But without sustained investment, these efforts remain fragile."
  },
  {
    slug: "youth-sports-as-protection-in-displacement-settings",
    title: "Youth sports as protection in displacement settings",
    excerpt: "Structured sports programs in refugee and displacement camps reduce violence, improve mental health, and give young people a sense of routine and belonging.",
    category: "Field notes",
    author: "Humanity First Initiative",
    publishedAt: "2026-03-18",
    readingTime: "4 min read",
    imageSrc: stockMedia.homeHero.src,
    imageAlt: stockMedia.homeHero.alt,
    status: "published",
    featured: false,
    body: "In displacement settings, young people face compounding risks: interrupted education, family separation, exposure to violence, recruitment by armed groups, and the psychological toll of uncertainty. Structured sports programs address several of these risks simultaneously.\n\nRegular training sessions create routine. Team membership builds social bonds across ethnic and community lines. Coaches become trusted adults. And the physical activity itself helps manage stress, anxiety, and trauma symptoms.\n\nPrograms like Dodoma Best Sports Center demonstrate how grassroots sports initiatives can serve as both development and protection tools. The model is simple: volunteer coaches, basic equipment, consistent scheduling, and a safe space.\n\nScaling these programs requires modest but reliable funding — balls, bibs, cones, and transport. The return on investment, measured in reduced youth vulnerability and improved community cohesion, is significant."
  }
];

export const updateCards = platformUpdates.slice(0, 3).map((item) => ({
  title: item.title,
  body: item.body
}));

export const platformGalleryItems = [
  { ...stockMedia.homeStories[0], category: "Health" },
  { ...stockMedia.homeHero, category: "Sports" },
  { ...stockMedia.homeStories[2], category: "Community" },
  { ...stockMedia.educationFeature, category: "Education" },
  { ...stockMedia.homeStories[1], category: "Sports" },
  { ...stockMedia.aboutHero, category: "Community" },
  { ...stockMedia.donateHero, category: "Volunteer" },
  { ...stockMedia.aboutMission, category: "Community" }
];

export const educationMetrics = [
  { value: "12", label: "library resources across downloads, lessons, and toolkits" },
  { value: "3", label: "learning tracks for different entry levels" },
  { value: "Mobile-ready", label: "resources selected for phone-first learners" },
  { value: "Review first", label: "submitted materials checked before publication" }
];

export const educationTracks = [
  {
    title: "Coding Foundations",
    body: "A beginner-friendly path covering web basics, problem solving, and digital confidence for first-time learners.",
    eyebrow: "Track 01",
    tone: "mist"
  },
  {
    title: "Digital Skills for Work",
    body: "Practical sessions on internet use, productivity tools, online safety, and employability-oriented digital habits.",
    eyebrow: "Track 02",
    tone: "sand"
  },
  {
    title: "Community Learning Library",
    body: "Books, guides, worksheets, and curated materials available for download and reuse in community settings.",
    eyebrow: "Track 03",
    tone: "leaf"
  }
];

export const educationResources = [
  {
    title: "Foundational book pack",
    body: "A grouped download area for reading guides, early digital literacy notes, and youth-friendly learning materials.",
    eyebrow: "Download pack",
    tone: "paper"
  },
  {
    title: "External lesson playlist",
    body: "A linked lesson rail for beginner coding tutorials, web basics, recorded sessions, and reviewed learning videos.",
    eyebrow: "Lesson links",
    tone: "blush"
  },
  {
    title: "Facilitator toolkit",
    body: "Printable guides, session outlines, and activity templates for teachers, volunteers, and community mentors.",
    eyebrow: "Teaching kit",
    tone: "mist"
  },
  {
    title: "Learner spotlight",
    body: "A contribution path for learner projects, cohort updates, classroom outcomes, and community learning progress.",
    eyebrow: "Learner progress",
    tone: "paper"
  }
];

export const educationActions = [
  {
    title: "Submit a learning resource",
    body: "Share a lesson, guide, workbook, checklist, or facilitator kit for review before it enters the public library.",
    tone: "forest-ink"
  },
  {
    title: "Sponsor a learning cohort",
    body: "Fund devices, printing, connectivity, facilitator prep, and local sessions for a learner group.",
    tone: "mist"
  }
];

export const educationLibraryItems = [
  {
    title: "Digital basics guide",
    summary:
      "An orientation guide for learners building confidence with devices, internet use, safe browsing, and basic digital habits.",
    category: "Downloads",
    format: "PDF guide",
    level: "Beginner",
    actionLabel: "Open guide brief",
    href: "/education/resources/digital-basics-guide",
    external: false
  },
  {
    title: "Getting started with the web",
    summary:
      "A lightweight external lesson path that introduces how websites work, HTML, CSS, and beginner web concepts.",
    category: "Lessons",
    format: "External lesson",
    level: "Beginner",
    actionLabel: "Open lesson",
    href: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web",
    external: true
  },
  {
    title: "Community facilitator session outline",
    summary:
      "A session plan for teachers and volunteers running short digital literacy or beginner coding introductions.",
    category: "Toolkits",
    format: "Facilitator kit",
    level: "Community",
    actionLabel: "Open session outline",
    href: "/education/resources/facilitator-session-outline",
    external: false
  },
  {
    title: "Code.org beginner course",
    summary:
      "A youth-friendly coding entry point linked as part of a structured beginner pathway in the hub.",
    category: "Lessons",
    format: "Interactive course",
    level: "Beginner",
    actionLabel: "Open course",
    href: "https://code.org/learn",
    external: true
  },
  {
    title: "Printable workbook set",
    summary:
      "A reusable worksheet collection for offline follow-up after workshops or classroom sessions.",
    category: "Downloads",
    format: "Worksheet pack",
    level: "Mixed level",
    actionLabel: "Open workbook notes",
    href: "/education/resources/printable-workbook-set",
    external: false
  },
  {
    title: "Mentor checklist for cohort support",
    summary:
      "A checklist for volunteers, mentors, and facilitators supporting learners across multiple sessions.",
    category: "Toolkits",
    format: "Checklist",
    level: "Mentor",
    actionLabel: "Open mentor checklist",
    href: "/education/resources/mentor-checklist",
    external: false
  }
];

export const educationLmsCourses = [
  {
    id: "digital-foundations",
    title: "Digital Foundations",
    level: "Beginner",
    duration: "4 modules",
    track: "Digital literacy",
    summary:
      "A practical first course for learners building confidence with devices, internet access, online safety, and everyday digital tasks.",
    outcomes: [
      "Use a browser, search, and basic productivity tools with confidence",
      "Recognize common online safety risks",
      "Complete a simple digital task independently"
    ],
    modules: [
      {
        id: "device-confidence",
        title: "Device confidence",
        lessons: [
          { id: "buttons-ports", title: "Know the device", duration: "15 min", format: "Guide", objective: "Identify buttons, ports, charging needs, and safe handling habits." },
          { id: "settings-access", title: "Basic settings", duration: "20 min", format: "Practice", objective: "Adjust brightness, volume, Wi-Fi, language, and accessibility settings." }
        ]
      },
      {
        id: "internet-basics",
        title: "Internet basics",
        lessons: [
          { id: "browser-search", title: "Browser and search", duration: "25 min", format: "Lesson", objective: "Open a browser, search clearly, and identify useful results." },
          { id: "email-intro", title: "Email essentials", duration: "25 min", format: "Practice", objective: "Read, reply, and write a clear email message." }
        ]
      },
      {
        id: "online-safety",
        title: "Online safety",
        lessons: [
          { id: "strong-passwords", title: "Passwords and privacy", duration: "20 min", format: "Checklist", objective: "Create safer passwords and understand private information." },
          { id: "scams", title: "Spot scams", duration: "20 min", format: "Scenario", objective: "Recognize suspicious links, messages, and payment requests." }
        ]
      },
      {
        id: "everyday-task",
        title: "Capstone task",
        lessons: [
          { id: "task-submit", title: "Complete a digital task", duration: "35 min", format: "Assignment", objective: "Find information, write a short note, and submit it to a facilitator." }
        ]
      }
    ],
    quiz: [
      {
        id: "safety-password",
        question: "Which password habit is safest?",
        options: ["Use your birth year", "Reuse one password everywhere", "Use a long unique password", "Share it with a friend"],
        answer: 2
      },
      {
        id: "search-result",
        question: "What should a learner check before trusting a search result?",
        options: ["The source and date", "Only the color of the page", "How many ads it has", "Whether it loads slowly"],
        answer: 0
      }
    ],
    assignment:
      "Write a short message explaining one safe online habit and one digital task you can now complete.",
    resourceHref: "/education/resources/digital-basics-guide"
  },
  {
    id: "web-starter",
    title: "Web Starter Pathway",
    level: "Beginner to intermediate",
    duration: "5 modules",
    track: "Coding foundations",
    summary:
      "A low-bandwidth web course that introduces HTML, CSS, page structure, accessibility, and a first published project.",
    outcomes: [
      "Understand how web pages are structured",
      "Build a simple HTML and CSS page",
      "Explain accessibility basics for public-facing pages"
    ],
    modules: [
      {
        id: "web-map",
        title: "How the web works",
        lessons: [
          { id: "client-server", title: "Client, server, browser", duration: "20 min", format: "Lesson", objective: "Explain what happens when a page opens." },
          { id: "files-folders", title: "Files and folders", duration: "15 min", format: "Practice", objective: "Organize project files for a simple website." }
        ]
      },
      {
        id: "html",
        title: "HTML foundations",
        lessons: [
          { id: "tags", title: "Tags and structure", duration: "30 min", format: "Practice", objective: "Use headings, paragraphs, lists, links, and images." },
          { id: "semantic-html", title: "Semantic HTML", duration: "25 min", format: "Lesson", objective: "Choose elements that describe content clearly." }
        ]
      },
      {
        id: "css",
        title: "CSS foundations",
        lessons: [
          { id: "selectors", title: "Selectors and colors", duration: "30 min", format: "Practice", objective: "Style text, colors, spacing, and simple layouts." },
          { id: "responsive", title: "Responsive basics", duration: "30 min", format: "Practice", objective: "Make a page readable on a phone and desktop." }
        ]
      },
      {
        id: "accessibility",
        title: "Accessible pages",
        lessons: [
          { id: "alt-text", title: "Alt text and labels", duration: "20 min", format: "Checklist", objective: "Write useful alt text and label important controls." },
          { id: "contrast", title: "Readable contrast", duration: "20 min", format: "Review", objective: "Check whether text is readable against its background." }
        ]
      },
      {
        id: "project",
        title: "First website project",
        lessons: [
          { id: "build-project", title: "Build and present", duration: "45 min", format: "Assignment", objective: "Create a small page about a community topic and present it." }
        ]
      }
    ],
    quiz: [
      {
        id: "html-purpose",
        question: "What is HTML mainly used for?",
        options: ["Structuring page content", "Charging a phone", "Buying domain names", "Compressing video"],
        answer: 0
      },
      {
        id: "responsive-purpose",
        question: "Why should a page be responsive?",
        options: ["So it works on different screen sizes", "So it uses more data", "So images disappear", "So links stop working"],
        answer: 0
      }
    ],
    assignment:
      "Describe the website you would build for your community and list the HTML sections it needs.",
    resourceHref: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web",
    external: true
  },
  {
    id: "facilitator-lab",
    title: "Facilitator Lab",
    level: "Facilitator",
    duration: "3 modules",
    track: "Teaching and cohort delivery",
    summary:
      "A course for mentors, volunteers, and teachers preparing sessions, tracking learners, and adapting resources for low-bandwidth contexts.",
    outcomes: [
      "Plan a 60 to 90 minute learning session",
      "Support mixed-confidence learners",
      "Track learner progress and follow-up needs"
    ],
    modules: [
      {
        id: "session-design",
        title: "Session design",
        lessons: [
          { id: "session-flow", title: "Build the session flow", duration: "25 min", format: "Template", objective: "Plan welcome, demo, practice, reflection, and follow-up." },
          { id: "materials", title: "Prepare materials", duration: "20 min", format: "Checklist", objective: "Prepare print, phone, and offline backup materials." }
        ]
      },
      {
        id: "learner-support",
        title: "Learner support",
        lessons: [
          { id: "mixed-levels", title: "Mixed levels", duration: "25 min", format: "Scenario", objective: "Group learners and support different confidence levels." },
          { id: "mentor-checkins", title: "Mentor check-ins", duration: "20 min", format: "Practice", objective: "Use short check-ins to reduce dropout." }
        ]
      },
      {
        id: "cohort-review",
        title: "Cohort review",
        lessons: [
          { id: "progress-review", title: "Progress and evidence", duration: "25 min", format: "Review", objective: "Record attendance, completed tasks, and learner needs." }
        ]
      }
    ],
    quiz: [
      {
        id: "session-parts",
        question: "Which session structure is easiest to repeat?",
        options: ["Random activities only", "Welcome, demo, practice, reflection", "A lecture with no practice", "Only homework"],
        answer: 1
      },
      {
        id: "offline-backup",
        question: "Why prepare offline materials?",
        options: ["Connectivity may fail", "They replace all teaching", "They make sessions longer", "They stop learners asking questions"],
        answer: 0
      }
    ],
    assignment:
      "Draft a 60 minute session plan for a mixed-confidence learner group.",
    resourceHref: "/education/resources/facilitator-session-outline"
  }
];

export const educationResourcePages = [
  {
    slug: "digital-basics-guide",
    eyebrow: "Guide brief",
    title: "Digital Basics Guide",
    summary:
      "An entry resource covering device confidence, internet basics, safe browsing habits, and first steps for new digital learners.",
    body:
      "This guide helps community learners, youth cohorts, and first-time adult users build digital confidence before moving into structured classes or coding lessons.",
    audience: "Beginner learners, youth cohorts, and first-time adult users",
    format: "PDF guide",
    duration: "Short orientation resource",
    useCases: [
      "Use it at the beginning of digital literacy workshops",
      "Share it with families who need a short digital confidence handout",
      "Pair it with follow-up sessions on online safety and productivity basics"
    ],
    outcomes: [
      "Builds comfort with devices, browsers, and everyday web use",
      "Creates a stronger starting point for coding or employability tracks",
      "Helps facilitators explain digital basics in a more structured way"
    ]
  },
  {
    slug: "facilitator-session-outline",
    eyebrow: "Session outline",
    title: "Community Facilitator Session Outline",
    summary:
      "A session structure for volunteers, mentors, and teachers leading short digital literacy or coding introductions in community settings.",
    body:
      "This outline breaks a session into welcome, orientation, guided activity, reflection, and follow-up so multiple volunteers can support learners with different confidence levels.",
    audience: "Teachers, mentors, volunteers, and community facilitators",
    format: "Facilitator kit",
    duration: "60 to 90 minute session structure",
    useCases: [
      "Use it to standardize workshop delivery across different locations",
      "Adapt it for digital literacy, coding clubs, or resource-sharing events",
      "Support new volunteers who need a repeatable teaching flow"
    ],
    outcomes: [
      "Creates more consistent session quality across facilitators",
      "Makes it easier to welcome learners at mixed confidence levels",
      "Supports better follow-up and repeat community engagement"
    ]
  },
  {
    slug: "printable-workbook-set",
    eyebrow: "Workbook pack",
    title: "Printable Workbook Set",
    summary:
      "A reusable pack of worksheets for offline reinforcement after training sessions, school clubs, or digital skills workshops.",
    body:
      "The workbook set gives learners offline exercises for repetition, reflection, and guided practice when connectivity is limited or devices are shared across a group.",
    audience: "Children, youth groups, and mixed-level community learners",
    format: "Worksheet pack",
    duration: "Multi-session reinforcement material",
    useCases: [
      "Distribute after workshops where learners need an offline follow-up activity",
      "Use in school clubs or community groups with shared devices",
      "Adapt for revision, mentor check-ins, or short independent tasks"
    ],
    outcomes: [
      "Extends learning beyond the live session",
      "Supports low-bandwidth and offline environments",
      "Gives mentors and caregivers an easier way to stay involved"
    ]
  },
  {
    slug: "mentor-checklist",
    eyebrow: "Mentor checklist",
    title: "Mentor Checklist for Cohort Support",
    summary:
      "A guide for mentors and volunteers helping learners stay engaged across multiple sessions or short cohort programs.",
    body:
      "The checklist focuses on consistency, encouragement, and follow-through. It helps mentors keep track of what learners need, when to check in, and how to offer support without making the process feel heavy or overly formal.",
    audience: "Mentors, volunteers, and learning support staff",
    format: "Checklist",
    duration: "Reusable across full cohorts",
    useCases: [
      "Use it during weekly check-ins with learners",
      "Support volunteer mentors who are new to structured cohort care",
      "Create a repeatable quality baseline for mentorship across programs"
    ],
    outcomes: [
      "Improves learner follow-through and encouragement",
      "Keeps mentorship easy to repeat",
      "Helps the team maintain a more reliable support rhythm"
    ]
  }
];

export const educationSessionCards = [
  {
    title: "Mobile-first coding club",
    body: "A short learning cohort for phone-first learners covering web basics and beginner project practice.",
    eyebrow: "Active cohort",
    tone: "mist"
  },
  {
    title: "Volunteer-led digital literacy workshop",
    body: "A community session format focused on internet confidence, online safety, and essential digital skills.",
    eyebrow: "Workshop format",
    tone: "sand"
  },
  {
    title: "Facilitator resource drop",
    body: "A steady release area for guides, worksheets, and lesson outlines that mentors reuse locally.",
    eyebrow: "Resource library",
    tone: "leaf"
  }
];

export const educationSubmissionRoles = [
  "Educator",
  "Volunteer",
  "Organization",
  "Mentor",
  "Content creator",
  "Other"
];

export const educationSubmissionTypes = [
  "Book or PDF",
  "Lesson link",
  "Toolkit",
  "Course",
  "Worksheet pack",
  "Other"
];

export const educationAudienceLevels = [
  "Children",
  "Youth",
  "Beginner adults",
  "Facilitators",
  "Mixed level"
];

export const educationSubmissionGuidelines = [
  {
    eyebrow: "Preferred format",
    title: "Submit public links or lightweight files that open on mobile.",
    body: "Resources work best as public links, lightweight downloads, or clean teaching materials that serve low-bandwidth settings.",
    tone: "mist"
  },
  {
    eyebrow: "Quality filter",
    title: "Name the learner, teaching moment, and outcome.",
    body: "Submissions need to explain who the material serves, how it will be used, and what a learner or facilitator can do with it.",
    tone: "sand"
  },
  {
    eyebrow: "Submission note",
    title: "Only share resources you have permission to submit.",
    body: "If a file, guide, or lesson belongs to someone else, make sure you have the right to share it or submit the original public source link instead.",
    tone: "leaf"
  }
];

export const educationReviewSteps = [
  {
    eyebrow: "Step 01",
    title: "Submission enters the review queue",
    body: "Every resource is stored as a pending submission so the team reviews it before anything appears in the public library.",
    tone: "paper"
  },
  {
    eyebrow: "Step 02",
    title: "Quality, fit, and permissions are checked",
    body: "The review pass focuses on relevance, usability, audience fit, and whether the submission is safe to share with the initiative.",
    tone: "blush"
  },
  {
    eyebrow: "Step 03",
    title: "Approved resources move into the live hub",
    body: "The workflow keeps moderation consistent and the public library trustworthy.",
    tone: "mist"
  }
];
