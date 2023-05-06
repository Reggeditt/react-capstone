import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const DetailPage = () => {
  const { continent } = useParams();
  const countriesData = useSelector((store) => store.data);

  return (
    <div className="details-wrap">
      <div className="banner">
        <h1>{ continent }</h1>
        <p>
          View population and land mass data categorized by countries
        </p>
      </div>
      <p className="divider">Stats by countries</p>
      <Link to="/">
        <img
          className="back-arrow"
          src="https://www.svgrepo.com/show/416236/arrow-back-basic.svg"
          alt="back arrow"
        />
        back to continents
      </Link>
      <div className="detail-cards">
        {
          countriesData.filter((country) => country.continents[0] === continent).map((country) => (
            <div key={country.ccn3} className="detail-card">
              <img src={country.flags.png} alt={country.name.common} />
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Population</th>
                      <th>Area Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{country.name.common}</td>
                      <td>{country.population}</td>
                      <td>{country.area}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        }
      </div>
      <Link to="/">
        <img
          className="back-arrow"
          src="https://www.svgrepo.com/show/416236/arrow-back-basic.svg"
          alt="back arrow"
        />
        back to continents
      </Link>
    </div>
  );
};

export default DetailPage;
