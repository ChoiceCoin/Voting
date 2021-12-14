import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import "./electionlist.css";
import { URL } from "../constants";
import ElectionCard from "./ElectionCard";
import Loader from "../components/Loader";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 2.5rem);
`;

const Participate = () => {
  const { isLoading, error, data } = useQuery("elections", () =>
    axios.get(`${URL}/elections`).then((response) => response.data.data)
  );

  if (isLoading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );

  if (error)
    return <>An error has occurred: ${(error as ErrorEvent).message}</>;
  return (
    <div className="ptt_elt">
      <div className="ptt_elt_inn">
        <div className="ptt_hd">
          <p>Participate in Ongoing Elections</p>
        </div>
        <ul className="card_list">
          {data?.map((election: any, index: any) => {
            const scores = election?.candidates.map((data: any) =>
              data?.votes ? data?.votes : 0
            );
            const options = election?.candidates.map((data: any) => data?.name);

            return (
              <ElectionCard
                scores={scores}
                options={options}
                election={election}
                key={index}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Participate;
