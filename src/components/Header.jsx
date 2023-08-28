import React from "react";
import { timezones } from "@/data/timezones";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { MdOutlineSwapVert } from "react-icons/md";
import { enqueueSnackbar } from "notistack";

const Header = ({
  timezone,
  setTimezone,
  tada,
  setTada,
  theme,
  setTheme,
  changeOrder,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [drop, setDrop] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const data = timezones;

  const inputChange = (e) => {
    setInputValue(e.target.value);
    setSearchValue(e.target.value);
    if (e.target.value === "") return setDrop([]);
    const url = `https://rough-night-99a5.alkmt.workers.dev/cities?fields%5B%5D=geonameid&fields%5B%5D=asciiname&fields%5B%5D=timezone&filterByFormula=SEARCH(%22${e.target.value.toLowerCase()}%22%2C+LOWER(asciiname))&maxRecords=3&sort%5B0%5D%5Bfield%5D=population&sort%5B0%5D%5Bdirection%5D=desc`;
    const getData = async () => {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      const val = data.records.map((item) => {
        return item.fields;
      });
      setDrop(val);
    };
    getData();
  };
  const submitTimeZone = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return enqueueSnackbar("Please enter any timezone", {
        variant: "warning",
      });
    }

    if (!data.find((item) => item.includes(inputValue))) {
      return (
        enqueueSnackbar("Please enter a valid timezone", { variant: "error" }),
        setInputValue("")
      );
    }
    setTimezone([...timezone, inputValue]);

    setTimezone([...timezone, inputValue]);
    const item = { timezone: inputValue, city: searchValue };
    setTada([...tada, item]);
    setInputValue("");
    setSearchValue("");
  };

  return (
    <>
      <div
        className={`flex z-10 w-full p-3 border gap-5 border-gray-400 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <form
          onSubmit={(e) => submitTimeZone(e)}
          className="relative flex flex-1 w-1/3 bg-white border border-gray-300"
        >
          <input
            type="text"
            name="searchInput"
            placeholder="Add City or Town, Time Zone"
            className={`flex-1 searchInput text-black py-1 px-2 p-3 outline-none ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            }`}
            value={searchValue}
            onChange={(e) => inputChange(e)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-6 bg-blue-500 w-32 hover:bg-blue-600"
          >
            Add
          </button>
          <div className="absolute flex flex-col w-4/5 text-black top-full z-100">
            {loading === true ? (
              <h1>Loading</h1>
            ) : (
              drop.map((item) => (
                <div
                  className="bg-white border cursor-pointer py-1 px-6 hover:bg-gray-100"
                  key={item}
                  onClick={() => {
                    setSearchValue(item.asciiname);
                    setInputValue(item.timezone);
                    setDrop([]);
                  }}
                >
                  <h3>{item.asciiname}</h3>
                </div>
              ))
            )}
          </div>
        </form>

        <div>
          <input
            type="date"
            name=""
            id=""
            className={`text-black h-full w-56 px-4 ml-2 border ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            }`}
          />
        </div>

        <div className="flex">
          <button
            className={`p-2 px-4 border border-blue-500 text-black hover:bg-blue-500 hover:text-white ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <MdOutlineSwapVert className="text-xl" onClick={changeOrder} />
          </button>
          <button
            className={`p-2 px-4 border border-blue-500 bg-whiteblack hover:bg-blue-500 hover:text-white ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <BsFillSunFill className="text-xl " />
            ) : (
              <BsFillMoonFill className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
