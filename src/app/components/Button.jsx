/*
 * NAME: Button
 * DESCRIPTION: a button with options for classes, styling, click events, and data passed in to click 
 */

import React from 'react';

class Button extends React.Component {
  render() {
    let classes = `${this.props.classes} 
                   ${this.props.isSelected ? 
                     this.props.selectedClasses : this.props.nonSelectedClasses}`;
    return (
      <button 
        type="button"
        className={classes}
        disabled={this.props.isDisabled}
        onClick={() => this.props.onClick(
          this.props.value, 
          this.props.action, 
          this.props.params
        )}
        style={this.props.style}
        >
        {this.props.text}
      </button>
    );
  }
}

// propTypes no longer natively supported by provide useful info about the Button
Button.propTypes = {
  action: React.PropTypes.any, //object to pass in to click event
  classes: React.PropTypes.string, //default classes to use
  isDisabled: React.PropTypes.bool.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  currentValue: React.PropTypes.any, //the val of currently selected button - useful for button groups
  nonSelectedClasses: React.PropTypes.string, //any classes to use specifically when not selected
  params: React.PropTypes.any, //object to pass in to click event 
  selectedClasses: React.PropTypes.string, //classes to add if in selectd state
  style: React.PropTypes.object,
  text: React.PropTypes.node.isRequired, //text to display on the button
  value: React.PropTypes.any //object to pass in to click event
}

Button.defaultProps = {
  classes: 'btn btn-default',
  isDisabled: false,
  isSelected: false,
  onClick: function() {return},
  nonSelectedClasses: '',
  selectedClasses: 'is-selected'
}

export default Button;