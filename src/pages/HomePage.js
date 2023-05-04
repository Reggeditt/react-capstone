import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData } from '../redux/data/dataSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const countriesData = useSelector((store) => store.data);
  const defaultContinents = [
    {
      continent: 'Africa',
      countries: [],
    },
    {
      continent: 'North America',
      countries: [],
    },
    {
      continent: 'South America',
      countries: [],
    },
    {
      continent: 'Antarctica',
      countries: [],
    },
    {
      continent: 'Asia',
      countries: [],
    },
    {
      continent: 'Europe',
      countries: [],
    },
    {
      continent: 'Oceania',
      countries: [],
    },
  ];

  defaultContinents.map((item) => {
    item.countries = countriesData.filter((country) => country.continents[0] === item.continent);
    return item;
  });

  const continents = defaultContinents;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div>
      <div className="continent-cards-wrap">
        {
          continents.map((continent) => (
            <Link to={`/details/${continent.continent}`} key={continent.continent} className="continent-card">
              <h1>{continent.continent}</h1>
              <span>
                population:
                {
                  continent.countries.reduce((total, country) => total + country.population, 0)
                }
              </span>
              <span>
                total Area:
                {
                  continent.countries.reduce((total, country) => total + country.area, 0)
                }
              </span>
              <Link to={`/details/${continent.continent}`}>See more</Link>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;
