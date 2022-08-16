import React from "react";
import { useRef } from "react";
import { useState } from "react";

export default function ScrollDrag(props) {
  const ref = useRef();
  const [status, setStatus] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  // event listeners

  const onMouseDown = (e) => {
    setStatus({ ...status, isScrolling: true, clientX: e.clientX });
  };

  const onMouseUp = () => {
    setStatus({ ...status, isScrolling: false });
  };

  const onMouseMove = (e) => {
    const { clientX } = status;
    if (status.isScrolling) {
      ref.current.scrollLeft = ref.current.scrollLeft - e.clientX + clientX;
      setStatus({
        ...status,
        clientX: e.clientX,
        scrollX: ref.current.scrollLeft - e.clientX + clientX,
      });
    }
  };

  return (
    <div
      className={props.className}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {props.children}
    </div>
  );
}
