import styled from 'styled-components';

export const Dashboard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DashboardHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 1rem;
  padding: 1rem 0;

  div{
    text-align: center;
  }
`;

export const DashboardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;  
  div {
    text-align: center;
  }
`;

export const UserInfo = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 4px;
  overflow: hidden;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 1rem;
`;
