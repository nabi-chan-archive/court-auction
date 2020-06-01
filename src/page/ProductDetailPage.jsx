import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { clearSpace, encodeText, parseHTML } from '../lib/util';
import DetailHead from '../component/detail/DetailHead';
// import DetailBody from '../component/detail/DetailBody';

const ProductDetailPage = () => {
  const { depart, caseNum, productNum } = useParams();
  const {
    REACT_APP_PRODUCT_DETAIL_ENDPOINT,
    REACT_APP_PRODUCT_DETAIL_DEPART,
    REACT_APP_PRODUCT_DETAIL_CASENUM,
    REACT_APP_PRODUCT_DETAIL_PRODUCTNUM,
  } = process.env;
  const [productDetailPageState, setProductDetailPageState] = useState({
    state: 'info',
    text: '요청 대기중',
    data: {},
  });

  const frmData = `${REACT_APP_PRODUCT_DETAIL_DEPART}=${encodeText(clearSpace(depart))}&${REACT_APP_PRODUCT_DETAIL_CASENUM}=${caseNum}&${REACT_APP_PRODUCT_DETAIL_PRODUCTNUM}=${productNum}&page=default40`;

  useEffect(() => {
    Axios.post(REACT_APP_PRODUCT_DETAIL_ENDPOINT, frmData, {})
      .then(({ data }) => {
        if (data.match(/"해당 IP는 비정상적인 접속으로 보안정책에 의하여 차단되었습니다."/g)) {
          console.error('해당 IP는 비정상적인 접속으로 서버 보안정책에 의하여 차단되었습니다.');
          setProductDetailPageState({
            state: 'danger',
            text: '오류 : 해당 IP가 차단되었습니다.',
            data: {},
          });
        } else if (data.match(/"현재 선택하신 물건은 공고중인 물건이 아닙니다."/g)) {
          console.warn('현재 선택하신 물건은 공고중인 물건이 아닙니다.');
          setProductDetailPageState({
            state: 'warning',
            text: '현재 선택하신 물건은 공고중인 물건이 아닙니다.',
            data: {},
          });
        } else if (data.match(/사건기본내역/g)) {
          console.log('요청 성공 😭');

          const detailHTML = parseHTML(data)
            .getElementsByClassName('table_contents')[0];

          if (!detailHTML) {
            setProductDetailPageState({
              state: 'danger',
              text: '오류 : 결과 테이블을 찾을 수 없습니다.',
              data: {},
            });
            return;
          }

          const detailProductList = {
            case: detailHTML.getElementsByClassName('Ltbl_dt')[0],
            info: detailHTML.getElementsByClassName('table_contents')[0],
            product: detailHTML.getElementsByClassName('Ltbl_list')[0],
          };

          setProductDetailPageState({
            state: 'success',
            text: '요청 성공',
            data: detailProductList,
          });
        } else {
          console.error('알 수 없는 오류');
          setProductDetailPageState({
            state: 'danger',
            text: '오류 : 알 수 없는 오류',
            data: {},
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, [depart, caseNum, productNum]);

  return (
    <>
      <DetailHead
        state={productDetailPageState.state}
        caseTable={productDetailPageState.data.case}
        infoHTML={productDetailPageState.data.info}
      />
      {/* <DetailBody */}
      {/*  html={productDetailPageState.data.product} */}
      {/* /> */}
    </>
  );
};

export default ProductDetailPage;
