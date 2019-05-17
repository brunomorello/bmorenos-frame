"use strict";

System.register(["../../node_modules/core-js/modules/es7.string.pad-start", "../../node_modules/core-js/modules/es7.string.pad-end", "./controllers/NegociacaoController"], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_node_modulesCoreJsModulesEs7StringPadStart) {}, function (_node_modulesCoreJsModulesEs7StringPadEnd) {}, function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('#custom-button-delete-trades').onclick = negociacaoController.apagar.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map