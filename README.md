# strapi-provider-email-gmail-oauth2-image-base64

## Demo
![Demo result/](./demo-image.jpg)
## Note
Strapi email provider send mail via SMTP with support insert base64 image in html content of email.

## Usage
Configure the provider in `[strapi-dir]/config/plugins`.

### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "smtp-image-base64",
    providerOptions: {
      host: env("SMTP_HOST"), //SMTP Host
      port: env("SMTP_PORT"),   , //SMTP Port
      secure: env("SMTP_SECURE") || true,
      username: env("SMTP_USERNAME"),
      password: env("SMTP_PASSWORD"),
      rejectUnauthorized: env("SMTP_REJECT_UNAUTHORIZED") || true,
      requireTLS: env("SMTP_REQUIRE_TLS") || true,
      connectionTimeout: env("SMTP_TIMEOUT") || 1,  // 1 minute
    },
    settings: {
      defaultFrom: env("EMAIL_USERNAME"),
      defaultReplyTo: env("EMAIL_USERNAME"),
    },
  },
  // ...
});
```
**TIP:** You can using environment file (.env) in the root of project for store variable.

## Enable/Disable base64 image in html email content
If you email don't have base64 image, you can disable this feature by adding a key in options email like this:
```js
await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        to: data?.email,
        hasBase64Image: false,
      },
      emailTemplate,
      {
        data,
      }
    );
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Installation

```bash
npm i -s strapi-provider-email-gmail-oauth2-image-base64
```
