import React from 'react';
import moment from 'moment';
import { Switch, Route } from 'react-router-dom';
import codeSplit from './lib/codeSplit';
import ProductListPage from './page/ProductListPage.jsx';
import ProductDetailPage from './page/ProductDetailPage';

const App = () => {
  const isTimeOut = moment().format('hh') <= 6
      && moment().format('hh') >= 1;
  const TimeOutPage = codeSplit(() => import('./page/TimeOutPage'));

  if (isTimeOut) {
    return <TimeOutPage />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          Hello React!
        </Route>

        <Route exact path="/:depart([가-힣]{1,8}[지방법원])/:caseNum(20[0-3][0-9][0-9]{10})/:productNum([0-9])" component={ProductDetailPage} />

        <Route path="/:searchedText([가-힣A-Z0-9 ]*[^지방법원])" component={ProductListPage} />

        <Route path="*">
          404 Not Found
        </Route>
      </Switch>
    </>
  );
};
export default App;
