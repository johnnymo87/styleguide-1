import React from 'react/addons';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "OverlayClick",

  propTypes: {
    content: Type.node.isRequired,
    onClick: Type.func,
    onClose: Type.func,
    onOpen: Type.func
  },

  getDefaultProps() {
    return {
      onClick: function() {},
      onClose: function() {},
      onOpen: function() {}
    };
  },

  getInitialState() {
    return { isOpen: false };
  },

  classes() {
    let classes = ['relative'];
    return classes.join(' ');
  },

  findParent(givenNode) {
    let parent = givenNode.parentElement;
    if (parent) {
      return this.findParent(parent);
    } else {
      return givenNode;
    }
  },

  componentDidMount() {
    this.findParent(React.findDOMNode(this)).addEventListener(
      'click', this.handleDocumentClick
    );
  },

  componentWillUnmount() {
    this.findParent(React.findDOMNode(this)).removeEventListener(
      'click', this.handleDocumentClick
    );
  },

  content() {
    if (this.state.isOpen) {
      return React.cloneElement(this.props.content, {closeOverlay: this.hide});
    }
  },

  hide() {
    this.props.onClose();
    this.setState({isOpen: false});
  },

  handleDocumentClick(e) {
    if (React.findDOMNode(this).contains(e.target)) {
      if (!this.state.isOpen) {
        this.show();
      } else {
        this.props.onClick();
      }
    } else {
      this.hide();
    }
  },

  show() {
    this.props.onOpen();
    this.setState({isOpen: true});
  },

  render() {
    return (
      <div className={this.classes()} >
        {this.props.children}
        {this.content()}
      </div>
    );
  }
});
