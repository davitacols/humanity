from pathlib import Path
from textwrap import wrap
from xml.sax.saxutils import escape


OUTPUT_DIR = Path("figma_screens")
OUTPUT_DIR.mkdir(exist_ok=True)

PALETTE = {
    "cream": "#F5F0E6",
    "paper": "#FFFDF8",
    "forest": "#16463F",
    "forest_soft": "#2E6159",
    "clay": "#C96D47",
    "gold": "#E5C37A",
    "ink": "#1E1A18",
    "muted": "#746B64",
    "sage": "#B8C8C1",
    "mist": "#E4ECE9",
    "line": "#D8D0C3",
    "shadow": "#D9D1C3",
}

FONT_HEAD = "Georgia"
FONT_BODY = "Arial"


def save(name: str, content: str) -> None:
    (OUTPUT_DIR / name).write_text(content, encoding="utf-8")


def attrs(**kwargs) -> str:
    return " ".join(f'{k}="{escape(str(v))}"' for k, v in kwargs.items() if v is not None)


def rect(x, y, w, h, fill, rx=24, stroke=None, stroke_width=1, opacity=None):
    return f'<rect {attrs(x=x, y=y, width=w, height=h, rx=rx, fill=fill, stroke=stroke, **{"stroke-width": stroke_width, "opacity": opacity})}/>'


def circle(cx, cy, r, fill, opacity=None):
    return f'<circle {attrs(cx=cx, cy=cy, r=r, fill=fill, opacity=opacity)}/>'


def line(x1, y1, x2, y2, stroke, stroke_width=1, opacity=None):
    return f'<line {attrs(x1=x1, y1=y1, x2=x2, y2=y2, stroke=stroke, **{"stroke-width": stroke_width, "stroke-linecap": "round", "opacity": opacity})}/>'


def text_block(
    x,
    y,
    text,
    size=16,
    color=None,
    family=FONT_BODY,
    weight="400",
    max_width=420,
    line_height=1.35,
    anchor="start",
):
    color = color or PALETTE["ink"]
    approx_chars = max(12, int(max_width / (size * 0.55)))
    lines = []
    for paragraph in text.split("\n"):
        if not paragraph.strip():
            lines.append("")
            continue
        lines.extend(wrap(paragraph, width=approx_chars))
    spans = []
    for idx, item in enumerate(lines):
        dy = "0" if idx == 0 else str(round(size * line_height, 1))
        spans.append(f'<tspan x="{x}" dy="{dy}">{escape(item)}</tspan>')
    return (
        f'<text {attrs(x=x, y=y, fill=color, **{"font-family": family, "font-size": size, "font-weight": weight, "text-anchor": anchor})}>'
        + "".join(spans)
        + "</text>"
    )


def pill(x, y, label, fill, text_fill, w=None):
    if w is None:
        w = max(96, len(label) * 8 + 28)
    return rect(x, y, w, 38, fill, rx=19) + text_block(
        x + w / 2, y + 24, label, size=14, color=text_fill, weight="700", anchor="middle", max_width=w - 20
    )


def button(x, y, label, kind="primary", w=None):
    if w is None:
        w = max(132, len(label) * 8 + 34)
    fill = PALETTE["forest"] if kind == "primary" else PALETTE["paper"]
    stroke = None if kind == "primary" else PALETTE["forest"]
    text_fill = PALETTE["paper"] if kind == "primary" else PALETTE["forest"]
    return rect(x, y, w, 48, fill, rx=24, stroke=stroke, stroke_width=1.5) + text_block(
        x + w / 2, y + 30, label, size=15, color=text_fill, weight="700", anchor="middle", max_width=w - 20
    )


def shadow_card(x, y, w, h, fill=PALETTE["paper"], rx=28, stroke=PALETTE["line"]):
    return rect(x + 6, y + 10, w, h, PALETTE["shadow"], rx=rx, opacity=0.35) + rect(x, y, w, h, fill, rx=rx, stroke=stroke)


def photo_placeholder(x, y, w, h, label, accent):
    return "".join(
        [
            rect(x, y, w, h, accent, rx=28),
            rect(x + 18, y + 18, w - 36, h - 36, PALETTE["paper"], rx=22, opacity=0.18),
            circle(x + w - 70, y + 60, 28, PALETTE["gold"], opacity=0.7),
            circle(x + 58, y + h - 64, 20, PALETTE["paper"], opacity=0.55),
            text_block(x + 28, y + h - 36, label, size=16, color=PALETTE["paper"], weight="700", max_width=w - 56),
        ]
    )


def stat_card(x, y, w, h, value, label):
    return (
        shadow_card(x, y, w, h, fill=PALETTE["paper"], rx=24)
        + text_block(x + 24, y + 44, value, size=30, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=w - 48)
        + text_block(x + 24, y + 78, label, size=14, color=PALETTE["muted"], max_width=w - 48)
    )


def section_heading(x, y, eyebrow, title, body, max_width=560):
    return "".join(
        [
            text_block(x, y, eyebrow.upper(), size=13, color=PALETTE["clay"], weight="700", max_width=max_width),
            text_block(x, y + 34, title, size=34, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=max_width),
            text_block(x, y + 110, body, size=16, color=PALETTE["muted"], max_width=max_width),
        ]
    )


def header(width, active):
    items = ["Home", "About", "Projects", "Programs", "Donate", "Get Involved"]
    xs = [520, 615, 720, 836, 960, 1064]
    parts = [
        text_block(92, 74, "Humanity First", size=24, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=220),
        text_block(92, 96, "Initiative", size=14, color=PALETTE["muted"], weight="700", max_width=160),
    ]
    for item, x in zip(items, xs):
        color = PALETTE["forest"] if item == active else PALETTE["muted"]
        parts.append(text_block(x, 78, item, size=15, color=color, weight="700" if item == active else "600"))
    parts.append(button(width - 230, 50, "Donate Now", kind="primary", w=138))
    return "".join(parts)


def footer(width, y):
    return (
        rect(72, y, width - 144, 180, PALETTE["forest"], rx=34)
        + text_block(110, y + 56, "Built to grow with new projects, partners, and countries.", size=30, color=PALETTE["paper"], family=FONT_HEAD, weight="700", max_width=620)
        + text_block(110, y + 110, "A digital platform for dignity, transparency, and grassroots storytelling.", size=16, color="#DDE8E4", max_width=540)
        + button(width - 250, y + 66, "Request Partnership", kind="secondary", w=160)
    )


def desktop_shell(title, width=1440, height=2200, body=""):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
<title>{escape(title)}</title>
<rect width="{width}" height="{height}" fill="{PALETTE['cream']}"/>
<circle cx="{width - 80}" cy="120" r="220" fill="{PALETTE['gold']}" opacity="0.32"/>
<circle cx="86" cy="{height - 90}" r="180" fill="{PALETTE['sage']}" opacity="0.24"/>
{body}
</svg>
"""


def mobile_shell(title, width=390, height=1760, body=""):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
<title>{escape(title)}</title>
<rect width="{width}" height="{height}" fill="{PALETTE['cream']}"/>
<circle cx="330" cy="90" r="90" fill="{PALETTE['gold']}" opacity="0.28"/>
{body}
</svg>
"""


def build_style_guide():
    parts = [
        text_block(84, 110, "Humanity First", size=18, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(84, 146, "Brand Direction & Screen System", size=48, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=620),
        text_block(84, 212, "Editorial warmth meets donor trust. This direction blends impact storytelling, earthy optimism, and strong calls to action so the platform feels both human and credible.", size=17, color=PALETTE["muted"], max_width=620),
        shadow_card(84, 310, 560, 330),
        text_block(116, 360, "Visual Mood", size=24, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
    ]
    bullets = [
        "Warm cream backgrounds instead of generic white.",
        "Deep forest green for trust, action, and stability.",
        "Terracotta and gold accents for energy and hope.",
        "Large editorial headings paired with practical content cards.",
        "Field-photo panels and proof blocks to keep impact visible.",
    ]
    yy = 406
    for item in bullets:
        parts.append(text_block(130, yy, item, size=16, color=PALETTE["ink"], max_width=480))
        parts.append(circle(118, yy - 6, 4.5, PALETTE["clay"]))
        yy += 40

    parts += [
        shadow_card(706, 310, 650, 330),
        text_block(738, 360, "Palette", size=24, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
    ]
    colors = [
        ("Forest", PALETTE["forest"]),
        ("Clay", PALETTE["clay"]),
        ("Gold", PALETTE["gold"]),
        ("Cream", PALETTE["cream"]),
        ("Sage", PALETTE["sage"]),
        ("Ink", PALETTE["ink"]),
    ]
    for idx, (name, value) in enumerate(colors):
        cx = 738 + (idx % 3) * 180
        cy = 410 + (idx // 3) * 120
        parts += [
            rect(cx, cy, 120, 62, value, rx=18),
            text_block(cx, cy + 92, name, size=15, color=PALETTE["ink"], weight="700", max_width=120),
            text_block(cx, cy + 114, value, size=13, color=PALETTE["muted"], max_width=120),
        ]

    parts += [
        shadow_card(84, 692, 620, 450),
        text_block(116, 740, "Typography", size=24, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(116, 812, "Stories that move support.", size=40, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=500),
        text_block(116, 880, "Editorial headline style for mission moments and major impact narratives.", size=16, color=PALETTE["muted"], max_width=470),
        line(116, 920, 668, 920, PALETTE["line"], 1.5),
        text_block(116, 980, "This body style is designed for trust-building content: concise, readable, and useful on both desktop and mobile layouts.", size=17, color=PALETTE["ink"], max_width=500),
        text_block(116, 1060, "Button / CTA", size=15, color=PALETTE["muted"], weight="700"),
        button(116, 1084, "Donate Now", kind="primary", w=140),
        button(270, 1084, "See Projects", kind="secondary", w=140),
        shadow_card(738, 692, 618, 450, fill=PALETTE["mist"]),
        text_block(770, 740, "Component Direction", size=24, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        stat_card(770, 802, 170, 122, "12+", "Impact sectors and campaigns"),
        stat_card(958, 802, 170, 122, "4k", "Lives engaged through programs"),
        stat_card(1146, 802, 170, 122, "92%", "Donation clarity target"),
        shadow_card(770, 960, 546, 144, fill=PALETTE["paper"], rx=24),
        text_block(800, 1006, "Signature Layout Pattern", size=22, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(800, 1046, "Large narrative block on one side, proof cards or imagery on the other, then a strong section CTA underneath.", size=16, color=PALETTE["muted"], max_width=470),
        footer(1440, 1242),
    ]
    return desktop_shell("Brand Direction", height=1500, body="".join(parts))


def build_home():
    parts = [
        header(1440, "Home"),
        rect(72, 126, 1296, 560, PALETTE["paper"], rx=40),
        circle(1250, 240, 160, PALETTE["gold"], opacity=0.24),
        circle(830, 620, 120, PALETTE["sage"], opacity=0.22),
        pill(104, 164, "Grassroots impact across Africa", PALETTE["mist"], PALETTE["forest"], w=236),
        text_block(104, 240, "Humanity, dignity, and practical hope in one platform.", size=56, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=560),
        text_block(104, 388, "A mission-led digital home for humanitarian interventions, donor trust, education access, health awareness, creative advocacy, and sports development.", size=18, color=PALETTE["muted"], max_width=540),
        button(104, 492, "Donate Now", kind="primary", w=150),
        button(270, 492, "See Projects", kind="secondary", w=148),
        text_block(104, 592, "Built for donors, volunteers, NGOs, social investors, creatives, youth groups, and communities who want to see credible work and take action.", size=15, color=PALETTE["muted"], max_width=520),
        photo_placeholder(780, 170, 240, 210, "Field outreach and maternal health support", PALETTE["forest"]),
        photo_placeholder(1040, 220, 260, 290, "Youth sports leadership camp", PALETTE["clay"]),
        photo_placeholder(760, 404, 260, 220, "Creative advocacy and storytelling", PALETTE["forest_soft"]),
        text_block(86, 748, "Proof of impact", size=16, color=PALETTE["clay"], weight="700"),
        stat_card(84, 780, 290, 128, "24", "Community projects documented"),
        stat_card(392, 780, 290, 128, "5", "Program pillars presented clearly"),
        stat_card(700, 780, 290, 128, "3 min", "Average path to donation"),
        stat_card(1008, 780, 348, 128, "Low-bandwidth", "Performance-first experience for mobile users"),
        section_heading(84, 982, "Program pillars", "A home page that proves breadth without losing focus.", "Each pillar is treated as a gateway into impact work, not just a decorative category."),
    ]
    cards = [
        ("Education Access", "Books, digital skills, downloadable resources, and external lessons.", PALETTE["mist"]),
        ("Arts & Music", "Creative advocacy, artist spotlights, spoken word, and story-led campaigns.", "#F9EFEA"),
        ("Public Health", "Preventive health education, safety resources, and community campaigns.", "#EEF5F0"),
        ("Sports Development", "Grassroots programs, talent spotlighting, drills, and youth engagement.", "#FBF3E5"),
    ]
    for idx, (title, desc, fill) in enumerate(cards):
        cx = 84 + (idx % 2) * 634
        cy = 1180 + (idx // 2) * 220
        parts += [
            shadow_card(cx, cy, 602, 188, fill=fill),
            text_block(cx + 30, cy + 58, title, size=28, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=340),
            text_block(cx + 30, cy + 106, desc, size=16, color=PALETTE["muted"], max_width=360),
            pill(cx + 30, cy + 136, "Explore section", PALETTE["paper"], PALETTE["forest"], w=138),
        ]
    parts += [
        section_heading(84, 1658, "Featured impact story", "Put a living story at the center of the page.", "Instead of leading with generic text, the design gives one flagship story a large, emotional block with room for quotes and evidence."),
        shadow_card(84, 1850, 1270, 250, fill=PALETTE["paper"], rx=32),
        photo_placeholder(112, 1880, 360, 190, "Project spotlight photo", PALETTE["clay"]),
        text_block(510, 1918, "Safe beginnings for mothers and children", size=34, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=520),
        text_block(510, 1988, "Feature one intervention with a short narrative, one quote, and a visible result panel so supporters immediately understand what changed and why it matters.", size=17, color=PALETTE["muted"], max_width=520),
        pill(510, 2060, "Read full story", PALETTE["forest"], PALETTE["paper"], w=130),
        pill(652, 2060, "View report", PALETTE["mist"], PALETTE["forest"], w=118),
    ]
    return desktop_shell("Home Screen", body="".join(parts))


def build_about():
    parts = [
        header(1440, "About"),
        section_heading(84, 150, "About the initiative", "A founder story that feels personal, grounded, and expandable.", "The about page builds trust through story, values, and a clear sense of how the work can scale beyond one person or one region.", max_width=680),
        photo_placeholder(864, 132, 472, 360, "Founder portrait / field photo", PALETTE["forest"]),
        shadow_card(84, 430, 580, 330),
        text_block(116, 486, "Why this started", size=28, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(116, 536, "Use this section to narrate the human reason behind the work: what was seen in the field, what gaps became impossible to ignore, and why action had to become structured and visible.", size=17, color=PALETTE["ink"], max_width=504),
        text_block(116, 652, "The tone here should be honest and dignified, with enough detail to feel real without overwhelming first-time visitors.", size=16, color=PALETTE["muted"], max_width=480),
        shadow_card(690, 430, 646, 330, fill=PALETTE["mist"]),
        text_block(722, 486, "Vision and Mission", size=28, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(722, 540, "Vision", size=18, color=PALETTE["clay"], weight="700"),
        text_block(722, 572, "A continent where local changemakers have the visibility, support, and systems needed to sustain long-term humanitarian impact.", size=17, color=PALETTE["ink"], max_width=566),
        text_block(722, 654, "Mission", size=18, color=PALETTE["clay"], weight="700"),
        text_block(722, 686, "To document, amplify, and grow grassroots interventions through storytelling, donations, education, advocacy, and partnerships.", size=17, color=PALETTE["ink"], max_width=566),
        section_heading(84, 846, "Core values", "Show the ethics behind the platform.", "These cards keep the initiative from feeling abstract by naming the principles that guide each program and partnership."),
    ]
    values = [
        ("Dignity first", "Every story, image, and call to action should protect the dignity of the people being served."),
        ("Transparency", "Donors and partners should understand where support goes and what outcomes it helps create."),
        ("Community voice", "Programs are strongest when shaped with local participation rather than imposed from the outside."),
        ("Creative empowerment", "Arts, music, and storytelling are tools for healing, visibility, and advocacy."),
    ]
    for idx, (title, desc) in enumerate(values):
        cx = 84 + (idx % 2) * 634
        cy = 1044 + (idx // 2) * 200
        parts += [
            shadow_card(cx, cy, 602, 168),
            text_block(cx + 30, cy + 56, title, size=26, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=240),
            text_block(cx + 30, cy + 102, desc, size=16, color=PALETTE["muted"], max_width=520),
        ]
    parts += [
        section_heading(84, 1494, "Growth map", "Make the expansion story visible.", "This block hints at future growth across African countries so the initiative feels intentionally scalable from day one."),
        shadow_card(84, 1688, 1270, 314),
        rect(116, 1720, 528, 250, "#EDF3EF", rx=28),
        text_block(150, 1780, "Africa expansion panel", size=30, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=420),
        text_block(150, 1842, "Ghana partner, founder location, future partner countries, and campaign clusters can live here as a styled map or marker system in Figma.", size=17, color=PALETTE["muted"], max_width=420),
        rect(684, 1720, 306, 118, PALETTE["mist"], rx=24),
        rect(1010, 1720, 306, 118, "#F8EEE8", rx=24),
        rect(684, 1852, 632, 118, "#F3F5F4", rx=24),
        text_block(714, 1770, "Country 01", size=20, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(714, 1804, "Founder-led programs", size=15, color=PALETTE["muted"]),
        text_block(1040, 1770, "Country 02", size=20, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(1040, 1804, "Ghana-based partner", size=15, color=PALETTE["muted"]),
        text_block(714, 1902, "Future contributor onboarding and campaign growth blocks", size=20, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=560),
        text_block(714, 1938, "Use this area for partner logos, regions, and collaboration pathways.", size=15, color=PALETTE["muted"], max_width=500),
    ]
    return desktop_shell("About Screen", body="".join(parts))


def build_projects():
    parts = [
        header(1440, "Projects"),
        section_heading(84, 148, "Projects & stories", "A project archive that feels rich, not crowded.", "The projects experience balances storytelling with filterable structure so visitors can move from overview to specific interventions without confusion.", max_width=760),
        pill(1030, 154, "Health", PALETTE["mist"], PALETTE["forest"], w=94),
        pill(1136, 154, "Education", PALETTE["paper"], PALETTE["forest"], w=110),
        pill(1258, 154, "Sports", PALETTE["paper"], PALETTE["forest"], w=94),
        shadow_card(84, 316, 1270, 404, fill=PALETTE["paper"], rx=34),
        photo_placeholder(112, 344, 440, 348, "Flagship impact story", PALETTE["forest_soft"]),
        text_block(592, 396, "Featured case study: Community health outreach with measurable follow-up", size=40, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=640),
        text_block(592, 518, "This hero block is designed for one anchor story with a short narrative, a testimonial, and two proof tiles so the page starts with substance instead of a generic grid.", size=17, color=PALETTE["muted"], max_width=610),
        rect(592, 612, 180, 58, PALETTE["mist"], rx=20),
        text_block(622, 650, "1,200+ reached", size=18, color=PALETTE["forest"], weight="700"),
        rect(788, 612, 210, 58, "#F8EEE8", rx=20),
        text_block(818, 650, "4 partner clinics", size=18, color=PALETTE["forest"], weight="700"),
        button(592, 694, "Open Story", kind="primary", w=136),
    ]
    cards = [
        ("Maternal health kits", "Health", "Short cards with an image, a category, a 2-line summary, and a CTA keep the archive easy to scan."),
        ("Coding club launch", "Education", "This layout lets you mix programs, awareness campaigns, and creative interventions in one system."),
        ("Youth football outreach", "Sports", "Each tile can show status, location, date, or partner badges depending on the project type."),
        ("Storytelling for advocacy", "Arts & Music", "Creative work is positioned as advocacy and empowerment, not an afterthought."),
        ("School safety awareness", "Public Health", "The grid can scale as more countries and contributors join the platform."),
        ("Nutrition flyer campaign", "Public Health", "Cards can link to updates, reports, galleries, or donation-specific goals."),
    ]
    for idx, (title, tag, desc) in enumerate(cards):
        cx = 84 + (idx % 3) * 426
        cy = 786 + (idx // 3) * 350
        fill = PALETTE["paper"] if idx % 2 == 0 else "#FAF5EC"
        parts += [
            shadow_card(cx, cy, 394, 318, fill=fill),
            photo_placeholder(cx + 24, cy + 24, 346, 134, title, PALETTE["clay"] if idx % 2 else PALETTE["forest"]),
            pill(cx + 24, cy + 178, tag, PALETTE["mist"], PALETTE["forest"], w=max(94, len(tag) * 8 + 26)),
            text_block(cx + 24, cy + 228, title, size=26, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=320),
            text_block(cx + 24, cy + 270, desc, size=15, color=PALETTE["muted"], max_width=330),
        ]
    parts += [
        section_heading(84, 1548, "Voices from the field", "A testimonial strip that adds warmth and credibility.", "Use quotes from beneficiaries, collaborators, or volunteers to break up the archive and remind visitors there are real people behind each result."),
        shadow_card(84, 1738, 1270, 228, fill=PALETTE["mist"], rx=32),
    ]
    quotes = [
        ("“The outreach helped mothers feel seen and supported.”", "Program participant"),
        ("“The reporting made it easy for us to trust the work.”", "Donor / partner"),
        ("“The sports sessions created discipline and belonging.”", "Community coach"),
    ]
    for idx, (quote, person) in enumerate(quotes):
        cx = 118 + idx * 404
        parts += [
            text_block(cx, 1810, quote, size=22, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=300),
            text_block(cx, 1888, person, size=15, color=PALETTE["muted"], max_width=240),
        ]
    return desktop_shell("Projects Screen", body="".join(parts))


def build_donate():
    parts = [
        header(1440, "Donate"),
        rect(72, 132, 1296, 460, PALETTE["forest"], rx=40),
        circle(1250, 250, 150, PALETTE["gold"], opacity=0.22),
        text_block(104, 198, "Donations & support", size=16, color="#D7E6E1", weight="700"),
        text_block(104, 266, "A giving flow that feels warm, secure, and transparent.", size=52, color=PALETTE["paper"], family=FONT_HEAD, weight="700", max_width=610),
        text_block(104, 404, "This screen combines emotional clarity with donor confidence: simple giving amounts, specific causes, visible proof, and lightweight trust cues.", size=18, color="#E0EBE7", max_width=560),
        button(104, 500, "Give Now", kind="secondary", w=132),
        photo_placeholder(882, 178, 392, 306, "Trust panel / donor testimonial", PALETTE["clay"]),
        section_heading(84, 668, "Choose an amount", "Support should feel direct and easy.", "Keep the first donation action simple, then allow cause-specific selection below for supporters who want to direct their impact."),
    ]
    amounts = ["NGN 10k", "NGN 25k", "NGN 50k", "NGN 100k"]
    for idx, amount in enumerate(amounts):
        cx = 84 + idx * 316
        fill = PALETTE["forest"] if idx == 1 else PALETTE["paper"]
        stroke = None if idx == 1 else PALETTE["line"]
        parts += [
            rect(cx, 878, 284, 120, fill, rx=28, stroke=stroke),
            text_block(cx + 142, 940, amount, size=32, color=PALETTE["paper"] if idx == 1 else PALETTE["forest"], family=FONT_HEAD, weight="700", anchor="middle", max_width=200),
            text_block(cx + 142, 974, "Suggested giving tier", size=14, color="#DFEAE7" if idx == 1 else PALETTE["muted"], anchor="middle", max_width=220),
        ]
    parts += [
        section_heading(84, 1088, "Direct support to a cause", "Cause cards make generosity feel concrete.", "Use these as donation pathways for campaigns or program sectors, with one sentence explaining what each contribution supports."),
    ]
    causes = [
        ("Maternal & child health", "Health supplies, outreach, and awareness support."),
        ("Education access", "Books, coding resources, and learning materials."),
        ("Youth sports", "Training kits, tournaments, and mentorship support."),
        ("Creative advocacy", "Storytelling, music campaigns, and artist collaborations."),
    ]
    for idx, (title, desc) in enumerate(causes):
        cx = 84 + (idx % 2) * 634
        cy = 1300 + (idx // 2) * 194
        parts += [
            shadow_card(cx, cy, 602, 162),
            text_block(cx + 30, cy + 56, title, size=26, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=340),
            text_block(cx + 30, cy + 102, desc, size=16, color=PALETTE["muted"], max_width=430),
            pill(cx + 440, cy + 60, "Support", PALETTE["mist"], PALETTE["forest"], w=120),
        ]
    parts += [
        section_heading(84, 1714, "Transparency tracker", "Trust should stay visible after the CTA.", "This section is intentionally visual: a simple allocation snapshot, campaign progress, and reporting rhythm to reassure supporters."),
        shadow_card(84, 1906, 1270, 198),
        text_block(116, 1960, "Donation allocation example", size=24, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
    ]
    bars = [("Programs", 0.62, PALETTE["forest"]), ("Outreach logistics", 0.22, PALETTE["clay"]), ("Reporting & operations", 0.16, PALETTE["gold"])]
    by = 2016
    for name, amount, color in bars:
        parts += [
            text_block(116, by, name, size=15, color=PALETTE["muted"], max_width=180),
            rect(308, by - 18, 640, 18, "#EEE8DE", rx=9),
            rect(308, by - 18, int(640 * amount), 18, color, rx=9),
            text_block(972, by, f"{int(amount * 100)}%", size=15, color=PALETTE["forest"], weight="700", max_width=80),
        ]
        by += 40
    return desktop_shell("Donate Screen", body="".join(parts))


def build_programs():
    parts = [
        header(1440, "Programs"),
        section_heading(84, 150, "Programs hub", "One flexible system for four different forms of impact.", "The programs page is designed like a structured content hub, giving each pillar its own identity while still feeling part of one coherent mission.", max_width=760),
        pill(84, 286, "Education", PALETTE["forest"], PALETTE["paper"], w=112),
        pill(210, 286, "Arts & Music", PALETTE["paper"], PALETTE["forest"], w=132),
        pill(356, 286, "Public Health", PALETTE["paper"], PALETTE["forest"], w=138),
        pill(508, 286, "Sports", PALETTE["paper"], PALETTE["forest"], w=98),
    ]
    sections = [
        ("Education Access", "Downloadables, digital skills, lessons, and practical resources.", PALETTE["mist"], "Coding lessons / resource packs"),
        ("Arts & Music Advocacy", "Image galleries, spoken word, campaign storytelling, and artist spotlights.", "#F9EFEA", "Creative campaign showcase"),
        ("Public Health & Safety", "Preventive health education, outreach reporting, toolkits, and campaigns.", "#EEF5F0", "Health guide / awareness asset"),
        ("Sports Development", "Grassroots programs, drills, tournaments, and youth talent spotlights.", "#FBF3E5", "Training program / athlete feature"),
    ]
    for idx, (title, desc, fill, label) in enumerate(sections):
        cx = 84 if idx % 2 == 0 else 722
        cy = 380 + (idx // 2) * 420
        parts += [
            shadow_card(cx, cy, 634, 360, fill=fill),
            text_block(cx + 34, cy + 58, title, size=30, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=320),
            text_block(cx + 34, cy + 108, desc, size=16, color=PALETTE["muted"], max_width=320),
            rect(cx + 34, cy + 178, 260, 126, PALETTE["paper"], rx=24),
            text_block(cx + 56, cy + 220, label, size=22, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=210),
            text_block(cx + 56, cy + 262, "Use this tile for a lesson card, campaign pack, or embedded resource link.", size=14, color=PALETTE["muted"], max_width=200),
            photo_placeholder(cx + 330, cy + 34, 272, 270, label, PALETTE["clay"] if idx % 2 else PALETTE["forest"]),
            pill(cx + 34, cy + 314, "Open program", PALETTE["forest"], PALETTE["paper"], w=128),
        ]
    parts += [
        section_heading(84, 1282, "Cross-program campaign banner", "Show how the pillars work together.", "A shared campaign block helps the platform feel integrated, especially when education, health, sports, and arts overlap around one social issue."),
        shadow_card(84, 1468, 1270, 258, fill=PALETTE["paper"], rx=32),
        photo_placeholder(104, 1492, 324, 206, "Campaign art direction", PALETTE["forest_soft"]),
        text_block(462, 1546, "Campaign example: Safe futures for girls and young families", size=34, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=580),
        text_block(462, 1620, "Combine awareness content, field reporting, educational downloads, music-led advocacy, and donor pathways in one narrative block.", size=17, color=PALETTE["muted"], max_width=620),
        button(462, 1680, "View Campaign", kind="primary", w=156),
    ]
    return desktop_shell("Programs Screen", height=1840, body="".join(parts))


def build_get_involved():
    parts = [
        header(1440, "Get Involved"),
        section_heading(84, 150, "Get involved", "Turn interest into action without overwhelming people.", "This page gives different supporter types their own path: volunteer, partner, contributor, donor, or storyteller.", max_width=750),
        rect(84, 328, 1270, 264, PALETTE["forest"], rx=34),
        text_block(118, 404, "Choose how you want to help", size=42, color=PALETTE["paper"], family=FONT_HEAD, weight="700", max_width=500),
        text_block(118, 486, "The structure below makes it easy to route different visitors into the right next step while still keeping the page emotionally cohesive.", size=17, color="#DDE8E4", max_width=520),
        button(118, 532, "Start Here", kind="secondary", w=128),
    ]
    actions = [
        ("Volunteer", "Support outreach events, learning sessions, and field programs."),
        ("Partner", "Collaborate as an NGO, funder, or local organization."),
        ("Contribute", "Share creative work, storytelling, music, or educational resources."),
        ("Sponsor", "Fund a campaign, program area, or featured intervention."),
    ]
    for idx, (title, desc) in enumerate(actions):
        cx = 84 + (idx % 2) * 634
        cy = 664 + (idx // 2) * 190
        fill = PALETTE["paper"] if idx in (0, 3) else PALETTE["mist"]
        parts += [
            shadow_card(cx, cy, 602, 156, fill=fill),
            text_block(cx + 30, cy + 54, title, size=28, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=220),
            text_block(cx + 30, cy + 100, desc, size=16, color=PALETTE["muted"], max_width=420),
            pill(cx + 458, cy + 56, "Apply", PALETTE["forest"], PALETTE["paper"], w=112),
        ]
    parts += [
        section_heading(84, 1090, "Submission + updates", "Blend engagement with proof that the platform is active.", "A contact flow on one side and a news / gallery snapshot on the other helps the page feel actionable, not static."),
        shadow_card(84, 1284, 610, 516),
        text_block(116, 1342, "Contact / submission form", size=30, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
    ]
    fields = [("Full name", 54), ("Email address", 54), ("How would you like to contribute?", 54), ("Tell us about your interest", 120)]
    fy = 1408
    for field, h in fields:
        parts += [
            rect(116, fy, 546, h, "#FBF8F2", rx=18, stroke=PALETTE["line"]),
            text_block(140, fy + 34, field, size=15, color=PALETTE["muted"], max_width=460),
        ]
        fy += h + 18
    parts += [
        button(116, 1716, "Submit Interest", kind="primary", w=154),
        shadow_card(744, 1284, 610, 516, fill=PALETTE["mist"]),
        text_block(776, 1342, "News + gallery sidebar", size=30, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
    ]
    news = [("Field report", "New maternal health outreach published"), ("Volunteer call", "Community tournament support needed"), ("Creative spotlight", "Artist feature and advocacy campaign")]
    ny = 1414
    for title, desc in news:
        parts += [
            rect(776, ny, 548, 92, PALETTE["paper"], rx=20),
            text_block(802, ny + 34, title, size=18, color=PALETTE["forest"], weight="700"),
            text_block(802, ny + 62, desc, size=15, color=PALETTE["muted"], max_width=460),
        ]
        ny += 108
    parts += [
        photo_placeholder(776, 1756, 260, 122, "Gallery tile", PALETTE["clay"]),
        photo_placeholder(1064, 1756, 260, 122, "Event tile", PALETTE["forest"]),
    ]
    return desktop_shell("Get Involved Screen", height=1900, body="".join(parts))


def build_mobile_home():
    parts = [
        text_block(26, 54, "Humanity First", size=20, color=PALETTE["forest"], family=FONT_HEAD, weight="700"),
        text_block(26, 88, "Initiative", size=12, color=PALETTE["muted"], weight="700"),
        rect(310, 34, 54, 44, PALETTE["paper"], rx=18, stroke=PALETTE["line"]),
        line(326, 49, 348, 49, PALETTE["forest"], 2),
        line(326, 58, 348, 58, PALETTE["forest"], 2),
        line(326, 67, 348, 67, PALETTE["forest"], 2),
        rect(18, 112, 354, 348, PALETTE["paper"], rx=28),
        pill(36, 134, "Impact across Africa", PALETTE["mist"], PALETTE["forest"], w=146),
        text_block(36, 194, "Humanitarian work that feels credible and close.", size=34, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=292),
        text_block(36, 300, "A mobile-first landing page for storytelling, donations, health awareness, education, arts, and sports.", size=15, color=PALETTE["muted"], max_width=294),
        button(36, 372, "Donate", kind="primary", w=110),
        button(160, 372, "Projects", kind="secondary", w=120),
        stat_card(18, 492, 168, 112, "24", "Projects"),
        stat_card(204, 492, 168, 112, "4", "Core pillars"),
        text_block(22, 660, "Program highlights", size=14, color=PALETTE["clay"], weight="700"),
    ]
    cards = [
        ("Education", "Books, digital skills, and lessons.", PALETTE["mist"]),
        ("Health", "Prevention, safety, and outreach content.", "#EEF5F0"),
        ("Arts", "Creative advocacy and artist stories.", "#F9EFEA"),
        ("Sports", "Youth development and talent visibility.", "#FBF3E5"),
    ]
    y = 696
    for title, desc, fill in cards:
        parts += [
            shadow_card(18, y, 354, 118, fill=fill, rx=24),
            text_block(38, y + 44, title, size=24, color=PALETTE["forest"], family=FONT_HEAD, weight="700", max_width=120),
            text_block(152, y + 42, desc, size=14, color=PALETTE["muted"], max_width=188),
        ]
        y += 138
    parts += [
        text_block(22, 1274, "Featured story", size=14, color=PALETTE["clay"], weight="700"),
        shadow_card(18, 1310, 354, 260),
        photo_placeholder(36, 1332, 318, 116, "Impact image", PALETTE["forest"]),
        text_block(36, 1488, "Safe beginnings for mothers and children", size=26, color=PALETTE["ink"], family=FONT_HEAD, weight="700", max_width=286),
        text_block(36, 1542, "A mobile story card with room for one result, one quote, and a clear action.", size=14, color=PALETTE["muted"], max_width=286),
        rect(18, 1608, 354, 116, PALETTE["forest"], rx=26),
        text_block(36, 1652, "Donate or get involved", size=26, color=PALETTE["paper"], family=FONT_HEAD, weight="700", max_width=228),
        text_block(36, 1696, "Keep the primary action visible near the bottom of the first mobile concept.", size=13, color="#DDE8E4", max_width=218),
        button(244, 1650, "Act now", kind="secondary", w=100),
    ]
    return mobile_shell("Mobile Home Screen", body="".join(parts))


def build_preview():
    screens = [
        ("01_brand_direction.svg", "Brand direction and component system"),
        ("02_home_desktop.svg", "Homepage concept"),
        ("03_about_desktop.svg", "About and mission page"),
        ("04_projects_desktop.svg", "Projects and impact archive"),
        ("05_donate_desktop.svg", "Donation and transparency flow"),
        ("06_programs_desktop.svg", "Programs hub"),
        ("07_get_involved_desktop.svg", "Get involved, news, and gallery"),
        ("08_home_mobile.svg", "Mobile homepage"),
    ]
    cards = []
    for filename, label in screens:
        cards.append(
            f"""
            <article class="card">
              <div class="frame"><img src="{filename}" alt="{label}"/></div>
              <div class="meta">
                <h2>{label}</h2>
                <p>{filename}</p>
              </div>
            </article>
            """
        )
    html = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Humanity First Figma Screens</title>
  <style>
    :root {{
      --bg: #f4efe6;
      --ink: #1e1a18;
      --muted: #6f665f;
      --forest: #16463f;
      --card: #fffdf8;
      --line: #ddd3c6;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: Arial, sans-serif;
      color: var(--ink);
      background: radial-gradient(circle at top right, rgba(229,195,122,0.28), transparent 24rem), var(--bg);
    }}
    .wrap {{
      max-width: 1420px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }}
    .hero {{
      display: grid;
      gap: 14px;
      margin-bottom: 28px;
    }}
    .eyebrow {{
      color: #c96d47;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 12px;
    }}
    h1 {{
      margin: 0;
      font-family: Georgia, serif;
      font-size: clamp(2.2rem, 5vw, 4rem);
      line-height: 1.02;
      color: var(--forest);
    }}
    .hero p {{
      margin: 0;
      max-width: 820px;
      line-height: 1.6;
      color: var(--muted);
      font-size: 1rem;
    }}
    .note {{
      background: rgba(255,255,255,0.64);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 16px 18px;
      max-width: 920px;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 18px;
    }}
    .card {{
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 26px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(80, 58, 42, 0.08);
    }}
    .frame {{
      background: linear-gradient(180deg, rgba(22,70,63,0.06), transparent);
      padding: 14px;
    }}
    .frame img {{
      display: block;
      width: 100%;
      height: auto;
      border-radius: 18px;
      border: 1px solid rgba(0,0,0,0.08);
      background: #fff;
    }}
    .meta {{
      padding: 14px 18px 18px;
    }}
    .meta h2 {{
      margin: 0 0 6px;
      font-family: Georgia, serif;
      font-size: 1.2rem;
      color: var(--forest);
    }}
    .meta p {{
      margin: 0;
      color: var(--muted);
      font-size: 0.95rem;
    }}
  </style>
</head>
<body>
  <main class="wrap">
    <section class="hero">
      <div class="eyebrow">Client Presentation Pack</div>
      <h1>Humanity First Initiative screen concepts</h1>
      <p>These SVG boards are designed to be easy to show immediately and easy to import into Figma later. The direction is editorial, mission-led, and built around trust, storytelling, and clear support actions.</p>
      <div class="note">
        Open any individual SVG directly, or import the SVG files into Figma as frames. Start with the brand direction screen, then walk through Home, About, Projects, Donate, Programs, Get Involved, and the Mobile Home concept.
      </div>
    </section>
    <section class="grid">
      {''.join(cards)}
    </section>
  </main>
</body>
</html>
"""
    save("index.html", html)


def build_handoff():
    save(
        "README.md",
        """# Humanity First Initiative Screen Handoff

## Visual Direction
- Editorial, mission-led layout with warm earth tones and strong proof blocks.
- Deep forest green signals trust and action.
- Terracotta and gold add warmth and optimism without making the site feel generic.
- Large serif headlines create emotional weight; clean sans-serif body copy keeps content practical.

## Screen Set
- `01_brand_direction.svg`: palette, typography, components, and overall art direction
- `02_home_desktop.svg`: homepage concept
- `03_about_desktop.svg`: founder story, mission, values, and growth map
- `04_projects_desktop.svg`: projects archive and flagship impact story
- `05_donate_desktop.svg`: donation and transparency flow
- `06_programs_desktop.svg`: education, arts, health, and sports hub
- `07_get_involved_desktop.svg`: volunteer, partner, contributor, and news/gallery concept
- `08_home_mobile.svg`: mobile homepage concept

## How To Use
- Open `index.html` in a browser for a presentation-friendly gallery.
- Import any `.svg` file directly into Figma to use as a base frame.
- Replace placeholder image blocks with real photography from the initiative.
- Keep the same palette and CTA treatment across future screens for consistency.

## Recommended Presentation Flow
1. Start with the brand direction screen to explain tone and layout system.
2. Show the homepage to anchor the overall experience.
3. Walk through About, Projects, and Donate to explain trust-building.
4. Show Programs and Get Involved to demonstrate scale and conversion paths.
5. End with the mobile screen to prove responsive intent.
""",
    )


def main():
    save("01_brand_direction.svg", build_style_guide())
    save("02_home_desktop.svg", build_home())
    save("03_about_desktop.svg", build_about())
    save("04_projects_desktop.svg", build_projects())
    save("05_donate_desktop.svg", build_donate())
    save("06_programs_desktop.svg", build_programs())
    save("07_get_involved_desktop.svg", build_get_involved())
    save("08_home_mobile.svg", build_mobile_home())
    build_preview()
    build_handoff()
    print(f"Generated screen pack in {OUTPUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
