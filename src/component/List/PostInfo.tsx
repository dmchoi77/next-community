// 포스팅 정보(작성자, 카테고리, 작성시간, 제목)
// UPDATE: 2022-06-05

import React, {
  FunctionComponent,
  useRef,
  useState,
  useEffect
} from 'react';
import styled from '@emotion/styled';
import { PostInfoProps } from '../../types/type';
import axios from 'axios';
import { useRouter } from 'next/router';

const PostInfo: FunctionComponent<PostInfoProps> = ({
  writerProfileUrl,
  writerNickName,
  categoryName,
  writtenAt,
  id,
}) => {
  const [isClick, setIsClick] = useState(false);
  const menuEl = useRef() as React.MutableRefObject<HTMLDivElement>;
  const router = useRouter();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  // 메뉴 외부 영역 클릭시 메뉴 닫힘
  const handleClickOutside = (e) => {
    if (isClick && !menuEl.current.contains(e.target)) setIsClick(false);
  };

  const calculatingTime = (time: string) => {
    const currentTime = new Date().getTime();
    const writtenTime = new Date(time).getTime();

    // 경과한 시간을 ms로 계산
    const estimatedTimeMsec = currentTime - writtenTime;
    // 경과한 시간을 m로 계산
    const estimatedTimeMin = Math.floor(estimatedTimeMsec / 1000 / 60);
    // 경과한 시간을 h로 계산
    const estimatedTimeHour = Math.floor(estimatedTimeMsec / 1000 / 60 / 60);

    // 작성 시간 1분 미만일 경우 -> "방금 전" 출력
    if (estimatedTimeMin < 1) return '방금 전';

    // 1분 이상 1시간 미만 -> "m 분 전" 출력
    if (estimatedTimeMin >= 1 && estimatedTimeMin < 60)
      return `${estimatedTimeMin} 분 전`;

    // 1시간 이상 24시간 미만 -> "h 시간 전" 출력
    if (estimatedTimeHour >= 1 && estimatedTimeHour < 24)
      return `${estimatedTimeHour} 시간 전`;

    // 그 이상은 YY-MM-DD로 출력
    if (estimatedTimeHour >= 24) return time.slice(0, 10);
  }

  const handleRemovePost = (e: any) => {
    axios.delete(`http://localhost:4000/posts/${id}`);

    alert('삭제되었습니다.');
    router.push('/community/list');
  };

  return (
    <>
      <PostInfoContainer>
        <ProfileImage src={writerProfileUrl} />
        <PostInfoWrapper>
          <PostWriter>{writerNickName}</PostWriter>
          <Category>
            {categoryName} ・ {calculatingTime(writtenAt)}
          </Category>
        </PostInfoWrapper>
        <MenuButtonWrapper>
          {id &&
            <MenuButton
              src="/images/menu-dots-vertical.png"
              onClick={() => setIsClick(true)}
            />
          }
          {isClick && (
            <OpenMenu ref={menuEl} onClick={handleRemovePost}>
              삭제하기
            </OpenMenu>
          )}
        </MenuButtonWrapper>
      </PostInfoContainer>
    </>
  );
};
export default PostInfo;

const OpenMenu = styled.p`
  position: absolute;
  width: 59px;
  top: -14px;
  left: -30px;

  background-color: #cecece;
  color: black;

  font-size: 10px;

  border-radius: 3px;

  text-align: center;

  padding: 5px;
`;

const PostInfoContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const PostWriter = styled.p`
  height: 12px;
  left: 0%;
  right: 76.56%;
  margin-bottom: 4px;
  top: calc(50% - 12px / 2);

  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
`;

const Category = styled.p`
  height: 12px;
  left: 18.33%;
  right: 58.61%;
  top: calc(50% - 12px / 2 - 218.5px);

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #b4b4b4;
  margin: 0 0 19px;
`;

const MenuButtonWrapper = styled.div`
  position: relative;

  height: 0px;
`;
const MenuButton = styled.img`
  width: 28px;
  height: 28px;
  background-color: transparent;

  filter: invert(50%);
  transform: rotate(90deg);
`;
