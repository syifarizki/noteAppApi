// navbar
class navBar extends HTMLElement {
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

      nav {
         display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: #9BB0C1;
        position: fixed;
        
      }
 
       nav .logo img {
        width: 250px;
        margin-left: 20px;
      }

        nav ul {
        padding-left: 0;
        display: flex;
        justify-content: center;
        gap: 40px;
         margin-right: 200px;
         
      }

        nav li {
        list-style: none;
        padding-top: 10px;
      }

         nav ul li a {
        padding: 0.5rem 1rem;
        border-radius: 999px;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        color: black;
        transition: all 0.2s ease-in-out;
      }

        nav ul li a:hover {
          background-color: rgb(221, 217, 217);
          color: #475e47;
      }

         @media screen and (max-width: 768px) {
   nav ul {
        margin-right: 10px;
    }

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
      <nav>
        <div class="logo">
          <img src="src/img/logo.png" alt="" />
        </div>
        <ul>
          <li>
            <a href="#addNote"> ADD NOTE</a >
          </li>
          <li>
            <a href="#listNote"> LIST NOTE</a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("nav-bar", navBar);
