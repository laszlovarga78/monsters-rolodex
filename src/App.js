import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };

    // ez a megoldás normál metódus esetén, ha használni akarjuk a this-t
    // másik megoldás arrow function használata
    // this.handleChange = this.handleChange.bind(this);
  }

  // beépített életciklus metódus
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => this.setState({ monsters: users }));
  }

  // saját handleChange metódus, paramétere az event
  // a függvényen belül a this az nem a class-ra mutat, hanem a magára függvényre, aminek nincsen setState metódusa, emiatt hibát kapunk majd
  /*handleChange(e) {
    this.setState({ searchField: e.target.value });
  }*/

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }

  render() {

    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder="search monsters" handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
