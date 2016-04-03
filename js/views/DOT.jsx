/**
  DOT.jsx

  (Data Output Table) contains the parsed input data and is the central React brain
  that talks to the other React components.
*/

var React = require('react');
var config = require('js/config');

var DOT = React.createClass({
  getInitialState: function getInitialState() {
    return {
      labels: config.defaultLabels,
      activeFilter: null,
      rowFilterMap: [] // lookup by index for what filters have been applied to which rows
    };
  },

  /**
    Changes the row color
  */
  handleClick: function(e) {
    var index;
    var tempRowFilterMap;

    var colorFilter = this.props.activeFilter;

    e.preventDefault();

    switch (e.button) {
      case 0: // left click
        if (e.target.parentElement.style.backgroundColor !== this.props.store[colorFilter].color) {
          index = +e.target.parentElement.getAttribute('data-index');

          tempRowFilterMap = this.state.rowFilterMap;

          if (tempRowFilterMap[index]) {
            // old filter exists, so remove the value from old filter first
            this.props.onFilterChanged(tempRowFilterMap[index], (+this.props.data[index].price) * -1);
          }

          tempRowFilterMap[index] = colorFilter;

          this.setState({
            rowFilterMap: tempRowFilterMap
          }); // update state for row filter map

          e.target.parentElement.style.backgroundColor = this.props.store[colorFilter].color;

          this.props.onFilterChanged(colorFilter, +this.props.data[index].price);
        } else if (e.target.parentElement.style.backgroundColor === this.props.store[colorFilter].color) {
          index = +e.target.parentElement.getAttribute('data-index');
          this.resetBackgroundColor(e.target);

          tempRowFilterMap = this.state.rowFilterMap;
          tempRowFilterMap[index] = null;

          this.setState({
            rowFilterMap: tempRowFilterMap
          });

          this.props.onFilterChanged(colorFilter, (+this.props.data[index].price) * -1);
        }

        break;

      case 2: // right click
        // console.log('here: ' + e.clientX + ' ' + e.clientY);
        break;

      default:
        // do nothing
        break;
    }
  },

  resetBackgroundColor: function(target) {
    target.parentElement.style.backgroundColor = 'transparent';
  },

  handleRightClick: function(e) {
    e.preventDefault();
    console.log('here: ' + e.clientX + ' ' + e.clientY);
  },

  render: function tableRowRender() {
    var commentNodes = this.props.data.map(function nodeMap(comment) {
      return (
        <tr style={{ backgroundColor: 'transparent' }} key={comment.id} data-index={comment.id} onMouseUp={this.handleClick} >
          <td>{comment.purchase}</td>
          <td>{comment.price}</td>
        </tr>
      );
    }.bind(this));

    return (
      <table id="dot">
        <tbody onContextMenu={this.handleRightClick}>
          {commentNodes}
        </tbody>
      </table>
    );
  }
});

module.exports = DOT;
