import styles from "../../styles/Home.module.css"
import ErrorComponent from "./error";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const VoteComponent = ({name, desc, id, children}) => {
    const result = md.render(desc);
    if (!id)
   {return <>
{children}
    <ErrorComponent/>
    </>}
  return (
    <>
      {children}
      <h1 className={``}>{name}</h1>
      <div className="text-center" dangerouslySetInnerHTML={{ __html: result }}> </div>
    </>
  );
};
export default VoteComponent;
