import { useCallback, useEffect, useRef, useState } from "react";
import { collapseOrExpandElement } from "../utils/animation";

// TODO: need to pull out the types
const QuestionItem: React.FC<{
  item: {
    que: string;
    ans: string;
  };
}> = ({ item }) => {
  const [isQuestionCollapsed, setIsQuestionCollapsed] = useState(true);
  const questionAnswerRef = useRef(null);
  const collapseOrExpandQuestion = useCallback(() => {
    if (questionAnswerRef && questionAnswerRef.current) {
      collapseOrExpandElement(questionAnswerRef.current, isQuestionCollapsed);
    }
  }, [isQuestionCollapsed, questionAnswerRef]);

  const questionClickHandler = () => {
    setIsQuestionCollapsed(!isQuestionCollapsed);
  };

  useEffect(() => collapseOrExpandQuestion(), [collapseOrExpandQuestion]);

  return (
    <div className="collap_cov">
      <button
        className={`collapsible${isQuestionCollapsed ? "" : " colap_active"}`}
        onClick={questionClickHandler}
      >
        <p>{item.que}</p>
      </button>
      <div className="collap_cont" ref={questionAnswerRef}>
        <p>{item.ans}</p>
      </div>
    </div>
  );
};

export default QuestionItem;
