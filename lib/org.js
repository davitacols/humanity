// Public organisation + contact details, all env-driven. Anything unset is
// simply omitted from the UI — nothing is fabricated.

function val(key) {
  const value = process.env[key];
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

export function getOrgContact() {
  const socials = [
    { label: "Instagram", href: val("NEXT_PUBLIC_SOCIAL_INSTAGRAM") },
    { label: "Facebook", href: val("NEXT_PUBLIC_SOCIAL_FACEBOOK") },
    { label: "YouTube", href: val("NEXT_PUBLIC_SOCIAL_YOUTUBE") },
    { label: "X", href: val("NEXT_PUBLIC_SOCIAL_X") }
  ].filter((item) => item.href);

  return {
    email: val("NEXT_PUBLIC_CONTACT_EMAIL"),
    phone: val("NEXT_PUBLIC_CONTACT_PHONE"),
    address: val("NEXT_PUBLIC_CONTACT_ADDRESS"),
    registration: val("NEXT_PUBLIC_ORG_REGISTRATION"),
    country: val("NEXT_PUBLIC_ORG_COUNTRY"),
    socials,
    hasAny: Boolean(
      val("NEXT_PUBLIC_CONTACT_EMAIL") ||
        val("NEXT_PUBLIC_CONTACT_PHONE") ||
        val("NEXT_PUBLIC_CONTACT_ADDRESS") ||
        val("NEXT_PUBLIC_ORG_REGISTRATION") ||
        socials.length
    )
  };
}
