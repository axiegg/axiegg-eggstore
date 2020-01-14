import React, { useEffect } from 'react';

import { FullHeight, Container } from 'components/Layout';

import { getSingleAxie } from 'services/Axie/api';

const Axie = ({
  match: {
    params: {
      axieId,
    },
  },
}) => {
  useEffect(() => {
    const requestAxieData = async () => {
      const axieData = await getSingleAxie(axieId);
      console.log(axieData);
    }

    requestAxieData();
  }, []);

  return (
    <FullHeight>
      <Container>
        <div>Axie {axieId}</div>
      </Container>
    </FullHeight>
  );
}

export default Axie;
