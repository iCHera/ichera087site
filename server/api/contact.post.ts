export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, tguser, message } = body;

  if (!name || !tguser || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Все поля обязательны для заполнения',
    });
  }

  const BOT_TOKEN = '7889525170:AAGws6TQvCho9QUvmEe4PQotRN12wNtlcG8'; 
  const CHAT_ID = '566935572'; 

  const text = `
📩 Новая заявка с сайта!

👤 Имя: ${name}

📧 Telegram-User:

${tguser}

📝 Сообщение:

${message}
  `;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await $fetch(url, {
      method: 'POST',
      body: {
        chat_id: isNaN(Number(CHAT_ID)) ? CHAT_ID : Number(CHAT_ID),
        text: text,
        parse_mode: 'Markdown',
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Telegram API Error Details:', error.data); 
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при отправке сообщения',
    });
  }
});