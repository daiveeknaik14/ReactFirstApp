import './App.css';
import { Component } from 'react';

class App extends Component {

  shortList;

  constructor() {
    super();
    this.state = {
      users: [],
      searchString: '',
    }
    this.shortList = [];
  }

  componentDidMount() {
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

  changeUserList() {
    this.shortList = this.state.users.filter((user) => {
      return user.name.toLocaleLowerCase().includes(this.state.searchString);
    })
  }

  render() {
    return (
      <div className="App">
        <input
          className = 'search-box'
          type = 'search'
          placeholder = 'Search Users'
          onChange = {
            (event) => {
              const seachString = event.target.value.toLocaleLowerCase();
              this.setState(() => {
                return { searchString: seachString };
              });
              this.changeUserList();
            }
          }
        />
        {
          this.shortList.map((user) => {
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
