/** Kết quả trả về thống nhất cho mọi Server Action (không throw ra UI). */
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ActionError };

export interface ActionError {
  code: ErrorCode;
  message: string;
  fieldErrors?: Record<string, string>;
}

export enum ErrorCode {
  VALIDATION = "VALIDATION",
  RATE_LIMITED = "RATE_LIMITED",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  OUT_OF_HOURS = "OUT_OF_HOURS",
  CONFLICT = "CONFLICT",
  NOTIFY_FAILED = "NOTIFY_FAILED",
  INTERNAL = "INTERNAL",
}

export function ok<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}

export function fail(
  code: ErrorCode,
  message: string,
  fieldErrors?: Record<string, string>,
): ActionResult<never> {
  return { ok: false, error: { code, message, fieldErrors } };
}
