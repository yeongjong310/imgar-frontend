import { CSSProperties } from 'react';

export interface StyledImageProps {
  /** 이미지의 width를 설정할 수 있습니다. */
  imageWidth?: string | number;
  /** 이미지의 해상도를 결정할 수 있습니다. */
  fidelity?: 'grand' | 'high';
  /** 이미지의 fit을 설정할 수 있습니다. */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** 이미지를 원형으로 설정할 수 있습니다. */
  isCircle?: boolean;
}

export interface PictureProps extends StyledImageProps {
  /** imageId는 image 리소스를 요청하기 위한 id(hash) 값 입니다. id와 매칭되는 image 데이터를 요청합니다. */
  imageId?: string;
  /** hash가 아닌 image가 위치하고 있는 url(src)을 주소를 통해 데이터를 요청합니다. */
  src?: string;
  /** 대체 텍스트를 설정할 수 있습니다. */
  alt: string;
  /** 이미지에 inline 스타일을 적용할 수 있습니다. */
  style?: CSSProperties;
}
