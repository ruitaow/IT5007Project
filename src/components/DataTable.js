import React, { Component } from 'react';

class DataTable extends Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name} ({this.props.obj.iata_code})
        </td>
        <td>
          {this.props.obj.city}
        </td>
        <td>
          {this.props.obj.country}
        </td>
      </tr>
    );
  }
}

export default DataTable;