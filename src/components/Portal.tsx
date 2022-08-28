import ReactDOM from "react-dom";

const Portal = (props: any) =>
  ReactDOM.createPortal(props.children, document.body);

export default Portal;
