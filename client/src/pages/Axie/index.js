import React, { useEffect, useState } from 'react';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import AxieView from './AxieView';

import { getSingleAxie } from 'services/Axie';

const Axie = ({
  match: {
    params: {
      axieId,
    },
  },
}) => {
  const [axie, setAxie] = useState(null);
  const [parentsAxie, setParentsAxie] = useState(null);

  useEffect(() => {
    const requestAxieData = async () => {
      const axieData = await getSingleAxie(axieId);
      setAxie(axieData);

      if (axieData.matronId !== 0) {
        const { data: matron } = await getSingleAxie(axieData.matronId);
        const { data: sire } = await getSingleAxie(axieData.sireId);

        setParentsAxie({
          sire,
          matron,
        });
      }
    }

    if (axie !== null) {
      setAxie(null)
      setParentsAxie(null)
    }

    requestAxieData();
  }, [axieId]);

  return (
    <FullHeight start>
      <Container>
        {axie
          ? <AxieView {...{ axie, parentsAxie }} />
          : <Loader />
        }
      </Container>
    </FullHeight>
  );
}

export default Axie;
