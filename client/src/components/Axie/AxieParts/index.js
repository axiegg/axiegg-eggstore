import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import eyesIcon from 'assets/images/icons/eyes.png';
import earsIcon from 'assets/images/icons/ears.png';
import mouthIcon from 'assets/images/icons/mouth.png';
import hornIcon from 'assets/images/icons/horn.png';
import backIcon from 'assets/images/icons/back.png';
import tailIcon from 'assets/images/icons/tail.png';

export const axieParts = [
  { name: 'eyes', icon: eyesIcon },
  { name: 'ears', icon: earsIcon },
  { name: 'back', icon: backIcon },
  { name: 'horn', icon: hornIcon },
  { name: 'mouth', icon: mouthIcon },
  { name: 'tail', icon: tailIcon },
];

export const AttackIcon = <svg width="8" height="15" viewBox="0 0 8 15"><g fillRule="evenodd"><path d="M3.964.5l-2.49 1.786.971 7.922H5.483l.97-7.922zM3.964 12.694H2.72v2.26h2.49v-2.26zM3.964 10.718H.667v1.452H7.262v-1.452z" /></g></svg>;

export const DefIcon = <svg width="10" height="13" viewBox="936 3010 10 13"><path d="M944.895 3018.624c-.748 1.524-1.928 2.716-3.668 3.82a.448.448 0 0 1-.504 0c-1.74-1.104-2.92-2.296-3.668-3.82-.748-1.517-1.055-3.328-1.055-5.679 0-.238.173-.428.394-.452a8.307 8.307 0 0 0 2.204-.747 9.985 9.985 0 0 0 2.078-1.43.452.452 0 0 1 .598 0 9.985 9.985 0 0 0 2.078 1.43 8.306 8.306 0 0 0 2.204.747c.22.024.394.214.394.452 0 2.351-.307 4.162-1.055 5.679" fillRule="evenodd" /></svg>;

export const AccuracyIcon = <svg width="14" height="14" viewBox="-1 0 15 14" color="#000"><g fillRule="evenodd"><path d="M6.64 4.28a2.44 2.44 0 1 0 0 4.879 2.44 2.44 0 0 0 0-4.879" /><path d="M9.889 7.405h.693a4.004 4.004 0 0 1-3.326 3.268v-.619a.002.002 0 0 0-.002-.002H5.932a.002.002 0 0 0-.002.002v.602A4.002 4.002 0 0 1 2.703 7.42h.578a.002.002 0 0 0 .002-.002V6.097a.002.002 0 0 0-.002-.002h-.592a4.002 4.002 0 0 1 3.224-3.31v.66c0 .002.001.003.003.003h1.322a.002.002 0 0 0 .002-.002v-.682a4.004 4.004 0 0 1 3.35 3.314h-.701a.002.002 0 0 0-.003.003v1.322l.003.002m3.387-1.358H11.94a5.285 5.285 0 0 0-4.646-4.61V.082A.002.002 0 0 0 7.292.08H5.97a.002.002 0 0 0-.002.002v1.373a5.285 5.285 0 0 0-4.52 4.61H.003A.002.002 0 0 0 0 6.065v1.321c0 .002.001.003.002.003h1.456a5.285 5.285 0 0 0 4.526 4.534v1.431c0 .001.001.003.003.003h1.321a.002.002 0 0 0 .003-.003v-1.42a5.284 5.284 0 0 0 4.623-4.562h1.342a.002.002 0 0 0 .003-.002V6.049a.002.002 0 0 0-.003-.002" /></g></svg>;

export const PartStats = ({ moves }) => (
  <div className={styles.partStats}>
    <span className={styles.partStat}>{moves[0].attack}</span>
    <span className={styles.partStat}>{moves[0].defense}</span>
    <span className={styles.partStat}>{moves[0].accuracy}</span>
  </div>
);

const AxieParts = ({ parts, className }) => (
  <div className={classnames(styles.parts, className)}>
    {parts.map((part, i) => (
      <div
        key={`${part.name}-${part.type}`}
        className={classnames(
          styles.part,
          styles[part.class],
          { [styles.mystic]: part.mystic },
        )}
      >
        <div className={classnames(styles.partIcon, styles[part.type])}>
          <div className={styles.icon} style={{ backgroundImage: `url(${axieParts[i].icon})` }} />
        </div>
        <span className={styles.partName}>{part.name}</span>
      </div>
    ))}
  </div>
);

export default AxieParts;
