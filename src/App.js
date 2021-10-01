import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import AllCards from './components/AllCards';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: false,
      hasTrunfo: false,
      gameCards: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  onInputChange({ target: { value, name } }) {
    const magicNumber = 210;
    const magicNumber2 = 90;
    const {
      cardRare, cardName, cardDescription, cardImage, cardAttr1, cardAttr2, cardAttr3,
    } = this.state;

    if (name === 'trunfo') {
      this.setState((prevState) => ({ cardTrunfo: !prevState.cardTrunfo }));
    }
    this.setState({
      [name]: value,
    });
    if ((cardName.length > 1)
      && (cardRare.length > 1)
      && (cardDescription.length > 1)
      && (cardImage.length > 1)
      && (Number(cardAttr1) < magicNumber2)
      && (Number(cardAttr2) < magicNumber2)
      && (Number(cardAttr3) < magicNumber2)
      && (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) < magicNumber)) {
      return this.setState((prev) => ({
        isSaveButtonDisabled: !prev.isSaveButtonDisabled,
      }));
    }
  }

  onSaveButtonClick() {
    const {
      gameCards,
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;
    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    gameCards.push(card);

    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    });

    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      gameCards,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          hasTrunfo={ hasTrunfo }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          hasTrunfo={ hasTrunfo }
        />
        <AllCards
          gameCards={ gameCards }
        />
      </div>
    );
  }
}

export default App;
