/**
  Brain.jsx

  The brain of the views
*/

var React = require('react');
var ReactDOM = require('react-dom');
var FIT = require('js/views/FIT.jsx'); // FIT jsx view frag
var DOT = require('js/views/DOT.jsx'); // FIT jsx view frag

var config = require('js/config');

var Brain = React.createClass({
  getInitialState: function() {
    return {
      store: config.defaultLabels
    };
  },

  // propagates down to sub react components to let them know that the filter changed
  onFilterChanged: function(filter) {
    this.setState({ colorFilter: filter });
  },

  onFilterRowChanged: function(category, price) {
    var tempStore = this.state.store;
    var updatedPrice = price + Number(tempStore[category].spent);
    tempStore[category].spent = updatedPrice.toFixed(2);


    this.setState(tempStore);
  },

  render: function() {
    return (
      <div>
        <FIT data={this.props.data} store={this.state.store} onFilterChanged={this.onFilterChanged}/>
        <DOT data={this.props.data} activeFilter={this.state.colorFilter} store={this.state.store} onFilterChanged={this.onFilterRowChanged} />
      </div>
    );
  }
});

var pewpew = {
  display: function(data) {
    ReactDOM.render(
      <Brain data={data} />,
      document.getElementById('ttr')
    );
  }
};

module.exports = pewpew;
