var cats = {
  display: function display(data) {
    var i = 0;
    var LNS = React.createClass({
      getInitialState: function() {
        // initializes labels so we can render later
        return {'labels': this.props.data};
      },

      showLNSMenu: function() {
        var labels = this.state.labels;
        
        labels.push('poop ' + ++i);

        this.setState({'labels': labels});
        console.log('got here');
      },
      render: function tableFartRender() {
        return (
          <div className="entries">
            <button id="label" onClick={this.showLNSMenu}>+</button>
            <LNSRow data={this.state.labels} />
          </div>
        );
      }
    });

    var LNSRow = React.createClass({
      render: function tableRowRender() {
        var commentNodes = this.props.data && this.props.data.map(function nodeMap(comment) {
          return (
            <div>
              {comment}
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
      <LNS data={data} />,
      document.getElementById('lns')
    );
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
