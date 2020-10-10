import Discord from 'discord.js';
import dotenv from 'dotenv'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Anonymous from './helpers/anonymous';

dotenv.config({path: './.env'})
const {
  DISCORD_TOKEN,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  ANONYMOUS_SHEET_ID,
} = process.env

const anonSpreadsheet = new GoogleSpreadsheet(ANONYMOUS_SHEET_ID);


(async () => {
  // use service account creds
  await anonSpreadsheet.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  }, GOOGLE_SERVICE_ACCOUNT_EMAIL);

  Anonymous(client, anonSpreadsheet)
})();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.login(DISCORD_TOKEN);