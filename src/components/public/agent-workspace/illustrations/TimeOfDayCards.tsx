/**
 * Deep-dive illustration (d): the same desk at three hours of the day.
 * Presentational only.
 */
export default function TimeOfDayCards() {
  return (
    <>
      <div className="aw-tod" aria-hidden="true">
        <div className="aw-tod-card aw-tod-card--day">
          <div className="aw-tod-badge">09:12 · ☀ day</div>
          <div className="aw-tod-plate" />
          <div className="aw-tod-desk">
            <div className="aw-tod-head" />
            <div className="aw-tod-torso" />
            <div className="aw-tod-bar" />
          </div>
          <div className="aw-tod-sun" />
        </div>

        <div className="aw-tod-card aw-tod-card--dusk">
          <div className="aw-tod-badge">18:47 · ⛅ dusk</div>
          <div className="aw-tod-plate" />
          <div className="aw-tod-desk">
            <div className="aw-tod-head" />
            <div className="aw-tod-torso" />
            <div className="aw-tod-bar" />
          </div>
          <div className="aw-tod-sun" />
        </div>

        <div className="aw-tod-card aw-tod-card--night">
          <div className="aw-tod-badge">23:41 · ☾ night</div>
          <div className="aw-tod-plate" />
          <div className="aw-tod-desk">
            <div className="aw-tod-head" />
            <div className="aw-tod-torso" />
            <div className="aw-tod-bar" />
          </div>
          <div className="aw-tod-moon" />
          <div className="aw-tod-star aw-tod-star--a" />
          <div className="aw-tod-star aw-tod-star--b" />
        </div>
      </div>
      <p className="sr-only">
        The same desk drawn three times: a bright 09:12 morning, a warm 18:47
        dusk, and a lamplit 23:41 night under the stars.
      </p>
    </>
  );
}
