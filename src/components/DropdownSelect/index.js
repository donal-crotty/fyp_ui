import React from 'react';
import Select from 'react-select';

class Dropdown extends React.Component {
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <Select
        className="pull-right"
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={[
          { value: 'Achill Island', label: 'Achill Island' },
          { value: 'Aranmore', label: 'Aranmore' },
          { value: 'Arklow', label: 'Arklow' },
          { value: 'Ballycotton', label: 'Ballycotton' },
          { value: 'Ballyglass', label: 'Ballyglass' },
        ]}
      />
    );
  }
}

export default Dropdown;
