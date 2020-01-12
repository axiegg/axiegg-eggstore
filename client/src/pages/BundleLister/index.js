import React, { useState } from 'react';
import Papa from 'papaparse';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import { ErrorDesc } from 'components/Typography';

import Bundle from './Bundle';

import { createBundleSellOrder } from 'services/Opensea';

const BundleLister = () => {
  const [bundleData, setBundleData] = useState(null);
  const [parseError, setParseError] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (fileLoadedEvent) => {
      try {
        const csvData = fileLoadedEvent.target.result;
        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
        });

        console.log(parsedData.data);
        setBundleData(parsedData.data);
        setFileName(file.name);
        setParseError(false);
      } catch (error) {
        setParseError(true);
        console.error(error);
      }
    };

    reader.readAsText(file, 'UTF-8');
  };

  const listBundle = (bundle) => {
    console.log(bundle);
    createBundleSellOrder(bundle);
  };

  return (
    <FullHeight start className={styles.page}>
      <Container>
        <h1>BundleLister</h1>
        <div className={styles.inputContainer}>
          <input
            id="file-upload"
            type="file"
            accept="csv"
            onChange={handleFile}
            className={styles.input}
          />
          {parseError && <ErrorDesc>Something went wrong while parsing file.</ErrorDesc>}
        </div>
        {bundleData && (
          <div className={styles.bundles}>
            {bundleData.map(bundle => (
              <Bundle
                {...{
                  key: bundle.ID,
                  bundle: { ...bundle, assets: bundle.ID.split(', ') },
                  listBundle,
                }}
              />
            ))}
          </div>
        )}
      </Container>
    </FullHeight>
  );
};

export default BundleLister;
