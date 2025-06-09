import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 0 24px 24px 24px;
  display: flex;
  flex-direction: column;
`;
export const Divider = styled.div`
  width: calc(100% + 48px);
  height: 1px;
  background: #F0F0F0;
  margin: 0 -24px;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding-top: 24px;
`;
export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #FFA94D;
  color: #fff;
  font-weight: bold;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  min-height: 40px;
`;
export const Name = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 12px;
`;
export const Info = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-right: 16px;
`;
export const Description = styled.div`
  margin: 12px 0;
  color: #444;
`;
export const Price = styled.div`
  font-weight: bold;
  color: #6c6c6c;
  font-size: 0.9rem;
  span {
    font-weight: normal;
  }
`;
export const Button = styled.button<{primary?: boolean}>`
  background: ${({primary}) => (primary ? '#ff6600' : '#eee')};
  color: ${({primary}) => (primary ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  margin-right: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
export const Icon = styled.span`
  display: inline-flex;
  vertical-align: middle;
  margin-right: 4px;
  svg {
    display: block;
  }
`; 