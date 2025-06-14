import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 0 1.5rem 0.5rem 1.5rem;
  display: flex;
  flex-direction: column;
`;
export const Divider = styled.div`
  width: calc(100% + 48px);
  height: 1px;
  background: #F0F0F0;
  margin: 0 -1.5rem;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding-top: 1.5rem;
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
export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f7f7f7;
  margin-bottom: 1.5rem;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  padding: 32px 0;
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
  color: #8f8f8f;
  font-size: 0.9rem;
  margin-right: 16px;
  font-weight: 600;
  a {
    color: #ff6600;
    text-decoration: none;
  }
`;
export const Description = styled.div`
  margin: 12px 0;
  color: #8f8f8f;
  font-weight: 500;
  font-size: 0.9rem;
  max-width: 85%;
`;
export const Price = styled.div`
  font-weight: bold;
  color: #6E6E6E;
  margin-left: 0.5rem;
  font-size: 0.9rem;
  span {
    font-weight: normal;
  }
`;
export const PriceAccepted = styled.div`
  color: #8f8f8f;
  font-size: 0.9rem;
`;
export const Button = styled.button<{primary?: boolean}>`
  background: ${({primary}) => (primary ? '#FE7D2B' : '#eee')};
  color: ${({primary}) => (primary ? '#fff' : '#333')};
  border: none;
  border-radius: 2px;
  padding: 8px 18px;
  margin-right: 10px;
  font-weight: 500;
  border-bottom: 2px solid #BEBEBE;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
export const Icon = styled.span`
  font-size: 1.1rem;
  display: inline-flex;
  vertical-align: middle;
  margin-right: 4px;
  svg {
    display: block;
  }
`; 

