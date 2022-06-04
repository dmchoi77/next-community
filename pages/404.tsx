// pages/404.tsx
// build 시에 정적 생성되는 페이지
// UPDATE: 2022-05-31

import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Head from 'next/head';

const NotFoundPage: FunctionComponent = function () {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <NotFoundPageWrapper>
        <NotFoundDescription>
          <NotFoundText>
            404
            <br />
            찾을 수 없는 페이지입니다. <br />
          </NotFoundText>
        </NotFoundDescription>
        <Link href="/">
          <GoToMainButton>메인 페이지로</GoToMainButton>
        </Link>
      </NotFoundPageWrapper>
    </>
  );
};

export default NotFoundPage;

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NotFoundText = styled.div`
  font-size: 25px;
  font-weight: 800;
`;

const NotFoundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.3;
`;

const GoToMainButton = styled.a`
  margin-top: 20px;

  font-size: 20px;
  font-weight: 900;

  color: #7c27eb;

  cursor: pointer;
`;
