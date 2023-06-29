import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Grid,
  Image,
  NavBar,
  Space,
} from 'antd-mobile';
import { GridItem } from 'antd-mobile/es/components/grid/grid';
import { BiSolidSlideshow } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { BsFillMicFill } from 'react-icons/bs';
import styles from '../global.module.css';
import useWindowDimensions from '../components/useWindowDimensions';

const HomePage = () => {
  const tvShows = useSelector((store) => store.data);
  const { width } = useWindowDimensions();
  const [cols, setCols] = useState(2);

  useEffect(() => {
    if (width <= 425) setCols(2);
    else if (width > 425 && width <= 768) setCols(3);
    else if (width > 768 && width < 1024) setCols(4);
    else setCols(5);
  }, [width]);

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
        backArrow={false}
        className={styles.nav}
      >
        TV Shows
      </NavBar>
      <div
        className={styles.container}
        style={{ maxWidth: '1024px', margin: '0 auto' }}
      >
        <Grid columns={cols} gap={2} wrap className={styles.container}>
          {tvShows.map((show) => (
            <GridItem key={show.id}>
              <Link to={`details/${show.id}`}>
                <Image key={show.id} src={show.image.medium} />
              </Link>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
