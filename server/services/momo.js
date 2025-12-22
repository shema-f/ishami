import axios from 'axios';

let cachedToken = null;
let cachedExpiry = 0;

function now() { return Date.now(); }

export async function getAccessToken() {
  const subKey = process.env.MOMO_SUBSCRIPTION_KEY || process.env.MOMO_CONSUMER_KEY;
  const apiUser = process.env.MOMO_API_USER;
  const apiKey = process.env.MOMO_API_KEY || process.env.MOMO_CONSUMER_SECRET;
  const base = process.env.MOMO_BASE_URL || 'https://proxy.momoapi.mtn.com/collection/v1_0';

  if (!subKey || !apiUser || !apiKey) {
    throw new Error('MOMO env missing');
  }

  if (cachedToken && cachedExpiry - 60000 > now()) {
    return { token: cachedToken, base };
  }

  const auth = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  const url = `${base}/token/`;
  const res = await axios.post(url, null, {
    headers: {
      'Ocp-Apim-Subscription-Key': subKey,
      Authorization: `Basic ${auth}`,
    },
  });
  const data = res.data;
  if (!data.access_token) throw new Error('MOMO token failed');
  cachedToken = data.access_token;
  cachedExpiry = now() + (data.expires_in ? data.expires_in * 1000 : 3600 * 1000);
  return { token: cachedToken, base };
}

export async function requestToPay({ amount, currency = 'RWF', externalId, msisdn, payerMessage, payeeNote }) {
  const env = process.env.MOMO_ENV || 'sandbox';
  const subKey = process.env.MOMO_SUBSCRIPTION_KEY || process.env.MOMO_CONSUMER_KEY;
  const callbackUrl = process.env.MOMO_CALLBACK_URL;
  const { token, base } = await getAccessToken();
  const url = `${base}/requesttopay`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Ocp-Apim-Subscription-Key': subKey,
    'X-Target-Environment': env,
    'X-Reference-Id': externalId,
  };
  if (callbackUrl) headers['X-Callback-Url'] = callbackUrl;

  const body = {
    amount: String(amount),
    currency,
    externalId,
    payer: { partyIdType: 'MSISDN', partyId: msisdn },
    payerMessage,
    payeeNote,
  };

  const res = await axios.post(url, body, { headers });
  if (res.status !== 202) throw new Error('MOMO request failed');
  return externalId;
}

export async function getRequestToPayStatus(referenceId) {
  const env = process.env.MOMO_ENV || 'sandbox';
  const subKey = process.env.MOMO_SUBSCRIPTION_KEY || process.env.MOMO_CONSUMER_KEY;
  const { token, base } = await getAccessToken();
  const url = `${base}/requesttopay/${encodeURIComponent(referenceId)}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Ocp-Apim-Subscription-Key': subKey,
      'X-Target-Environment': env,
    },
  });
  const data = res.data || {};
  return data.status || 'PENDING';
}

export function normalizeMsisdn(phone) {
  const digits = String(phone || '').replace(/\D+/g, '');
  if (!digits) return '';
  if (digits.startsWith('250')) return digits;
  if (digits.startsWith('0')) return '250' + digits.slice(1);
  if (digits.startsWith('7')) return '250' + digits;
  if (digits.startsWith('+')) {
    const noPlus = digits.replace(/^\+/, '');
    return noPlus.startsWith('250') ? noPlus : noPlus;
  }
  return digits;
}

