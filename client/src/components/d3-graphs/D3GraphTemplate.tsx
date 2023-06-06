interface D3GraphTemplateProps {
  children: React.ReactNode;
  childStyle: React.CSSProperties;
  graphId: string;
  width: number;
  height: number;
}

export const D3GraphTemplate = ({
  children,
  childStyle,
  width,
  graphId,
  height,
}: D3GraphTemplateProps) => {
  return (
    <svg height={height} style={childStyle}>
      <g id={graphId}>{children}</g>
    </svg>
  );
};
