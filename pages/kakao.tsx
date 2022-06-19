import * as React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import styled from '@emotion/styled';

const Kakao: NextPage = () => {

  const KakaoLogout = () => {
    const kakao = (window as any).Kakao;
    console.log(kakao.Auth); // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)

    if (!kakao.Auth.getAccessToken()) {
      console.log('Not logged in.');
      return;
    }
    kakao.Auth.logout(function () {
      // console.log(kakao.Auth.getAccessToken());
      Router.push('/')
    });

    // // 카카오 로그인 링크 해제
    // kakao.API.request({
    //   url: '/v1/user/unlink',
    //   success: (res: any) => {
    //     // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
    //     console.log(res);
    //     Router.push('/');
    //   },
    //   fail: (error: any) => {
    //     console.log(error);
    //   }
    // })
  }

  return (
    <Wrapper>
      로그인 성공
      <Button onClick={KakaoLogout}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </Wrapper>
  )
}
export default Kakao;

const Wrapper = styled.div`
    max-width: 720px;

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    background-color: #fef01b;

    width: 360px;
    height: 40px;

    margin: 6px 0;

    border: none;
    border-radius: 6px;

    cursor: pointer;
`;

const ButtonText = styled.p`
    margin: 0;
    padding: 0;

    font-size: 14px;
`;