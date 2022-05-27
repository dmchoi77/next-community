// 포스팅 정보(작성자, 카테고리, 작성시간, 제목)
// UPDATE: 2022-05-27

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { PostInfoProps } from '../../types/type';

const PostInfo: FunctionComponent<PostInfoProps> = ({ writerNickName, categoryName, title, writtenAt }) => {

  function calculatingTime(time: string) {
    const currentTime = new Date().getTime();
    const writtenTime = new Date(time).getTime();

    // 경과한 시간을 ms로 계산
    const estimatedTimeMsec = currentTime - writtenTime
    // 경과한 시간을 m로 계산  
    const estimatedTimeMin = Math.floor(estimatedTimeMsec / 1000 / 60);
    // 경과한 시간을 h로 계산
    const estimatedTimeHour = Math.floor(estimatedTimeMsec / 1000 / 60 / 60);

    // 작성 시간 1분 미만일 경우 -> "방금 전" 출력
    if (estimatedTimeMin < 1) return "방금 전"

    // 1분 이상 1시간 미만 -> "m 분 전" 출력
    if (estimatedTimeMin >= 1 && estimatedTimeMin < 60) return `${estimatedTimeMin} 분 전`

    // 1시간 이상 24시간 미만 -> "h 시간 전" 출력
    if (estimatedTimeHour >= 1 && estimatedTimeHour < 24) return `${estimatedTimeHour} 시간 전`

    // 그 이상은 YY-MM-DD로 출력
    if (estimatedTimeHour >= 24) return time.slice(0, 10)
  }

  return (
    <>
      <PostWriter>{writerNickName}</PostWriter>
      <Category>{categoryName} ・ {calculatingTime(writtenAt)}</Category>
      <PostTitle>{title}</PostTitle>
    </>
  )
}
export default PostInfo


const PostWriter = styled.p`
  height: 12px;
  left: 0%;
  right: 76.56%;
  margin-bottom: 4px;
  top: calc(50% - 12px/2);

  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
`

const Category = styled.p`
  height: 12px;
  left: 18.33%;
  right: 58.61%;
  top: calc(50% - 12px/2 - 218.5px);

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #B4B4B4;
  margin: 0 0 19px;
`

const PostTitle = styled.div`
  height: 21px;
  left: 7.78%;
  right: 13.33%;
  top: calc(50% - 21px/2 - 183px);

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`