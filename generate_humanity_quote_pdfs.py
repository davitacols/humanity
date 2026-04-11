from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT_DIR = Path("generated_documents")
OUTPUT_DIR.mkdir(exist_ok=True)

DATE = "April 8, 2026"
QUOTE_REF = "KNG-HIP-2026-004"
PREPARED_BY = "David Ansa"
ORGANIZATION = "Knoledgr"
EMAIL = "support@knoledgr.com"
PREPARED_FOR = "Humanity First Initiative"
PROJECT_TITLE = "Humanitarian Impact & Empowerment Platform"


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="KTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#123C3A"),
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="KSubtitle",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#2D5A57"),
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="KMeta",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#333333"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="KSection",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=colors.HexColor("#123C3A"),
            spaceBefore=8,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="KBody",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor("#222222"),
            alignment=TA_LEFT,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="KBullet",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=12.5,
            leftIndent=12,
            firstLineIndent=-8,
            bulletIndent=0,
            textColor=colors.HexColor("#222222"),
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="KSmall",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=colors.HexColor("#444444"),
            spaceAfter=4,
        )
    )
    return styles


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setStrokeColor(colors.HexColor("#123C3A"))
    canvas.setLineWidth(0.6)
    canvas.line(18 * mm, height - 15 * mm, width - 18 * mm, height - 15 * mm)
    canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#4A4A4A"))
    canvas.drawString(18 * mm, height - 11 * mm, f"{ORGANIZATION} | {EMAIL}")
    canvas.drawRightString(width - 18 * mm, height - 11 * mm, QUOTE_REF)
    canvas.drawString(18 * mm, 9 * mm, f"Prepared for {PREPARED_FOR}")
    canvas.drawRightString(width - 18 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def title_block(styles):
    return [
        Spacer(1, 12),
        Paragraph("WEBSITE DESIGN & DEVELOPMENT QUOTATION", styles["KTitle"]),
        Paragraph(PROJECT_TITLE, styles["KSubtitle"]),
        Spacer(1, 4),
        Paragraph(
            f"<b>Quotation Reference:</b> {QUOTE_REF}<br/>"
            f"<b>Date:</b> {DATE}<br/>"
            f"<b>Prepared By:</b> {PREPARED_BY}<br/>"
            f"<b>Organization:</b> {ORGANIZATION}<br/>"
            f"<b>Email:</b> {EMAIL}<br/>"
            f"<b>Prepared For:</b> {PREPARED_FOR}",
            styles["KMeta"],
        ),
        Spacer(1, 10),
    ]


def section(story, styles, heading, body=None):
    story.append(Paragraph(heading, styles["KSection"]))
    if body:
        story.append(Paragraph(body, styles["KBody"]))


def bullets(story, styles, items):
    for item in items:
        story.append(Paragraph(item, styles["KBullet"], bulletText="-"))


def currency(value):
    return f"NGN {value}"


def build_detailed_pdf(path: Path):
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=22 * mm,
        bottomMargin=18 * mm,
        title="Humanity First Initiative Quotation",
        author=PREPARED_BY,
    )

    story = []
    story.extend(title_block(styles))

    section(
        story,
        styles,
        "1. Executive Summary",
        "This quotation covers the design and development of a modern, responsive, and scalable website for Humanity First Initiative. "
        "The platform will function as a digital hub for showcasing humanitarian interventions, publishing impact stories, supporting donation campaigns, "
        "and promoting programs across education, arts and music advocacy, public health awareness, and sports development.",
    )
    story.append(
        Paragraph(
            "The website will be built to strengthen credibility, improve public visibility, create trusted support pathways, "
            "and provide a flexible digital foundation for long-term expansion across multiple African countries.",
            styles["KBody"],
        )
    )

    section(story, styles, "2. Project Objectives")
    bullets(
        story,
        styles,
        [
            "Showcase humanitarian work, grassroots interventions, and measurable impact in a respectful and compelling format.",
            "Provide a trusted donation pathway for local and international supporters, NGOs, and development partners.",
            "Raise awareness about the realities facing vulnerable women, children, and underserved communities.",
            "Support empowerment through education resources, digital skills content, creative advocacy, health education, and sports development.",
            "Create a scalable platform structure that can onboard more contributors, campaigns, and countries over time.",
        ],
    )

    section(story, styles, "3. Technology Stack")
    bullets(
        story,
        styles,
        [
            "<b>Next.js</b> for the frontend and full-stack application architecture, providing strong performance, SEO benefits, and scalability.",
            "<b>Neon PostgreSQL</b> for secure cloud database management and structured content storage.",
            "<b>Payment gateway integration</b> for donations and support workflows.",
            "<b>External media embeds</b> for music, lessons, videos, and campaign-linked resources without direct hosting.",
            "<b>Mobile-first responsive implementation</b> optimized for phones, tablets, and desktop browsers.",
        ],
    )

    section(story, styles, "4. Scope of Work")
    bullets(
        story,
        styles,
        [
            "<b>Homepage:</b> Mission-led hero section, calls to action, impact highlights, featured projects, and trust-building content.",
            "<b>About Section:</b> Founder story, initiative background, mission, vision, values, and partner introduction.",
            "<b>Projects / Impact Stories:</b> Project listing pages, story-led detail pages, photos, testimonials, updates, and outcomes.",
            "<b>Donation System:</b> Secure payment integration, donation prompts, confirmation flow, and cause-based support structure where needed.",
            "<b>Education Hub:</b> Downloadable learning materials, coding and digital skills resources, and embedded or linked lessons.",
            "<b>Arts & Music Section:</b> Artist spotlights, art gallery, spoken word content, and external music links.",
            "<b>Public Health & Safety Section:</b> Hygiene, nutrition, maternal and child health, mental health, safety advocacy, and downloadable resources.",
            "<b>Sports Development Section:</b> Grassroots sports initiatives, drills and learning resources, tournaments, and talent spotlight features.",
            "<b>Blog / News Section:</b> Articles, field reports, campaign updates, awareness content, and announcements.",
            "<b>Get Involved Section:</b> Volunteer opportunities, partnership inquiries, contributor submissions, and contact forms.",
            "<b>Media Gallery:</b> Photos from fieldwork, events, outreach activities, and program documentation.",
        ],
    )

    section(story, styles, "5. Design and User Experience")
    bullets(
        story,
        styles,
        [
            "A clean, modern, community-centered visual direction aligned with an authentic and hopeful brand tone.",
            "Responsive layouts designed primarily for mobile users and optimized for low-bandwidth environments.",
            "Strong visual storytelling, clear navigation, and prominent Donate / Get Involved calls to action.",
            "Readable content structure and lightweight implementation to improve accessibility and engagement.",
        ],
    )

    section(story, styles, "6. Deliverables")
    bullets(
        story,
        styles,
        [
            "Complete website design and development.",
            "Responsive implementation across mobile, tablet, and desktop.",
            "Next.js application setup and Neon PostgreSQL database configuration.",
            "Core page development, content sections, blog structure, media gallery, and forms.",
            "Donation integration setup, basic SEO configuration, testing, optimization, and launch preparation.",
        ],
    )

    section(story, styles, "7. Commercial Breakdown")
    data = [
        ["Description", "Amount"],
        ["UI/UX Design and Website Planning", currency("80,000")],
        ["Frontend Development with Next.js", currency("140,000")],
        ["Backend and Neon PostgreSQL Setup", currency("60,000")],
        ["Donation Integration and Functional Setup", currency("45,000")],
        ["Content Sections, Blog, Gallery, and Resource Structure", currency("35,000")],
        ["SEO Setup, Testing, Optimization, and Launch Preparation", currency("40,000")],
        ["Total Project Cost", currency("400,000")],
    ]
    table = Table(data, colWidths=[110 * mm, 45 * mm], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#123C3A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("BACKGROUND", (0, 1), (-1, -2), colors.HexColor("#F5F8F8")),
                ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#D9E8E7")),
                ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
                ("ALIGN", (1, 1), (1, -1), "RIGHT"),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#A4B7B5")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 8))

    section(story, styles, "8. Payment Terms")
    bullets(
        story,
        styles,
        [
            f"<b>70% Upfront Deposit:</b> {currency('280,000')} to confirm the project and commence work.",
            f"<b>30% Final Payment:</b> {currency('120,000')} payable upon completion and before final handover or launch.",
        ],
    )

    section(story, styles, "9. Project Timeline")
    bullets(
        story,
        styles,
        [
            "<b>Estimated duration:</b> 3 to 4 weeks.",
            "<b>Maximum project duration:</b> 4 weeks.",
            "<b>Week 1:</b> Discovery, planning, content mapping, and design direction.",
            "<b>Week 2:</b> UI design for the homepage and key internal sections, plus review and approval.",
            "<b>Week 3:</b> Frontend development, database setup, and core feature implementation.",
            "<b>Week 4:</b> Content population, donation setup, testing, responsiveness checks, optimization, final revisions, and launch preparation.",
        ],
    )

    section(story, styles, "10. Inclusions, Exclusions, and Assumptions")
    bullets(
        story,
        styles,
        [
            "<b>Included:</b> Website strategy, UI/UX design, frontend and backend development, database setup, donation workflow setup, forms, basic SEO, and launch preparation.",
            "<b>Excluded:</b> Hosting subscription, premium plugins or external tools, payment gateway transaction charges, advanced LMS systems, advanced donor dashboards, and ongoing maintenance after delivery unless separately agreed.",
            "<b>Domain:</b> The domain name has already been purchased by the owner and is therefore not included in this quotation.",
            "<b>Client dependencies:</b> Content, images, feedback, and third-party access details should be supplied on time to maintain the agreed delivery window.",
        ],
    )

    section(story, styles, "11. Bank Details and Validity")
    story.append(
        Paragraph(
            "<b>Bank Name:</b> Moniepoint<br/>"
            "<b>Account Number:</b> 8108209953<br/>"
            "<b>Account Name:</b> David Ansa<br/>"
            "<b>Quotation Validity:</b> This quotation remains valid for 14 days from the date of issue.",
            styles["KBody"],
        )
    )

    section(story, styles, "12. Closing Note")
    story.append(
        Paragraph(
            "This quotation presents a practical and scalable approach to building a professional digital platform for Humanity First Initiative. "
            "The website is designed to strengthen visibility, trust, partnerships, donations, and long-term growth while reflecting the dignity and impact of the work being carried out.",
            styles["KBody"],
        )
    )

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)


def build_invoice_pdf(path: Path):
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=22 * mm,
        bottomMargin=18 * mm,
        title="Humanity First Initiative Invoice Style Quotation",
        author=PREPARED_BY,
    )

    story = []
    story.extend(title_block(styles))
    story.append(Paragraph("INVOICE-STYLE QUOTATION", styles["KSubtitle"]))
    story.append(Spacer(1, 4))

    info_table = Table(
        [
            ["From", f"{PREPARED_BY}<br/>{ORGANIZATION}<br/>{EMAIL}"],
            ["To", PREPARED_FOR],
            ["Project", PROJECT_TITLE],
            ["Timeline", "3 to 4 weeks (maximum of 4 weeks)"],
            ["Payment Terms", "70% upfront / 30% final payment"],
        ],
        colWidths=[35 * mm, 120 * mm],
    )
    info_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#E8F0EF")),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#B7C9C7")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(info_table)
    story.append(Spacer(1, 10))

    section(
        story,
        styles,
        "Project Description",
        "Design and development of a responsive humanitarian impact website to showcase projects, impact stories, donations, education resources, arts and music advocacy, public health campaigns, sports development initiatives, media content, and partnership opportunities.",
    )

    section(story, styles, "Technology Stack")
    bullets(story, styles, ["Next.js", "Neon PostgreSQL"])

    section(story, styles, "Included Sections and Features")
    bullets(
        story,
        styles,
        [
            "Homepage, About section, Projects / Impact stories, Donation integration, and Get Involved page.",
            "Education Hub, Arts & Music section, Public Health & Safety section, Sports Development section, and Blog / News section.",
            "Media gallery, contact forms, mobile responsiveness, basic SEO setup, and launch preparation.",
        ],
    )

    line_items = [
        ["Item", "Description", "Amount"],
        ["1", "UI/UX design, planning, structure, and content mapping", currency("80,000")],
        ["2", "Frontend development with Next.js", currency("140,000")],
        ["3", "Backend setup and Neon PostgreSQL configuration", currency("60,000")],
        ["4", "Donation system integration and functional setup", currency("45,000")],
        ["5", "Content sections, blog, gallery, and resource structure", currency("35,000")],
        ["6", "SEO, testing, optimization, and launch preparation", currency("40,000")],
        ["", "Total", currency("400,000")],
    ]
    invoice_table = Table(line_items, colWidths=[12 * mm, 108 * mm, 35 * mm], repeatRows=1)
    invoice_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#123C3A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("BACKGROUND", (0, 1), (-1, -2), colors.HexColor("#F8FAFA")),
                ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#D9E8E7")),
                ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#A4B7B5")),
                ("ALIGN", (0, 0), (0, -1), "CENTER"),
                ("ALIGN", (2, 1), (2, -1), "RIGHT"),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(invoice_table)
    story.append(Spacer(1, 10))

    section(story, styles, "Payment Summary")
    bullets(
        story,
        styles,
        [
            f"Upfront payment required to start: <b>{currency('280,000')}</b>.",
            f"Final balance due at completion: <b>{currency('120,000')}</b>.",
            "Domain name has already been purchased by the owner and is not part of this quotation.",
            "Hosting fees, premium services, and payment gateway transaction charges are excluded unless separately agreed.",
        ],
    )

    section(story, styles, "Bank Details")
    story.append(
        Paragraph(
            "<b>Bank Name:</b> Moniepoint<br/>"
            "<b>Account Number:</b> 8108209953<br/>"
            "<b>Account Name:</b> David Ansa",
            styles["KBody"],
        )
    )

    section(story, styles, "Validity")
    story.append(
        Paragraph(
            "This quotation is valid for 14 days from the date of issue. Work begins after receipt of the 70% upfront payment.",
            styles["KBody"],
        )
    )

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)


if __name__ == "__main__":
    build_detailed_pdf(OUTPUT_DIR / "Humanity_First_Initiative_Quotation.pdf")
    build_invoice_pdf(OUTPUT_DIR / "Humanity_First_Initiative_Invoice_Quotation.pdf")
    print("Generated PDFs in", OUTPUT_DIR.resolve())
