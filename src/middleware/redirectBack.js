export const attachRedirectBack = (req, res, next) => {
  res.redirectBack = (fallback = "back") => {
    const referrer = req.get("Referrer") || req.header("Referer");
    res.redirect(referrer || fallback);
  };
  next();
};
