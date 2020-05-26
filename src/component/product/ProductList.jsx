import React, { useEffect, useState } from 'react';
import Container from '../../module/Layout/Container';
import { parseHTML } from '../../lib/util';
import Columns from '../../module/Column/Columns';
import Column from '../../module/Column/Column';
import ProductItem from './ProductItem';

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);

  const { html, onPushTableLength } = props;

  const handlePushTableLength = (e = 0) => {
    onPushTableLength(e);
  };

  useEffect(() => {
    const table = [];
    const tableHTML = parseHTML(html)
      .getElementsByClassName('Ltbl_list')[0];

    if (!tableHTML) {
      setProductList([]);
      handlePushTableLength(-1);
      return;
    }

    if (tableHTML.rows[1].cells[0].innerText === '검색결과가 없습니다.') {
      setProductList([]);
      handlePushTableLength(0);
      return;
    }

    // get table
    for (let i = 1; i < tableHTML.rows.length; i += 1) {
      let rowTemp = '';

      // row에 데이터 추가하기
      for (let j = 0; j < tableHTML.rows[i].cells.length; j += 1) {
        rowTemp += tableHTML.rows[i].cells[j].innerHTML;
      }

      rowTemp = rowTemp
        .replace(/[\t\n]/g, '')
        .replace(/[ ]{2}/g, ' ');

      const isMulti = !!rowTemp.match(/<br>\(경합\)/g);
      const phone = new RegExp(/(0[0-9]{1,2})-([0-9]{3,4})-([0-9]{4})/g);
      const agency = new RegExp(/([가-힣]{2,4}(지방법원|지원))/g);
      const date = new RegExp(/(20[1-3][0-9])\.([01][0-9])\.([0-3][0-9])/g);
      const uniqueKey = new RegExp(/(20[0-3][0-9])([0-9]{10,13})/g);
      const detailFunc = new RegExp(/detailSrchForDongsan\('([가-힣]{2,4}(지방법원|지원))', '(20[0-3][0-9])([0-9]{10,13})', '[0-9]{1,3}'\)/g);

      const getNotice = (text) => (!text ? null : text[0]
        .replace(/showBigoInfo\('/g, '')
        .replace(/', event\)/g, ''));

      console.log(isMulti);

      const getIncidentNum = (text) => (isMulti
        ? text
          .match(/<a[a-zA-Z가-힣0-9="'#,;() ]*>([가-힣a-z0-9 <>()/]*)\(경합\)/g)[0]
          .replace(/<a[a-zA-Z가-힣0-9="'#,;() ]*>/g, '')
          .replace(/<br><b>/g, ' ')
          .replace(/<\/b><\/a>/g, '')
          .replace(/<br>\(경합\)/g, ' (경합)')
          .replace(/<br>/g, ' 및 ')
        : text
          .match(/([가-힣]{2,4}(지방법원|지원))(<br><b>)((20[1-3][0-9])[본징가][0-9]{1,5})/g)[0]
          .replace(/<br><b>/g, ' '));

      console.log(rowTemp);

      const row = {
        incidentNumber: getIncidentNum(rowTemp),
        link: {
          depart: rowTemp
            .match(detailFunc)[0]
            .match(agency)[0],
          uniqueKey: Number(rowTemp
            .match(detailFunc)[0]
            .match(uniqueKey)[0]),
          objectNum: Number(rowTemp
            .match(detailFunc)[0]
            .match(/'[0-9]{1,3}'/g)[0]
            .replace(/^'|'$/g, '')),
        },
        place: {
          address: rowTemp
            .match(/<a[a-zA-Z가-힣0-9="'#,;() ]*>[a-zA-Z가-힣0-9\-,() ]*<\/a>/g)[0]
            .replace(/<a[a-zA-Z가-힣0-9="'#,;() ]*>/g, '')
            .replace(/<\/a>/g, '')
            .replace(/,/g, ', '),
          type: rowTemp.match(/(공장|동식물사육재배장|소매점|도매점|가정집|사무실|서비스제공시설|보관시설)|(물류)/g)[0],
        },
        product: {
          info: rowTemp
            .match(/\[[a-zA-Z가-힣0-9 ,+\-=()]*]/g)[0]
            .replace(/^\[|]$/g, '')
            .replace(/[0-9,]*원/g, ''),
          saleDate: rowTemp.match(date)[0],
        },
        depart: {
          name: `${rowTemp.match(agency)[0]} ${rowTemp.match(/[0-9]부/g)[0]}`,
          phone: rowTemp
            .replace(/[)]/g, '-')
            .match(phone)[0],
        },
        cost: {
          appraisal: Number(rowTemp
            .match(/<div class="tbl_btm_(no|)line">[0-9,]*<\/div>/g)[0]
            .replace(/<div class="tbl_btm_(no|)line">/g, '')
            .replace(/<\/div>/g, '')
            .replace(/[,]/g, '')),
          lowestBid: Number(rowTemp
            .match(/<div class="tbl_btm_(no|)line">[0-9,]*<\/div>/g)[0]
            .replace(/<div class="tbl_btm_(no|)line">/g, '')
            .replace(/<\/div>/g, '')
            .replace(/[,]/g, '')),
        },
        notice: getNotice(rowTemp.match(/showBigoInfo\('[가-힣0-9 .:-]*', event\)/g)),
      };

      table.push(row);
    }

    setProductList(table);
    handlePushTableLength(table.length);
    // eslint-disable-next-line
  }, [html]);

  return (
    <Container fluid>
      <Column>
        <Columns multi>
          {productList.map((data, i) => <ProductItem data={data} key={Number(i)} />)}
        </Columns>
      </Column>
    </Container>
  );
};

export default ProductList;
