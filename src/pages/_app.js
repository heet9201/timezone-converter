import "@/styles/globals.css";
import "@/styles/app.css";
import { ThemeProvider } from "next-themes";
import { theme } from "@/components/Table";
import { useEffect } from "react";

// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

export default function App({ Component, pageProps }) {
  // return (
  //   <DndProvider backend={HTML5Backend}>
  //     <Component {...pageProps} />
  //   </DndProvider>
  // );

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
