/**
  FIT.jsx

  (Filter Input Table) lets users create new filters/colors/etc to contain
  data sets from DOT.
*/
var config = require('js/config');
var React = require('react');

var FIT = React.createClass({
  getInitialState: function() {
    // initializes labels so we can render later
    return { labels: config.defaultLabels };
  },

  addFilter: function() {
    var labels = this.state.labels;

    labels[this.state.filterName] = {
      color: 'yellow',
      spent: 0
    };

    this.setState({ labels: labels }); // notifies listeners to update themselves
  },

  handleFilterNameChange: function(event) {
    this.setState({ filterName: event.target.value });
  },

  render: function() {
    return (
      <div id="fit">
        <div className="add-filter-form">
          <label>Color</label> <input type="text" name="filterName" onChange={this.handleFilterNameChange}></input> <button id="label" onClick={this.addFilter}>ADD</button>
        </div>

        <div className="filter-container">
          <table cellPadding="0">
            <FITRows data={this.props.store} onFilterChanged={this.props.onFilterChanged} />
          </table>
        </div>
      </div>
    );
  }
});

/**
  FIT rows
**/
var FITRows = React.createClass({
  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function() {
    $(document.body).off('keydown', this.handleKeyDown);
  },

  selected: null,

  /**
    Handle hotkeys for filter selections
  */
  handleKeyDown: function(e) {
    var charCode;
    var prop;
    var data;

    charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
    if (charCode) {
      // search through list of filters and apply click if found
      for (prop in this.props.data) {
        if (prop) {
          data = this.props.data[prop];
          if (data.hotkey && data.hotkey.toLowerCase() === String.fromCharCode(charCode).toLowerCase()) {
            this.handleClick(prop);
            break;
          }
        }
      }
    }
  },

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
    this.selected.style.outline = '3px solid #F00';
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
            <td>{this.props.data[result].hotkey} {result}</td><td>{this.props.data[result].spent}</td>
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
