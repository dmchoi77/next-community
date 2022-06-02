// 이미지 업로더 컴포넌트
// UPDATE: 2022-06-02

import React from 'react';
import styled from '@emotion/styled';

const UploadImages = ({
  images,
  onRemoveImage,
  onAddImages,
}: {
  images: [];
  onRemoveImage: any;
  onAddImages: any;
}) => {
  return (
    <>
      <ImagesWrapper>
        {images.map((image: string, index: number) => {
          return (
            <ImageWrapper key={index} id={String(index)}>
              {/* <DeleteButton id={index} onDeleteImage={onDeleteImage} /> */}
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
          이미지 첨부({images.length}/{6})
        </ImageCount>
      </AttachWrapper>
    </>
  );
};

export default UploadImages;

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
  gap: 16px;

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
