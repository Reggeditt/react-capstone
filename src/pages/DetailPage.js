import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Grid,
  Image,
  NavBar,
  Space,
} from 'antd-mobile';
import { GridItem } from 'antd-mobile/es/components/grid/grid';
import { BiSolidSlideshow } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { BsFillMicFill } from 'react-icons/bs';
import useWindowDimensions from '../components/useWindowDimensions';
import { fetchShowData, setShow } from '../redux/details/detailsSlice';
import styles from '../global.module.css';

const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentShow = useSelector((store) => store.data)
    .filter((show) => show.id === +id);
  const { width } = useWindowDimensions();
  const [cols, setCols] = useState(1);
  const { relatedShows } = useSelector((store) => store.details);
  const back = () => (
    navigate('/shows', { replace: true }, { state: { from: 'detail' } })
  );

  function truncateStringByWords(string, maxWords) {
    const words = string.split(' ');
    if (words.length <= maxWords) {
      return string;
    }
    return `${words.slice(0, maxWords).join(' ')}...`;
  }

  useEffect(() => {
    dispatch(setShow(currentShow[0].name));
    dispatch(fetchShowData());
    if (width > 375) setCols(3);
    else if (width <= 375) setCols(1);
  }, [dispatch, width]);
  return (
    <div className={styles.main}>
      <NavBar
        left={<BiSolidSlideshow size={25} color="white" />}
        right={(
          <Space>
            <CiSettings size={22} color="white" />
            <BsFillMicFill size={22} color="white" />
          </Space>
        )}
        onBack={back}
      >
        {`showing details for ${currentShow[0].name}`}
      </NavBar>

      <div
        className={styles.container}
        style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }}
      >
        {
          currentShow ? currentShow.map((show) => (
            <Grid columns={cols} gap={8} key={show.id} style={{ width: '90%', margin: '0', maxHeight: cols > 1 ? '450px' : null }}>
              <GridItem span={1}><Image src={show.image.medium} /></GridItem>
              <GridItem span={cols < 3 ? 1 : 2}>
                <div className={styles.showDetails}>
                  <span style={{ fontSize: '0.8rem' }}>{show.status}</span>
                  <h1>{show.name}</h1>
                  <p
                    style={{ textJustify: 'inter-word', textAlign: 'justify', fontSize: '1rem' }}
                  >
                    {truncateStringByWords(show.summary, 50).replace(/<[^>]*>/g, '')}
                  </p>
                  <Space style={{ fontSize: '0.8rem' }}>
                    {show.genres.map((genre) => <span key={genre}>{genre}</span>)}
                  </Space>
                  <span style={{ fontSize: '0.8rem' }}>{`rating: ${show.rating.average}`}</span>
                  <span style={{ fontSize: '0.8rem' }}>{`language: ${show.language}`}</span>
                </div>
              </GridItem>
            </Grid>
          )) : <div>Details not found</div>
        }
        <Card title="Related Movies" style={{ width: '100%', backgroundColor: 'black', color: 'white' }}>
          <Space className="detail-card" style={{ overflow: 'scroll' }}>
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
    </div>
  );
};

export default DetailPage;
