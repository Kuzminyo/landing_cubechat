/**
 * Decides whether the navigation bar should be hidden, from scroll position
 * alone.
 *
 * Kept apart from the component because it is the part that can be wrong in
 * ways a screenshot will not show — thresholds, direction changes, the moment
 * a reversal counts — and apart from React it can be exercised directly.
 *
 * The rule it implements: scrolling down hides the bar, scrolling up brings it
 * straight back, and near the top of the page it is always present.
 */
export type NavScrollOptions = {
  /** Above this offset the bar never hides: there it reads as part of the page. */
  revealAbove: number
  /** Downward travel needed to hide. Larger, so a hide is always deliberate. */
  down: number
  /** Upward travel needed to reveal. Small, so the lightest lift is enough. */
  up: number
  /** Offset at which the bar takes on its condensed, backdrop-blurred state. */
  condenseAbove: number
}

export const NAV_SCROLL_DEFAULTS: NavScrollOptions = {
  revealAbove: 96,
  down: 8,
  up: 2,
  condenseAbove: 24,
}

export type NavScrollState = { hidden: boolean; scrolled: boolean }

/**
 * Returns a reader that is fed scroll positions and answers with the bar's
 * state. It is stateful by necessity — the answer depends on where the current
 * run of scrolling began, not on position alone.
 */
export function createNavScroll(
  options: NavScrollOptions = NAV_SCROLL_DEFAULTS,
): (y: number) => NavScrollState {
  const { revealAbove, down, up, condenseAbove } = options

  let previous = 0
  // Where the current direction of travel started. Distance is measured from
  // here rather than from the previous sample: per-sample deltas are each
  // below the threshold during a slow drag, so nothing would ever fire.
  let origin = 0
  let direction = 0
  let hidden = false

  return (y: number): NavScrollState => {
    const step = y - previous
    if (step !== 0) {
      const heading = step > 0 ? 1 : -1
      // A reversal restarts the measurement, which is what makes a small lift
      // after a long descent count as a small lift rather than as barely
      // denting the descent.
      if (heading !== direction) {
        direction = heading
        origin = previous
      }
      previous = y
    }

    const travelled = y - origin
    if (y <= revealAbove) hidden = false
    else if (travelled > down) hidden = true
    else if (travelled < -up) hidden = false

    return { hidden, scrolled: y > condenseAbove }
  }
}
