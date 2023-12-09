import { CircleUserRound } from "lucide-react";
import { BsExclamationSquareFill, BsThreeDots } from "react-icons/bs";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import {
  LuCircleDashed,
  LuSignalHigh,
  LuSignalLow,
  LuSignalMedium,
} from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";

export const getHeadingIcon = (prop, key) => {
  if (prop === "status") {
    if (key === "Todo") {
      return <FaRegCircle />;
    } else if (key === "Canceled") {
      return <MdCancel />;
    } else if (key === "In progress") {
      return <TbProgressCheck />;
    } else if (key === "Backlog") {
      return <LuCircleDashed />;
    } else if (key === "Done") {
      return <FaCheckCircle />;
    }
  } else if (prop === "user") {
    return <CircleUserRound size={20} />;
  } else if (prop === "priority") {
    if (key === "4") {
      return <BsExclamationSquareFill />;
    } else if (key === "3") {
      return <LuSignalHigh />;
    } else if (key === "2") {
      return <LuSignalMedium />;
    } else if (key === "1") {
      return <LuSignalLow />;
    } else if (key === "0") {
      return <BsThreeDots />;
    }
  }
};

export const getUserStatusIcon = (key) => {
  if (key === "Todo") {
    return <FaRegCircle />;
  } else if (key === "Canceled") {
    return <MdCancel />;
  } else if (key === "In progress") {
    return <TbProgressCheck />;
  } else if (key === "Backlog") {
    return <LuCircleDashed />;
  } else if (key === "Done") {
    return <FaCheckCircle />;
  }
};

export const getPriorityIcon = (props) => {
  if (props === 4) {
    return <BsExclamationSquareFill />;
  } else if (props === 3) {
    return <LuSignalHigh />;
  } else if (props === 2) {
    return <LuSignalMedium />;
  } else if (props === 1) {
    return <LuSignalLow />;
  } else if (props === 0) {
    return <BsThreeDots />;
  }
};

export const getPriorityName = (key) => {
  if (key === "4") {
    return "Urgent";
  } else if (key === "3") {
    return "High";
  } else if (key === "2") {
    return "Medium";
  } else if (key === "1") {
    return "Low";
  } else if (key === "0") {
    return "No Priority";
  }
};
