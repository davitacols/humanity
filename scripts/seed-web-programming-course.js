const path = require("path");

if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
}

const postgres = require("postgres");

const COURSE_SLUG = "web-programming-foundations";

const course = {
  slug: COURSE_SLUG,
  track: "Web programming",
  title: "Web Programming Foundations",
  summary:
    "A complete beginner-to-project pathway covering HTML, CSS, JavaScript, responsive layouts, accessibility, Git basics, and a final website project.",
  level: "Beginner to intermediate",
  duration: "8 modules",
  outcomes: [
    "Build structured web pages with semantic HTML",
    "Style responsive layouts with CSS",
    "Use JavaScript for interaction and DOM updates",
    "Apply accessibility, debugging, and project workflow basics",
    "Publish a small final website project"
  ],
  resourceHref: "/education#lms",
  assignment:
    "Build a responsive three-page website for a community, education, health, arts, or sports topic. Include semantic HTML, custom CSS, at least one JavaScript interaction, accessible labels, and a short reflection describing your design decisions."
};

const modules = [
  {
    title: "How the web works",
    lessons: [
      {
        title: "Internet, browser, and server basics",
        format: "Lesson",
        duration: "25 min",
        objective: "Explain what happens when a user opens a website.",
        content:
          "Learn the roles of browsers, servers, URLs, hosting, files, and requests so learners understand the environment their code runs inside."
      },
      {
        title: "Project files and folder structure",
        format: "Practice",
        duration: "20 min",
        objective: "Create a clean project folder with HTML, CSS, JavaScript, and assets.",
        content:
          "Set up index.html, styles.css, script.js, and asset folders. Practice naming files clearly and linking files correctly."
      }
    ]
  },
  {
    title: "HTML foundations",
    lessons: [
      {
        title: "Page structure and semantic tags",
        format: "Practice",
        duration: "35 min",
        objective: "Use semantic HTML to structure a readable web page.",
        content:
          "Build a page with header, nav, main, section, article, footer, headings, paragraphs, lists, and links."
      },
      {
        title: "Images, links, tables, and forms",
        format: "Practice",
        duration: "40 min",
        objective: "Add common HTML elements used in real websites.",
        content:
          "Work with images, alt text, links, simple tables, inputs, labels, textareas, selects, and submit buttons."
      }
    ]
  },
  {
    title: "CSS foundations",
    lessons: [
      {
        title: "Selectors, colors, and typography",
        format: "Practice",
        duration: "35 min",
        objective: "Style readable text, colors, spacing, and simple sections.",
        content:
          "Learn selectors, class names, color values, font sizing, line height, spacing, borders, and visual hierarchy."
      },
      {
        title: "Box model, flexbox, and grid",
        format: "Practice",
        duration: "45 min",
        objective: "Create predictable layouts with box model rules, flexbox, and CSS grid.",
        content:
          "Practice margin, padding, width, max-width, flex alignment, grid columns, gaps, and responsive layout foundations."
      }
    ]
  },
  {
    title: "Responsive and accessible design",
    lessons: [
      {
        title: "Mobile-first responsive layouts",
        format: "Practice",
        duration: "35 min",
        objective: "Make a page work on phone, tablet, and desktop screens.",
        content:
          "Use fluid widths, responsive grids, image constraints, and media queries to improve layouts across screen sizes."
      },
      {
        title: "Accessibility basics",
        format: "Checklist",
        duration: "30 min",
        objective: "Improve readability, keyboard access, labels, alt text, and contrast.",
        content:
          "Review accessible headings, form labels, link text, image alt text, focus states, semantic structure, and color contrast."
      }
    ]
  },
  {
    title: "JavaScript foundations",
    lessons: [
      {
        title: "Values, variables, and functions",
        format: "Lesson",
        duration: "40 min",
        objective: "Use variables, strings, numbers, arrays, objects, conditionals, and functions.",
        content:
          "Practice core JavaScript building blocks through small examples that connect to website behavior."
      },
      {
        title: "Events and DOM updates",
        format: "Practice",
        duration: "45 min",
        objective: "Respond to user actions and update page content.",
        content:
          "Use querySelector, addEventListener, classList, textContent, forms, and buttons to build interactive UI behavior."
      }
    ]
  },
  {
    title: "Debugging and browser tools",
    lessons: [
      {
        title: "Inspect, console, and common errors",
        format: "Practice",
        duration: "30 min",
        objective: "Use browser dev tools to inspect layout and debug JavaScript errors.",
        content:
          "Practice opening dev tools, inspecting elements, checking console errors, reading stack traces, and fixing missing file links."
      },
      {
        title: "Refactor and organize code",
        format: "Review",
        duration: "30 min",
        objective: "Clean up duplicated CSS and JavaScript into readable sections.",
        content:
          "Learn naming, grouping related styles, small functions, comments where useful, and simple maintainable project structure."
      }
    ]
  },
  {
    title: "Git, GitHub, and publishing",
    lessons: [
      {
        title: "Version control basics",
        format: "Lesson",
        duration: "35 min",
        objective: "Understand commits, repositories, branches, and simple project history.",
        content:
          "Introduce Git concepts and a basic save-point workflow for learners building websites over time."
      },
      {
        title: "Publish a static website",
        format: "Practice",
        duration: "40 min",
        objective: "Prepare a project for static hosting and share a public link.",
        content:
          "Review final files, test links, check mobile layout, then publish using a static hosting workflow or instructor-provided deployment route."
      }
    ]
  },
  {
    title: "Final website project",
    lessons: [
      {
        title: "Plan, build, test, and present",
        format: "Assignment",
        duration: "90 min",
        objective: "Build and present a complete small website.",
        content:
          "Choose a topic, plan pages, build semantic HTML, style responsive layouts, add JavaScript interaction, test accessibility basics, and present the project."
      }
    ]
  }
];

const quiz = [
  {
    question: "Which file is usually the main entry page of a simple website?",
    options: ["styles.css", "index.html", "script.js", "README.md"],
    answerIndex: 1
  },
  {
    question: "Which HTML element is best for the main content area of a page?",
    options: ["main", "bold", "center", "font"],
    answerIndex: 0
  },
  {
    question: "What does the CSS box model include?",
    options: ["Only color", "Margin, border, padding, and content", "Only JavaScript", "Only images"],
    answerIndex: 1
  },
  {
    question: "What is the purpose of a media query?",
    options: ["To connect a database", "To change styles for different conditions like screen width", "To send an email", "To create an image file"],
    answerIndex: 1
  },
  {
    question: "Which JavaScript method listens for a button click?",
    options: ["addEventListener", "styleSheet", "htmlFor", "queryDatabase"],
    answerIndex: 0
  },
  {
    question: "Why should form inputs have labels?",
    options: ["Only for decoration", "For accessibility and clearer user interaction", "To make pages slower", "To remove validation"],
    answerIndex: 1
  },
  {
    question: "What should you check when debugging a broken CSS or JavaScript file link?",
    options: ["File path and filename", "Only page title", "Only screen brightness", "Only internet speed"],
    answerIndex: 0
  },
  {
    question: "What is a useful final project requirement?",
    options: ["No testing", "Responsive layout and at least one interaction", "Unreadable colors", "No semantic HTML"],
    answerIndex: 1
  }
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Add it to .env.local before seeding.");
  }

  const sql = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 20,
    onnotice: () => {}
  });

  try {
    await sql.begin(async (tx) => {
      const [existing] = await tx`
        select id
        from lms_courses
        where slug = ${COURSE_SLUG}
        limit 1
      `;

      if (existing) {
        await tx`delete from lms_modules where course_id = ${existing.id}`;
        await tx`delete from lms_quiz_questions where course_id = ${existing.id}`;
        await tx`delete from lms_assignments where course_id = ${existing.id}`;
        await tx`
          update lms_courses
          set
            track = ${course.track},
            title = ${course.title},
            summary = ${course.summary},
            level = ${course.level},
            duration = ${course.duration},
            outcomes = ${tx.json(course.outcomes)},
            resource_href = ${course.resourceHref},
            external = false,
            is_published = true,
            updated_at = now()
          where id = ${existing.id}
        `;
      } else {
        const [{ next_order: nextOrder }] = await tx`
          select coalesce(max(display_order), 0)::int + 1 as next_order
          from lms_courses
        `;

        await tx`
          insert into lms_courses (
            slug,
            display_order,
            track,
            title,
            summary,
            level,
            duration,
            outcomes,
            resource_href,
            external,
            is_published
          )
          values (
            ${course.slug},
            ${Number(nextOrder || 1)},
            ${course.track},
            ${course.title},
            ${course.summary},
            ${course.level},
            ${course.duration},
            ${tx.json(course.outcomes)},
            ${course.resourceHref},
            false,
            true
          )
        `;
      }

      const [courseRow] = await tx`
        select id
        from lms_courses
        where slug = ${COURSE_SLUG}
        limit 1
      `;

      for (const [moduleIndex, module] of modules.entries()) {
        const [moduleRow] = await tx`
          insert into lms_modules (course_id, display_order, title)
          values (${courseRow.id}, ${moduleIndex + 1}, ${module.title})
          returning id
        `;

        for (const [lessonIndex, lesson] of module.lessons.entries()) {
          await tx`
            insert into lms_lessons (
              module_id,
              display_order,
              title,
              format,
              duration,
              objective,
              content,
              video_url
            )
            values (
              ${moduleRow.id},
              ${lessonIndex + 1},
              ${lesson.title},
              ${lesson.format},
              ${lesson.duration},
              ${lesson.objective},
              ${lesson.content},
              null
            )
          `;
        }
      }

      for (const [questionIndex, question] of quiz.entries()) {
        await tx`
          insert into lms_quiz_questions (
            course_id,
            display_order,
            question,
            options,
            answer_index
          )
          values (
            ${courseRow.id},
            ${questionIndex + 1},
            ${question.question},
            ${tx.json(question.options)},
            ${question.answerIndex}
          )
        `;
      }

      await tx`
        insert into lms_assignments (course_id, prompt)
        values (${courseRow.id}, ${course.assignment})
      `;

      const [counts] = await tx`
        select
          (select count(*)::int from lms_modules where course_id = ${courseRow.id}) as modules,
          (
            select count(*)::int
            from lms_lessons l
            join lms_modules m on m.id = l.module_id
            where m.course_id = ${courseRow.id}
          ) as lessons,
          (select count(*)::int from lms_quiz_questions where course_id = ${courseRow.id}) as questions
      `;

      console.log(`Seeded ${course.title}`);
      console.log(`Course ID: ${courseRow.id}`);
      console.log(`Modules: ${counts.modules}`);
      console.log(`Lessons: ${counts.lessons}`);
      console.log(`Quiz questions: ${counts.questions}`);
    });
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
