export interface ModalProps {
  /** isOpen prop은 useModal에서 반환하는 값을 사용합니다. 모달의 숨김/보기를 결정하는 값 입니다.*/
  isOpen: boolean;
  /** 모달을 숨기기 위한 핸들러를 입력해야 합니다. */
  handleHide: () => void;
  /** 모달 컨텐츠입니다. */
  children: React.ReactNode;
}
