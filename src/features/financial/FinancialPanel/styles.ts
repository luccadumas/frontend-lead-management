import styled from 'styled-components';

export const PanelWrapper = styled.section`
  margin-top: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  color: #0f172a;
`;

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  border: 1px solid #e2e8f0;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.06);
`;

export const CardTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #334155;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 0.65rem 0.8rem;
  margin-bottom: 0.6rem;
  font-size: 0.88rem;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Select = styled.select`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 0.65rem 2.4rem 0.65rem 0.8rem;
  margin-top: 0.25rem;
  font-size: 0.88rem;
`;

export const HeaderSelectWrapper = styled.div`
  width: min(360px, 100%);
`;

export const HeaderSelectLabel = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #475569;
`;

export const InnerTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0 0 1rem;
`;

export const InnerTabButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? '#4f46e5' : '#cbd5e1')};
  background: ${({ $active }) => ($active ? '#eef2ff' : '#fff')};
  color: ${({ $active }) => ($active ? '#3730a3' : '#334155')};
  border-radius: 0.7rem;
  padding: 0.45rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const RightAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2rem;
`;

export const PrimaryButton = styled.button`
  border: none;
  border-radius: 0.75rem;
  padding: 0.56rem 0.9rem;
  font-size: 0.86rem;
  font-weight: 600;
  color: #fff;
  background: #4f46e5;
  cursor: pointer;
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: #1e293b;
`;

export const SuccessButton = styled(PrimaryButton)`
  background: #059669;
`;

export const Meta = styled.p`
  margin: 0.6rem 0 0;
  border-radius: 0.6rem;
  background: #f1f5f9;
  color: #334155;
  padding: 0.4rem 0.6rem;
  font-size: 0.78rem;
`;

export const ErrorBox = styled.p`
  margin: 1rem 0 0;
  border: 1px solid #fecaca;
  border-radius: 0.75rem;
  background: #fef2f2;
  color: #b91c1c;
  padding: 0.55rem 0.75rem;
  font-size: 0.86rem;
`;

export const SummaryTableWrapper = styled.div`
  margin-top: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;

  th,
  td {
    padding: 0.6rem 0.7rem;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
  }

  th {
    background: #f8fafc;
    color: #334155;
    font-weight: 700;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;
