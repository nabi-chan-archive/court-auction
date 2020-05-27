/* global kakao */

import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const KakaoMap = (props) => {
  const {
    addr = '',
  } = props;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&autoload=false&libraries=services`;

  useEffect(() => {
    document.head.appendChild(script);
  }, [script]);

  useEffect(() => {
    script.onload = () => {
      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        let coords = [37.506502, 127.053617];

        const container = document.getElementById('KakaoMap');
        const options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);

        geocoder.addressSearch(addr, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            const marker = new kakao.maps.Marker({
              map,
              position: coords,
            });

            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:460px;text-align:center;padding:6px 0;color:black">${addr}</div>`,
            });
            infowindow.open(map, marker);

            map.setCenter(coords);
          }
        });
      });
    };
  }, [addr, script.onload]);

  useEffect(() => {}, []);

  return (
    <MapContainer id="KakaoMap" />
  );
};

export default KakaoMap;
