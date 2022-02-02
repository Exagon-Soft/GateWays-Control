import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
const App = lazy(() => import('./App'));
const renderLoader = () => <p>Loading</p>;


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={renderLoader()}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
