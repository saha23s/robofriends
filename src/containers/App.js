import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import {robots} from '../Robot';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>{
      return response.json();
    })
    .then(users =>{
      this.setState({robots: robots})
    })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value})
  }

  render(){
    const { robots, searchfield } = this.state;
    const filteredRobots = this.state.robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    if(robots.length === 0){
      return <h1> Loading </h1>
    }
    else {
      return (
          <div className='tc'>
            <h1 className='f2'> RoboFriends </h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
              <CardList robots={filteredRobots}/>
            </Scroll>
          </div>
      );
    }
  }
}

export default App;
