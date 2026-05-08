import styled from 'styled-components';

export const LoginWrapper = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: center;
  margin: 0;
  border-radius: 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #020617, #0f172a, #312e81);
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 420px;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.96);
  padding: 1.75rem;
  box-shadow: 0 20px 45px rgba(2, 6, 23, 0.35);
`;

export const LoginTag = styled.p`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4f46e5;
`;

export const LoginTitle = styled.h1`
  margin: 0.5rem 0 0;
  font-size: 1.6rem;
  color: #0f172a;
`;

export const LoginSubtitle = styled.p`
  margin: 0.35rem 0 1.25rem;
  font-size: 0.9rem;
  color: #64748b;
`;

export const LoginInput = styled.input`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 0.7rem 0.85rem;
  font-size: 0.9rem;
  margin-bottom: 0.65rem;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 0.75rem;
  padding: 0.72rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const ErrorBox = styled.p`
  margin: 0.8rem 0 0;
  border-radius: 0.6rem;
  padding: 0.6rem 0.75rem;
  font-size: 0.86rem;
  color: #b91c1c;
  background: #fef2f2;
`;

export const SectionTabs = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 0.25rem;
  background: #fff;
`;

export const AuthTopBar = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: flex-end;
`;

export const LogoutTopButton = styled.button`
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #be123c;
  border-radius: 0.75rem;
  padding: 0.55rem 0.9rem;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffe4e6;
    border-color: #fda4af;
  }
`;

export const SectionButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border: none;
  border-radius: 0.75rem;
  padding: 0.7rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#fff' : '#475569')};
  background: ${({ $active }) => ($active ? '#0f172a' : 'transparent')};
`;
