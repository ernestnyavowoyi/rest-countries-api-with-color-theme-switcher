import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Root from './components/Root';
import Countries from './components/Countries';


// create the Routes from the Route elements :)

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>
    <Route index element= { <Countries/> } />
    <Route path="about" element={ <p>This project was made with react and built by Hon. Nyavowoyi Ernest (Captain James).</p>} />
  </Route>
));




function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
