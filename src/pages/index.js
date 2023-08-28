import Table from "@/components/Table";
import { SnackbarProvider } from "notistack";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div
          className={`h-full w-screen ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } px-20 }`}
        >
          <Table theme={theme} setTheme={setTheme} />
        </div>
      </SnackbarProvider>
    </>
  );
}
