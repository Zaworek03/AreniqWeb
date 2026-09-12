// Lets CTAs elsewhere on the page prepare the waitlist form (e.g. the stables section).
export const WAITLIST_STABLE_EVENT = "areniq:waitlist-stable";

export function requestStableSignup() {
  window.dispatchEvent(new Event(WAITLIST_STABLE_EVENT));
}
