import { VerifyOtpType } from '@notion-clone/auth';
import { defineEventHandler, getRequestURL, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
  const reqUrl = getRequestURL(event);

  const tokenHash = reqUrl.searchParams.get('token_hash');
  const type = reqUrl.searchParams.get('type');
  const next = reqUrl.searchParams.get('next') ?? '/';

  if (!tokenHash || !type) {
    return sendRedirect(event, '/signup');
  }

  // TODO: validate type better
  if (!['email'].includes(type)) {
    return sendRedirect(
      event,
      `/signup?error_code=1&error_message=Provided type for verification is not allowed`,
    );
  }

  const client = event.context.authClient;
  const { error } = await client.confirmEmail(tokenHash, type as VerifyOtpType);

  if (!error) {
    return sendRedirect(event, next);
  }

  return sendRedirect(
    event,
    `/signup?error_code=${error.code}&error_message=${error.message}`,
  );
});
