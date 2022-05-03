import React, {Component} from 'react';
import axios from 'axios';
import SearchBlock from './SearchBlock';
import './Table.css';

class Table extends Component{
  constructor(props) {
    super(props);
    this.state = { searchResults: []}
  }

  searchAllFlight() {
    const options = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/search-extended',
      params: {
        adults: '1',
        origin: 'MUC',
        destination: 'BER',
        departureDate: '2022-06-28',
        currency: 'EUR'
      },
      headers: {
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
        'X-RapidAPI-Key': 'a86b347460msh600e1c2d5ff4210p1937bajsn4943be0edd65'
      }
    };
    
    axios.request(options)
    .then(function (response) {
      this.setState({searchResults: response.data});
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  render() {
    return(
      <React.Fragment>
        <div style={{"text-align": "center"}}>
          <h2>EASY FLIGHT SEARCH</h2>
        </div>
        <SearchBlock />
      </React.Fragment>
    )
  }

}

export default Table;
