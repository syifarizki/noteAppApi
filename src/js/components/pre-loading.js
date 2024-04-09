class PreLoading extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <div id="containerLoading">
                <div class="preloader"></div>
            </div>
        `

    const loadingStyles = `
            #containerLoading {
                display: flex;
                position: fixed;
                justify-content: center;
                align-items: center;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 9999;
                background-color:  rgb(248, 246, 246);
               
            }
 
            .preloader {
                width: 150px;
                height: 150px;
                border: solid 20px #ccc;
                border-top-color: #51829b;
                border-radius: 100%;
                margin: auto;
                animation: loading 2s linear infinite;
            }

            @keyframes loading {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        `

    const styleElement = document.createElement('style')
    styleElement.textContent = loadingStyles
    document.head.appendChild(styleElement)
  }
}

customElements.define('pre-loading', PreLoading)
