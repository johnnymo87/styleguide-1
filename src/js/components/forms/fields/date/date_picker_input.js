import React from 'react';
import DatePicker from './date_picker';
import Moment from 'moment';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "ReactDateField",

  propTypes: {
    dateFormat: Type.oneOf(['MM/DD/YYYY','DD/MM/YYYY', 'YYYY/MM/DD','MMM D, YYYY']),
    disabled: Type.bool,
    fieldColor: Type.oneOf(['light', 'dark']),
    label: Type.string,
    onChange: Type.func,
    // value: Type.oneOfType([Type.string, Type.date])
  },

  getDefaultProps() {
    return {
      disabled: false,
      fieldColor: 'light',
      label: 'Date',
      onChange : function() {},
      value : new Date(),
    }
  },

  momentDate() {
    if (Object.prototype.toString.call(this.props.value) === '[object Date]') {
      return Moment(this.props.value);
    } else {
      return Moment(this.props.value, this.props.dateFormat);
    }
  },

  fieldClasses() {
    var classes = [];
    classes.push('field-'+this.props.fieldColor);
    return classes.join(' ');
  },

  getInitialState() {
    return {show:false};
  },

  iconClasses() {
    var classes = ['icon', 'icon-calendar', 'ml1'];
    this.props.disabled ? classes.push('grey-25') : classes.push('blue');
    return classes.join(' ');
  },

  label() {
    if(this.props.label) {
      return <label htmlFor={this.props.id} className="px2 mb1">{this.props.label}</label>;
    }
  },

  maskClasses() {
    var classes = ['icon-bg', 'rounded-2', 'icon-bg-' + this.props.fieldColor];
    if (this.props.disabled) classes.push('disabled');
    return classes.join(' ');
  },

  showDatePicker() {
    if (!this.props.disabled) this.setState({show:true});
  },

  hideDatePicker() {
    this.setState({show:false});
  },

  onChangeDate(date) {
    this.props.value = date;
    this.hideDatePicker();
    this.props.onChange(date);
  },

  datePicker() {
    if (this.state.show) {
      return (
        <div>
          <div className='modal-clear-bg' onClick={this.hideDatePicker}></div>
          <DatePicker
            date={this.momentDate().toDate()}
            show={this.state.show}
            onChangeDate={this.onChangeDate} />
        </div>
      );
    }
  },

  render() {
    console.log(this.props);
    return (
      <div className="date-field date-field-react-container relative col-3 clearfix">
        {this.label()}
        <br />
        {this.datePicker()}
        <div className='relative rounded-2 overflow-hidden'>
          <input
            className={'relative fit ' + this.fieldClasses()}
            disabled={this.props.disabled}
            onFocus={this.showDatePicker}
            readOnly
            type="text"
            value={this.momentDate().format(this.props.dateFormat)}/>
          <span className={this.iconClasses()} onClick={this.showDatePicker}></span>
          <div className={this.maskClasses()} onClick={this.showDatePicker}></div>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
});
