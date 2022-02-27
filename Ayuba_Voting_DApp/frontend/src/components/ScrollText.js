const ScrollText = ({ word }) => {
  return (
    <div className="Marquee__Wrapper">
      <div className="Marquee__TextHolder">
        <div className="Marquee__TextGroup">
          <span className="Marquee__Text">
            <span className="Marquee__Word">{word}.</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">{word}!</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">{word}#</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">@{word}</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">"{word}"</span>
            <span className="Marquee__Dot"></span>
          </span>
        </div>
        <div className="Marquee__TextGroup">
          <span className="Marquee__Text">
            <span className="Marquee__Word">{word}.</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">{word}!</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">{word}#</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">@{word}</span>
            <span className="Marquee__Dot"></span>
          </span>
          <span className="Marquee__Text">
            <span className="Marquee__Word">"{word}"</span>
            <span className="Marquee__Dot"></span>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ScrollText;
