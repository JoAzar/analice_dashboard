export const components = {

/*------------------------------------------------------------------------------*/

    login: (props) => `
        <div class="login margen2 padding2 vertical fondoGrisOscuro radius">
            <h2 class="textoChanga letraBlanca textoCentrado padding2">${props.titulo}</h2>
            <input type="text" placeholder="Usuario"/>
            <input type="password" placeholder="Contraseña"/>
            <button class="centrarItem">${props.buttonText}</button>
        </div>`,

/*------------------------------------------------------------------------------*/

    carousel: (props) => `
        <div class="carousel margin2 padding2">
            ${props.images.map(img => `<img class="wid100" src="/images/${img}">`).join("")}
        </div>`

/*------------------------------------------------------------------------------*/

};
