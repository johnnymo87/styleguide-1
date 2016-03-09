import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import Moment from 'moment';
import DateField from 'forms/fields/date/date';

describe('DateField', () => {

  const renderComponent = (givenProps) => TestUtils.renderIntoDocument(
    <DateField {...givenProps} />
  );

  let props;
  beforeEach(() => {
    props = { dateFormat: 'MMM D, YYYY' };
  });

  it('renders successfully', () => {
    let component = renderComponent(props);
    TestUtils.findRenderedDOMComponentWithClass(component, 'date-field');
  });

  describe('displayed value', () => {
    it("is the defaultValue as parsed by its dateFormat", () => {
      class Example extends React.Component {
        constructor(props) {
          super(props);
          this.render = this.render.bind(this);
          this.state = {};
        }
        render() {
          return (
            <DateField
              name="startDate"
              ref="startDate"
              label="Start Date"
              dateFormat="MM/DD/YYYY"
              key={this.state.startDate}
              defaultValue={this.state.startDate}
            />
          );
        }
      }

      let component = TestUtils.renderIntoDocument(<Example />);
      expect(
        React.findDOMNode(component).getElementsByTagName('input')[0].value
      ).to.eql('');
      component.setState({ startDate: 1431648000000 });
      expect(
        React.findDOMNode(component).getElementsByTagName('input')[0].value
      ).to.eql('05/15/2015');
    });
  });

  describe('refs.*.value()', () => {
    it("is the value provided by defaultValue", () => {
      class Example extends React.Component {
        constructor(props) {
          super(props);
          this.render = this.render.bind(this);
          this.state = {};
        }
        render() {
          return (
            <DateField
              name="startDate"
              ref="startDate"
              label="Start Date"
              dateFormat="MM/DD/YYYY"
              key={this.state.startDate}
              defaultValue={this.state.startDate}
            />
          );
        }
      }

      let component = TestUtils.renderIntoDocument(<Example />);
      expect(component.refs.startDate.value()).to.be.undefined;
      component.setState({ startDate: 1431648000000 });
      expect(component.refs.startDate.value()).to.eql(1431648000000);
    });

    it('is set the a date string in the given dateFormat when clicked through the UI', () => {
      class Example extends React.Component {
        constructor(props) {
          super(props);
          this.render = this.render.bind(this);
          this.state = {};
        }
        render() {
          return (
            <DateField
              name="startDate"
              ref="startDate"
              label="Start Date"
              dateFormat="MM/DD/YYYY"
              key={this.state.startDate}
              defaultValue={this.state.startDate}
            />
          );
        }
      }

      let component = TestUtils.renderIntoDocument(<Example />);
      let input = React.findDOMNode(component).getElementsByTagName('input')[0];
      input.dispatchEvent(
           new MouseEvent('click', {'view': window, 'bubbles': true, 'cancelable': true})
      );
      let firstDay = TestUtils.scryRenderedDOMComponentsWithClass(
        component, 'day'
      )[0];
      TestUtils.Simulate.click(
        TestUtils.scryRenderedDOMComponentsWithTag(firstDay, 'div')[1]
      );
      expect(component.refs.startDate.value()).to.eql(
        Moment().startOf('month').format('MM/DD/YYYY')
      );
    });
  });
});
