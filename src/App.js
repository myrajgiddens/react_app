import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "./button";

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Users from "./users";
import About from "./about";
import ChildComponent from "./child-component";
import Functional from "./functional";
import Login from "./login";
import Dashboard from "./dashoard";
import SignUp from "./sign-up";

// const Home = () => <div>Home</div>;
// const About = () => <div>About</div>;
// const Users = ({ match }) => <div>{match.url}</div>;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [5, 6, 7, 8],
      name: 'John',
      myText: '',
      count: 0,
      textColor: 'white'
    };

  }


  // componentWillUnmount () {
  //   executed just before the component unmounts
  //
  // }

  componentDidMount () {
    console.log(this.props);
    // setInterval(() => {
    //   let currentCount = this.state.count;
    //   currentCount = currentCount + 1;
    //   this.setState({currentCount: currentCount});
    // })
    setTimeout(() => {
      // this.state.name = 'Jane'
      this.setState({name: 'Jane'});
      // let currentItems = this.state.items;
      // currentItems.push(9);
      // currentItems.push(10);
      // currentItems.push(11);
      // this.setState({items: currentItems});
    }, 5000)
  };

  fetchQuestions = async () => {
    console.log('fetching!');
    let results = await fetch('http://localhost:3006/questions');
    let questions = await results.json();
    console.log(questions);
    this.setState({questions: questions});
  }

  fetchAquestion = async (questionId) => {
    console.log(questionId);
    let result = await fetch(`http://localhost:3006/questions/${questionId}`);
    let question = await result.json();
    console.log(question);
  }

  updateFirstName = (event) => {
    console.log(event.currentTarget.value);
    this.setState({firstName: event.currentTarget.value});
  }

  updateQuestionHere = (event) => {
    console.log(event.currentTarget.value);
    this.setState({questionHere: event.currentTarget.value});
  }

  createquestion = async () => {
    let body = {firstName: this.state.firstName, questionHere: this.state.questionHere};
    let result = await fetch(`http://localhost:3006/questions`, {method: 'POST', body: JSON.stringify(body), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }});
    let newquestion = await result.json();
    console.log(newquestion);
  }

  deleteAquestion = async (questionId) => {
    console.log(questionId);
    let result = await fetch(`http://localhost:3006/questions/${questionId}`, {method: 'DELETE'});
    let question = await result.json();
    console.log(question);
  }

  showFirstName = (event) => {
    console.log(event.currentTarget.value);
    this.setState({myText: event.currentTarget.value});
  }

  showAnAlert = () => {
    console.log('yay')
    let currentCount = this.state.count;
    currentCount = currentCount + 1;
    if(currentCount == 10) {
      currentCount = 0;
      this.setState({textColor: 'blue'})
    }
    this.setState({count: currentCount});
  }

  showName = (number) => {

    console.log('the data from the child is', number);

  };

  render() {
    return (
        <div className="App">
          <header className="App-header">
           




            <BrowserRouter>
              <div>
               
                <hr />
               
                <Route path="/about" component={About} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/dashboard" component={Dashboard} />
              </div>
            </BrowserRouter>







        

          

          

           

            <input onChange={this.updateFirstName}/>
            <input onChange={this.updateQuestionHere}/>


        
            <button onClick={this.createquestion}>Create a question!</button>

            <br/>
            <br/>




            {this.state.questions && this.state.questions.map((question) => {
              return <div key={question.id}>
                <p>{question.firstName} {question.questionHere}</p>
                  <button onClick={() => this.fetchAquestion(question.id)}>Fetch a question</button>&nbsp;
                  <button onClick={() => this.deleteAquestion(question.id)}>Delete question</button>
              </div>
            })}

            <button onClick={this.fetchQuestions}>Show all the questions</button>


           
          </header>
        </div>
    );
  }
}




export default App









// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
