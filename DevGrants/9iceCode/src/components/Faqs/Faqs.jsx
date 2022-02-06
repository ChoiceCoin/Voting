
import data from './data';
import SingleQuestion from './Question';
import './Faqs.css'

const questions = data

function Faqs() {
  return (
    <main>
      <div className='container'>
        <h1>FAQs</h1>
        <section className='info'>
          {questions.map((question) => {
            return (
              <SingleQuestion key={question.id} {...question}></SingleQuestion>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default Faqs;
