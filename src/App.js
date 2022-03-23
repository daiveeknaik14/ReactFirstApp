import './App.css';
import { Component } from 'react';

class App extends Component {

  shortList;

  constructor() {
    console.log("Constructor")
    super();
    this.state = {
      users: [],
      searchString: '',
    }
    this.shortList = [];
  }

  componentDidMount() {
    console.log("Mounting")
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((userList) => userList.json())
      .then((userList) => {
        this.shortList = userList;
        this.setState(
          () => {
            return {users: userList};
          },
        )
      });
  }

  changeUserList = (event) => {
    console.log("Change User List")
    const searchString = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchString: searchString };
    });
  }

  render() {
    console.log("Render")

    const { users, searchString } = this.state;
    const { changeUserList } = this;

    const shortList = users.filter((user) => {
      return user.name.toLocaleLowerCase().includes(searchString);
    })

    return (
      <div className="App">
        <input
          className = 'search-box'
          type = 'search'
          placeholder = 'Search Users'
          onChange = { changeUserList }
        />
        {
          shortList.map((user) => {
            return (
              <div key={user.id}> 
                <h1>{user.name}</h1>
              </div>
            );
          })  
        }
      </div>
    )
  }
}

export default App;
