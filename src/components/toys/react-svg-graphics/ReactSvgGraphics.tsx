import React, { useContext, useEffect, useRef, useState } from "react";

import "./Viewport.scss";

class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  translate({ x, y }: Point) {
    return new Point(this.x + x, this.y + y);
  }

  scale(factor: number) {
    return new Point(this.x * factor, this.y * factor);
  }
}

export type ViewportProps = React.SVGProps<SVGSVGElement> & {
  id: string;
  baseScale: number;
  header?: React.ReactNode;
};

const MinZoomFactor = 0.25,
  MaxZoomFactor = 8;

const BaseScale = 1;

type ViewportState = {
  scale: number;
  setScale: (scale: number) => void;

  pan: Point;
  setPan: (pan: Point) => void;

  viewportSize: Point | undefined;
};

export const ViewportContext = React.createContext<ViewportState | undefined>(undefined);

const ViewportProvider: React.FC<ViewportProps> = ({
  children,
  id,
  baseScale,
  style,
  header,
  ...rest
}) => {
  const mousePosition = useRef<Point>(new Point(0, 0));
  const lastPan = useRef<Point | null>(null);

  const [pan, setPan] = useState<Point>(new Point(0, 0));
  const [scale, setScale] = useState(baseScale);

  const ref = useRef<SVGSVGElement>(null);
  const gref = useRef<SVGGElement>(null);

  const [viewportSize, setViewportSize] = useState<Point>();

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = ref.current!.getBoundingClientRect();

      // Initially this observes viewport size of 0,0
      if (width > 0) {
        setViewportSize(new Point(width, height));
      }
    });

    resizeObserver.observe(ref.current, { box: "border-box" });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();
    setViewportSize(new Point(width, height));
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    // To get correct stopPropagation() behavior: https://medium.com/@ericclemmons/react-event-preventdefault-78c28c950e46
    ref.current.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      ref.current?.removeEventListener("wheel", handleWheel);
    };
  }, [scale, pan]);

  const mouseDownPosition = useRef(null) as React.MutableRefObject<Point | null>;

  const isEventTargetingViewport = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
    (ev.target as any).id === id;

  const getElementRelativePosition = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const { left, top } = ev.currentTarget.getBoundingClientRect();
    return new Point(ev.clientX - left, ev.clientY - top);
  };

  const handleMouseDown = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    ev.preventDefault();

    if (isEventTargetingViewport(ev)) {
      mouseDownPosition.current = getElementRelativePosition(ev);
      lastPan.current = pan;
      return;
    }
  };

  const handleMouseMove = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const relativePosition = getElementRelativePosition(ev);
    mousePosition.current = relativePosition;

    if (mouseDownPosition.current && lastPan.current) {
      const v = new Point(
        relativePosition.x - mouseDownPosition.current.x,
        -(relativePosition.y - mouseDownPosition.current.y),
      );

      const newPan = lastPan.current.translate(v);
      setPan(newPan);
    }
  };

  const handleMouseUp = () => {
    mouseDownPosition.current = null;
    lastPan.current = null;
  };

  const minZoom = MinZoomFactor * baseScale;
  const maxZoom = MaxZoomFactor * baseScale;

  const handleWheel = (ev: WheelEvent) => {
    if (ev.deltaY < 0) {
      const newScale = scale * 1.25;
      if (newScale <= maxZoom) {
        const newPan = pan.scale(1.25);
        setPan(newPan);
        setScale(newScale);
      }
    } else {
      const newScale = scale * 0.8;
      if (newScale >= minZoom) {
        const newPan = pan.scale(0.8);
        setPan(newPan);
        setScale(newScale);
      }
    }

    ev.preventDefault();
    ev.stopPropagation();
  };

  const gridSize = 100 * scale;
  const gridCenter = pan.translate(viewportSize?.scale(0.5) ?? new Point(0, 0));

  return (
    <ViewportContext.Provider
      value={{
        scale,
        setScale,
        pan,
        setPan,
        viewportSize,
      }}
    >
      {header}
      <svg
        id={id}
        className="viewport"
        {...rest}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={(ev) => ev.preventDefault()}
        ref={ref}
        style={{
          backgroundPosition: `${gridCenter.x}px ${gridCenter.y}px`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          ...style,
        }}
        transform="scale(1, -1)"
      >
        <g ref={gref}>{viewportSize?.x ? children : null}</g>
      </svg>
    </ViewportContext.Provider>
  );
};

const SvgCircle = ({ center, radius }: { center: Point; radius: number }) => {
  const context = useContext(ViewportContext)!;

  const { pan, scale, viewportSize } = context;

  if (!viewportSize) return null;

  const transformedCenter = center.scale(scale).translate(pan).translate(viewportSize.scale(0.5));

  return (
    <circle
      cx={transformedCenter.x}
      cy={transformedCenter.y}
      r={radius * scale}
      fill="transparent"
      stroke="#06f"
      strokeWidth={2}
      pointerEvents={"none"}
    />
  );
};

const Header = () => {
  const context = useContext(ViewportContext)!;
  const { pan, setPan, scale, setScale } = context;

  const handleResetView = () => {
    setPan(new Point(0, 0));
    setScale(BaseScale);
  };

  return (
    <>
      <div className="viewport-control">
        <h4>SVG Graphics</h4>
        <button onClick={handleResetView}>Reset View</button>
      </div>
      <small className="viewport-debug">
        Pan: {pan.x.toFixed(2)}, {pan.y.toFixed(2)}, Scale: {scale.toFixed(2)}
      </small>
    </>
  );
};

const ReactSvgGraphics = () => {
  return (
    <ViewportProvider
      id="viewport"
      baseScale={BaseScale}
      style={{ height: "20rem" }}
      header={<Header />}
    >
      <SvgCircle center={new Point(0, 0)} radius={50} />
      <SvgCircle center={new Point(20, 0)} radius={40} />
      <SvgCircle center={new Point(-100, 20)} radius={25} />
    </ViewportProvider>
  );
};

export default ReactSvgGraphics;
