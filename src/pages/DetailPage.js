/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchData } from "../redux/data/dataSlice";

const DetailPage = () => {
  const { continent } = useParams();
  const dispatch = useDispatch();
  const countriesData = useSelector((store) => store.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // console.log(countriesData);
  return (
    <h1>
      welcome to the
      { continent }
      details page
      <br />
      {/* {console.log(continent)} */}
      {
        countriesData.filter((country) => country.continents[0] === continent).map((country) => (
          <div key={country.ccn3}>
            <img src={country.flags.png} alt={country.name.common} />
            <h1>{country.name.common}</h1>
            <h2>
              Area size:
              {country.area}
            </h2>
            <h2>
              population:
              {country.population}
            </h2>
          </div>
        ))
      }
    </h1>
  );
};

export default DetailPage;
