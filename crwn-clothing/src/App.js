
import { Routes, Route,} from 'react-router';
import Home from '../src/routes/home/home.component'
import SignUpForm from './components/sign-up-form/sign-up-form.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';


const Shop = () => {
  return <h1> I am the Shop Page</h1>
};

const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element= {<Home />} />
        <Route path='shop' element = {<Shop />} />
        <Route path='auth' element = {<Authentication/>} />
      </Route>
    </Routes>
  );
};

export default App;