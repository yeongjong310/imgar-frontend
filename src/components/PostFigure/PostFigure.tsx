import React, { ReactElement, useEffect, useRef, useState, Fragment } from 'react';

// styles
import {
  ContentContainer,
  ModalPicture,
  StyledFigure,
  StyledFigureCaption,
  StyledPicture,
  StyledVideo,
} from './PostFigure.styled';

// types
import { PostFigureProps } from './PostFigure.type';

// hooks
import useThrottle from '@/hooks/useThrottle';
import useModal from '@/hooks/useModal';

// components
import { MoreButton, Modal } from '@/components';

// etc
import { Link } from 'react-router-dom';

export default function PostFigure({
  type,
  imageId,
  orgImageWidth,
  orgImageHeight,
  description,
}: PostFigureProps): ReactElement {
  const imageRef = useRef<HTMLImageElement>(null);

  const [isZoomAble, setIsZoomAble] = useState(false);
  const { isOpen, onToggleModal } = useModal();
  const [isImageHover, setIsImageHover] = useState(false);

  const handleResizeObserver = useThrottle((entries: ResizeObserverEntry[]) => {
    const imgWidth = entries[0].borderBoxSize[0].inlineSize;
    const imgHeight = entries[0].borderBoxSize[0].blockSize;

    if (imgWidth < orgImageWidth || imgHeight < orgImageHeight) {
      setIsZoomAble(true);
    } else {
      setIsZoomAble(false);
    }
  }, 500);

  const onOpenModalOnlyEnter: React.KeyboardEventHandler<HTMLImageElement> = e => {
    if (e.key !== 'Enter') return;

    onToggleModal();
  };

  useEffect(() => {
    if (type !== 'video/mp4') {
      const resizeObserver = new ResizeObserver(handleResizeObserver);

      resizeObserver.observe(imageRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const handleMouseEnter = () => {
    setIsImageHover(true);
  };
  const handleMouseLeave = () => {
    setIsImageHover(false);
  };

  return (
    <>
      <StyledFigure key={imageId}>
        <ContentContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {type !== 'video/mp4' ? (
            <>
              <StyledPicture
                isZoomAble={isZoomAble}
                ref={imageRef}
                imageId={imageId}
                onClick={isZoomAble ? onToggleModal : null}
                onKeyUp={isZoomAble ? onOpenModalOnlyEnter : null}
                tabIndex={0}
              />
              <Modal isOpen={isOpen} handleHide={onToggleModal}>
                <ModalPicture imageId={imageId} />
              </Modal>
            </>
          ) : (
            <StyledVideo controls videoWidth={orgImageWidth} videoHeight={orgImageHeight} imageId={imageId} />
          )}
          {isImageHover && <MoreButton className="more-btn" />}
        </ContentContainer>
        <StyledFigureCaption key={imageId}>
          {description
            ?.split(/(https?:\/\/[\w\/\.\-_=\?\&#$]+)|(\n)|(#.+)/)
            .filter(str => str)
            .map((str, index) =>
              str.includes('http') ? (
                <a key={str + index} href={str} target="_blank" rel="noopener noreferrer">
                  {str}
                </a>
              ) : str.includes('#') ? (
                <Link key={str + index} to={`t/${str.replace('#', '')}`}>
                  {str}
                </Link>
              ) : (
                <Fragment key={str + index}>{str}</Fragment>
              ),
            )}
        </StyledFigureCaption>
      </StyledFigure>
    </>
  );
}
