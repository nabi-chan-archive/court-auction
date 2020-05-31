import React from 'react';
import Container from '../module/Layout/Container';
import Content from '../module/Elements/Content';
import Title from '../module/Elements/Title';

const TimeOutPage = () => {
  console.log('1');
  return (
    <>
      <Container>
        <Title size={2}>
          이럴수가!
        </Title>

        <Content>
          현재 법원경매정보시스템 서버가 닫혀있습니다.
          <br />
          6시 이후로 다시 접속해주세요.
        </Content>
      </Container>
    </>
  );
};

export default TimeOutPage;
