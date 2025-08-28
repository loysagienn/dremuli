import { ConfirmableAction } from "types";

export type ConfirmAction = {
  type: "CONFIRM";
  action: ConfirmableAction;
};

export function confirmAction(action: ConfirmableAction): ConfirmAction {
  return {
    type: "CONFIRM",
    action,
  };
}

export type ConfirmApproveAction = {
  type: "CONFIRM_APPROVE";
  action: ConfirmableAction;
};

export function confirmApproveAction(
  action: ConfirmableAction
): ConfirmApproveAction {
  return {
    type: "CONFIRM_APPROVE",
    action,
  };
}

export type ConfirmDeclineAction = {
  type: "CONFIRM_DECLINE";
  action: ConfirmableAction;
};

export function confirmDeclineAction(
  action: ConfirmableAction
): ConfirmDeclineAction {
  return {
    type: "CONFIRM_DECLINE",
    action,
  };
}
