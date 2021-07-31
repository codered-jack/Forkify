import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupNext(currPage) {
    return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="#icon-arrow-right">
          <symbol id="icon-arrow-right" viewBox="0 0 24 24">
          <path d="M11.293 5.707l5.293 5.293h-11.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h11.586l-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l7-7c0.092-0.092 0.166-0.202 0.217-0.324 0.101-0.245 0.101-0.521 0-0.766-0.049-0.118-0.121-0.228-0.217-0.324l-7-7c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
          </symbol>
          </use>
        </svg>
      </button> 
        `;
  }

  _generateMarkupPrev(currPage) {
    return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="#icon-arrow-left">
            <symbol id="icon-arrow-left" viewBox="0 0 24 24">
            <path d="M12.707 18.293l-5.293-5.293h11.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-11.586l5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-7 7c-0.096 0.096-0.168 0.206-0.217 0.324-0.051 0.122-0.076 0.253-0.076 0.383 0 0.256 0.098 0.512 0.293 0.707l7 7c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
            </symbol>
            </use>
            </svg>
            <span>Page ${currPage - 1}</span>
        </button>
    `;
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupNext(currPage);
    }

    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupPrev(currPage);
    }

    if (currPage < numPages) {
      return (
        this._generateMarkupPrev(currPage) + this._generateMarkupNext(currPage)
      );
    }

    return '';
  }
}

export default new PaginationView();
