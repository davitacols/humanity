# Humanity First Education LMS

This is the production architecture for the foundation learning platform. The public website keeps `/education` as the academy landing page. The long-term application backend lives in `backend/` as Django REST Framework with JWT auth, PostgreSQL, Cloudinary/S3 storage, and role-based permissions.

## Folder Structure

```txt
backend/
  config/
    settings.py
    urls.py
    asgi.py
    wsgi.py
  apps/
    users/
    courses/
    enrollments/
    quizzes/
    certificates/
    analytics/
    notifications/
    common/
app/
  education/
  lms/
components/
lib/
docs/
```

## Backend Apps

`users`: student, instructor, and admin accounts.

`courses`: categories, courses, modules, and lessons.

`enrollments`: course enrollment, lesson completion, notes, and progress percentage.

`quizzes`: quizzes, multiple-choice questions, attempts, auto-grading, pass/fail.

`certificates`: verified completion certificates with verification IDs.

`analytics`: course, learner, progress, and quiz analytics.

`notifications`: announcements and user notifications.

## Database Schema

Core tables:

```txt
users_user
  id, email, full_name, role, avatar, bio, location, is_email_verified

courses_category
  id, name, slug

courses_course
  id, title, slug, description, thumbnail, category_id, instructor_id,
  duration, difficulty, learning_objectives, requirements, tags, language,
  is_published, is_approved, featured

courses_module
  id, course_id, title, order

courses_lesson
  id, module_id, title, video_url, content, downloadable_resources, duration, order, is_preview

enrollments_enrollment
  id, student_id, course_id, progress_percent, completed_at

enrollments_lessonprogress
  id, enrollment_id, lesson_id, is_completed, notes

quizzes_quiz
  id, course_id, title, pass_mark, is_final

quizzes_question
  id, quiz_id, prompt, options, correct_answer, explanation, order

quizzes_quizattempt
  id, quiz_id, student_id, answers, score, total, passed

certificates_certificate
  id, student_id, course_id, verification_id, issued_at, certificate_file

notifications_notification
  id, user_id, title, message, category, is_read
```

## API Routes

Auth:

```txt
POST /api/users/register/
POST /api/auth/token/
POST /api/auth/token/refresh/
GET  /api/users/me/
PATCH /api/users/me/
```

Courses:

```txt
GET    /api/courses/courses/
POST   /api/courses/courses/
GET    /api/courses/courses/:slug/
PATCH  /api/courses/courses/:slug/
DELETE /api/courses/courses/:slug/
GET    /api/courses/categories/
POST   /api/courses/modules/
POST   /api/courses/lessons/
```

Learning:

```txt
GET  /api/enrollments/
POST /api/enrollments/
POST /api/enrollments/progress/
GET  /api/quizzes/
POST /api/quizzes/attempts/
GET  /api/certificates/
GET  /api/certificates/:verification_id/
GET  /api/analytics/
GET  /api/notifications/
```

## Frontend Pages

Public:

```txt
/education
/lms
/lms/courses/[slug]
/lms/login
```

Student:

```txt
/dashboard/student
/dashboard/student/courses
/dashboard/student/certificates
/dashboard/student/profile
```

Instructor:

```txt
/dashboard/instructor
/dashboard/instructor/courses/new
/dashboard/instructor/courses/[slug]/edit
/dashboard/instructor/analytics
```

Admin:

```txt
/admin/lms
/admin/lms/users
/admin/lms/courses
/admin/lms/approvals
/admin/lms/analytics
```

## Environment Variables

Frontend:

```env
NEXT_PUBLIC_API_URL=https://your-render-api.onrender.com
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

Backend:

```env
DEBUG=False
DJANGO_SECRET_KEY=strong-secret
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME
ALLOWED_HOSTS=your-render-api.onrender.com
CORS_ALLOWED_ORIGINS=https://your-site.vercel.app
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

## Deployment

Backend on Render:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
gunicorn config.wsgi:application
```

Frontend on Vercel:

```bash
npm run build
```

Add `NEXT_PUBLIC_API_URL` in Vercel and point it at the Render API.

## Production Best Practices

- Keep JWT access tokens short-lived and refresh tokens rotating.
- Re-check permissions on every mutating endpoint.
- Store videos/resources in Cloudinary or S3, never inside the repo.
- Keep course publishing behind an admin approval workflow.
- Paginate course lists, enrollments, analytics, attempts, and notifications.
- Add email verification and password reset before public launch.
- Add certificate PDF rendering as a background task when Celery/Redis is introduced.
- Use rate limiting on auth and quiz attempt endpoints.
- Keep `/education` public, but protect dashboards and lesson progress with auth.
