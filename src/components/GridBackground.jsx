// Grille très légère en fond, qui s'efface vers les bords.
import ShapeGrid from "./ShapeGrid";
import { useTheme } from "../theme/ThemeContext";

const COLORS = {
  dark: { line: "rgb(237 241 245 / 0.085)", hover: "#f1ca13" },
  light: { line: "rgba(112, 131, 151, 0.11)", hover: "#1d3446" },
};

export const GridBackground = ({ className = ""}) => {
  const { theme } = useTheme();
  const { line, hover } = COLORS[theme] ?? COLORS.light;

  return (
    // <div
    //   aria-hidden="true"
    //   className={`pointer-events-none absolute inset-0 ${className}`}
    //   style={{
    //     backgroundImage:
    //       "linear-gradient(to right, var(--grid) 1px, transparent 1px), linear-gradient(to bottom, var(--grid) 1px, transparent 1px)",
    //     backgroundSize: `${size}px ${size}px`,
    //     backgroundPosition: "center top",
    //     maskImage: "radial-gradient(ellipse 90% 80% at 50% 30%, black 35%, transparent 90%)",
    //     WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 30%, black 35%, transparent 90%)",
    //   }}
    // />

    <div
      className={` inset-0 z-0 ${className} `}
      style={{ width: "100%", height: "100%", position: "absolute" }}
    >
      <ShapeGrid
        shape="hexagon"
        direction="none"
        lineColor={line}
        hoverColor={hover}
        hoverFillColor="#ffffff"
        fillOpacity={.01}
        cellSize={130}
        speed={0.5}
        tiltX={0}
        tiltY={0}
        rainbow={false}
        lineWidth={0.5}
        radius={1}
        trail={0.1}
        glow={2}
        twinkle={0.3}
        fade={100}
        clickCascade
        intro
      />
    </div>
  );
};
