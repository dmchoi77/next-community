// 이미지 업로더 컴포넌트
// UPDATE: 2022-06-09

import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { RemoveButtonProps } from '../../types/type';

const UploadImages = ({
  images,
  onRemoveImage,
  onAddImages,
}: {
  images: [];
  onRemoveImage: (e: React.MouseEvent<HTMLImageElement>) => void
  onAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void

}) => {
  return (
    <>
      <ImagesWrapper>
        {images.map((image: string, index: number) => {
          return (
            <ImageWrapper key={index} id={String(index)}>
              <RemoveButton id={index} onRemoveImage={onRemoveImage} />
              <ImagePreview src={image} />
            </ImageWrapper>
          );
        })}
      </ImagesWrapper>
      <AttachWrapper>
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9729 10.124L17.0063 12.1V4.309H4.6705V11.151L7.8344 8.106C7.98181 7.964 8.27554 7.964 8.42295 8.106L12.4149 11.948L14.2912 10.124C14.4613 9.958 14.8028 9.958 14.9729 10.124ZM2.96879 2H18.708C19.1514 2 19.5101 2.331 19.5101 2.739V14.533V16V17.261C19.5101 17.669 19.1514 18 18.708 18H2.96879C2.52656 18 2.16779 17.669 2.16779 17.261V16V13.56V2.739C2.16779 2.331 2.52656 2 2.96879 2ZM15.1741 6.9999C15.1741 7.8289 14.4457 8.4999 13.5483 8.4999C12.6508 8.4999 11.9224 7.8289 11.9224 6.9999C11.9224 6.1709 12.6508 5.4999 13.5483 5.4999C14.4457 5.4999 15.1741 6.1709 15.1741 6.9999Z"
            fill="#2C7FFF"
          />
        </svg>
        <InputImage
          type="file"
          accept="image/*"
          id="input-image"
          multiple
          onChange={onAddImages}
        />
        <ImageCount>
          이미지 첨부({images.length}/{5})
        </ImageCount>
      </AttachWrapper>
    </>
  );
};

export default UploadImages;

const RemoveButton: FunctionComponent<RemoveButtonProps> = (
  { onRemoveImage, id }
) => {
  let imageId = String(id)
  return (
    <Wrapper id={imageId} onClick={onRemoveImage}>
      <svg id={imageId} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id={imageId} d="M12.6714 1.27812C12.2808 0.887599 11.6477 0.887598 11.2571 1.27812L7.00001 5.53526L2.74287 1.27812C2.35234 0.887598 1.71918 0.887599 1.32865 1.27812L1.27809 1.32868C0.887568 1.71921 0.887568 2.35237 1.27809 2.7429L5.53523 7.00004L1.27809 11.2572C0.887568 11.6477 0.887568 12.2809 1.27809 12.6714L1.32865 12.722C1.71918 13.1125 2.35234 13.1125 2.74287 12.722L7.00001 8.46481L11.2572 12.722C11.6477 13.1125 12.2808 13.1125 12.6714 12.722L12.7219 12.6714C13.1124 12.2809 13.1124 11.6477 12.7219 11.2572L8.46478 7.00004L12.7219 2.7429C13.1124 2.35237 13.1124 1.71921 12.7219 1.32868L12.6714 1.27812Z" fill="white" />
      </svg>
    </Wrapper>
  )
}

const AttachWrapper = styled.div`
  width: 123px;
  height: 32px;

  background: #dbe9ff;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputImage = styled.input`
  border: none;
  background-color: transparent;
  opacity: -1;

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageCount = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;

  color: #2c7fff;
`;

const ImagesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start

  padding-left: 20px;
  gap: 3px;

  display: flex;
  overflow-y: scroll;
    
  // 스크롤 숨김
  &::-webkit-scrollbar{
    display: none; 
  }

  padding: 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImagePreview = styled.img`
  width: 83px;
  height: 83px;
  border-radius: 4px;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 100;

  margin: 4px;

  cursor: pointer;

  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;

  font-size: 12px;
  color: #ffff;
`