/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchData } from "../redux/data/dataSlice";

const DetailPage = () => {
  const { continent } = useParams();
  const dispatch = useDispatch();
  const countriesData = useSelector((store) => store.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="details-wrap">
      <Link to="/">
        <img
          className="back-arrow"
          src="https://www.svgrepo.com/show/416236/arrow-back-basic.svg"
          alt="back arrow"
        />
      </Link>
      {
        countriesData.filter((country) => country.continents[0] === continent).map((country) => (
          <div key={country.ccn3}>
            <img src={country.flags.png} alt={country.name.common} />
            <div>
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
          </div>
        ))
      }
      <Link to="/">
        <img
          className="back-arrow"
          src="https://www.svgrepo.com/show/416236/arrow-back-basic.svg"
          alt="back arrow"
        />
      </Link>
    </div>
  );
};

export default DetailPage;
