export const handleInput = (setValueInput, setField, setTouch, idInput, idDatalist, idInputHidden) => {
    const valueDatalist = document.getElementById(idInput).value

    var optionSelected = document.querySelector(`#${idDatalist} option[value='${valueDatalist}']`)
    if(optionSelected) {
      const valueOptionSelected = optionSelected.getAttribute('data-documento')
      setValueInput(valueOptionSelected)
      setField(idInputHidden, valueOptionSelected)
        
    } else {
      setField(idInputHidden, null)
      setTouch(idInputHidden, true)

    }

  };
