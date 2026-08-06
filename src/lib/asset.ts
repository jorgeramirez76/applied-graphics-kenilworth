// GitHub Pages serves this site under /<repo>. next/link and next/image get the
// basePath prefixed for them; raw asset strings inside our own JS do not, so
// every hand-written /public path has to go through here.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
