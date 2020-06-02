import React, { useEffect, useState } from 'react';
import Title from '../../module/Elements/Title';
import Hero from '../../module/Hero/Hero';
import HeroBody from '../../module/Hero/HeroBody';
import Content from '../../module/Elements/Content';
import Columns from '../../module/Column/Columns';
import Column from '../../module/Column/Column';
import {
  clearSpace, getRemaingTime, numberWithCommas, trim,
} from '../../lib/util';

const DetailHead = (props) => {
  const inital = {
    incident: {
      number: '',
      competition: '',
      type: '',
      saleDate: '',
    },
    depart: {
      name: '',
      manager: '',
      phone: '',
    },
    cost: {
      appraisal: '',
      lowestBid: '',
    },
    place: {
      address: '',
      type: '',
    },
    notice: '',
  };

  const [detailHeadState, setDetailHeadState] = useState(inital);
  const { caseTable, infoHTML, state } = props;
  const isLoading = detailHeadState === inital;

  useEffect(() => {
    if (!caseTable || !infoHTML) {
      return;
    }

    const infoTable = infoHTML.getElementsByClassName('Ltbl_dt')[0];

    const isCompetition = caseTable.innerText.match(/경합사건/g);
    const phone = new RegExp(/(0[0-9]{1,2})-([0-9]{3,4})-([0-9]{4})/g);

    const detail = {
      incident: {
        number: caseTable.rows[0].cells[1].innerText,
        competition: isCompetition
          ? clearSpace(caseTable.rows[1].cells[1].innerText)
            .replace(/[,]/g, '$& ')
            .replace(/[(]/g, ' $&')
          : '',
        type: infoTable.rows[2].cells[1].innerText,
        saleDate: trim(infoTable.rows[1].cells[1].innerText).replace(/[가-힣]/g, ''),
      },
      depart: {
        name: clearSpace(isCompetition
          ? caseTable.rows[2].cells[1].innerText
          : caseTable.rows[1].cells[1].innerText),
        manager: caseTable.rows[0].cells[3].innerText,
        phone: infoHTML.innerHTML.match(phone)[0],
      },
      cost: {
        appraisal: Number(trim(infoTable.rows[3].cells[1].innerText)
          .replace(/[원|,]/g, '')),
        lowestBid: Number(trim(infoTable.rows[3].cells[3].innerText)
          .replace(/[원|,]/g, '')),
      },
      place: {
        address: infoTable.rows[1].cells[3].innerText
          .replace(/[\t\n]/g, '')
          .replace(/ \)/g, ')')
          .replace(/[^-][0-9]{2,3}/g, ' $&')
          .replace(/[ ]{2}/g, '')
          .replace(/ ,/g, ', '),
        type: trim(infoTable.rows[2].cells[3].innerText),
      },
      notice: trim(infoTable.rows[4].cells[1].innerText),
    };

    setDetailHeadState(detail);
  }, [caseTable, infoHTML]);

  return (
    <Hero color={state}>
      <HeroBody>
        <Content size="small">
          <Title size={3}>
            {isLoading ? '정보 불러오는중...' : detailHeadState.incident.number}
          </Title>
          {detailHeadState.incident.competition && (
          <Title subtitle size={6}>
            경합사건 : {detailHeadState.incident.competition}
          </Title>
          )}
        </Content>

        <Content>
          {!isLoading && (
          <Columns gap={7}>
            <Column>
              <ul>
                <li>
                  담당 : {detailHeadState.depart.name} {detailHeadState.depart.manager} (<a
                    href={`tel:${detailHeadState.depart.phone}`}
                  >{detailHeadState.depart.phone}
                  </a>)
                </li>
                <li>매각날짜 : {detailHeadState.incident.saleDate} ({getRemaingTime(detailHeadState.incident.saleDate)})
                </li>
                <li>감정 평가액 : {numberWithCommas(detailHeadState.cost.appraisal)}원</li>
                <li>최저매각가 : {numberWithCommas(detailHeadState.cost.lowestBid)}원</li>
                <li>공고유형 : {detailHeadState.incident.type}</li>
                {detailHeadState.notice && <li>공지사항 : {detailHeadState.notice}</li>}
              </ul>
            </Column>
            <Column>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias asperiores atque dolorem, ea enim eos exercitationem explicabo facere fuga fugiat libero magni, necessitatibus non, odit placeat quae quam quod saepe sequi sit soluta tenetur veniam vero vitae. Accusamus ad aperiam asperiores consectetur corporis cumque deserunt dignissimos doloremque doloribus ducimus, eaque eos facilis hic id impedit ipsum iste labore laboriosam maxime molestias nam natus nihil nisi odio odit porro quas quo quod ratione reprehenderit sint ullam vel voluptatem? Consectetur dolorum earum eligendi est facere fugiat labore magni necessitatibus nihil, obcaecati, quis veniam, voluptas voluptatum. Consequatur deleniti iure minima molestiae totam!
              </div>
              {detailHeadState.place.address}
            </Column>
          </Columns>
          )}
        </Content>
      </HeroBody>
    </Hero>
  );
};

export default DetailHead;
