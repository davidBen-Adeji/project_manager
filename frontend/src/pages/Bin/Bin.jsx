import { useEffect } from "react";
import { useBinContext } from "../../hooks/useBinContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetchBin } from "../../hooks/useFetchBin";
import { useDeletePermanently } from "../../hooks/useDeletePermanently";

import BlackBinImg from "../../assets/svg/bin.svg";
import RedBinImg from "../../assets/svg/bin-red.svg";
import BlueBinImg from "../../assets/svg/bin-blue.svg";
import OrangeBinImg from "../../assets/svg/bin-orange.svg";
import WhiteBinImg from "../../assets/svg/bin-white.svg";

import classes from "./Bin.module.css";

import BinItem from "../../components/BinItem/BinItem";

export default function Bin() {
  const { bin } = useBinContext();
  const { user } = useAuthContext();
  const fetchBin = useFetchBin();
  const onDeletePermanently = useDeletePermanently();

  let binImg = BlackBinImg;

  switch (user.themePreference) {
    case "blue":
      binImg = BlueBinImg;
      break;

    case "orange":
      binImg = OrangeBinImg;
      break;

    case "red":
      binImg = RedBinImg;
      break;
  }

  useEffect(() => {
    async function fetchDeletedItems() {
      await fetchBin();
    }
    fetchDeletedItems();
  }, [fetchBin]);

  async function onDeleteAll() {
    for (const b of bin) {
      await onDeletePermanently(b._id);
    }
  }

  return (
    <>
      <div className={classes.title}>
        <img src={binImg} alt="bin" />
        <h2 className={`${classes.titleHeader} text`}>Bin</h2>
      </div>
      {!bin && <div className={`spinner ${classes.spin}`}></div>}
      {bin && bin.length > 0 && (
        <ul>
          {bin.map((binItem) => (
            <BinItem
              key={binItem._id}
              _id={binItem._id}
              title={binItem.title}
            />
          ))}
        </ul>
      )}
      {bin && bin.length <= 0 && (
        <img src={binImg} alt="bin image" className={classes.bigBinImg} />
      )}
      <button
        className={`${classes.deleteButton} btn`}
        type="button"
        onClick={onDeleteAll}
      >
        <img src={WhiteBinImg} className={classes.binImg} alt="bin" />
      </button>
    </>
  );
}
