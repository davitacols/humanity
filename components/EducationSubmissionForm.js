"use client";

import { useState } from "react";
import {
  educationAudienceLevels,
  educationSubmissionRoles,
  educationSubmissionTypes
} from "./siteData";

const initialForm = {
  contactName: "",
  email: "",
  organization: "",
  role: educationSubmissionRoles[0],
  resourceTitle: "",
  resourceType: educationSubmissionTypes[0],
  audienceLevel: educationAudienceLevels[0],
  resourceUrl: "",
  summary: "",
  notes: "",
  consentToContact: true,
  rightsConfirmed: false,
  website: ""
};

export function EducationSubmissionForm() {
  const [formData, setFormData] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(name, value) {
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/education-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        setFieldErrors(result.fieldErrors || {});
        setStatus({
          tone: "error",
          message: result.error || "Something went wrong while sending the form."
        });
        return;
      }

      setFormData(initialForm);
      const reference = result.submission?.reference;
      setStatus({
        tone: "success",
        message: reference
          ? `${result.message} Reference: ${reference}.`
          : result.message || "Thanks. Your submission has been received."
      });
    } catch {
      setStatus({
        tone: "error",
        message: "The form could not reach the server. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="submission-form" onSubmit={handleSubmit} noValidate>
      <div className="submission-form__header">
        <p className="section-kicker">Contributor form</p>
        <h2 className="submission-form__title">Share a learning resource for review.</h2>
        <p className="submission-form__body">
          Submit books, lesson links, facilitator kits, or digital skills materials that help
          learners, educators, and community mentors across the initiative.
        </p>
      </div>

      {status ? (
        <div
          className={`submission-status submission-status--${status.tone}`}
          role={status.tone === "error" ? "alert" : "status"}
        >
          {status.message}
        </div>
      ) : null}

      <div className="submission-form__grid">
        <div className="field">
          <label className="field__label" htmlFor="contactName">
            Full name
          </label>
          <input
            id="contactName"
            className={`field__input${fieldErrors.contactName ? " has-error" : ""}`}
            name="contactName"
            value={formData.contactName}
            onChange={(event) => updateField("contactName", event.target.value)}
            autoComplete="name"
          />
          {fieldErrors.contactName ? (
            <p className="field__error">{fieldErrors.contactName}</p>
          ) : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className={`field__input${fieldErrors.email ? " has-error" : ""}`}
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
          />
          {fieldErrors.email ? <p className="field__error">{fieldErrors.email}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="organization">
            Organization or group
          </label>
          <input
            id="organization"
            className={`field__input${fieldErrors.organization ? " has-error" : ""}`}
            name="organization"
            value={formData.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            autoComplete="organization"
          />
          {fieldErrors.organization ? (
            <p className="field__error">{fieldErrors.organization}</p>
          ) : (
            <p className="field__hint">Optional, but useful if you represent a school or initiative.</p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="role">
            I am submitting as
          </label>
          <select
            id="role"
            className={`field__input${fieldErrors.role ? " has-error" : ""}`}
            name="role"
            value={formData.role}
            onChange={(event) => updateField("role", event.target.value)}
          >
            {educationSubmissionRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {fieldErrors.role ? <p className="field__error">{fieldErrors.role}</p> : null}
        </div>

        <div className="field field--full">
          <label className="field__label" htmlFor="resourceTitle">
            Resource title
          </label>
          <input
            id="resourceTitle"
            className={`field__input${fieldErrors.resourceTitle ? " has-error" : ""}`}
            name="resourceTitle"
            value={formData.resourceTitle}
            onChange={(event) => updateField("resourceTitle", event.target.value)}
          />
          {fieldErrors.resourceTitle ? (
            <p className="field__error">{fieldErrors.resourceTitle}</p>
          ) : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="resourceType">
            Resource type
          </label>
          <select
            id="resourceType"
            className={`field__input${fieldErrors.resourceType ? " has-error" : ""}`}
            name="resourceType"
            value={formData.resourceType}
            onChange={(event) => updateField("resourceType", event.target.value)}
          >
            {educationSubmissionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {fieldErrors.resourceType ? (
            <p className="field__error">{fieldErrors.resourceType}</p>
          ) : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="audienceLevel">
            Best audience fit
          </label>
          <select
            id="audienceLevel"
            className={`field__input${fieldErrors.audienceLevel ? " has-error" : ""}`}
            name="audienceLevel"
            value={formData.audienceLevel}
            onChange={(event) => updateField("audienceLevel", event.target.value)}
          >
            {educationAudienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {fieldErrors.audienceLevel ? (
            <p className="field__error">{fieldErrors.audienceLevel}</p>
          ) : null}
        </div>

        <div className="field field--full">
          <label className="field__label" htmlFor="resourceUrl">
            Resource link
          </label>
          <input
            id="resourceUrl"
            className={`field__input${fieldErrors.resourceUrl ? " has-error" : ""}`}
            name="resourceUrl"
            type="url"
            value={formData.resourceUrl}
            onChange={(event) => updateField("resourceUrl", event.target.value)}
          />
          {fieldErrors.resourceUrl ? (
            <p className="field__error">{fieldErrors.resourceUrl}</p>
          ) : (
            <p className="field__hint">
              Use this for a lesson page, Google Drive file, public PDF, or hosted course.
            </p>
          )}
        </div>

        <div className="field field--full">
          <label className="field__label" htmlFor="summary">
            Short summary
          </label>
          <textarea
            id="summary"
            className={`field__input field__textarea${fieldErrors.summary ? " has-error" : ""}`}
            name="summary"
            value={formData.summary}
            onChange={(event) => updateField("summary", event.target.value)}
            rows={5}
          />
          {fieldErrors.summary ? (
            <p className="field__error">{fieldErrors.summary}</p>
          ) : (
            <p className="field__hint">
              A strong summary helps us review quality, relevance, and audience fit quickly.
            </p>
          )}
        </div>

        <div className="field field--full">
          <label className="field__label" htmlFor="notes">
            Extra notes
          </label>
          <textarea
            id="notes"
            className={`field__input field__textarea${fieldErrors.notes ? " has-error" : ""}`}
            name="notes"
            value={formData.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            rows={4}
          />
          {fieldErrors.notes ? <p className="field__error">{fieldErrors.notes}</p> : null}
        </div>

        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            value={formData.website}
            onChange={(event) => updateField("website", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="submission-form__checks">
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={formData.consentToContact}
            onChange={(event) => updateField("consentToContact", event.target.checked)}
          />
          <span>We may contact you by email about review, edits, or publication.</span>
        </label>
        {fieldErrors.consentToContact ? (
          <p className="field__error">{fieldErrors.consentToContact}</p>
        ) : null}

        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={formData.rightsConfirmed}
            onChange={(event) => updateField("rightsConfirmed", event.target.checked)}
          />
          <span>I confirm that I have the right to share this material or link for review.</span>
        </label>
        {fieldErrors.rightsConfirmed ? (
          <p className="field__error">{fieldErrors.rightsConfirmed}</p>
        ) : null}
      </div>

      <div className="submission-form__footer">
        <p className="submission-form__footnote">
          Submissions enter a manual review queue and are not published automatically.
        </p>
        <button
          type="submit"
          className={`button button--primary${isSubmitting ? " is-loading" : ""}`}
          aria-busy={isSubmitting}
          disabled={isSubmitting}
        >
          <span className="button__label">
            {isSubmitting ? "Submitting resource" : "Submit Resource"}
          </span>
          <span className="button__spinner" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
