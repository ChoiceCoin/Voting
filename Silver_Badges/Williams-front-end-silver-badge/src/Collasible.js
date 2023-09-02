const Collasible = ({ answer, question }) => {
  return (
    <div className="collap_cov">
      <button
        class="collapsible"
        onClick={(e) => {
          e.target.classList.toggle("colap_active");
          var content = e.target.nextElementSibling;
          if (content?.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content?.scrollHeight + "px";
          }
        }}
      >
        <p>{question}</p>
      </button>
      <div class="collap_cont">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Collasible;
