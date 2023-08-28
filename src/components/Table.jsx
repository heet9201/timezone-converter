import React, { useEffect } from "react";
import TimeBox from "./TimeBox";
import { timezones } from "@/data/timezones";
import { AiOutlineClose } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "./Header";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "grey" : "",
  ...draggableStyle,
});

const Table = ({ theme, setTheme }) => {
  const [timezone, setTimezone] = React.useState([]);
  const [global, setGlobal] = React.useState(0);
  const [tada, setTada] = React.useState([]);

  const data = timezones;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items2 = Array.from(tada);
    const [reorderedItem2] = items2.splice(result.source.index, 1);
    items2.splice(result.destination.index, 0, reorderedItem2);
    setTada(items2);

    const items = Array.from(tada.map((item) => item.timezone));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTimezone(items);
  };
  const changeOrder = () => {
    const keys = Object.keys(tada);
    const reversed = keys.reverse();
    const item = reversed.map((i) => tada[i]);

    const keys1 = Object.keys(timezone);
    const reversed1 = keys1.reverse();
    const item1 = reversed1.map((i) => timezone[i]);

    setTada(item);
    setTimezone(item1);
  };

  return (
    <>
      <div className="flex h-fit flex-col p-6 justify-center items-center">
        <Header
          timezone={timezone}
          setTimezone={setTimezone}
          tada={tada}
          setTada={setTada}
          theme={theme}
          setTheme={setTheme}
          changeOrder={changeOrder}
        />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {tada.length > 0 && (
            <div className="w-full bg-slate-500 border-sm rounded text-black">
              <Droppable droppableId="datas">
                {(provided, snapshot) => (
                  <ul
                    className="datas"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tada.map((item, index) => {
                      return (
                        <Draggable
                          key={item.timezone}
                          draggableId={item.timezone}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              className={`relative p-4 border datas border-gray-400 hover:border-blue-500 hover:border-2 ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-white"
                              }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="relative">
                                <div
                                  className="dots-button absolute w-fit h-20 flex"
                                  {...provided.dragHandleProps}
                                >
                                  <svg
                                    viewBox="0 0 16 128"
                                    className={`${
                                      theme === "dark"
                                        ? "fill-white"
                                        : "fill-black"
                                    }`}
                                  >
                                    <rect
                                      x="4"
                                      y="4"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="12"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="20"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="28"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="36"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="44"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="52"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="60"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="68"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="76"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="84"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="92"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="100"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="108"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="116"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="4"
                                      y="124"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="4"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="12"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="20"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="28"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="36"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="44"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="52"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="60"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="68"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="76"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="84"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="92"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="100"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="108"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="116"
                                      width="4"
                                      height="4"
                                    ></rect>
                                    <rect
                                      x="12"
                                      y="124"
                                      width="4"
                                      height="4"
                                    ></rect>
                                  </svg>
                                </div>
                                <div className="ml-8">
                                  <h1 className="font-bold text-3xl">
                                    {item.city}
                                  </h1>
                                  <h3 className="font-light text-sm">
                                    {item.timezone}
                                  </h3>
                                  <div className="my-5">
                                    <TimeBox
                                      zone={item}
                                      global={global}
                                      setGlobal={setGlobal}
                                      tada={tada}
                                      setTada={setTada}
                                    />
                                  </div>
                                  <AiOutlineClose
                                    className="text-red-500 cursor-pointer absolute top-2 right-2 text-2xl"
                                    onClick={(e) => {
                                      const items = tada.filter(
                                        (i) => i.timezone !== item.timezone
                                      );
                                      const items2 = timezone.filter(
                                        (i1) => i1 !== item.timezone
                                      );
                                      setTada(items);
                                      setTimezone(items2);
                                    }}
                                  />
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          )}
        </DragDropContext>
      </div>
    </>
  );
};

export default Table;
