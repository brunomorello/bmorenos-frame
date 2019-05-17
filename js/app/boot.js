"use strict";

System.register(["../../node_modules/core-js/modules/es7.string.pad-start", "../../node_modules/core-js/modules/es7.string.pad-end", "./controllers/NegociacaoController"], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_node_modulesCoreJsModulesEs7StringPadStart) {}, function (_node_modulesCoreJsModulesEs7StringPadEnd) {}, function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('#custom-button-delete-trades').onclick = negociacaoController.apagar.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map