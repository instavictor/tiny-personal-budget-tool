var table = {
  display: function display(data) {
    var TableFart = React.createClass({
      render: function tableFartRender() {
        return (
          <div className="entries">
            <TableRow data={this.props.data} />            
          </div>
        );
      }
    });

    var TableRow = React.createClass({
      componentDidMount: function mount() {

      },

      componentWillUnmount: function unmount() {

      },

      handleClick: function handleClick(e) {
        e.preventDefault();
        switch (e.button) {
        case 0: // left click
          var color = e.target.style.backgroundColor;
          if (color === 'red') {
            e.target.style.backgroundColor = 'green';
          } else {
            e.target.style.backgroundColor = 'red';
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

      handleRightClick: function handleRightClick(e) {
        e.preventDefault();
        console.log('here: ' + e.clientX + ' ' + e.clientY);
      },

      render: function tableRowRender() {
        var commentNodes = this.props.data.map(function nodeMap(comment) {
          return (
            <div key={comment.id}>
              {comment.purchase},
              {comment.price}
            </div>
          );
        });
        return (
          <div onMouseUp={this.handleClick} onContextMenu={this.handleRightClick}>
            {commentNodes}
          </div>
        );
      }
    });

    React.render(
      <TableFart data={data} />,
      document.getElementById('stuff')
    );
  }
};

module.exports = table;
