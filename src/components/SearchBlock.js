import React from 'react';
import './SearchBlock.css';

class SearchBlock extends React.Component {  
    render() {
      return (
      <div id="search_block">
        <InputBox type='text' id={"departure"} label="From"/>
        <InputBox type='text' id={"destination"} label="To"/>
        <InputBox type='date' id={"start_date"} label="Start Date" />
        <InputBox type='date' id={"end_date"} label="End Date" />
        <div className="class_and_passenger">
            <div className="form-group-1"> 
              <label className="label">Numbers: </label> <br></br>
              <select className="passenger" multiple="" data-placeholder="Select a State" tabindex="-1" aria-hidden="true">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group-2"> 
              <label className="label">Class: </label> <br></br>
              <select className="class" multiple="" data-placeholder="Select a State" tabindex="-1" aria-hidden="true">
                <option>economy</option>
                <option>premier</option>
                <option>business</option>
              </select>
            </div>
        </div>
        <div className="button_group">
          <button>Search</button>
        </div>
      </div>
      );
    }
  }
  
class InputBox extends React.Component {
  render() {
    return (
    <div className="card" id={this.props.id}>
        <label className="input">
        <input className="input__field" type={this.props.type} placeholder=" " />
        <span className="input__label">{this.props.label}</span>
        </label>
    </div>
    );
  }
}

export default SearchBlock;