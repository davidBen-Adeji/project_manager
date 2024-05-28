import { useAuthContext } from "../../hooks/useAuthContext";
import { useDeletePermanently } from "../../hooks/useDeletePermanently";
import { useRestoreTask } from "../../hooks/useRestoreTask";

import { Link } from "react-router-dom";

import GreenBinImg from "../../assets/svg/bin-green.svg";
import GreenRestoreImg from "../../assets/svg/restore-green.svg";
import BlueBinImg from "../../assets/svg/bin-blue.svg";
import BlueRestoreImg from "../../assets/svg/restore-blue.svg";
import OrangeBinImg from "../../assets/svg/bin-orange.svg";
import OrangeRestoreImg from "../../assets/svg/restore-orange.svg";
import RedBinImg from "../../assets/svg/bin-red.svg";
import RedRestoreImg from "../../assets/svg/restore-red.svg";

import classes from "./BinItem.module.css";

export default function BinItem({ _id, title }) {
  const { user } = useAuthContext();
  const onDeletePermanently = useDeletePermanently();
  const onRestoreTask = useRestoreTask();

  let binImg = GreenBinImg;
  let restoreImg = GreenRestoreImg;

  switch (user.themePreference) {
    case "blue":
      binImg = BlueBinImg;
      restoreImg = BlueRestoreImg;
      break;

    case "orange":
      binImg = OrangeBinImg;
      restoreImg = OrangeRestoreImg;
      break;

    case "red":
      binImg = RedBinImg;
      restoreImg = RedRestoreImg;
  }

  return (
    <li className={`list rounded-full shadow-lg`}>
      <Link to="" className={classes.binItemLink}>
        {title}
      </Link>{" "}
      <div className={classes.buttons}>
        <button type="button" onClick={() => onRestoreTask(_id)}>
          <img className={classes.button} src={restoreImg} alt="restore" />
        </button>
        <button type="button" onClick={() => onDeletePermanently(_id)}>
          <img className={classes.button} src={binImg} alt="bin" />
        </button>
      </div>
    </li>
  );
}
