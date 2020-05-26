import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../module/Card/Card';
import CardContent from '../../module/Card/CardContent';
import Content from '../../module/Elements/Content';
import Title from '../../module/Elements/Title';
import Column from '../../module/Column/Column';
import { numberWithCommas, getRemaingTime } from '../../lib/util';

const ProductItem = (props) => {
  const {
    data,
  } = props;

  console.log(data);

  return (
    <Column width={4}>
      <Link to={`${data.link.depart}/${data.link.uniqueKey}/${data.link.objectNum}`}>
        <Card>
          <CardContent>
            <Content size="small">
              <Title size={5}>{data.product.info}</Title>
              <Title subtitle size={6}>{data.incidentNumber}</Title>

              <ul>
                <li>담당부서: {data.depart.name} (<a href={`tel:${data.depart.phone}`}>{data.depart.phone}</a>)</li>
                <li>최저매각가: {numberWithCommas(data.cost.lowestBid)}원</li>
                <li>남은시간: {getRemaingTime(data.product.saleDate)}</li>
              </ul>
            </Content>
          </CardContent>
        </Card>
      </Link>
    </Column>
  );
};

export default ProductItem;
