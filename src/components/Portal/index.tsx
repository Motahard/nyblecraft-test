import { createPortal } from 'react-dom';
import { useState, useLayoutEffect } from 'react';

interface IProps {
    children?: JSX.Element | JSX.Element[];
    wrapperId: string;
}

const createWrapperAndAppendToBody = (wrapperId: string): HTMLElement => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

const ReactPortal = ({ children, wrapperId = 'portal-wrapper' }: IProps) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);
    useLayoutEffect(() => {
      let element = (document.getElementById(wrapperId) as HTMLElement);
      let systemCreated = false;
      if (!element) {
        systemCreated = true;
        element = createWrapperAndAppendToBody(wrapperId);
      }
      setWrapperElement(element);
      return () => {

        if (systemCreated && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}
export default ReactPortal;