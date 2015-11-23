var config = require('js/config');
var React = require('react');
var ReactDOM = require('react-dom');

var i = 0;

/**
  Labels N Sums table contains the main table
**/
var LNS = React.createClass({
  getInitialState: function getInitialState() {
    // initializes labels so we can render later
    return {'labels': config.defaultLabels };
  },

  showLNSMenu: function() {
    var labels = this.state.labels;

    labels.push({
      label: 'poop ' + ++i,
      color: 'yellow'
    });

    this.setState({'labels': labels});
    console.log('got here');
  },

  render: function lnsRender() {
    return (
      <div>
        <button id="label" onClick={this.showLNSMenu}>+</button>
        <table cellSpacing="0" cellPadding="0">
          <LNSRows data={this.state.labels} />
        </table>
      </div>
    );
  }
});

var selected = null;

/**
  Labels N Sums rows
**/
var LNSRows = React.createClass({

  /**
    Handles click on a row
  */
  handleClick: function handleClick(e) {
    if (selected === this.refs[e]) {
      return;
    }

    for (var ref in this.refs) {
      this.refs[ref].style.outline = '';
    }

    selected = this.refs[e];
    selected.style.outline = '3px solid #0F0';
  },

  render: function lnsRowRender() {
    var commentNodes = this.props.data && this.props.data.map(function nodeMap(comment) {
      return (
        <tr style={{backgroundColor: comment.color}} key={comment.label} ref={comment.label} onClick={this.handleClick.bind(this, comment.label)} >
          <td>{comment.label}</td>
        </tr>
      );
    }.bind(this));

    return (
      <tbody onContextMenu={this.handleRightClick}>
        {commentNodes}
      </tbody>
    );
  }
});

var cats = {
  display: function display(data) {
    ReactDOM.render(
      <LNS data={data} />,
      document.getElementById('lns')
    );
  },

  getSelected: function() {
    return selected;
  },

  addRow: function addRow() {
    // TODO: add LNS row
    console.log('adding row');
  },

  removeRow: function removeRow() {
    // TODO: remove LNS row
  }
};

module.exports = cats;
