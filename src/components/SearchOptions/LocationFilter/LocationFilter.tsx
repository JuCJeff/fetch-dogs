import { US_STATES, RADIUS_OPTIONS } from "../../../data";

import "./LocationFilters.css";

type LocationFilterProps = {
  city: string | undefined;
  setCity: (city: string) => void;
  state: string | undefined;
  setState: (state: string) => void;
  radius: string | undefined;
  setRadius: (radius: string | undefined) => void;
  onFilter: () => void;
};

const LocationFilter = ({
  city,
  setCity,
  state,
  setState,
  radius,
  setRadius,
  onFilter,
}: LocationFilterProps) => {
  return (
    // TODO: change this to a form
    <div className="location-filters">
      <span>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="string"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </span>

      <span>
        <select
          id="state-select"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option key={"all-states"} value="">
            Select State
          </option>
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </span>

      <span>
        <select
          id="radius-select"
          value={radius}
          onChange={(e) => setRadius(e.target.value || undefined)}
        >
          <option key={"all-radius"} value={""}>
            Radius
          </option>
          {RADIUS_OPTIONS.map((radius) => (
            <option key={radius} value={radius}>
              {radius} miles
            </option>
          ))}
        </select>
      </span>

      <button onClick={onFilter}>Apply Location Filter</button>
    </div>
  );
};

export default LocationFilter;
