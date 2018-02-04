import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './react-datepicker-cssmodules.css';
import './react-datepicker.min.css';

// CSS Modules, react-datepicker-cssmodules.css


class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (<DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange}
    />);
  }
}

export default DatePickerComponent;
