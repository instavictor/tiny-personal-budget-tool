/**
  DOT.jsx

  (Data Output Table) contains the parsed input data and is the central React brain
  that talks to the other React components.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var FIT = require('js/views/FIT.jsx'); // FIT jsx view frag

var config = require('js/config');

var colorFilter;
var onFilterChanged = function(filter) {
  colorFilter = filter;
  console.log(filter);
};

var DOT = React.createClass({
  getInitialState: function() {
    return {
      store: config.defaultLabels
    };
  },

  onFilterChanged: onFilterChanged,

  onFilterRowChanged: function(category, price) {
    var tempStore = this.state.store;
    var updatedPrice = price + Number(tempStore[category].spent);
    tempStore[category].spent = updatedPrice.toFixed(2);

    this.setState(tempStore);

    // var totalSpent = 0;
    // if (this.state && !isNaN(this.state.totalSpent)) {
    //   totalSpent += this.state.totalSpent + price;
    // }

    // this.setState({
    //   category: category,
    //   totalSpent: totalSpent
    // });
  },

  render: function() {
    return (
      <div>
        <FIT data-id="lns" data={this.props.data} store={this.state.store} onFilterChanged={this.onFilterChanged}/>
        <table>
          <DOTRow data={this.props.data} store={this.state.store} onFilterChanged={this.onFilterRowChanged} />
        </table>
      </div>
    );
  }
});

var DOTRow = React.createClass({
  getInitialState: function getInitialState() {
    return {
      labels: config.defaultLabels,
      activeFilter: null
    };
  },

  /**
    Changes the row color
  */
  handleClick: function(e) {
    var index;

    e.preventDefault();

    switch (e.button) {
      case 0: // left click

        if (e.target.parentElement.style.backgroundColor !== this.props.store[colorFilter].color) {
          e.target.parentElement.style.backgroundColor = this.props.store[colorFilter].color;

          index = +e.target.parentElement.getAttribute('data-index');

          this.props.onFilterChanged(colorFilter, +this.props.data[index].price);
        }

        break;

      case 2: // right click
        // console.log('here: ' + e.clientX + ' ' + e.clientY);
        break;

      default:
        // do nothing
        break;
    }

    // e.target.style.backgroundColor = 'red';
  },

  handleRightClick: function(e) {
    e.preventDefault();
    console.log('here: ' + e.clientX + ' ' + e.clientY);
  },

  render: function tableRowRender() {
    var commentNodes = this.props.data.map(function nodeMap(comment) {
      return (
        <tr style={{ backgroundColor: 'gray' }} key={comment.id} data-index={comment.id} onMouseUp={this.handleClick} >
          <td>{comment.purchase}</td>
          <td>{comment.price}</td>
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

var pewpew = {
  display: function(data) {
    ReactDOM.render(
      <DOT data={data} />,
      document.getElementById('ttr')
    );
  }
};

module.exports = pewpew;
