import React from 'react';
import Hero from '../../module/Hero/Hero';
import HeroBody from '../../module/Hero/HeroBody';
import Title from '../../module/Elements/Title';

const ProductHead = (props) => {
  const {
    searched, count, state, text,
  } = props;

  const localState = count === 0 && state === 'success'
    ? 'warning'
    : state;

  const countText = count > 0
    ? `${count}개의 결과`
    : '결과 없음';

  const subTitleText = state === 'success'
    ? countText
    : text;

  return (
    <Hero size="medium" color={localState}>
      <HeroBody>
        <Title size={2}>{searched}에 대한 검색 결과</Title>
        <Title subtitle size={5}>{subTitleText}</Title>
      </HeroBody>
    </Hero>
  );
};

export default ProductHead;
