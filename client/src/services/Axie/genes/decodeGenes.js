import BN from 'bignumber.js';

import { axieClassBin, axiePartsBinMapping, axiePartsByName } from './axieBinMappings';

export const PROBABILITIES = {
  d: 0.375,
  r1: 0.09375,
  r2: 0.03125,
};

const BODY_PARTS = ['eyes', 'mouth', 'ears', 'horn', 'back', 'tail'];
const MAX_PURENESS_QUALITY = 6 * (PROBABILITIES.d + PROBABILITIES.r1 + PROBABILITIES.r2);

// helper
const stringTo256Bin = (string, str = '0') => {
  const missingChars = 256 - string.length;

  let s = '';
  for (let i = 0; i < missingChars; i += 1) {
    s += str;
  }

  return s + string;
};

const genesToBin = (genes) => {
  const genesString = new BN(genes).toString(2);
  const genesBin = stringTo256Bin(genesString);

  return genesBin;
};

const getGenesGroups = (genes) => {
  const groups = [];

  for (let i = 0; i < 8; i += 1) {
    groups.push(genes.slice(i * 32, (i + 1) * 32));
  }

  return groups;
};

const getTraitName = (cls, part, region, binary, skinBinary = '00') => {
  let trait;
  if (binary in axiePartsBinMapping[cls][part]) {
    if (skinBinary === '11') {
      trait = axiePartsBinMapping[cls][part][binary].mystic;
    } else if (skinBinary === '10') {
      trait = axiePartsBinMapping[cls][part][binary].xmas;
    } else if (region in axiePartsBinMapping[cls][part][binary]) {
      trait = axiePartsBinMapping[cls][part][binary][region];
    } else if ('global' in axiePartsBinMapping[cls][part][binary]) {
      trait = axiePartsBinMapping[cls][part][binary].global;
    } else {
      trait = `UNKNOWN Regional ${cls} ${part}`;
    }
  } else {
    trait = `UNKNOWN ${cls} ${part}`;
  }

  return trait;
};

const getPartData = (trait, part) => {
  const partString = `${part.toLowerCase()}-${trait.toLowerCase().replace(/\s/g, '-').replace(/[?`.]/g, '')}`;

  return axiePartsByName[partString];
};

const getPartsFromGroup = (part, group, region = 0) => {
  const skinBin = group.slice(0, 2);

  const dClass = group.slice(2, 6);
  const dBin = group.slice(6, 12);
  const dName = getTraitName(dClass, part, region, dBin, skinBin);

  const r1Class = group.slice(12, 16);
  const r1Bin = group.slice(16, 22);
  const r1Name = getTraitName(r1Class, part, region, r1Bin);

  const r2Class = group.slice(22, 26);
  const r2Bin = group.slice(26, 32);
  const r2Name = getTraitName(r2Class, part, region, r2Bin);

  return {
    d: getPartData(dName, part),
    r1: getPartData(r1Name, part),
    r2: getPartData(r2Name, part),
  };
};

// parts are starting from index 2
const getBodyParts = groups => BODY_PARTS.map((part, i) => getPartsFromGroup(part, groups[i + 2]));

export const getPurenessQuality = (parts, axieClass) => {
  let purenessQuality = 0;

  parts.forEach((part) => {
    if (part.d.class === axieClass) {
      purenessQuality += PROBABILITIES.d;
    }
    if (part.r1.class === axieClass) {
      purenessQuality += PROBABILITIES.r1;
    }
    if (part.r2.class === axieClass) {
      purenessQuality += PROBABILITIES.r2;
    }
  });

  return {
    purenessQuality: (purenessQuality / MAX_PURENESS_QUALITY) * 100,
  };
};

const decodeGenes = (genes) => {
  const genesBin = genesToBin(genes);
  const groups = getGenesGroups(genesBin);
  const parts = getBodyParts(groups);

  return parts;
};

export default decodeGenes;
