/**
 * Copyright 2024 Pbauer34
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "wired-elements/lib/wired-combo.js";
import "wired-elements/lib/wired-item.js";

/**
 * `project2a-rpg`
 * 
 * @demo index.html
 * @element project2a-rpg
 */
export class Project2aRpg extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project2a-rpg";
  }

  constructor() {
    super();
    this.title = "";
    this.seed = "0000000000"; 
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project2a-rpg.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      seed: { type: String}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--project2a-rpg-label-font-size, var(--ddd-font-size-s));
      }

      
      
    `];
  }

  _updateSeed(index, value) {
    
      const seedArray = this.seed.split("");
      seedArray[index] = value; // Update the specific character
      this.seed = seedArray.join(""); // Recombine the seed as a string
      console.log(`Updated seed: ${this.seed}`);
    
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>

  <rpg-character seed="${this.seed}"></rpg-character>

  <h2>Accessories</h2>
  <wired-combo
          @selected="${(e) => this._updateSeed(0, e.detail.value)}"
          selected="${this.seed[0]}"
        >
        <wired-item value="0"> 0</wired-item>
        <wired-item value="1">1</wired-item>
        <wired-item value="2"> 2</wired-item>
        <wired-item value="3">3</wired-item>
        <wired-item value="4">4</wired-item>
        <wired-item value="5">5</wired-item>
        <wired-item value="6">6</wired-item>
        <wired-item value="7">7</wired-item>
        <wired-item value="8">8</wired-item>
        <wired-item value="9">9</wired-item>
    </wired-combo>



</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(Project2aRpg.tag, Project2aRpg);