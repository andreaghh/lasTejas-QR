import { FlipBook } from "./components/FlipBook";
import {
  CoverPage,
  BackCover,
  P1Left, P1Right,
  P2Left, P2Right,
  P3Left, P3Right,
  P4Left, P4Right,
  P5Left, P5Right,
} from "./components/MenuPages";

export default function Home() {
  // Each pair (P#Left + P#Right) appears as a book spread.
  // showCover=true makes CoverPage and BackCover appear as single full pages.
  const pages = [
    <CoverPage key="cover" />,      // 0  — front cover (single)
    <P1Left    key="p1l" />,        // 1  — spread 1 left
    <P1Right   key="p1r" />,        // 2  — spread 1 right
    <P2Left    key="p2l" />,        // 3  — spread 2 left
    <P2Right   key="p2r" />,        // 4  — spread 2 right
    <P3Left    key="p3l" />,        // 5  — spread 3 left
    <P3Right   key="p3r" />,        // 6  — spread 3 right
    <P4Left    key="p4l" />,        // 7  — spread 4 left
    <P4Right   key="p4r" />,        // 8  — spread 4 right
    <P5Left    key="p5l" />,        // 9  — spread 5 left
    <P5Right   key="p5r" />,        // 10 — spread 5 right
    <BackCover key="back" />,       // 11 — back cover (single)
  ];

  return <FlipBook pages={pages} />;
}
