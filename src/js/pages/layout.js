import React from 'react';

import Styleguide from '../styleguide';
import GridBlock from '../components/grid-block';
import Button from '../components/buttons/button';
import Flexbox from './layout/flexbox';
import Spacing from './layout/spacing';

import ViewActions from '../components/view/actions/view-actions';

const {
  createClass
} = React;


const {
  createActionBar,
  scrollListenTo,
  toggleActionBar,
} = ViewActions;


const actionBar = () => createActionBar({

  title: "Lorem Ipsum",

  subtitle: "A subtitle",

  description: "Lorem Ipsum Description",

  actions: [
    <Button label="Disappear" onClick={toggleActionBar} />,
  ],

});


export default createClass({
  displayName: "LayoutPage",

  componentDidMount() {
    ViewActions.scrollListenTo(document.getElementById('styleguide-components'));
  },

  enableActionBar() {
    ViewActions.updateActionBarTitle("lorem");
  },

  render() {
    return (
      <Styleguide title="Layout System" codeClassName="language-css">
        <div className="grid" title="Grid" description="The main grid class system for Namely" >
          <div className="clearfix" >
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
            <GridBlock colClass="col-1" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-2" />
            <GridBlock colClass="col-2" />
            <GridBlock colClass="col-2" />
            <GridBlock colClass="col-2" />
            <GridBlock colClass="col-2" />
            <GridBlock colClass="col-2" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-3" />
            <GridBlock colClass="col-3" />
            <GridBlock colClass="col-3" />
            <GridBlock colClass="col-3" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-4" />
            <GridBlock colClass="col-4" />
            <GridBlock colClass="col-4" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-5" />
            <GridBlock colClass="col-7" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-6" />
            <GridBlock colClass="col-6" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-7" />
            <GridBlock colClass="col-5" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-8" />
            <GridBlock colClass="col-4" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-9" />
            <GridBlock colClass="col-3" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-10" />
            <GridBlock colClass="col-2" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-11" />
            <GridBlock colClass="col-1" />
          </div>
          <div className="clearfix" >
            <GridBlock colClass="col-12" />
          </div>
          <article className="mt5">
            <h3>Example: Basic Layout</h3>
            <div className="clearfix">
              <GridBlock colClass="col-12" colContent="col-12 (Header)" /> 
            </div>
            <div className="clearfix">
              <GridBlock colClass="col-3" colContent="col-3 (Sidebar)" />
              <GridBlock colClass="col-9" colContent="col-9 (Content)" />
            </div>
          </article>
        </div>
        <div title="View Component" description="Higher order component to control a global loading state and ActionBar component">
          <Button label="Show Action Bar" onClick={actionBar} />
        </div>
        <div title="Flexbox" description="The utility classes for using the flexbox layout system" >
          <Flexbox />
        </div>
        <div title="Spacing Utilities" description="The utility classes for spacing elements" >
          <Spacing />
        </div>
      </Styleguide>
    );
    
  }
});
