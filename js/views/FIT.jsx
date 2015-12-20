/**
  FIT.jsx

  (Filter Input Table) lets users create new filters/colors/etc to contain
  data sets from DOT.
*/
var config = require('js/config');
var React = require('react');

var i = 0;

var FIT = React.createClass({
  getInitialState: function() {
    // initializes labels so we can render later
    return { labels: config.defaultLabels };
  },

  showLNSMenu: function() {
    var labels = this.state.labels;

    labels.push({
      label: 'poop ' + ++i,
      color: 'yellow'
    });

    this.setState({ labels: labels });
  },

  render: function() {
    return (
      <div>
        <button id="label" onClick={this.showLNSMenu}>+</button>
        <table cellSpacing="0" cellPadding="0">
          <FITRows data={this.props.store} onFilterChanged={this.props.onFilterChanged} />
        </table>
      </div>
    );
  }
});

/**
  Labels N Sums row
**/
var FITRows = React.createClass({
  selected: null,

  /**
    Lets user knows when they clicked on the row
  */
  handleClick: function(e) {
    var ref;

    if (this.selected === this.refs[e]) {
      return;
    }

    // Notify parent of label selection change
    this.props.onFilterChanged(e); // label

    for (ref in this.refs) {
      if (ref) {
        this.refs[ref].style.outline = '';
        this.refs[ref].className = '';
      }
    }

    this.selected = this.refs[e];
    this.selected.className = 'selected';
    this.selected.style.outline = '3px solid #0F0';
  },

  handleRightClick: function(e) {
    e.preventDefault();
    console.log('right click on tbody');
  },

  render: function() {
    var resultNodes = Object.keys(this.props.data).map(
      function(result) {
        return (
          <tr style={{ backgroundColor: this.props.data[result].color }} key={result} ref={result} onClick={this.handleClick.bind(this, result)} >
            <td>{result}</td><td>{this.props.data[result].spent}</td>
          </tr>
        );
      }.bind(this)
    );

    return (
      <tbody onContextMenu={this.handleRightClick}>
        {resultNodes}
      </tbody>
    );
  }
});

module.exports = FIT;
