import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Image,
  NavBar,
  Space,
} from 'antd-mobile';
import { fetchShowData, setShow } from '../redux/details/detailsSlice';

const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentShow = useSelector((store) => store.data)
    .filter((show) => show.id === +id);

  const { showData, relatedShows } = useSelector((store) => store.details);
  const back = () => (
    navigate('/about', { replace: true }, { state: { from: 'detail' } })
  );

  useEffect(() => {
    dispatch(setShow(currentShow[0].name));
    dispatch(fetchShowData());
  }, [dispatch]);
  console.log(currentShow[0]);
  return (
    <div>
      <NavBar onBack={back}>{`showing details for ${currentShow[0].name}`}</NavBar>
      {
        currentShow ? currentShow.map((show) => (
          <Space key={show.id}>
            <Image src={show.image.medium} />
            <div>
              <span>{show.status}</span>
              <h1>{show.name}</h1>
              <p>{show.summary}</p>
              <p>{show.genres.map((genre) => <span key={genre}>{genre}</span>)}</p>
              <span>{show.rating.average}</span>
              <span>{show.language}</span>
              <span>{show.officialSite}</span>
            </div>
          </Space>
        )) : showData.map((show) => (
          <Space key={show.show.id}>
            <Image src={show.show.image.medium} />
            <div>
              <span>{show.show.status}</span>
              <h1>{show.show.name}</h1>
              <p>{show.show.summary}</p>
              <p>{show.show.genres.map((genre) => <span key={genre}>{genre}</span>)}</p>
              <span>{show.show.rating.average}</span>
              <span>{show.show.language}</span>
              <span>{show.show.officialSite}</span>
            </div>
          </Space>
        ))
      }
      <Card title="Related Movies">
        <Space className="detail-card">
          {relatedShows.length ? relatedShows.map((show) => (
            <div key={show.show.id}>
              <Image src={show.show.image.medium} />
            </div>
          )) : <div>No related shows found</div>}
        </Space>
      </Card>
      <Link to="/">
        {'<'}
        back to continents
      </Link>
    </div>
  );
};

export default DetailPage;
