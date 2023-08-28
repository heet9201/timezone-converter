import React, { useEffect, useRef } from "react";
import { DateTime } from "luxon";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const TimeBox = ({ zone, global, setGlobal, hover }) => {
  const [timing, setTiming] = React.useState(
    DateTime.local().setZone(zone.timezone).hour * 2 +
      Math.round(DateTime.local().setZone(zone.timezone).minute / 30)
  );
  const formattedDayDateMonthYear = DateTime.local()
    .setZone(zone.timezone)
    .toFormat("ccc, LLL dd");

  var city = zone.city;

  const url = `https://rough-night-99a5.alkmt.workers.dev/cities?fields%5B%5D=geonameid&fields%5B%5D=asciiname&fields%5B%5D=timezone&filterByFormula=SEARCH(%22${city.toLowerCase()}%22%2C+LOWER(asciiname))&maxRecords=3&sort%5B0%5D%5Bfield%5D=population&sort%5B0%5D%5Bdirection%5D=desc`;

  const getTime = async () => {
    const response = await fetch(url);
    const data = await response.json();
  };

  const timeMap = [];

  for (let hours = 0, key = 1; hours < 24; hours++) {
    for (let minutes = 0; minutes <= 30; minutes += 30) {
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
      timeMap.push({
        key: key++,
        value: hours * 2 + minutes / 30,
        label: formattedTime,
      });
    }
  }

  var display =
    Math.abs(parseInt(timing - global)) > 47
      ? parseInt(timing - global) % 48
      : Math.abs(parseInt(timing - global));

  useEffect(() => {
    getTime();
  }, []);
  //
  const sliderRef = useRef(null);

  const updateSliderValue = (newValue) => {
    if (sliderRef.current) {
      sliderRef.current.noUiSlider.set(newValue);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider && !slider.noUiSlider) {
      noUiSlider.create(slider, {
        start: [display],
        connect: "lower",
        range: {
          min: 0,
          max: 47,
        },
      });

      slider.noUiSlider.on("update", (values, handle) => {
        const newValue = parseInt(values[handle]);
        setGlobal(timing - newValue);
      });
    } else {
      updateSliderValue(display);
    }

    getTime();
  }, [global]);

  return (
    <>
      <div className="relative">
        <div>
          <div ref={sliderRef} className="slider w-full"></div>
          <div className="pl-0 sm:pl-0 md:pl-10 flex justify-between text-sm m-4">
            {timeMap.map((item) => {
              return (
                item.key % 4 === 0 && <label key={item.key}>{item.label}</label>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold">{timeMap[display].label}</div>
          <div className="font-light">{formattedDayDateMonthYear}</div>
        </div>
      </div>
    </>
  );
};

export default TimeBox;
