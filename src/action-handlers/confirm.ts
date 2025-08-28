import { ActionHandler, ConfirmableAction } from "types";
import { confirmAction } from "actions/confirm";

type ConfirmableActionType = ConfirmableAction["type"];

export const confirm: ActionHandler<ConfirmableActionType> = ({
  action,
  next,
  dispatch,
}) => {
  if (action.confirmed) {
    next(action);

    return;
  }

  dispatch(confirmAction(action));
};

export const confirmApprove: ActionHandler<"CONFIRM_APPROVE"> = ({
  action,
  next,
  dispatch,
}) => {
  next(action);

  const confirmedAction: ConfirmableAction = {
    ...action.action,
    confirmed: true,
  };

  dispatch(confirmedAction);
};
