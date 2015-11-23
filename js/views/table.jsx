var React = require('react');
var ReactDOM = require('react-dom');
var LNS = require('js/views/LNS.jsx');

var TableFart = React.createClass({
  render: function tableFartRender() {
    return (
      // <div className="entries">
      <table>
        <TableRow data={this.props.data} />          
      </table>
    );
  }
});

var TableRow = React.createClass({
  handleClick: function handleClick(e) {
    e.preventDefault();
    switch (e.button) {
    case 0: // left click
      var element = LNS.getSelected();
      e.target.parentElement.style.backgroundColor = element.style.backgroundColor;
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

  handleRightClick: function handleRightClick(e) {
    e.preventDefault();
    console.log('here: ' + e.clientX + ' ' + e.clientY);
  },

  render: function tableRowRender() {
    var commentNodes = this.props.data.map(function nodeMap(comment) {
      return (
        <tr style={{backgroundColor:'gray'}} key={comment.id} onMouseUp={this.handleClick} >
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

var table = {
  display: function display(data) {
    ReactDOM.render(
      <TableFart data={data} />,
      document.getElementById('stuff')
    );
  }
};

module.exports = table;
