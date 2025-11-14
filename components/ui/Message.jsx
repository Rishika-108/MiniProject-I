const Message = ({ author, content }) => {
  const style = author === "user" ? { textAlign: "right", color: "blue" } : { textAlign: "left", color: "green" };
  return <div style={style}>{content}</div>;
};

export default Message;
