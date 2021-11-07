import React, { ReactElement, useEffect, useRef, useState, Profiler } from 'react';

// components
import {
  PostComments,
  PostContents,
  PostHeader,
  PostSideRelativeList,
  GalleryHeader,
  PostSideVoteBar,
  MasonryGalleryContainer,
  Button,
} from '@/components';
import MainContainer from '@/components/MainContainer/MainContainer';

// styles
import { ExplorePostsContainer, PostContainer } from './Gallery.styled';

// types
import { useLocationProps } from './Gallery.type';

//apis
import { usePostQuery } from '@/redux/api';
import { useTypedSelector } from '@/redux';

// etc
import { useLocation, useParams } from 'react-router-dom';
import { pxToRem } from '@/util/styleUtils';

export default function Gallery(): ReactElement {
  const postHeaderRef = useRef<HTMLDivElement>(null);

  const location = useLocation<useLocationProps>();
  const param = useParams<{ id: string }>();

  const [postHeaderTitlePosX, setPostHeaderTitlePosX] = useState(0);
  const [postHeaderTitleWidth, setPostHeaderTitleWidth] = useState(0);

  const [isOpenMasonry, setIsOpenMasonry] = useState(false);

  const masonryWidth = useTypedSelector(state => state.display.masonryGalleryWidth);

  const { data, isLoading } = usePostQuery({ postId: param.id, isAlbum: location.state?.isAlbum });

  const handleResizeObserver = () => {
    const { width, left } = postHeaderRef.current.getBoundingClientRect();
    setPostHeaderTitlePosX(left);
    setPostHeaderTitleWidth(width);
  };

  useEffect(() => {
    if (postHeaderRef.current) {
      const resizeObserver = new ResizeObserver(handleResizeObserver);

      resizeObserver.observe(postHeaderRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isLoading]);

  return (
    <>
      <Profiler
        id="gallery"
        onRender={(id, phase, actualTime, baseTime, startTime, commitTime, interactions) => {
          console.log('id', id);
          console.log('phase', phase);
          console.log('actualTime', actualTime);
          console.log('baseTime', baseTime);
          console.log('startTime', startTime);
          console.log('commitTime', commitTime);
          console.log('interactions', interactions);
        }}
      >
        {!isLoading && (
          <MainContainer
            sticky
            customHeaderHeight={65}
            customHeader={
              <GalleryHeader
                positionX={postHeaderTitlePosX}
                width={postHeaderTitleWidth}
                title={data.title}
                username={data.accountName}
              />
            }
          >
            <PostContainer>
              <PostHeader
                className="header"
                ref={postHeaderRef}
                username={data.accountName}
                title={data.title}
                metaInfos={{ time: data.dateTime, views: data.views, platform: 'Iphone' }}
              />
              <PostContents className="contents" images={data.images} tags={data.tags} />

              <PostSideVoteBar className="left-side" votePoints={data.points} commentCount={data.commentCount} />
              <PostComments className="comments" commentCount={data.commentCount} postId={param.id} />
              <div className="right-side">
                <PostSideRelativeList className="relative-list" mainPostId={param.id}></PostSideRelativeList>
              </div>
            </PostContainer>
            <ExplorePostsContainer $width={masonryWidth}>
              <h3>
                <Button
                  css={`
                    width: ${pxToRem(400)};
                  `}
                  className="explore-btn"
                  size="large"
                  backgroundColor="darkGray"
                  hoverBackgroundColor="secondaryColor"
                  text={isOpenMasonry ? 'UNEXPLORE POSTS' : 'EXPLORE POSTS'}
                  onClick={() => {
                    setIsOpenMasonry(!isOpenMasonry);
                  }}
                  aria-haspopup="true"
                  aria-owns="masonry"
                  aria-expanded={isOpenMasonry}
                />
              </h3>
              {isOpenMasonry && <MasonryGalleryContainer id="masonry" />}
            </ExplorePostsContainer>
          </MainContainer>
        )}
      </Profiler>
    </>
  );
}
