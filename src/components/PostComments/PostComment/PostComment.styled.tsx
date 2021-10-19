import styled from 'styled-components';

// styles
import { isParentProps } from './PostComment.type';

// components
import { Button } from '@/components';

// utils
import { hexToRgb, pxToRem } from '@/util/styleUtils';

export const StyledButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  &:hover {
    background-color: ${({ theme }) => hexToRgb(theme.color.white, 0.12)};
  }
`;

export const Container = styled.li<isParentProps>`
  margin-top: ${({ theme }) => theme.spaceSize.s};
  position: relative;

  ${({ theme, isParent }) => `
    ${
      isParent
        ? `
            ::after {
              width: calc(100% - ${pxToRem(18)});
              margin: 0 auto;
              position: relative;
              bottom: ${pxToRem(-4)};
              content: '';
              height: ${pxToRem(1)};
              display: block;
              background-color: ${theme.color.darkGray};
            }
          `
        : `
            ::after {
              width: ${pxToRem(1)};
              position: absolute;
              content:'';
              bottom: 0;
              left: ${pxToRem(21)};
              height: calc(100% - ${pxToRem(40)});
              background-color: ${theme.color.darkGray};
            }
          `
    }
  `}
`;

export const CommentContainer = styled.div`
  padding: ${pxToRem(9)} ${pxToRem(9)} ${pxToRem(8)} ${pxToRem(9)};

  .more-btn {
    display: none;
    position: absolute;
    top: ${pxToRem(9)};
    right: ${pxToRem(9)};
  }
  .give-emerald {
    display: none;
  }

  &:hover,
  &:focus-within {
    border-radius: ${({ theme }) => theme.borderRadius.xxl};
    background-color: ${({ theme }) => theme.color.darkGray};
    .more-btn {
      display: block;
    }
    .give-emerald {
      display: inline-flex;
      background-color: ${({ theme }) => hexToRgb(theme.color.white, 0.12)};
      &:hover {
        background-color: ${({ theme }) => theme.color.secondaryColor};
      }
    }
  }
`;

export const VoteContainer = styled.div<isParentProps>`
  display: flex;
  margin-top: ${({ theme }) => theme.spaceSize.xs};
  padding-left: ${({ theme, isParent }) => !isParent && theme.spaceSize.xl};
  .up-btn,
  .down-btn {
    &:hover {
      background-color: ${({ theme }) => hexToRgb(theme.color.white, 0.12)};
    }
  }
`;

export const ChildrenCommentsContainer = styled.ul`
  padding-left: ${({ theme }) => theme.spaceSize.xl};
`;

export const Comment = styled.div<isParentProps>`
  padding-left: ${({ theme, isParent }) => !isParent && theme.spaceSize.xl};
  color: ${({ theme }) => theme.color.white};
`;
