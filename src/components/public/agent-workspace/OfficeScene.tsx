"use client";

import { memo } from "react";

/**
 * The room itself: walls, windows, floor, furniture. Nothing here reacts to
 * the simulation, so it renders once and is skipped on every subsequent
 * event. Purely decorative — hidden from assistive tech, which gets the
 * written description in `OfficeDemo` instead.
 *
 * Every position and colour is the mockup's, moved out of inline styles and
 * into `office-demo.css` so a new design drop can restyle the room without
 * touching this file (see RESKIN.md).
 */
function OfficeSceneImpl() {
  return (
    <div className="aw-o" aria-hidden="true">
      {/* ------------------------------------------------ left back wall */}
      <div className="aw-o-wall aw-o-wall--left">
        <div className="aw-o-wall-tint aw-o-wall-tint--day" />
        <div className="aw-o-wall-tint aw-o-wall-tint--dusk" />

        <div className="aw-o-door">
          <div className="aw-o-door-glass" />
          <div className="aw-o-door-knob" />
        </div>
        <div className="aw-o-inout">IN·OUT</div>

        <div className="aw-o-boardwall">
          <div className="aw-o-boardbar aw-o-boardbar--claude" />
          <div className="aw-o-boardbar aw-o-boardbar--codex" />
          <div className="aw-o-boardbar aw-o-boardbar--gemini" />
        </div>

        <div className="aw-o-ship">SHIP</div>
        <div className="aw-o-skirt" />
      </div>

      {/* ----------------------------------------------- right back wall */}
      <div className="aw-o-wall aw-o-wall--right">
        <div className="aw-o-wall-tint aw-o-wall-tint--day" />
        <div className="aw-o-wall-tint aw-o-wall-tint--dusk" />

        <div className="aw-o-window aw-o-window--a">
          <div className="aw-o-sky aw-o-sky--night">
            <div className="aw-o-moon" />
            <div className="aw-o-star aw-o-star--a1" />
            <div className="aw-o-star aw-o-star--a2" />
          </div>
          <div className="aw-o-sky aw-o-sky--day">
            <div className="aw-o-sun" />
            <div className="aw-o-cloud" />
          </div>
          <div className="aw-o-sky aw-o-sky--dusk">
            <div className="aw-o-sundown" />
          </div>
          <div className="aw-o-mullion" />
        </div>

        <div className="aw-o-window aw-o-window--b">
          <div className="aw-o-sky aw-o-sky--night">
            <div className="aw-o-star aw-o-star--b1" />
            <div className="aw-o-tower aw-o-tower--n1" />
            <div className="aw-o-tower aw-o-tower--n2" />
            <div className="aw-o-tower aw-o-tower--n3" />
            <div className="aw-o-litwindow aw-o-litwindow--1" />
            <div className="aw-o-litwindow aw-o-litwindow--2" />
          </div>
          <div className="aw-o-sky aw-o-sky--day">
            <div className="aw-o-tower aw-o-tower--d1" />
            <div className="aw-o-tower aw-o-tower--d2" />
          </div>
          <div className="aw-o-sky aw-o-sky--dusk">
            <div className="aw-o-tower aw-o-tower--k1" />
            <div className="aw-o-tower aw-o-tower--k2" />
          </div>
          <div className="aw-o-mullion" />
        </div>

        <div className="aw-o-clock">
          <div className="aw-o-clock-hand aw-o-clock-hand--long" />
          <div className="aw-o-clock-hand aw-o-clock-hand--short" />
        </div>
        <div className="aw-o-skirt" />
      </div>

      {/* ------------------------------------------------------ the floor */}
      <div className="aw-o-floor">
        <div className="aw-o-floor-tint aw-o-floor-tint--day" />
        <div className="aw-o-floor-tint aw-o-floor-tint--dusk" />
        <div className="aw-o-grid" />
        <div className="aw-o-grid aw-o-grid--day" />
      </div>

      <div className="aw-o-rug" />

      {/* --------------------------------------------- hanging ceiling lamps */}
      <div className="aw-o-lamp aw-o-lamp--a">
        <div className="aw-o-lamp-cord" />
        <div className="aw-o-lamp-shade" />
        <div className="aw-o-lamp-bulb" />
      </div>
      <div className="aw-o-lamp aw-o-lamp--b">
        <div className="aw-o-lamp-cord" />
        <div className="aw-o-lamp-shade" />
        <div className="aw-o-lamp-bulb" />
      </div>

      {/* ------------------------------------------------------- bookshelf */}
      <div className="aw-o-shelf">
        <div className="aw-o-shelf-box">
          <div className="aw-o-shelf-row">
            <span className="aw-o-spine aw-o-spine--claude" />
            <span className="aw-o-spine aw-o-spine--done" />
            <span className="aw-o-spine aw-o-spine--sky" />
            <span className="aw-o-spine aw-o-spine--cream" />
          </div>
          <div className="aw-o-shelf-row">
            <span className="aw-o-spine aw-o-spine--warn" />
            <span className="aw-o-spine aw-o-spine--codex" />
            <span className="aw-o-spine aw-o-spine--lilac" />
          </div>
          <div className="aw-o-shelf-row">
            <span className="aw-o-spine aw-o-spine--rose" />
            <span className="aw-o-spine aw-o-spine--sky" />
            <span className="aw-o-spine aw-o-spine--claude" />
          </div>
        </div>
        <div className="aw-o-shelf-shadow" />
      </div>

      {/* --------------------------------------------------- coffee corner */}
      <div className="aw-o-coffee">
        <div className="aw-o-coffee-machine">
          <div className="aw-o-coffee-led" />
          <div className="aw-o-coffee-cup" />
          <div className="aw-o-steam aw-o-steam--a" />
          <div className="aw-o-steam aw-o-steam--b" />
        </div>
        <div className="aw-o-cups">
          <span className="aw-o-cup aw-o-cup--claude" />
          <span className="aw-o-cup aw-o-cup--codex" />
          <span className="aw-o-cup aw-o-cup--gemini" />
        </div>
        <div className="aw-o-counter-top" />
        <div className="aw-o-counter-front" />
        <div className="aw-o-counter-shadow" />
      </div>

      {/* ---------------------------------------------------- water cooler */}
      <div className="aw-o-cooler">
        <div className="aw-o-cooler-bottle" />
        <div className="aw-o-cooler-body">
          <span className="aw-o-cooler-tap aw-o-cooler-tap--cold" />
          <span className="aw-o-cooler-tap aw-o-cooler-tap--hot" />
        </div>
        <div className="aw-o-cooler-base" />
        <div className="aw-o-cooler-shadow" />
      </div>

      {/* ----------------------------------------------------------- plants */}
      <div className="aw-o-plant aw-o-plant--a">
        <div className="aw-o-plant-inner">
          <span className="aw-o-leaf aw-o-leaf--l" />
          <span className="aw-o-leaf aw-o-leaf--m" />
          <span className="aw-o-leaf aw-o-leaf--r" />
          <span className="aw-o-pot" />
          <span className="aw-o-plant-shadow" />
        </div>
      </div>
      <div className="aw-o-plant aw-o-plant--b">
        <div className="aw-o-plant-inner">
          <span className="aw-o-leaf aw-o-leaf--l" />
          <span className="aw-o-leaf aw-o-leaf--m" />
          <span className="aw-o-leaf aw-o-leaf--r" />
          <span className="aw-o-pot" />
          <span className="aw-o-plant-shadow" />
        </div>
      </div>
    </div>
  );
}

const OfficeScene = memo(OfficeSceneImpl);
OfficeScene.displayName = "OfficeScene";

export default OfficeScene;
