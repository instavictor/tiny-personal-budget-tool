var table = {
  displayTable: function displayTable(data) {
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
      render: function tableRowRender() {
        var commentNodes = this.props.data.map(function nodeMap(comment) {
          return (
            <div>
              {comment.purchase},
              {comment.price}
            </div>
          );
        });
        return (
          <div>
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
}

exports.pbtView = table;
