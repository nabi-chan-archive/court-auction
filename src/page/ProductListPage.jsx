import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { clearSpace, encodeText } from '../lib/util';
import ProductHead from '../component/product/ProductHead';
import ProductList from '../component/product/ProductList';

const ProductListPage = () => {
  const { searchedText } = useParams();
  const [tableLength, setTableLength] = useState(-777);
  const [productListPageState, setProductListPageState] = useState({
    state: 'info',
    text: '요청 대기중',
    data: [],
    isOverflow: false,
  });

  console.log(productListPageState);

  const pushTableLength = (e) => {
    setTableLength(e);

    setProductListPageState({
      ...productListPageState,
      isOverflow: e > 40,
    });
  };

  const frmData = `_NEXT_SRNID=${process.env.REACT_APP_SRN_ID}&termStartDt=${moment().format('YYYY.MM.DD')}&termEndDt=${moment().add(2, 'months').format('YYYY.MM.DD')}&maeMokmulNm=${encodeText(clearSpace(searchedText))}&page=default40&targetRow=${1}`;

  useEffect(() => {
    Axios.post(process.env.REACT_APP_PRODUCT_LIST_ENDPOINT, frmData, {})
      .then(({ data }) => {
        if (data.match(/"해당 IP는 비정상적인 접속으로 보안정책에 의하여 차단되었습니다."/g)) {
          console.error('해당 IP는 비정상적인 접속으로 서버 보안정책에 의하여 차단되었습니다.');
          setProductListPageState({
            ...productListPageState,
            state: 'danger',
            text: '오류 : 해당 IP가 차단되었습니다.',
          });
        } else if (data.match(/물건상세검색 결과/g)) {
          console.log('요청 성공 😭');
          setProductListPageState({
            ...productListPageState,
            state: 'success',
            text: '요청 성공',
            data: [data],
          });
        } else {
          console.error('알 수 없는 오류');
          setProductListPageState({
            ...productListPageState,
            state: 'danger',
            text: '오류 : 알 수 없는 오류가 발생했습니다.',
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, [frmData]);

  return (
    <>
      <ProductHead
        searched={searchedText}
        count={tableLength}
        state={productListPageState.state}
        text={productListPageState.text}
      />
      <ProductList
        htmls={productListPageState.data}
        onPushTableLength={pushTableLength}
      />
    </>
  );
};

export default ProductListPage;
