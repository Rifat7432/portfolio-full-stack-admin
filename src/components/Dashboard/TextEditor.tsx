import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Link,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { Button, Tooltip } from "@nextui-org/react";

const TextEditor = ({
  htmlContent,
  setHtmlContent,
  textAreaRef,
}: {
  htmlContent: any;
  setHtmlContent: any;
  textAreaRef: any;
}) => {
  const applyStyle = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value as string);
  };
  const onSubmit = () => {
    if (textAreaRef.current) {
      setHtmlContent(textAreaRef.current.innerHTML);
    }
  };
  const clear = () => {
    if (textAreaRef.current) {
      textAreaRef.current.innerHTML = "";
      setHtmlContent("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="toolbar flex flex-wrap justify-between gap-5 space-x-2 mb-4">
        <Tooltip showArrow={true} content="Bold">
          <button type="button" onClick={() => applyStyle("bold")}>
            <Bold className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>
        <Tooltip showArrow={true} content="italic">
          <button type="button" onClick={() => applyStyle("italic")}>
            <Italic className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>
        <Tooltip showArrow={true} content="Add link">
          <button
            type="button"
            onClick={() => {
              const url = prompt("Enter the link URL:", "https://");
              if (url) applyStyle("createLink", url);
            }}
          >
            <Link className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>
        <Tooltip showArrow={true} content="Algin start">
          {" "}
          <button
            type="button"
            onClick={() => applyStyle("insertUnorderedList")}
          >
            <List className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>
        <Tooltip showArrow={true} content="Algin start ">
          <button type="button" onClick={() => applyStyle("justifyLeft")}>
            <AlignLeft className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>
        <Tooltip showArrow={true} content="Algin center ">
          <button type="button" onClick={() => applyStyle("justifyCenter")}>
            <AlignCenter className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>
        <Tooltip showArrow={true} content="Align End">
          <button type="button" onClick={() => applyStyle("justifyRight")}>
            <AlignRight className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>
        <Tooltip showArrow={true} content="Justify Full">
          
          <button type="button" onClick={() => applyStyle("justifyFull")}>
            <AlignJustify className="w-6 h-6 text-gray-700" />
          </button>
        </Tooltip>

        <Button type="button" onClick={onSubmit}>
          Submit
        </Button>
        <Button type="button" onClick={clear}>
          Clear
        </Button>
      </div>
      <div
        ref={textAreaRef}
        contentEditable
        className="border p-4 mb-4 min-h-[200px]"
      ></div>
    </div>
  );
};

export default TextEditor;
