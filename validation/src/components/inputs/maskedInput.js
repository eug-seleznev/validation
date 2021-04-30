import React, { useState } from 'react';
import InputMask from 'react-input-mask';
 
const MaskedInput = () => {


    const [value, setValue] = useState('')
 
 
  onChange = (event) => {
    setValue(event.target.value)
  }
 
  beforeMaskedValueChange = (newState, oldState, userInput) => {
    var { value } = newState;
    var selection = newState.selection;
    var cursorPosition = selection ? selection.start : null;
 
    // keep minus if entered by user
    if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }
 
    return {
      value,
      selection
    };
  }
 
  return(
     <InputMask mask="99999-9999" maskChar={null} value={this.state.value} onChange={this.onChange} beforeMaskedValueChange={this.beforeMaskedValueChange} />
  )
}