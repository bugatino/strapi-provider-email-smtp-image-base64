"use strict";

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const nodemailer = require("nodemailer");
const { removeUndefined } = require('strapi-utils');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

const toBool = (val) => /^\s*(true|1|on)\s*$/i.test(val);

/* eslint-disable no-unused-vars */
module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const transporter = nodemailer.createTransport({
      host: providerOptions.host,
      port: providerOptions.port,
      secure: toBool(providerOptions.secure),
      auth: {
        user: providerOptions.username,
        pass: providerOptions.password,
      },
      tls: {
        rejectUnauthorized: toBool(providerOptions.rejectUnauthorized),
      },
      requireTLS: toBool(providerOptions.requireTLS),
      connectionTimeout: providerOptions.connectionTimeout * 60 * 1000, // 5 min
    });

    return {
      send: options => {
        return new Promise((resolve, reject) => {
          const { from, to, cc, bcc, replyTo, subject, text, html, hasBase64Image, ...rest } = options;

          let msg = {
            from: from || settings.defaultFrom,
            to,
            cc,
            bcc,
            replyTo: replyTo || settings.defaultReplyTo,
            subject,
            text,
            html,
            hasBase64Image: hasBase64Image || true,
            ...rest,
          };

          if (hasBase64Image) {
            transporter.use('compile', inlineBase64({cidPrefix: 'prefix_'}));
          }
          
          transporter.sendMail(removeUndefined(msg), function(err) {
            if (err) {
              reject([{ message: JSON.stringify(err) }]);
            } else {
              resolve();
            }
          });
        });
      },
    };
  },
};
