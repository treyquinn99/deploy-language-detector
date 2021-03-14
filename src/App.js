import React from 'react';
import ReactDOM from 'react-dom';
import LanguageModel from './LanguageModel.js';
import './App.css';

let corpora = [new LanguageModel("English"), new LanguageModel("Spanish"), new LanguageModel("French")];
let input = "";

class Welcome extends React.Component {
  
  onChangeHandler = (event) => {
    input = event.target.value;
  }

  onClickHandler() {
    ReactDOM.render(<Analyze />, document.getElementById('root'));
  }

  onKeyDetection(event) {
    if (event.charCode === 13) {
      ReactDOM.render(<Analyze />, document.getElementById('root'));
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><span>Language</span> Detector</h1>
          <p>Enter a phrase in either <span>English</span>, <span>Spanish</span>, or <span>French</span> below.</p>
          <form>
              <label htmlFor="phrase" >Enter phrase here.</label>
              <input id="phrase" type="text" name="phrase" onChange={this.onChangeHandler} onKeyPress={this.onKeyDetection} />
          </form>
          <br />
          <label htmlFor="analyze" >Click button to analyze inputted text.</label>
          <button name="analyze" id="analyze" onClick={this.onClickHandler}>Analyze</button>
          <p>Example Phrases:
          <br /><br /><span>"Artificial intelligence is awesome."
          <br />"La inteligencia artificial es asombrosa."
          <br />"L'intelligence artificielle est géniale."</span></p>
        </header>
      </div>
    );
  }
}

class Analyze extends React.Component {

  onClickHandler() {
    ReactDOM.render(<Welcome />, document.getElementById('root'));
  }

  proccessText() {
    var maxProbability = -1.0;
    var maxProbabilityIndex = -1;

    for (var i = 0; i < input.length; i++) {
      if (((/[a-zA-Z]/).test(input.charAt(i)))) {
        input.replace(input.charAt(i), '');
      }
    }

    if (!((/[a-zA-Z]/).test(input))) {
      input = "";
      return "a non-detectable language";
    }

    for (var i = 0; i < corpora.length; i++) {
      if (corpora[i].probability(input) > maxProbability) {
        maxProbability = corpora[i].probability(input);
        maxProbabilityIndex = i;
      }
    }

    input = "";
    
    return corpora[maxProbabilityIndex].getName();
  }

  render() {
    let language = this.proccessText();
    return (
      <div className="App">
        <header className="App-header">
          <h1><span>Language</span> Detector</h1>
          <p>The phrase is in <span>{language}</span>.</p>
            <br />
            <label htmlFor="back" >Click button to return to input screen.</label>
            <button name="back" id="back" onClick={this.onClickHandler}>Go Back</button>
        </header>
      </div>
    );
  }
}

function App() {
  return (
    <Welcome />
  );
}

export default App;
