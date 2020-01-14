import React, { useEffect, useState } from 'react';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import AxieView from './AxieView';

import { getSingleAxie } from 'services/Axie/api';

const Axie = ({
  match: {
    params: {
      axieId,
    },
  },
}) => {
  const [axie, setAxie] = useState(null);

  useEffect(() => {
    const requestAxieData = async () => {
      const axieData = await getSingleAxie(axieId);
      setAxie(axieData.data);
    }

    requestAxieData();
  }, []);

  return (
    <FullHeight start>
      <Container>
        {axie
          ? <AxieView {...{ axie }} />
          : <Loader />
        }
      </Container>
    </FullHeight>
  );
}

export default Axie;
