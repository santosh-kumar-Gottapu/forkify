import view from './view.js';
import previewView from './previewview.js';
import icon from '../../img/icons.svg';

class ResultsView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
