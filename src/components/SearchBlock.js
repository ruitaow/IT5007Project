import React from 'react';
import axios from "axios";
import DataTable from './DataTable';
import './SearchBlock.css';


class FlightTable extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.obj.pricing_options[0].agents[0].name}
        </td>
        <td>
          {this.props.obj.pricing_options[0].price.amount}
        </td>
        <td>
          {this.props.obj.legs[0].segments[0].marketingCarrier.alternate_di}
        </td>
        <td>
          {this.props.obj.legs[0].segments[0].flightNubmer}
        </td>
      </tr>
    );
  }
}

class SearchBlock extends React.Component {  
  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
      originAirports: [],
      airportCodes: [],
      destinationAirports: [],
      bestFlights: [],
      allFlights: [],
    };
    this.getAirport = this.getAirport.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchAllFlight = this.searchAllFlight.bind(this);
  }

  async setOrigin(newOrigin) {
    this.setState({origin: newOrigin})
  }

  async setDestination(newDestination) {
    this.setState({destination: newDestination})
  }

  handleSubmit() {
    console.log(this.state.origin + ' | ' + this.state.destination);
    this.getAirport(this.state.origin, this.state.destination);
    console.log(this.state.originAirports[0]);
    var props = {
      adults: 1,
      origin: this.state.originAirports[0]['iata_code'],
      destination: 'SIN',
      departureDate: '2022-06-28',
      currency: 'SGD',
      cabinClass: '',  //optional
    }
    
    this.searchAllFlight(props);

    // let l = this.state.originAirports.length;
    // for (var i = 0; i<l; i++) {
    //   for (var key in this.state.originAirports){
    //     console.log("key is: " + key + ", value is: " + this.state.originAirports[i][key]);
    //     alert("key is: " + key + ", value is: " + this.state.originAirports[i][key]);
    //   }
    // }
    // this.state.originAirports.forEach((repo) => {
    //   Object.entries(repo).forEach(([key, value]) => {
    //     console.log(`${key}: ${value}`);
    //   });
    // });
  }

  getAirport(origin_key, des_key) {
    const options_1 = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/autocomplete',
      params: {query: origin_key},
      headers: {
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
        'X-RapidAPI-Key': 'a86b347460msh600e1c2d5ff4210p1937bajsn4943be0edd65'
      }
    };

    const options_2 = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/autocomplete',
      params: {query: des_key},
      headers: {
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
        'X-RapidAPI-Key': 'a86b347460msh600e1c2d5ff4210p1937bajsn4943be0edd65'
      }
    };

    axios.request(options_1).then((response) => {
      this.setState({originAirports: response.data});
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    axios.request(options_2).then((response) => {
      this.setState({destinationAirports: response.data});
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  searchBestFlight(props){
    const options = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/search',
      params: {
        adults: props.adults,
        origin: props.origin,
        destination: props.destination,
        departureDate: props.departureDate,
        currency: props.currency,
      },
      headers: {
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
        'X-RapidAPI-Key': 'a86b347460msh600e1c2d5ff4210p1937bajsn4943be0edd65'
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      this.setState({bestFlights: response.data})
    }).catch(function (error) {
      console.error(error);
    });
  }

  searchAllFlight(props){
    const options = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/search-extended',
      params: {
        adults: props.adults,
        origin: props.origin,
        destination: props.destination,
        departureDate: props.departureDate,
        currency: props.currency,
      },
      headers: {
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
        'X-RapidAPI-Key': 'a86b347460msh600e1c2d5ff4210p1937bajsn4943be0edd65'
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      this.setState({allFlights: response.data})
    }).catch(function (error) {
      console.error(error);
    });
  }

  originTable() {
    return this.state.originAirports.map((data, i) => {
        return <DataTable obj={data} key={i} />;
    });
  }
  destinationTable() {
    return this.state.destinationAirports.map((data, i) => {
        return <DataTable obj={data} key={i} />;
    });
  }

  flightTable () {
    return this.state.allFlights ? 
      this.state.allFlights.itineraries.results.map((data, i) => {return <FlightTable obj={data} key={i}/>;}) : <></>;
  }

  render() {
    return (
      <React.Fragment>
        <div id="table_session">
        <div id="search_block">
          <div className="card">
            <label className="input">
            <input className="input__field" type="text" placeholder=" " onChange={(e)=>{this.setOrigin(e.target.value)}}/>
            <span className="input__label">From</span>
            </label>
          </div>
          <div className="card">
            <label className="input">
            <input className="input__field" type="text" placeholder=" " onChange={(e)=>{this.setDestination(e.target.value)}} />
            <span className="input__label">To</span>
            </label>
          </div>
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
                <option>6</option>
              </select>
            </div>
            <div className="form-group-2"> 
              <label className="label">Class: </label> <br></br>
              <select className="class" multiple="" data-placeholder="Select a State" tabindex="-1" aria-hidden="true">
                <option>-</option>
                <option>Economy</option>
                <option>Premier</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>
          <div className="button_group">
            <button onClick={this.handleSubmit}>Search</button>
          </div>
        </div>
        <h4>Your departure airport options:</h4>
        <div className='tbl-header'>
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>AIRPORT</th>
                <th>CITY</th>
                <th>COUNTRY</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              {this.originTable()}
            </tbody>
          </table>
        </div>

        <h4>Your destionation airport options:</h4>
        <div className='tbl-header'>
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>AIRPORT</th>
                <th>CITY</th>
                <th>COUNTRY</th>
              </tr>
            </thead>
          </table>
        </div>

        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              {this.destinationTable()}
            </tbody>
          </table>
        </div>

        </div>
      </React.Fragment>
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