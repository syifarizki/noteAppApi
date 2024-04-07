// footer
class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
        display: block;
      }
      footer {
        padding: 10px;
        color: black;
        font-size: 18px;
        background-color: #9bb0c1;
        text-align: center;
        font-weight: bold;
        margin-top: 30px;
      }

    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
     <footer>
      <p>Copyright &#169; 2024 | Syifa Rizki Mutia</p>
    </footer>
    `;
  }
}
customElements.define("footer-bar", FooterBar);
