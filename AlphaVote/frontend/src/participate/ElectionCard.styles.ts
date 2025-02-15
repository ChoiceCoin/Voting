import styled from "styled-components";

export const VoteListWrapper = styled.div<{
  isVoteListCollapsed: boolean;
}>`
  width: 100%;
  max-height: 0;
  margin: ${({ isVoteListCollapsed }) =>
    isVoteListCollapsed ? 0 : "5px 0 10px"};
  overflow: hidden;
  transition: max-height 0.2s ease-out, margin 0.2s ease-out;
`;
export const VoteNowList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  li {
    margin: 5px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 50%;
  }
  p {
    font-size: 12px;
    color: var(--wht);
    opacity: 0.7;
    margin-left: 5px;
  }
  input[type="radio"] {
    margin: 0;
    width: 16px;
    height: 16px;
    display: grid;
    appearance: none;
    margin-right: 10px;
    border-radius: 100%;
    place-content: center;
    -webkit-appearance: none;
    background-color: transparent;
    border: 2px solid var(--bord-dark);

    &::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 100%;
      transform: scale(0);
      background-color: var(--main-col);
      transition: 120ms transform ease-in-out;
    }

    &:checked::before {
      transform: scale(1);
    }
  }
`;
export const CollapsedChart = styled.div<{ isChartCollapsed: boolean }>`
  width: 100%;
  max-height: 0;
  margin-top: ${({ isChartCollapsed }) => (isChartCollapsed ? 0 : "20px")};
  overflow: hidden;
  transition: max-height 0.2s ease-out, margin-top 0.2s ease-out;
`;
export const CandidatePercentage = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 3px 0px 3px;
  padding-left: 5px;
  align-items: center;
  justify-content: center;
  li {
    font-size: 10px;
    color: var(--wht);
    margin-right: 10px;
    opacity: 0.5;
  }
`;
export const LabelRow = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`
export const ChoiceCoinAmountRow = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  input {
    text-align: right;
    border-bottom: 1px solid;
  }
`