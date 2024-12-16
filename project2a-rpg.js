import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";
import "wired-elements/lib/wired-combo.js";

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
    this.url = "";
    this.characterAttributes = {
      seed: "00000000",
      accessories: 0,
      base: 0,  
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      hatColor: 0,
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
    this.connectedCallback();
  }

  static get properties() {
    return {
      ...super.properties,
      seed: {type: String},
      url: {type: String},
      title: { type: String },
      characterAttributes: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
          margin: var(--ddd-spacing-16);
          padding: var(--ddd-spacing-16) var(--ddd-spacing-16);
        

        
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
          margin-bottom: 2px;
        }

        wired-item {
          opacity: 1;
          color: black;
        }

        .character-preview rpg-character {
          margin: var(--dd-spacing-11);
          margin-top: var(--dd-spacing);
          padding: var(--ddd-spacing-10);
          height: var(--character-size, 200px);
          width: var(--character-size, 200px);
          transition: height 0.3s ease, width 0.3s ease;
        }
        .seed-display {
          color: black;
          margin-top: var(--ddd-spacing-1);
          margin-left: var(--ddd-spacing-10);
          border-radius: var(--ddd-spacing-1);
          font-size: 0.9rem;
          font-weight: bold;
          pointer-events: none;
        }
        .controls {
          flex: 1;
          min-width: 300px;
          text-align: left;
          display: inline-block;
          margin-top: var(--ddd-spacing-10);
        }
        wired-input,
        wired-checkbox,
        wired-slider, button {
          display: inline-flex;
          margin-bottom: var(--ddd-spacing-6);
          max-width: 300px;
        }
        label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: var(--ddd-spacing-5);
          margin-top: var(--ddd-spacing-5);
        }
        button {
          margin: var(--ddd-spacing-10);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          cursor: pointer;
          background-color: var(--ddd-theme-default-blue);
          color: var(--ddd-theme-default-darkBlue);
          border-radius: var(--ddd-spacing-10);
          font-size: 0.9rem;
          font-weight: bold;
        }
        button:hover {
          background-color: var(--ddd-theme-default-darkBlue);
          border-color: var(--ddd-theme-default-darkerBlue);
        }
        .character-name {
          font-size: 1.5rem;
          margin-bottom: var(--ddd-spacing-4);
          
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
            accessories="${this.characterAttributes.accessories}"
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
            .circle="${this.characterAttributes.circle}"
            style="
              --hat-color: hsl(${this.characterAttributes.hatColor}, 100%, 50%);
            "
          ></rpg-character>
        </div>
        </div>
        
        </div>
        
          
          
      </div>
        
        <div class="controls">
          <label for="hairToggle">Hair (Check for yes):</label>
          <wired-checkbox
            id="hairToggle"
            ?checked="${this.characterAttributes.base === 1 && this.characterAttributes.hair === 1}"
            @change="${(e) => {
              this._updateSetting('base', e.target.checked ? 1 : 0);
              this._updateSetting('hair', e.target.checked ? 1 : 0);
            }}"
          ></wired-checkbox>

          <label for="accessories">Accessories:</label>
          <wired-slider
            id="accessories"
            value="${this.characterAttributes.accessories}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('accessories', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="base">Base:</label>
          <wired-combo
            .selected="${this.characterAttributes.base}"
            @selected="${(e) => this._updateSetting('base', e.detail.selected)}">
            <wired-item value=0>Male</wired-item>
            <wired-item value=1>Female</wired-item>
          </wired-combo>

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
            .selected="${this.characterAttributes.hat}"
            @selected="${(e) => this._updateSetting('hat', e.detail.selected)}">
            <wired-item value="none">None</wired-item>
            <wired-item value="bunny">Bunny</wired-item>
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

          <label for="fire">Fire:</label>
          <wired-checkbox
            ?checked="${this.characterAttributes.fire}"
            @change="${(e) => this._updateSetting('fire', e.target.checked)}"
          ></wired-checkbox>

          <label for="walking">Walking:</label>
          <wired-checkbox
            ?checked="${this.characterAttributes.walking}"
            @change="${(e) => this._updateSetting('walking', e.target.checked)}"
          ></wired-checkbox>

          <label for="circle">Circle:</label>
          <wired-checkbox
            ?checked="${this.characterAttributes.circle}"
            @change="${(e) => this._updateSetting('circle', e.target.checked)}"
          ></wired-checkbox>

          <div class="share-buttons">
          <button @click="${this._copySeedURL}">Share</button>
            <button class="facebook" @click="${this._shareOnFacebook}">
              Share on Facebook
            </button>
            <button class="twitter" @click="${this._shareOnTwitter}">
              Share on Twitter
            </button>

        </div>
        </div>
        
    `;
  }

  
  _generateSeed() {
    const { accessories, base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.characterAttributes;
    this.characterAttributes.seed = `${accessories}${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
    this._updateURL(); 
    this.requestUpdate(); 
  }

  _updateURL() {
    const params = new URLSearchParams({
      seed: this.characterAttributes.seed,
      hat: this.characterAttributes.hat,
      fire: this.characterAttributes.fire,
      walking: this.characterAttributes.walking,
      circle: this.characterAttributes.circle,
    });
  
    const newUrl = `${window.location.origin}?${params.toString()}`;
    console.log("Updated URL: ", newUrl);
    history.pushState(null, '', newUrl);
  }

  _updateSetting(key, value) {
    this.characterAttributes = { ...this.characterAttributes, [key]: value };
    this._generateSeed();
    this.requestUpdate(); 
  }

  seedURL() {
    this.url = window.location.origin
    const params = new URLSearchParams({
      seed: this.characterAttributes.seed,
      hat: this.characterAttributes.hat,
      fire: this.characterAttributes.fire,
      walking: this.characterAttributes.walking,
      circle: this.characterAttributes.circle,
    });
    return `${this.url}?${params.toString()}`;
  }

  _copySeedURL() {
    const shareableUrl = this.seedURL();
    navigator.clipboard.writeText(shareableUrl)
      .then(() => {
        alert("Link copied to clipboard: " + shareableUrl);
      });
  }
  _shareOnTwitter() {
    const sharedlink = this._seedURL();
    const twitterlink = `https://twitter.com/intent/tweet?url=${sharedlink}&text=Check%20out%20my%20character!`;
    window.open(twitterlink, "_blank");
  }

  _shareOnFacebook() {
    const sharedLink = this._seedURL();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${sharedLink}`;
    window.open(facebookUrl, "_blank");
  }


  _applySeed(seed) {
    const [accessories, base, face, faceitem, hair, pants, shirt, skin, hatColor] = seed.split("").map(Number);
    
    this.characterAttributes = {
      ...this.characterAttributes,
      accessories,
      base,
      face,
      faceitem,
      hair,
      pants,
      shirt,
      skin,
      hatColor,
    };
    
    const params = new URLSearchParams(window.location.search);
    this.characterAttributes.fire = params.get("fire") === "true";
    this.characterAttributes.walking = params.get("walking") === "true";
    this.characterAttributes.circle = params.get("circle") === "true";
    
    this._generateSeed();
    
    this.requestUpdate();
  }
  

  connectedCallback() {
    super.connectedCallback();
  
    const params = new URLSearchParams(window.location.search);
  
    if (params.has("seed")) {
      const seed = params.get("seed");
      if (this.characterAttributes.seed !== seed) {
        this._applySeed(seed);  // Apply seed only if it is different from the current one
      }
    }
    this.requestUpdate();
  }
  

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(Project2aRpg.tag, Project2aRpg);
