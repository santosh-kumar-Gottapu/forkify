import view from './view.js';
import icon from '../../img/icons.svg';

import previewView from './previewview.js';
// console.log(Fraction);
class BookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet, find a nice recipe and bookmark it';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
