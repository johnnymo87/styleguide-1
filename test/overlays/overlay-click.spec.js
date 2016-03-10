import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import Sinon from 'sinon';
import triggerRawClick from '../test_helpers/trigger_raw_click';
import Overlay from 'overlays/overlay-click';

describe('Overlay', () => {
  let sandbox;
  beforeEach(() => sandbox = Sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  describe('click behavior', () => {
    class Example extends React.Component {
      constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.state = {};
      }
      render() {
        return (
          <Overlay
            name="overlay"
            ref="overlay"
            content={<div>Hello World</div>}
            onClick={this.props.clickHandler}
          />
        );
      }
    }

    it('closes on outside click', (done) => {
      let component = TestUtils.renderIntoDocument(<Example />);
      let overlay = component.refs.overlay;

      expect(overlay.state.isOpen).to.be.false;

      setTimeout(() => {
        try {
          TestUtils.Simulate.click(React.findDOMNode(overlay));
          expect(overlay.state.isOpen).to.be.true;
          triggerRawClick(React.findDOMNode(component).parentElement);
          expect(overlay.state.isOpen).to.be.false;
          done();
        } catch (e) {
          done(e);
        }
      }, 0);
    });

    it('calls the given click handler on inside click', (done) => {
      let spy = sandbox.spy();
      let component = TestUtils.renderIntoDocument(<Example clickHandler={spy} />);
      let overlay = component.refs.overlay;

      expect(overlay.state.isOpen).to.be.false;

      setTimeout(() => {
        try {
          TestUtils.Simulate.click(React.findDOMNode(overlay));
          expect(overlay.state.isOpen).to.be.true;
          triggerRawClick(React.findDOMNode(overlay));
          expect(spy.called).to.be.true;
          done();
        } catch (e) {
          done(e);
        }
      }, 0);
    });
  });
});
