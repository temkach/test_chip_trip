import "./AutoComplete.css";
import { useState } from "react";
import AutoCompleteItemFirstStep from "./AutoCompleteItemFirstStep";
import AutoCompleteItemSecondStep from "./AutoCompleteItemSecondStep";
import IsSecondStep from "./AutoCompleteSecondStepIfOneCity";
import { nameOfCity } from "./nameOfCity";

export default function AutoComplete({
  value, //******data from input********//
  setValue,
  placeholder,
  onChange,
  options,
  setJson,
  json, ///*****data after step 1********** */
  setOptions,
  resultClick,
  findCities,
}) {
  const [optionsActive, setOptionsActive] = useState(false);

  /* const nameOfCity = (city) => {
    const nameOfCityArr = city.properties.display_name.split(",");
    if (nameOfCityArr.length > 2) {
      return {
        city: nameOfCityArr[0],
        country: nameOfCityArr[nameOfCityArr.length - 1],
        county: nameOfCityArr[1],
        geometry: city.geometry.coordinates,
        id: city.properties.osm_id,
      };
    }
    return {
      city: nameOfCityArr[0],
      country: nameOfCityArr[nameOfCityArr.length - 1],
      county: null,
      geometry: city.geometry.coordinates,
      id: city.properties.osm_id,
    };
  }; */

  return (
    <div className="autoComplete">
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={!optionsActive ? setOptionsActive(true) : undefined}
        onBlur={() => {
          setTimeout(() => {
            // setOptions([])
          }, 200);
        }}
      />
      <ul>
        {options &&
          options.map((option) => (
            <AutoCompleteItemFirstStep
              key={option}
              option={option}
              setValue={setValue}
              setOptions={setOptions}
              findCities={findCities}
            />
          ))}

        {json &&
          json.length > 1 &&
          json.map((city) => {
            const formatingCity = nameOfCity(city);
            return (
              <AutoCompleteItemSecondStep
                key={formatingCity.id}
                city={formatingCity}
                resultClick={resultClick}
                setJson={setJson}
              />
            );
          })}
        {json &&json.length===1 &&(
          <IsSecondStep
            json={json}
            resultClick={resultClick}
            setJson={setJson}
          />
        )}
      </ul>
    </div>
  );
}
