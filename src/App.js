import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {createStore} from 'redux'
import rootReducer from './redux/reducers'
import {Provider} from 'react-redux'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
