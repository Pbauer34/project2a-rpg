import { html, fixture, expect } from '@open-wc/testing';
import "../project2a-rpg.js";

describe("Project2aRpg test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <project2a-rpg
        title="title"
      ></project2a-rpg>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
