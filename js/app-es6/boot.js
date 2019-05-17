import "../../node_modules/core-js/modules/es7.string.pad-start";
import "../../node_modules/core-js/modules/es7.string.pad-end";
import { currentInstance } from "./controllers/NegociacaoController";

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#custom-button-delete-trades').onclick = negociacaoController.apagar.bind(negociacaoController);