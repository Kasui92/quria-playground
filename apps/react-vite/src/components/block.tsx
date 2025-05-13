import { PropsWithChildren } from "react";

export const Block = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg font-mono overflow-x-auto w-full">
      {children}
    </div>
  );
};

export const BlockTitle = ({ children }: PropsWithChildren) => {
  return <div className="text-sm text-gray-400 mb-1">{children}</div>;
};

export const BlockContent = ({ children }: PropsWithChildren) => {
  return (
    <pre className="overflow-auto max-h-96 w-full bg-gray-900 rounded-lg p-4">
      <code className="break-all whitespace-pre-wrap">{children}</code>
    </pre>
  );
};

export const BlockCode = ({ children }: PropsWithChildren) => {
  return <div className="text-sm text-gray-400 mb-1">{children}</div>;
};

export const BlockKey = ({ children }: PropsWithChildren) => {
  return (
    <>
      <span className="text-pink-400">{`"${children}"`}</span>
      <span className="text-gray-400">: </span>
    </>
  );
};

export const BlockValue = ({ children }: PropsWithChildren) => {
  return (
    <span className="text-green-400">
      {typeof children === "string"
        ? `"${children}"`
        : typeof children === "object" && children !== null
          ? JSON.stringify(children, null, 2)
          : String(children)}
    </span>
  );
};

export const BlockSeparator = () => {
  return <span className="text-gray-400">,</span>;
};
