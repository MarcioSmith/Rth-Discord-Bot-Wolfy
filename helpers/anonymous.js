export default function Anonymous (client, spreadsheet) {
  client.on('message', msg => {
    const { author, content } = msg;
    const anonCommand = content.includes('!anon');
    console.log('client.channels.cache - ', client.channels.cache)
    if (msg.channel.type !== 'dm' || !anonCommand) {
      return;
    }
  
    const { username, id } = author;
    
    (async () => {
      await spreadsheet.loadInfo();
      const sheet = spreadsheet.sheetsByIndex[0];
      await sheet.addRows([
        { 
          id,
          user: username,
          message: content
        }
      ])

      const channel = client.channels.cache.get(`764555395502702603`)
      channel.send(`Heyyo Wolfy Here!!! I have a message that was sent anonymously: \n **${content.replace('!anon ', '')}**.`);
    
      msg.reply(`Your Message Has Been Sent Anonymously To The ${channel.name} Channel` );
    })();
  });
  
  console.log('Anonymous Functionality Added 1/1');
}
