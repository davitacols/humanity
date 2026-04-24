import { stockMedia } from "./stockMedia";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
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
  { label: "Sib profile live", href: "/about#sib" },
  { label: "Low-bandwidth friendly access", href: "/education" }
];

export const proofStats = [
  { value: "24", label: "documented projects and field updates" },
  { value: "4", label: "core program areas under one mission" },
  { value: "Nigeria + Ghana", label: "current footprint with regional growth" }
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
  "Women and children centered support",
  "Built for low-bandwidth access",
  "Ready for cross-country growth"
];

export const homeTrustSignals = [
  {
    eyebrow: "Documented impact",
    title: "Stories are tied to real interventions, not vague promises.",
    body: "Support is anchored in visible work, field updates, and concrete program categories that people follow with confidence.",
    tone: "mist"
  },
  {
    eyebrow: "Trusted support path",
    title: "Donation asks stay close to context, proof, and next steps.",
    body: "Visitors understand what support helps fund before they submit a support request or speak with the team.",
    tone: "sand"
  },
  {
    eyebrow: "Designed to scale",
    title: "The initiative grows from community-led work into a wider network.",
    body: "Partners, contributors, new campaigns, and additional countries are introduced without rebuilding the core story structure.",
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
    eyebrow: "Strategic contributor",
    name: "Ikokwu Chidozie Ikemba",
    role: "Psychologist, strategist, media practitioner, and environmental entrepreneur",
    location: "Nigeria",
    summary:
      "Contributes public communication, sustainability experience, partnership thinking, and cross-sector storytelling with a focus on civic relevance and visible social impact.",
    body:
      "This profile sits alongside other public collaborators in the network. It represents one contributor's communication, sustainability, and public-impact experience without implying a leadership designation.",
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
    eyebrow: "Regional collaborator",
    name: "Regional partner in Ghana",
    role: "Community collaborator and regional growth partner",
    location: "Ghana",
    summary:
      "Supports the platform's expansion into Ghana through local relationship building, community listening, partnership development, and field-level collaboration.",
    body:
      "This regional collaborator role represents the platform's multi-country direction, helping shape how projects, campaigns, and local changemakers can be represented beyond one public profile.",
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
    eyebrow: "Creative collaborator",
    name: "Sib",
    role: "Cinematographer, video editor, and creative food and travel photographer",
    location: "West Midlands, United Kingdom",
    summary:
      "Brings cinematography, video editing, and accessibility-led storytelling to the wider network, with a focus on visually compelling work that connects with audiences and drives impact.",
    body:
      "Sib is a cinematographer and video editor based in the West Midlands who is passionate about film, TV, and meaningful storytelling for brands, organizations, and independent projects. The work is shaped by a strong commitment to accessibility and a lived autistic perspective, alongside a parallel practice in creative food and travel photography rooted in authenticity, beauty, and impact.",
    tags: [
      "Cinematography",
      "Video editing",
      "Accessibility-led storytelling",
      "Food and travel photography",
      "Impact-driven collaboration"
    ],
    href: "https://sib-cinematographer.squarespace.com/",
    hrefLabel: "View portfolio",
    imageSrc: "",
    imageAlt: "",
    imageLabel: "",
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
    title: "Education Access",
    body: "Digital skills, books, downloadable resources, and external lessons designed for practical learning.",
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
  body: "Health outreach is presented as a human story first: mothers, children, caregivers, volunteers, and the practical support that helps families move through vulnerable moments with more dignity.",
  quote: "People support more confidently when they can understand the need, see the work, and follow what happens next."
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
    "A screening prototype for campaign documentaries, event recordings, and supporter-facing film releases.",
  description:
    "This feature shows how a dedicated documentary release path could work, including timed access, dedicated playback, and supporter-facing release context.",
  price: "NGN 4,500",
  runtime: "12 minute documentary cut",
  accessWindow: "48-hour viewing window",
  videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  benefits: [
    "A single-title access window for campaigns or special releases",
    "A local preview of the access and playback experience",
    "Space for context, partner acknowledgements, and a support call after the film",
    "Ready for a real payment and entitlement layer when the final provider is approved"
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
    raisedAmount: 850000,
    beneficiariesLabel: "50 families in the active outreach pipeline",
    statusLabel: "Current quarter funding gap",
    href: "/health",
    hrefLabel: "Visit health program"
  },
  {
    slug: "education-access",
    eyebrow: "Education route",
    title: "Education access and digital skills",
    supportArea: donationCauses[1],
    summary:
      "Keeps books, low-bandwidth learning materials, facilitator guides, and beginner digital-skills sessions available to learners.",
    amountLabel: "Current goal: NGN 1,800,000",
    targetAmount: 1800000,
    raisedAmount: 620000,
    beneficiariesLabel: "Three learning tracks in active development",
    statusLabel: "Resource build-out in progress",
    href: "/education",
    hrefLabel: "Visit education hub"
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
    raisedAmount: 740000,
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
    raisedAmount: 310000,
    beneficiariesLabel: "Campaign storytelling and artist collaboration fund",
    statusLabel: "Next creative campaign preparing for release",
    href: "/arts",
    hrefLabel: "Visit arts section"
  }
];

export const transparencyEntries = [
  {
    periodLabel: "Q2 2026 tracker",
    title: "Health outreach and family support snapshot",
    summary:
      "Current documented allocations cover maternal kits, follow-up visits, and practical community health support for women and children.",
    amountLabel: "NGN 850,000 documented this cycle",
    allocationLabel: "Maternal kits 45%, follow-up visits 30%, nutrition support 15%, volunteer logistics 10%",
    statusLabel: "Published for supporter review",
    href: "/health",
    ctaLabel: "Open health work"
  },
  {
    periodLabel: "Q2 2026 tracker",
    title: "Education resources and facilitator preparation",
    summary:
      "Funding in this window supports downloadable materials, coding introductions, and the practical preparation needed for community-led learning sessions.",
    amountLabel: "NGN 620,000 documented this cycle",
    allocationLabel: "Learning materials 40%, facilitator prep 30%, printing 20%, connectivity support 10%",
    statusLabel: "Published for supporter review",
    href: "/education",
    ctaLabel: "Open education hub"
  },
  {
    periodLabel: "Q1 2026 tracker",
    title: "Youth sports equipment and training logistics",
    summary:
      "This snapshot covers balls, bibs, markers, and session logistics tied to structured youth development through sports.",
    amountLabel: "NGN 740,000 documented this cycle",
    allocationLabel: "Equipment 55%, coaching logistics 25%, community events 20%",
    statusLabel: "Published for supporter review",
    href: "/projects/dodoma-best-sports-center",
    ctaLabel: "Open sports project"
  },
  {
    periodLabel: "Q1 2026 tracker",
    title: "Creative advocacy production prep",
    summary:
      "Documented creative spend currently covers concept development, field documentation, and campaign delivery planning for public-interest storytelling.",
    amountLabel: "NGN 310,000 documented this cycle",
    allocationLabel: "Field capture 50%, editing prep 30%, campaign distribution 20%",
    statusLabel: "Published for supporter review",
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
    body: "Clear sections and responsive layouts keep the site usable for supporters, partners, and communities across different devices and bandwidth conditions."
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
      "The public profile now reflects Sib's current cinematography, video editing, photography, and accessibility-led storytelling focus, with a direct portfolio link for media and brand collaborations.",
    href: "https://sib-cinematographer.squarespace.com/",
    ctaLabel: "View portfolio"
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
    excerpt:
      "Humanitarian trust grows when communities, supporters, and partners can see what is happening, where support is going, and what still needs attention.",
    category: "Field notes",
    author: "Humanity First Initiative",
    publishedAt: "2026-04-18",
    readingTime: "4 min read",
    imageSrc: stockMedia.donateHero.src,
    imageAlt: stockMedia.donateHero.alt,
    status: "published",
    featured: true,
    body:
      "Humanitarian work cannot rely on good intentions alone. People need to see the route from concern to action: the community need, the support pathway, the people served, and the follow-up that happens after the first visit.\n\nThat is why the platform treats stories, transparent donation routes, program pages, and field updates as part of the work itself. They help supporters understand where help is useful, and they help communities stay visible without being reduced to statistics.\n\nThe goal is simple: publish proof that is respectful, practical, and connected to real needs. When the work is documented clearly, trust becomes easier to build and easier to protect."
  },
  {
    slug: "building-support-routes-around-real-community-needs",
    title: "Building support routes around real community needs",
    excerpt:
      "Donation routes work best when they are connected to specific program areas: maternal health, education access, youth sports, and creative advocacy.",
    category: "Transparency",
    author: "Humanity First Initiative",
    publishedAt: "2026-04-10",
    readingTime: "5 min read",
    imageSrc: stockMedia.aboutMission.src,
    imageAlt: stockMedia.aboutMission.alt,
    status: "published",
    featured: false,
    body:
      "A useful support route starts with a real need, not a vague appeal. Families may need maternal health kits, learners may need low-data resources, youth programs may need equipment, and creative campaigns may need documentation support.\n\nThe platform organizes these needs into clear routes so donors and partners can understand what each contribution is meant to strengthen. That structure also makes it easier to report back with practical updates instead of broad promises.\n\nAs the work grows, the route system can keep expanding: new programs, new countries, new community partners, and new evidence from the field."
  },
  {
    slug: "creative-storytelling-without-losing-dignity",
    title: "Creative storytelling without losing dignity",
    excerpt:
      "Photography, film, writing, and design can make humanitarian work more visible while still protecting the dignity of people and communities.",
    category: "Storytelling",
    author: "Humanity First Initiative",
    publishedAt: "2026-03-29",
    readingTime: "3 min read",
    imageSrc: stockMedia.screeningHero.src,
    imageAlt: stockMedia.screeningHero.alt,
    status: "published",
    featured: false,
    body:
      "Creative work can carry humanitarian stories farther than reports alone. A photograph, short film, field note, or campaign poster can help people understand the human reality behind a program.\n\nBut visibility must be handled with care. The aim is not to turn people into symbols of suffering. The aim is to show context, strength, need, and practical action with consent and respect.\n\nThat is the standard this platform is moving toward: storytelling that invites support without flattening the people it exists to serve."
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
  { value: "12", label: "curated resources ready to use" },
  { value: "3", label: "learning tracks for different entry levels" },
  { value: "Mobile-ready", label: "materials that work on phones" },
  { value: "Ongoing", label: "new lessons and updates added regularly" }
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
    body: "A grouped download area for youth-friendly books, reading guides, and early digital literacy materials.",
    eyebrow: "Downloadable resource",
    tone: "paper"
  },
  {
    title: "External lesson playlist",
    body: "An embedded or linked lesson rail for coding tutorials, recorded sessions, and curated learning videos.",
    eyebrow: "Hosted externally",
    tone: "blush"
  },
  {
    title: "Facilitator toolkit",
    body: "Printable guides, session outlines, and activity templates for teachers, volunteers, and community mentors.",
    eyebrow: "Community delivery",
    tone: "mist"
  },
  {
    title: "Learner spotlight",
    body: "A story section for showcasing participant progress, projects, and practical outcomes from the hub.",
    eyebrow: "Proof of learning",
    tone: "paper"
  }
];

export const educationActions = [
  {
    title: "Submit a learning resource",
    body: "Invite educators, contributors, and volunteers to share vetted books, lessons, or toolkits.",
    tone: "forest-ink"
  },
  {
    title: "Sponsor a learning cohort",
    body: "Support devices, printing, connectivity, and local training sessions for a cohort.",
    tone: "mist"
  }
];

export const educationLibraryItems = [
  {
    title: "Digital basics guide",
    summary:
      "A practical orientation resource for learners building confidence with devices, internet use, and basic digital habits.",
    category: "Downloads",
    format: "PDF guide",
    level: "Beginner",
    actionLabel: "Open guide overview",
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
      "A session plan template for teachers and volunteers running short digital literacy or coding introductions.",
    category: "Toolkits",
    format: "Facilitator kit",
    level: "Community",
    actionLabel: "Open facilitator outline",
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
      "A practical checklist for volunteers, mentors, and facilitators supporting learners over multiple sessions.",
    category: "Toolkits",
    format: "Checklist",
    level: "Mentor",
    actionLabel: "Open mentor checklist",
    href: "/education/resources/mentor-checklist",
    external: false
  }
];

export const educationResourcePages = [
  {
    slug: "digital-basics-guide",
    eyebrow: "Guide overview",
    title: "Digital Basics Guide",
    summary:
      "A practical entry resource covering device confidence, internet basics, safe browsing habits, and first steps for new digital learners.",
    body:
      "This guide is positioned as a simple starting point for community learners, youth cohorts, and first-time adults who need a calm introduction to digital tools before moving into structured classes or coding lessons.",
    audience: "Beginner learners, youth cohorts, and first-time adult users",
    format: "PDF guide",
    duration: "Short orientation resource",
    useCases: [
      "Use it at the beginning of digital literacy workshops",
      "Share it with families who need a simple digital confidence handout",
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
    eyebrow: "Toolkit overview",
    title: "Community Facilitator Session Outline",
    summary:
      "A session structure for volunteers, mentors, and teachers leading short digital literacy or coding introductions in community settings.",
    body:
      "This outline gives facilitators a more confident starting point by breaking a session into welcome, orientation, guided activity, reflection, and follow-up. It is especially useful when multiple volunteers are supporting learners with different confidence levels.",
    audience: "Teachers, mentors, volunteers, and community facilitators",
    format: "Facilitator kit",
    duration: "60 to 90 minute session structure",
    useCases: [
      "Use it to standardize workshop delivery across different locations",
      "Adapt it for digital literacy, coding clubs, or resource-sharing events",
      "Support new volunteers who need a clear teaching flow"
    ],
    outcomes: [
      "Creates more consistent session quality across facilitators",
      "Makes it easier to welcome learners at mixed confidence levels",
      "Supports better follow-up and repeat community engagement"
    ]
  },
  {
    slug: "printable-workbook-set",
    eyebrow: "Workbook overview",
    title: "Printable Workbook Set",
    summary:
      "A reusable pack of worksheets for offline reinforcement after training sessions, school clubs, or digital skills workshops.",
    body:
      "The workbook set is intended for places where learners need something practical to carry home. It supports repetition, reflection, and guided practice when connectivity is limited or devices are shared across a group.",
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
    eyebrow: "Checklist overview",
    title: "Mentor Checklist for Cohort Support",
    summary:
      "A practical guide for mentors and volunteers helping learners stay engaged across multiple sessions or short cohort programs.",
    body:
      "The checklist focuses on consistency, encouragement, and follow-through. It helps mentors keep track of what learners need, when to check in, and how to offer support without making the process feel heavy or overly formal.",
    audience: "Mentors, volunteers, and learning support staff",
    format: "Checklist",
    duration: "Reusable across full cohorts",
    useCases: [
      "Use it during weekly check-ins with learners",
      "Support volunteer mentors who are new to structured cohort care",
      "Create a simple quality baseline for mentorship across programs"
    ],
    outcomes: [
      "Improves learner follow-through and encouragement",
      "Keeps mentorship practical and easy to repeat",
      "Helps the team maintain a more reliable support rhythm"
    ]
  }
];

export const educationSessionCards = [
  {
    title: "Mobile-first coding club",
    body: "A short-format learning cohort designed for phones first, covering web basics and simple project practice.",
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
    title: "Keep it practical and easy to open on mobile.",
    body: "Resources work best as public links, lightweight downloads, or clean teaching materials that serve low-bandwidth settings.",
    tone: "mist"
  },
  {
    eyebrow: "Quality filter",
    title: "Prioritize clarity, usefulness, and community relevance.",
    body: "We prioritize materials that support real learning moments, not generic content dumps or link collections with weak context.",
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
