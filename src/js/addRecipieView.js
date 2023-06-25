import View from "./view";
import icons from "url:../img/icons.svg";

class AddRecipieView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  listnerFunction() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.listnerFunction.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.listnerFunction.bind(this));
    this._overlay.addEventListener("click", this.listnerFunction.bind(this));
  }

  addHandlerUplode(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}

  _generateMarkupHTML(result) {}
}

export default new AddRecipieView();

//
//<div class="preview__user-generated">
//<svg>
//<use href="${icons}#icon-user"></use>
//</svg>
//</div>
