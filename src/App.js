import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Form } from './components';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: '',
      cardImage: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      deck: [],
    };
  }

  checkSaveBtnStatus = () => {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare } = this.state;

    const attr1 = parseInt(cardAttr1, 10);
    const attr2 = parseInt(cardAttr2, 10);
    const attr3 = parseInt(cardAttr3, 10);
    const maxAttrSum = 210;
    const attrTop = 90;

    const noEmptyTextInputs = (
      cardName.length > 0 && cardDescription.length > 0
      && cardImage.length > 0 && cardRare.length > 0
    );

    const attrSumInRange = (attr1 + attr2 + attr3) <= maxAttrSum;

    const attrsInRange = (
      attr1 >= 0 && attr1 <= attrTop
      && attr2 >= 0 && attr2 <= attrTop
      && attr3 >= 0 && attr3 <= attrTop
    );

    if (noEmptyTextInputs && attrSumInRange && attrsInRange) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onInputChange = ({ target: { id, value, checked } }) => {
    if (id === 'cardTrunfo') {
      this.setState({ [id]: checked }, () => this.checkSaveBtnStatus());
    } else {
      this.setState({ [id]: value }, () => this.checkSaveBtnStatus());
    }
  }

  onSaveButtonClick = () => {
    const { isSaveButtonDisabled, deck, ...newCard } = this.state;
    newCard.id = uuidv4();
    this.setState((state) => (
      {
        deck: [...state.deck, newCard],
        cardName: '',
        cardImage: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardRare: 'normal',
        cardTrunfo: false,
      }
    ));
  }

  render() {
    const { deck } = this.state;
    const hasTrunfo = deck.some(({ cardTrunfo }) => cardTrunfo);
    return (
      <div>
        <div className="form-and-preview">
          <Form
            { ...this.state }
            hasTrunfo={ hasTrunfo }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card { ...this.state } />
        </div>
        { deck.map((card) => (
          <Card key={ card.id } { ...card } />
        ))}
      </div>
    );
  }
}

export default App;
