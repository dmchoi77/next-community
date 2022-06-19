import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

const KakaoLogin: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
    // console.log(Kakao.isInitialized());
  })

  const KakaoLogin = () => {
    Kakao.Auth.
      login({
        scope: 'profile_nickname,profile_image',
        success: function (authObj) {
          Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
              const kakao_account = res.kakao_account;
              console.log(kakao_account)
              onSuccess(authObj, kakao_account)
              // router.push('community/list')
              // router.push('kakao')
            }
          })
        }
      })
  }

  const onSuccess = async (res, kakao_account) => {
    console.log(res)
    console.log(kakao_account)
    await axios.post('http://localhost:3000/api/auth/loginKakao', {
      token_type: res.token_type,
      access_token: res.access_token,
      expires_in: res.expires_in,
      refresh_token: res.refresh_token,
      refresh_token_expires_in: res.refresh_token_expires_in,
      profile_nickname: kakao_account.profile.nickname,
      profile_image: kakao_account.profile.profile_image_url
    })
      .catch((err) => {
        console.log(err);
        alert('서버에서 오류발생');
      });

    router.push('/');
  }

  return (
    <Wrapper>
      <Button.Container>
        <Button.ButtonList>
          <Button.KakaoButton onClick={KakaoLogin}>
            <Button.ButtonText>카카오로 로그인하기</Button.ButtonText>
          </Button.KakaoButton>
        </Button.ButtonList>
      </Button.Container>
    </Wrapper>
  );
};
export default KakaoLogin;

const Wrapper = styled.div`
    margin: 0 auto;
`

const Button = {
  Container: styled.div`
    text-align: center;
  `,

  ButtonList: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  KakaoButton: styled.button`
        background-color: #fef01b;

        width: 330px;
        height: 40px;

        margin: 6px 0;

        border: none;
        border-radius: 6px;

        cursor: pointer;
    `,

  ButtonText: styled.p`
        margin: 0;
        padding: 0;
        
        font-size: 14px;
    `,
}
