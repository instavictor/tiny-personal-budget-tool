(function pbtView(name, definition) {
  if (!this.pbtView) { this.pbtView = {}; }

  if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else if (typeof module !== 'undefined') module.exports = definition();
  else this.pbtView[name] = definition();
}('pbtView', function pbinit() {
  pbtView.displayTable = function displayTable(data) {
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
  };
}));
