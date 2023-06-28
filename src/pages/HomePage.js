import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Image,
  NavBar,
  Space,
  Toast,
} from 'antd-mobile';

const back = () => Toast.show({
  content: 'Clicked the return area',
  duration: 1000,
});

const HomePage = () => {
  const tvShows = useSelector((store) => store.data);

  return (
    <div>
      <NavBar onBack={back}>TV Shows</NavBar>
      <Space
        wrap
        style={{ width: '100%', maxWidth: '700px' }}
      >
        {tvShows.map((show) => (
          <Link to={`details/${show.id}`} key={show.id}>
            <Image key={show.id} src={show.image.medium} />
          </Link>
        ))}
      </Space>
    </div>
  );
};

export default HomePage;
