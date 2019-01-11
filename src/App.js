import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './shared/Header';
import RentalListing from './components/Rental/rental-listing/RentalListing';
import RentalDetail from './components/Rental/rental-detail/RentalDetail';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux'; //provider is a component and we need to wrap all our component inside provider
import { init } from './reducers';

const store = init();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />

            <div className="container">
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/rentals" />;
                }}
              />
              <Route exact path="/rentals" component={RentalListing} />
              <Route exact path="/rentals/:id" component={RentalDetail} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

//////////////////future reference////////////

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       rentallist: true
//     };
//   }

//   navigating = () => {
//     const rentallist = this.state.rentallist;
//     this.setState({
//       rentallist: !rentallist
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Header />
//         <button onClick={this.navigating}>Navigate</button>
//         <div className="container">
//           {this.state.rentallist ? <RentalList /> : <RentalDetail />}
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
