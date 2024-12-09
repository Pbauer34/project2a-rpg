import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

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
    this.characterAttributes = {
      seed: "0000000000",
      accessories: 0,
      base: 1,  
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      hatcolor: 0,
      hat: "none",
      fire: false,
      walking: false,
      circle: false,
    };
    this.t = this.t || {};
    this.t = { ...this.t, title: "Title" };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project2a-rpg.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      characterAttributes: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
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
        .input-group {
          margin-bottom: 10px;
        }

        #wired-item{
          --wired-item-color: black;
        }
      `,
    ];
  }

  
  render() {
    return html`
      <div class="container">
        <div class="character-preview">
          <div class="seed-display">Seed: ${this.characterAttributes.seed}</div>
          <div class="character-name">${this.characterAttributes.name}</div>
          <rpg-character
            base="${this.characterAttributes.base}"
            face="${this.characterAttributes.face}"
            faceitem="${this.characterAttributes.faceitem}"
            hair="${this.characterAttributes.hair}"
            pants="${this.characterAttributes.pants}"
            shirt="${this.characterAttributes.shirt}"
            skin="${this.characterAttributes.skin}"
            hat="${this.characterAttributes.hat}"
            hatColor="${this.characterAttributes.hatColor}"
            .fire="${this.characterAttributes.fire}"
            .walking="${this.characterAttributes.walking}"
            style="
              --hat-color: hsl(${this.characterAttributes.hatColor}, 100%, 50%);
            "
          ></rpg-character>
        </div>
      </div>
        <div class="controls">
          

          <label for="hairToggle">Hair (Check for yes):</label>
          <wired-checkbox
            id="hairToggle"
            ?checked="${this.characterAttributes.base === 1}"
            @change="${(e) =>
              this._updateSetting('base', e.target.checked ? 1 : 0)}"
            ></wired-checkbox
          >

          <label for="face">Face:</label>
          <wired-slider
            id="face"
            value="${this.characterAttributes.face}"
            min="0"
            max="5"
            @change="${(e) => this._updateSetting('face', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="faceitem">Face Accessories:</label>
          <wired-slider
            id="faceitem"
            value="${this.characterAttributes.faceitem}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('faceitem', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hair">Hair Color:</label>
          <wired-slider
            id="hair"
            value="${this.characterAttributes.hair}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('hair', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="pants">Pant Style and Color:</label>
          <wired-slider
            id="pants"
            value="${this.characterAttributes.pants}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('pants', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="shirt">Shirt Style and Color:</label>
          <wired-slider
            id="shirt"
            value="${this.characterAttributes.shirt}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('shirt', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="skin">Skin Tone:</label>
          <wired-slider
            id="skin"
            value="${this.characterAttributes.skin}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('skin', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hat">Hat:</label>
          <wired-combo
            .value="${this.characterAttributes.hat}"
            @change="${(e) => this._updateSetting('hat', e.target.value)}">
            <wired-item value="none" role="option">None</wired-item>
            <wired-item value="bunny"role="option">Bunny</wired-item>
            <wired-item value="coffee">Coffee</wired-item>
            <wired-item value="construction">Construction</wired-item>
            <wired-item value="cowboy">Cowboy</wired-item>
            <wired-item value="education">Education</wired-item>
            <wired-item value="knight">Knight</wired-item>
            <wired-item value="ninja">Ninja</wired-item>
            <wired-item value="party">Party</wired-item>
            <wired-item value="pirate">Pirate</wired-item>
            <wired-item value="watermelon">Watermelon</wired-item>
          </wired-combo>
          
        

          <label for="hatColor">Hat Color:</label>
          <wired-slider
            id="hatColor"
            value="${this.characterAttributes.hatColor}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('hatColor', parseInt(e.detail.value))}"
          ></wired-slider>

          <wired-checkbox
            ?checked="${this.characterAttributes.fire}"
            @change="${(e) => this._updateSetting('fire', e.target.checked)}"
          >Fire</wired-checkbox>

          <wired-checkbox
            ?checked="${this.characterAttributes.walking}"
            @change="${(e) => this._updateSetting('walking', e.target.checked)}"
          >Walking</wired-checkbox>

         </div>

    `;
  }

  _applySeedToSettings() {
    const seed = this.characterAttributes.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
  
    [
      this.characterAttributes.base,
      this.characterAttributes.face,
      this.characterAttributes.faceitem,
      this.characterAttributes.hair,
      this.characterAttributes.pants,
      this.characterAttributes.shirt,
      this.characterAttributes.skin,
      this.characterAttributes.hatColor,
    ] = values;
  
    this.requestUpdate(); // Ensure UI updates after applying settings
  }
  

  _generateSeed() {
    const { base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.characterAttributes;
    this.characterAttributes.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }

  _updateSetting(key, value) {
    this.characterAttributes = { ...this.characterAttributes, [key]: value };
    this._generateSeed();
    this.requestUpdate();
  }
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(Project2aRpg.tag, Project2aRpg);
