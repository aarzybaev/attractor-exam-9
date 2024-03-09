import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';

const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/" element={(<>Home</>)} />
        <Route path="*" element={<h4>Oops! Page not found...</h4>}/>
      </Routes>
    </Layout>
  </>
);

export default App;
