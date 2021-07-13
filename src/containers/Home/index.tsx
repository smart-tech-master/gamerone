import React, { useContext } from 'react';
import { AuthContext } from 'provider/auth';
import withChrome from 'components/common/Chrome/withChrome';
import Image from 'components/common/Image';
import Feeds from './Feeds';

function DefaultHomePage() {
  return (
    <Image
      src={'/assets/logo/g1-dark-horizontal.svg'}
      alt={'Gamer One'}
      title={'Gamer One'}
      className="logo"
    />
  );
}

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Feeds /> : <DefaultHomePage />;
}

export default withChrome(Home);
